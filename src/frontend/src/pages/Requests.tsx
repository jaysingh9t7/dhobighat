import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import { useUserPickups } from "@/hooks/useQueries";
import type { PickupRequest, PickupStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  RefreshCw,
  Zap,
} from "lucide-react";

// ─── Status Badge Helpers ────────────────────────────────────────────────────

type StatusVariant = "outline" | "secondary" | "destructive" | "default";

interface BadgeMeta {
  label: string;
  variant: StatusVariant;
  className: string;
}

function getPickupBadge(status: PickupStatus): BadgeMeta {
  if (
    status === "picked_up" ||
    status === "processing" ||
    status === "ready" ||
    status === "out_for_delivery" ||
    status === "delivered"
  ) {
    return {
      label: "Pickup Done ✓",
      variant: "default",
      className: "bg-green-100 text-green-800 border-green-200",
    };
  }
  if (status === "cancelled") {
    return {
      label: "Cancelled",
      variant: "destructive",
      className: "bg-destructive/10 text-destructive border-destructive/30",
    };
  }
  if (status === "confirmed") {
    return {
      label: "Confirmed",
      variant: "outline",
      className: "border-primary/30 text-primary bg-primary/8",
    };
  }
  return {
    label: "Pending",
    variant: "secondary",
    className: "bg-muted text-muted-foreground border-border",
  };
}

function getDropBadge(status: PickupStatus): BadgeMeta {
  if (status === "delivered") {
    return {
      label: "Drop Done ✓",
      variant: "default",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    };
  }
  if (status === "out_for_delivery") {
    return {
      label: "On the Way",
      variant: "outline",
      className: "bg-orange-50 text-orange-700 border-orange-200",
    };
  }
  return {
    label: "Pending",
    variant: "secondary",
    className: "bg-muted text-muted-foreground border-border",
  };
}

// ─── Reschedule State ────────────────────────────────────────────────────────

type RescheduleState = "allowed" | "too_late" | "not_applicable";

function getRescheduleState(pickup: PickupRequest): RescheduleState {
  if (
    pickup.status === "delivered" ||
    pickup.status === "cancelled" ||
    pickup.status === "picked_up" ||
    pickup.status === "processing" ||
    pickup.status === "ready" ||
    pickup.status === "out_for_delivery"
  ) {
    return "not_applicable";
  }
  const slotStart = pickup.timeSlot.split("–")[0].split("-")[0].trim();
  const scheduledDt = new Date(`${pickup.scheduledDate} ${slotStart}`);
  const diffMs = scheduledDt.getTime() - Date.now();
  if (diffMs > 60 * 60 * 1000) return "allowed";
  if (diffMs > 0) return "too_late";
  return "not_applicable";
}

// ─── Progress Bar ────────────────────────────────────────────────────────────

const STEPS: PickupStatus[] = [
  "pending",
  "confirmed",
  "picked_up",
  "processing",
  "ready",
  "out_for_delivery",
  "delivered",
];

