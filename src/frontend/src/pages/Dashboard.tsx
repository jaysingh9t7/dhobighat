import { DashboardLayout } from "@/components/DashboardLayout";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SERVICES } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import { useMyLoyaltyStats, useUserPickups } from "@/hooks/useQueries";
import type { PickupStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  CalendarPlus,
  ChevronRight,
  Crown,
  Medal,
  Package,
  Star,
  Trophy,
} from "lucide-react";
import type React from "react";

// ---------------------------------------------------------------------------
// Tier display config
// ---------------------------------------------------------------------------
const TIER_CONFIG: Record<
  string,
  {
    icon: React.ElementType;
    ringClass: string;
    badgeBg: string;
    badgeText: string;
    progressBg: string;
    progressFill: string;
    glow: string;
    label: string;
  }
> = {
  Bronze: {
    icon: Medal,
    ringClass: "ring-2 ring-amber-400/50",
    badgeBg: "bg-amber-500/15 border border-amber-400/30",
    badgeText: "text-amber-400",
    progressBg: "bg-amber-400/15",
    progressFill: "bg-amber-400",
    glow: "shadow-[0_0_18px_rgba(245,158,11,0.18)]",
    label: "Bronze",
  },
  Silver: {
    icon: Star,
    ringClass: "ring-2 ring-slate-300/50",
    badgeBg: "bg-slate-400/15 border border-slate-300/30",
    badgeText: "text-slate-300",
    progressBg: "bg-slate-300/15",
    progressFill: "bg-slate-300",
    glow: "shadow-[0_0_18px_rgba(148,163,184,0.18)]",
    label: "Silver",
  },
  Gold: {
    icon: Trophy,
    ringClass: "ring-2 ring-yellow-400/50",
    badgeBg: "bg-yellow-500/15 border border-yellow-400/30",
    badgeText: "text-yellow-400",
    progressBg: "bg-yellow-400/15",
    progressFill: "bg-yellow-400",
    glow: "shadow-[0_0_18px_rgba(250,204,21,0.22)]",
    label: "Gold",
  },
  Platinum: {
    icon: Crown,
    ringClass: "ring-2 ring-violet-400/50",
    badgeBg: "bg-violet-500/15 border border-violet-400/30",
    badgeText: "text-violet-400",
    progressBg: "bg-violet-400/15",
    progressFill: "bg-violet-400",
    glow: "shadow-[0_0_22px_rgba(167,139,250,0.25)]",
    label: "Platinum",
  },
  none: {
    icon: Award,
    ringClass: "ring-2 ring-border",
    badgeBg: "bg-muted/60 border border-border",
    badgeText: "text-muted-foreground",
    progressBg: "bg-muted/40",
    progressFill: "bg-primary",
    glow: "",
    label: "No Tier Yet",
  },
};

// Next-tier thresholds for progress calculation
const TIER_THRESHOLDS: Record<string, number> = {
  Bronze: 2,
  Silver: 3,
  Gold: 4,
  Platinum: 10,
};

interface TierCardProps {
  tierName: string | null;
  discountPercent: number;
  qualifyingOrderCount: number;
  ordersToNextTier: number;
  nextTierName: string | null;
  nextTierPercent: number;
}

