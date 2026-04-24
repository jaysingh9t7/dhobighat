import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { APP_CONFIG } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import {
  useCreatePayment,
  useCustomerDiscount,
  useMarkPaymentPaid,
  useUserPayments,
  useUserPickups,
} from "@/hooks/useQueries";
import type { PickupRequest } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Copy,
  CreditCard,
  ExternalLink,
  QrCode,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

// Detect mobile device
function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
    navigator.userAgent,
  );
}

function buildUpiUrl(amount: number, pickupId: string): string {
  const params = new URLSearchParams({
    pa: APP_CONFIG.upiId,
    pn: APP_CONFIG.upiName,
    am: amount.toString(),
    cu: "INR",
    tn: `DhobiGhat-${pickupId.slice(-6).toUpperCase()}`,
  });
  return `upi://pay?${params.toString()}`;
}

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────

function DiscountBadge({ percent }: { percent: number }) {
  if (!percent) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
      🎉 {percent}% loyalty discount
    </span>
  );
}

function CopyUpiButton() {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    void navigator.clipboard.writeText(APP_CONFIG.upiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted hover:bg-border transition-colors text-xs font-mono"
      aria-label="Copy UPI ID"
      data-ocid="copy-upi-id"
    >
      {APP_CONFIG.upiId}
      {copied ? (
        <CheckCircle className="w-3 h-3 text-green-600" />
      ) : (
        <Copy className="w-3 h-3 text-muted-foreground" />
      )}
    </button>
  );
}