function PickupProgressBar({ status }: { status: PickupStatus }) {
  if (status === "cancelled") return null;
  const idx = STEPS.indexOf(status);
  if (idx === -1) return null;
  const pct = Math.round(((idx + 1) / STEPS.length) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Scheduled</span>
        <span>Delivered</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Request Card ────────────────────────────────────────────────────────────

function RequestCard({
  pickup,
  onReschedule,
}: {
  pickup: PickupRequest;
  onReschedule: (id: string) => void;
}) {
  const pickupBadge = getPickupBadge(pickup.status);
  const dropBadge = getDropBadge(pickup.status);
  const rescheduleState = getRescheduleState(pickup);
  const orderRef = `#${pickup.id.slice(-6).toUpperCase()}`;

  return (
    <article
      className="bg-card rounded-2xl border border-border shadow-card overflow-hidden"
      data-ocid={`request-card-${pickup.id}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border/60">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">
            {pickup.serviceIds.join(" · ")}
          </p>
          <p className="text-xs text-muted-foreground">{orderRef}</p>
        </div>
        {pickup.isExpress && (
          <span className="flex items-center gap-1 text-xs font-semibold text-accent shrink-0">
            <Zap className="w-3.5 h-3.5" />
            Express
          </span>
        )}
      </div>

      {/* Date / Time / Address */}
      <div className="px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-2">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span className="text-xs text-muted-foreground truncate">
            {pickup.scheduledDate}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span className="text-xs text-muted-foreground truncate">
            {pickup.timeSlot}
          </span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span className="text-xs text-muted-foreground truncate">
            {pickup.addressId
              ? `Address ref: ${pickup.addressId.slice(-6).toUpperCase()}`
              : "Address on file"}
          </span>
        </div>
      </div>

      {/* Status badges */}
      <div className="px-4 pb-3 flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            Pickup Status
          </span>
          <Badge
            variant={pickupBadge.variant}
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${pickupBadge.className}`}
          >
            {pickupBadge.label}
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
            Drop Status
          </span>
          <Badge
            variant={dropBadge.variant}
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${dropBadge.className}`}
          >
            {dropBadge.label}
          </Badge>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pb-3">
        <PickupProgressBar status={pickup.status} />
      </div>

      {/* Footer: Amount + Paid + Reschedule */}
      <div className="border-t border-border/60 px-4 py-3 flex items-center justify-between gap-3 bg-muted/20">
        <div className="text-sm min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-bold text-foreground">
            &#8377;{pickup.finalAmount}
          </span>
          {pickup.discountPercent > 0 && (
            <span className="text-xs text-green-600 font-medium">
              ({pickup.discountPercent}% off)
            </span>
          )}
          {pickup.isPaid ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              Paid
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3" />
              Unpaid
            </span>
          )}
        </div>

        {rescheduleState === "allowed" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReschedule(pickup.id)}
            className="shrink-0 text-xs border-accent/40 text-accent hover:bg-accent/10 hover:border-accent gap-1.5"
            data-ocid={`reschedule-btn-${pickup.id}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reschedule
          </Button>
        )}
        {rescheduleState === "too_late" && (
          <span
            className="shrink-0 text-xs text-destructive flex items-center gap-1 font-medium"
            data-ocid={`reschedule-too-late-${pickup.id}`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Too late
          </span>
        )}
      </div>
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RequestsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pickups = [], isLoading } = useUserPickups(user?.id);

  function handleReschedule(pickupId: string) {
    void navigate({
      to: "/dashboard/reschedule",
      search: { pickupId },
    });
  }

  return (
    <DashboardLayout>
      {/* Back button */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/dashboard" })}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
        data-ocid="requests-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">
          My Requests
        </h1>
        {pickups.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {pickups.length} order{pickups.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse"
            >
              <div className="p-4 border-b border-border/60">
                <div className="h-4 bg-muted rounded w-40 mb-2" />
                <div className="h-3 bg-muted rounded w-20" />
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="h-3 bg-muted rounded w-24" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
              <div className="px-4 pb-4 flex gap-2">
                <div className="h-6 bg-muted rounded-full w-24" />
                <div className="h-6 bg-muted rounded-full w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && pickups.length === 0 && (
        <div
          className="text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-border"
          data-ocid="empty-requests-list"
        >
          <div className="w-16 h-16 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <p className="font-semibold text-foreground mb-1.5">
            No requests yet
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Schedule your first pickup to get started
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/dashboard/schedule" })}
            className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold"
            data-ocid="empty-state-schedule-cta"
          >
            Schedule Pickup
          </button>
        </div>
      )}

      {/* Request list */}
      {!isLoading && pickups.length > 0 && (
        <div className="space-y-4" data-ocid="requests-list">
          {pickups.map((p) => (
            <RequestCard
              key={p.id}
              pickup={p}
              onReschedule={handleReschedule}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
