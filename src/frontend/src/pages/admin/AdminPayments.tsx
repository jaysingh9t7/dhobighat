import { AdminLayout } from "@/components/AdminLayout";
import {
  useAllPayments,
  useMarkPaymentPaid,
  useMarkPaymentPending,
} from "@/hooks/useQueries";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function AdminPaymentsPage() {
  const { data: payments = [], isLoading } = useAllPayments();
  const markPaid = useMarkPaymentPaid();
  const markPending = useMarkPaymentPending();

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Payments
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs font-medium text-green-700 mb-1">Collected</p>
          <p className="font-bold text-2xl text-green-800">₹{totalPaid}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-xs font-medium text-orange-700 mb-1">Pending</p>
          <p className="font-bold text-2xl text-orange-800">₹{totalPending}</p>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && payments.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">No payments yet</p>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-3">
          {payments.map((pay) => (
            <div
              key={pay.id}
              className="bg-card rounded-xl border border-border p-4 shadow-card"
              data-ocid={`admin-payment-${pay.id}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    #{pay.pickupId.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(pay.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {pay.transactionId && (
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      TXN: {pay.transactionId}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">
                    ₹{pay.amount}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${pay.status === "paid" ? "bg-green-100 text-green-800" : pay.status === "pending" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}
                  >
                    {pay.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {pay.status !== "paid" && (
                  <button
                    type="button"
                    onClick={() => markPaid.mutate({ paymentId: pay.id })}
                    disabled={markPaid.isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-900 hover:bg-green-200 transition-colors"
                    data-ocid={`admin-mark-paid-${pay.id}`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Mark Paid
                  </button>
                )}
                {pay.status === "paid" && (
                  <button
                    type="button"
                    onClick={() => markPending.mutate(pay.id)}
                    disabled={markPending.isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-100 text-orange-900 hover:bg-orange-200 transition-colors"
                    data-ocid={`admin-mark-pending-${pay.id}`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" /> Mark Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