function DesktopPayHint({
  amount,
  pickupId,
}: { amount: number; pickupId: string }) {
  const upiUrl = buildUpiUrl(amount, pickupId);
  return (
    <div className="hidden sm:block mt-3 p-3 rounded-xl bg-muted/50 border border-border text-sm">
      <div className="flex items-start gap-3">
        <QrCode className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="font-medium text-foreground mb-1">
            Open UPI app on your mobile
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            Scan with Google Pay, PhonePe, or Paytm QR scanner, or send manually
            to:
          </p>
          <CopyUpiButton />
          <p className="text-xs text-muted-foreground mt-2">
            Reference:{" "}
            <span className="font-mono font-semibold text-foreground">
              {pickupId.slice(-6).toUpperCase()}
            </span>
          </p>
        </div>
        <a
          href={upiUrl}
          className="shrink-0 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
          aria-label="Try UPI deep link"
        >
          Try link <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function PickupPayCard({
  pickup,
  onPay,
  isPaying,
  isPaid,
}: {
  pickup: PickupRequest;
  onPay: (id: string, amount: number) => void;
  isPaying: boolean;
  isPaid: boolean;
}) {
  return (
    <div
      className="bg-card rounded-2xl border border-border p-4 shadow-card"
      data-ocid={`pay-item-${pickup.id}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">
            {pickup.serviceIds.join(", ")}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {new Date(pickup.scheduledDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            · {pickup.timeSlot}
          </p>
          {pickup.isExpress && (
            <Badge
              variant="outline"
              className="text-xs mt-1 border-accent text-accent-foreground"
            >
              Express Service
            </Badge>
          )}
        </div>
        <div className="text-right shrink-0">
          {pickup.discountPercent > 0 ? (
            <>
              <p className="font-bold text-lg text-foreground">
                ₹{pickup.finalAmount}
              </p>
              <p className="text-xs text-muted-foreground line-through">
                ₹{pickup.totalAmount}
              </p>
            </>
          ) : (
            <p className="font-bold text-lg text-foreground">
              ₹{pickup.finalAmount}
            </p>
          )}
        </div>
      </div>

      {/* Discount badge */}
      {pickup.discountPercent > 0 && (
        <div className="mb-3">
          <DiscountBadge percent={pickup.discountPercent} />
        </div>
      )}

      {/* Action */}
      {isPaid ? (
        <div className="flex items-center gap-2 py-2.5 text-green-600 font-medium text-sm">
          <CheckCircle className="w-4 h-4" />
          Payment Initiated — check your UPI app to confirm
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onPay(pickup.id, pickup.finalAmount)}
            disabled={isPaying}
            className="btn-gold w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold sm:hidden"
            data-ocid={`pay-button-${pickup.id}`}
          >
            <Smartphone className="w-4 h-4" />
            {isPaying
              ? "Opening UPI app…"
              : `Pay ₹${pickup.finalAmount} via UPI`}
          </button>
          {/* Desktop: show hint + button */}
          <div className="hidden sm:flex gap-3 items-center">
            <button
              type="button"
              onClick={() => onPay(pickup.id, pickup.finalAmount)}
              disabled={isPaying}
              className="btn-gold flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
              data-ocid={`pay-button-desktop-${pickup.id}`}
            >
              <CreditCard className="w-4 h-4" />
              {isPaying ? "Redirecting…" : `Pay ₹${pickup.finalAmount}`}
            </button>
          </div>
          <DesktopPayHint amount={pickup.finalAmount} pickupId={pickup.id} />
        </>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────

export default function PayPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pickups = [], refetch: refetchPickups } = useUserPickups(
    user?.id,
  );
  const { data: payments = [], refetch: refetchPayments } = useUserPayments(
    user?.id,
  );
  const { data: discountPercent = 0 } = useCustomerDiscount(user?.id);
  const createPayment = useCreatePayment();
  const markPaid = useMarkPaymentPaid();
  const [payingId, setPayingId] = useState<string>("");
  const [initiatedIds, setInitiatedIds] = useState<string[]>([]);

  const unpaidPickups = pickups.filter(
    (p) => !p.isPaid && p.status !== "cancelled",
  );
  const totalDue = unpaidPickups.reduce((sum, p) => sum + p.finalAmount, 0);
  const totalOriginal = unpaidPickups.reduce(
    (sum, p) => sum + p.totalAmount,
    0,
  );
  const totalSavings = totalOriginal - totalDue;

  async function handlePay(pickupId: string, amount: number) {
    if (!user) return;
    setPayingId(pickupId);
    try {
      const payment = await createPayment.mutateAsync({
        userId: user.id,
        pickupId,
      });
      const upiUrl = buildUpiUrl(amount, pickupId);

      if (isMobileDevice()) {
        window.location.href = upiUrl;
      } else {
        window.open(upiUrl, "_blank");
      }

      // Optimistically mark initiated; admin marks paid for real
      setInitiatedIds((prev) => [...prev, pickupId]);

      // After brief delay, auto-mark paid in prototype mode
      setTimeout(async () => {
        await markPaid.mutateAsync({ paymentId: payment.id });
        void refetchPickups();
        void refetchPayments();
      }, 4000);
    } finally {
      setPayingId("");
    }
  }

  return (
    <DashboardLayout>
      {/* Back button */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/dashboard" })}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
        data-ocid="pay-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Pay Now
      </h1>

      {/* ── Summary banner ── */}
      <div className="gradient-primary rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Total Amount Due</p>
            <p className="font-display font-bold text-4xl">₹{totalDue}</p>
            <p className="text-white/60 text-xs mt-1">
              {unpaidPickups.length} unpaid order
              {unpaidPickups.length !== 1 ? "s" : ""}
            </p>
          </div>
          {totalSavings > 0 && (
            <div className="text-right">
              <p className="text-white/70 text-xs">You saved</p>
              <p className="font-bold text-xl text-accent">₹{totalSavings}</p>
              <p className="text-white/60 text-xs">loyalty discount</p>
            </div>
          )}
        </div>

        {discountPercent > 0 && (
          <div className="mt-3 flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <CheckCircle className="w-4 h-4 text-accent shrink-0" />
            <p className="text-xs text-white/90">
              Your <strong>{discountPercent}% loyalty discount</strong> is
              automatically applied
            </p>
          </div>
        )}
      </div>

      {/* ── Security note ── */}
      <div className="bg-muted/40 rounded-xl p-4 mb-6 border border-border">
        <div className="flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-foreground mb-0.5">
              Secure UPI Payment
            </p>
            <p className="text-xs text-muted-foreground">
              Payments are processed directly via your UPI app (Google Pay,
              PhonePe, Paytm). UPI ID: <CopyUpiButton />
            </p>
          </div>
        </div>
      </div>

      {/* ── Unpaid orders ── */}
      {unpaidPickups.length === 0 ? (
        <div
          className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border"
          data-ocid="empty-payments"
        >
          <CheckCircle className="w-12 h-12 text-accent mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">All Paid!</p>
          <p className="text-sm text-muted-foreground">
            You have no outstanding payments. Great!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {unpaidPickups.map((p) => (
            <PickupPayCard
              key={p.id}
              pickup={p}
              onPay={handlePay}
              isPaying={payingId === p.id}
              isPaid={initiatedIds.includes(p.id)}
            />
          ))}
        </div>
      )}

      {/* ── Payment history ── */}
      {payments.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold text-base text-foreground mb-3">
            Payment History
          </h2>
          <div className="space-y-2">
            {payments.map((pay) => (
              <div
                key={pay.id}
                className="flex items-center justify-between p-3 bg-card rounded-xl border border-border text-sm"
                data-ocid={`payment-history-${pay.id}`}
              >
                <div>
                  <p className="font-medium text-foreground">
                    #{pay.pickupId.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(pay.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">₹{pay.amount}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      pay.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : pay.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {pay.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Security advisory ── */}
      <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-700 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800">
            <strong>Security Note:</strong> Always verify the UPI ID before
            confirming payment. DhobiGhat will never ask for your UPI PIN or OTP
            over call or message. Disputes? Contact us at{" "}
            <a
              href={`mailto:${APP_CONFIG.email}`}
              className="underline hover:no-underline"
            >
              {APP_CONFIG.email}
            </a>
            .
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