function TierCard({
  tierName,
  discountPercent,
  qualifyingOrderCount,
  ordersToNextTier,
  nextTierName,
  nextTierPercent,
}: TierCardProps) {
  const key = tierName ?? "none";
  const cfg = TIER_CONFIG[key] ?? TIER_CONFIG.none;
  const TierIcon = cfg.icon;
  const isPlatinum = tierName === "Platinum";

  // Progress bar: % through the gap from current threshold to next tier threshold
  const prevThreshold = tierName ? (TIER_THRESHOLDS[tierName] ?? 0) : 0;
  const nextThreshold = nextTierName ? TIER_THRESHOLDS[nextTierName] : null;
  const progressPct = isPlatinum
    ? 100
    : nextThreshold
      ? Math.round(
          ((qualifyingOrderCount - prevThreshold) /
            (nextThreshold - prevThreshold)) *
            100,
        )
      : Math.min(Math.round((qualifyingOrderCount / 2) * 100), 100);
  const clampedPct = Math.max(0, Math.min(100, progressPct));

  return (
    <div
      className={`mb-6 rounded-2xl border bg-card p-4 ${cfg.ringClass} ${cfg.glow} relative overflow-hidden`}
      data-ocid="loyalty-tier-card"
    >
      {/* Decorative background shimmer — color inherits from text */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.06] pointer-events-none rounded-full blur-2xl bg-current" />

      <div className="relative flex items-start gap-3">
        {/* Tier icon */}
        <div
          className={`w-12 h-12 rounded-xl ${cfg.badgeBg} flex items-center justify-center shrink-0 mt-0.5`}
        >
          <TierIcon className={`w-6 h-6 ${cfg.badgeText}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-display font-bold text-base text-foreground">
              My Loyalty Tier
            </h3>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}
            >
              {cfg.label}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {discountPercent}% off
              </span>
            )}
          </div>

          {/* Status message */}
          {isPlatinum ? (
            <p className="text-sm text-muted-foreground mb-3">
              🎉 You&apos;re Platinum! Enjoy{" "}
              <span className={`font-semibold ${cfg.badgeText}`}>10% off</span>{" "}
              on every order.
            </p>
          ) : tierName ? (
            <p className="text-sm text-muted-foreground mb-3">
              <span className="font-semibold text-foreground">
                {ordersToNextTier} more large{" "}
                {ordersToNextTier === 1 ? "order" : "orders"}
              </span>{" "}
              to reach{" "}
              <span className={`font-semibold ${cfg.badgeText}`}>
                {nextTierName} ({nextTierPercent}% off)
              </span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mb-3">
              Complete your first large order{" "}
              <span className="text-xs opacity-70">(2+ services)</span> to
              unlock{" "}
              <span className="font-semibold text-amber-400">Bronze</span> and
              get <span className="font-semibold text-primary">2% off</span>
            </p>
          )}

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div
              className={`h-2 rounded-full ${cfg.progressBg} overflow-hidden`}
            >
              <div
                className={`h-full rounded-full ${cfg.progressFill} transition-all duration-700 ease-out`}
                style={{ width: `${clampedPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {qualifyingOrderCount} qualifying{" "}
                {qualifyingOrderCount === 1 ? "order" : "orders"}
              </span>
              {isPlatinum ? (
                <span className={`font-medium ${cfg.badgeText}`}>
                  Max tier reached ✓
                </span>
              ) : (
                nextTierName && (
                  <span>
                    {nextTierName} at {nextThreshold} orders
                  </span>
                )
              )}
            </div>
          </div>

          {/* Footnote */}
          <p className="text-[11px] text-muted-foreground/55 mt-2 leading-snug">
            Large orders = 2+ services selected
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
interface StatusStyle {
  dot: string;
  text: string;
  bg: string;
}

const STATUS_STYLES: Record<PickupStatus, StatusStyle> = {
  pending: {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    bg: "bg-muted/60",
  },
  confirmed: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10" },
  picked_up: { dot: "bg-accent", text: "text-accent", bg: "bg-accent/10" },
  processing: {
    dot: "bg-secondary-foreground",
    text: "text-secondary-foreground",
    bg: "bg-secondary",
  },
  ready: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/15" },
  out_for_delivery: {
    dot: "bg-accent",
    text: "text-accent-foreground",
    bg: "bg-accent/20",
  },
  delivered: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10" },
  cancelled: {
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
};

const STATUS_LABELS: Record<PickupStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  picked_up: "Picked Up",
  processing: "Processing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function StatusBadge({ status }: { status: PickupStatus }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} shrink-0`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Dashboard page
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pickups = [] } = useUserPickups(user?.id);
  const { data: loyaltyStats } = useMyLoyaltyStats(user?.id);

  const recentPickups = pickups.slice(0, 3);
  const greeting = getGreeting();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <DashboardLayout>
      {/* Back button to home */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/" })}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
        data-ocid="dashboard-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Welcome banner */}
      <div className="mb-6 p-4 rounded-2xl gradient-primary text-primary-foreground">
        <p className="text-sm font-medium text-primary-foreground/80 mb-0.5">
          {greeting} 👋
        </p>
        <h1 className="font-display font-bold text-2xl">Hello, {firstName}!</h1>
        <p className="text-sm text-primary-foreground/70 mt-1">
          What can we clean for you today?
        </p>
      </div>

      {/* My Tier card */}
      <TierCard
        tierName={loyaltyStats?.tierName ?? null}
        discountPercent={loyaltyStats?.discountPercent ?? 0}
        qualifyingOrderCount={loyaltyStats?.qualifyingOrderCount ?? 0}
        ordersToNextTier={loyaltyStats?.ordersToNextTier ?? 2}
        nextTierName={loyaltyStats?.nextTierName ?? "Bronze"}
        nextTierPercent={loyaltyStats?.nextTierPercent ?? 2}
      />

      {/* Services grid */}
      <section className="mb-8">
        <h2 className="font-semibold text-base text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-accent inline-block" />
          Our Services
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {SERVICES.map((svc) => (
            <button
              type="button"
              key={svc.id}
              onClick={() => void navigate({ to: "/dashboard/schedule" })}
              className="service-card-hover flex flex-col items-center gap-2 p-3 rounded-2xl border-2 border-border bg-card hover:border-accent/60 hover:shadow-card cursor-pointer text-center"
              data-ocid={`dashboard-service-${svc.id}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <ServiceIcon name={svc.icon} className="w-6 h-6 text-accent" />
              </div>
              <span className="font-semibold text-xs text-foreground leading-snug">
                {svc.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Schedule Pickup CTA */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => void navigate({ to: "/dashboard/schedule" })}
          className="btn-gold w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-semibold shadow-card"
          data-ocid="dashboard-schedule-pickup"
        >
          <CalendarPlus className="w-5 h-5" />
          Schedule Pickup
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>
      </div>

      {/* Recent requests */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base text-foreground flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-accent inline-block" />
            Recent Requests
          </h2>
          {pickups.length > 3 && (
            <button
              type="button"
              onClick={() => void navigate({ to: "/dashboard/requests" })}
              className="text-sm text-primary font-medium hover:underline"
            >
              View all →
            </button>
          )}
        </div>

        {pickups.length === 0 ? (
          <div
            className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border"
            data-ocid="empty-requests"
          >
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
              <Package className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">
              No requests yet
            </p>
            <p className="text-sm text-muted-foreground mb-5 max-w-[220px] mx-auto">
              Schedule your first pickup and we&apos;ll handle the rest
            </p>
            <button
              type="button"
              onClick={() => void navigate({ to: "/dashboard/schedule" })}
              className="btn-navy px-6 py-2.5 rounded-xl text-sm"
              data-ocid="empty-schedule-cta"
            >
              Schedule Pickup
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPickups.map((p) => (
              <div
                key={p.id}
                className="bg-card rounded-xl border border-border p-4 flex items-start justify-between gap-3 hover:shadow-card transition-smooth"
                data-ocid={`request-item-${p.id}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-foreground truncate mb-1">
                    {p.serviceIds.map((s) => s.replace(/-/g, " ")).join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.scheduledDate} · {p.timeSlot}
                  </p>
                  {p.isExpress && (
                    <span className="text-xs font-medium text-accent mt-1 inline-block">
                      ⚡ Express
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={p.status} />
                  <span className="text-sm font-bold text-foreground">
                    ₹{p.finalAmount}
                  </span>
                </div>
              </div>
            ))}
            {pickups.length > 3 && (
              <button
                type="button"
                onClick={() => void navigate({ to: "/dashboard/requests" })}
                className="w-full py-2.5 text-sm font-medium text-primary border border-border rounded-xl hover:bg-muted transition-smooth"
              >
                View all {pickups.length} requests →
              </button>
            )}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
