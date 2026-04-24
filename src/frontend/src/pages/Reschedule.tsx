import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { PICKUP_TIME_SLOTS } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import { useReschedulePickup, useUserPickups } from "@/hooks/useQueries";
import type { PickupRequest } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  LogIn,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getNextWeekDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/**
 * Parse a time string like "9:30 AM" or "7:30 PM" into { hours, minutes }.
 * Handles slots with range suffixes like "9:30 AM – 11:30 AM".
 */
function parseSlotTime(timeStr: string): { hours: number; minutes: number } {
  // Strip everything after " – " or " - " to get just the start time
  const startPart = timeStr.split(/\s[–-]\s/)[0].trim();
  const match = startPart.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hours: 9, minutes: 0 };
  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return { hours, minutes };
}

function getScheduledDateTime(pickup: PickupRequest): Date {
  const { hours, minutes } = parseSlotTime(pickup.timeSlot);
  // scheduledDate is like "2026-04-10" — use local date parts to avoid UTC shift
  const [year, month, day] = pickup.scheduledDate.split("-").map(Number);
  const d = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return d;
}

/** Returns true only if pickup is pending/confirmed AND more than 1 hour away */
function canReschedule(pickup: PickupRequest): boolean {
  if (
    pickup.status === "delivered" ||
    pickup.status === "cancelled" ||
    pickup.status === "picked_up" ||
    pickup.status === "processing" ||
    pickup.status === "ready" ||
    pickup.status === "out_for_delivery"
  )
    return false;

  const scheduledTime = getScheduledDateTime(pickup);
  const now = new Date();
  return scheduledTime.getTime() - now.getTime() > 60 * 60 * 1000;
}

/**
 * Returns true if the pickup is active (not done/cancelled) but within the
 * 1-hour window — too late to reschedule but still visible to the user.
 */
function isTooLate(pickup: PickupRequest): boolean {
  if (
    pickup.status === "delivered" ||
    pickup.status === "cancelled" ||
    pickup.status === "picked_up" ||
    pickup.status === "processing" ||
    pickup.status === "ready" ||
    pickup.status === "out_for_delivery"
  )
    return false;

  const scheduledTime = getScheduledDateTime(pickup);
  const now = new Date();
  const diffMs = scheduledTime.getTime() - now.getTime();
  return diffMs > 0 && diffMs <= 60 * 60 * 1000;
}

/** Format a pickup's scheduled time for display */
function formatPickupTime(pickup: PickupRequest): string {
  const dt = getScheduledDateTime(pickup);
  return dt.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Minutes remaining until a pickup, formatted nicely */
function timeUntil(pickup: PickupRequest): string {
  const diffMs = getScheduledDateTime(pickup).getTime() - Date.now();
  if (diffMs <= 0) return "Now";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remaining = mins % 60;
  return remaining > 0 ? `${hrs}h ${remaining}m` : `${hrs}h`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReschedulePage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/dashboard/reschedule" });
  const { user, isAuthenticated } = useAuth();

  // Always call useUserPickups — pass undefined when not logged in (hook handles it)
  const { data: pickups = [], isLoading, refetch } = useUserPickups(user?.id);

  const reschedule = useReschedulePickup();

  // Pre-select pickupId if passed via search params from Requests page
  const [selectedPickupId, setSelectedPickupId] = useState<string>(
    search.pickupId ?? "",
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Refetch when user becomes available (handles page refresh with session restore)
  useEffect(() => {
    if (user?.id) {
      void refetch();
    }
  }, [user?.id, refetch]);

  // Once pickups load, auto-select if pickupId was provided
  useEffect(() => {
    if (search.pickupId && pickups.length > 0 && !selectedPickupId) {
      setSelectedPickupId(search.pickupId);
    }
  }, [search.pickupId, pickups.length, selectedPickupId]);

  const weekDates = getNextWeekDates();
  const reschedulablePickups = pickups.filter(canReschedule);
  const tooLatePickups = pickups.filter(isTooLate);
  const hasAnyActivePickups =
    reschedulablePickups.length > 0 || tooLatePickups.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPickupId) {
      setError("Please select a pickup to reschedule");
      return;
    }
    if (!selectedSlot) {
      setError("Please select a new time slot");
      return;
    }
    setError("");
    await reschedule.mutateAsync({
      pickupId: selectedPickupId,
      date: selectedDate.toISOString().split("T")[0],
      timeSlot: selectedSlot,
    });
    setSubmitted(true);
  }

  // ── Back button — shared across all states ─────────────────────────────────

  const BackBtn = () => (
    <button
      type="button"
      onClick={() => void navigate({ to: "/dashboard" })}
      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
      data-ocid="reschedule-back-btn"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );

  // ── Success state ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Pickup Rescheduled!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Your new pickup time has been confirmed. We'll be there on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              onClick={() => void navigate({ to: "/dashboard/requests" })}
              variant="outline"
              className="px-6"
            >
              View My Requests
            </Button>
            <button
              type="button"
              onClick={() => void navigate({ to: "/dashboard" })}
              className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────

  if (!isAuthenticated || !user) {
    return (
      <DashboardLayout>
        <BackBtn />
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Reschedule Pickup
        </h1>
        <div
          className="text-center py-14 bg-muted/20 rounded-2xl border-2 border-dashed border-border"
          data-ocid="reschedule-not-logged-in"
        >
          <LogIn className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">Not logged in</p>
          <p className="text-sm text-muted-foreground mb-5">
            Please log in to view and reschedule your pickups.
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/login" })}
            className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Log In
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <DashboardLayout>
        <BackBtn />
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Reschedule Pickup
        </h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  // ── No pickups at all ──────────────────────────────────────────────────────

  if (!isLoading && pickups.length === 0) {
    return (
      <DashboardLayout>
        <BackBtn />
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Reschedule Pickup
        </h1>
        <div
          className="text-center py-14 bg-muted/20 rounded-2xl border-2 border-dashed border-border"
          data-ocid="no-reschedule-pickups"
        >
          <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">
            No pickup is eligible to reschedule
          </p>
          <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
            You don't have any scheduled pickups yet. Schedule one first to be
            able to reschedule.
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/dashboard/schedule" })}
            className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Schedule a Pickup
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ── All pickups within 1-hour window — none eligible ──────────────────────

  if (!isLoading && !hasAnyActivePickups) {
    // Pickups exist but are all completed/cancelled
    return (
      <DashboardLayout>
        <BackBtn />
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Reschedule Pickup
        </h1>
        <div
          className="text-center py-14 bg-muted/20 rounded-2xl border-2 border-dashed border-border"
          data-ocid="no-reschedule-pickups"
        >
          <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">
            No pickup is eligible to reschedule
          </p>
          <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
            All your pickups are either already completed or cancelled.
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/dashboard/schedule" })}
            className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Schedule a New Pickup
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ── Only too-late pickups remain (all within 1 hour) ──────────────────────

  if (
    !isLoading &&
    reschedulablePickups.length === 0 &&
    tooLatePickups.length > 0
  ) {
    return (
      <DashboardLayout>
        <BackBtn />
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">
          Reschedule Pickup
        </h1>

        {/* Banner */}
        <div
          className="flex items-start gap-3 p-4 bg-destructive/8 border border-destructive/25 rounded-xl mb-5"
          data-ocid="no-eligible-reschedule-banner"
        >
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-destructive text-sm">
              No pickup is eligible to reschedule
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pickups must be rescheduled at least 1 hour before the scheduled
              time. All your upcoming pickups are within the 1-hour window.
            </p>
          </div>
        </div>

        {/* Show the too-late pickups so user can see what they have */}
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
          Your Upcoming Pickups
        </h2>
        <div className="space-y-2">
          {tooLatePickups.map((p) => (
            <div
              key={p.id}
              className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card opacity-70"
              data-ocid={`too-late-${p.id}`}
            >
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm text-foreground">
                    {p.serviceIds.join(", ")}
                  </p>
                  <span className="text-xs bg-destructive/10 text-destructive font-medium px-2 py-0.5 rounded-full shrink-0">
                    In {timeUntil(p)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatPickupTime(p)}
                </p>
                <p className="text-xs text-destructive font-medium mt-1">
                  Cannot reschedule — less than 1 hour away
                </p>
              </div>
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  // ── Main form (at least 1 reschedulable pickup) ────────────────────────────

  return (
    <DashboardLayout>
      <BackBtn />
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Reschedule Pickup
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Step 1 — Select Pickup */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-3">
            1. Select Pickup to Reschedule
          </h2>
          <div className="space-y-2">
            {reschedulablePickups.map((p) => (
              <label
                key={p.id}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPickupId === p.id
                    ? "border-accent bg-accent/8"
                    : "border-border bg-card hover:border-accent/30"
                }`}
                data-ocid={`reschedule-pickup-${p.id}`}
              >
                <input
                  type="radio"
                  name="pickup"
                  value={p.id}
                  checked={selectedPickupId === p.id}
                  onChange={() => setSelectedPickupId(p.id)}
                  className="mt-1"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm text-foreground">
                      {p.serviceIds.join(", ")}
                    </p>
                    <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full shrink-0">
                      In {timeUntil(p)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatPickupTime(p)}
                  </p>
                  {p.isExpress && (
                    <span className="inline-block mt-1 text-xs bg-accent/15 text-accent font-medium px-1.5 py-0.5 rounded">
                      Express
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Too-late pickups notice — shown alongside the form */}
        {tooLatePickups.length > 0 && (
          <section>
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
              Cannot Reschedule (Too Close)
            </h2>
            <div className="space-y-2">
              {tooLatePickups.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-destructive/5 opacity-70"
                  data-ocid={`too-late-${p.id}`}
                >
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm text-foreground">
                        {p.serviceIds.join(", ")}
                      </p>
                      <span className="text-xs bg-destructive/10 text-destructive font-medium px-2 py-0.5 rounded-full shrink-0">
                        In {timeUntil(p)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatPickupTime(p)}
                    </p>
                    <p className="text-xs text-destructive font-medium mt-0.5">
                      Cannot reschedule — less than 1 hour away
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step 2 — Date picker */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-3 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            2. Select New Date
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {weekDates.map((d) => {
              const isSelected =
                d.toDateString() === selectedDate.toDateString();
              return (
                <button
                  type="button"
                  key={d.toISOString()}
                  onClick={() => setSelectedDate(d)}
                  className={`date-btn shrink-0 ${isSelected ? "selected" : ""}`}
                  data-ocid={`date-btn-${d.getDate()}`}
                >
                  <span className="text-xs font-medium">
                    {d.toLocaleDateString("en-IN", { weekday: "short" })}
                  </span>
                  <span className="text-lg font-bold leading-none">
                    {d.getDate()}
                  </span>
                  <span className="text-xs">
                    {d.toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 — Time slots */}
        <section>
          <h2 className="font-semibold text-base text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            3. Select New Time Slot
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PICKUP_TIME_SLOTS.map((slot) => (
              <button
                type="button"
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`time-slot-btn ${selectedSlot === slot.id ? "selected" : ""}`}
                data-ocid={`slot-btn-${slot.id}`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <p className="text-destructive text-sm" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={reschedule.isPending || !selectedPickupId}
          className="btn-gold w-full py-3.5 rounded-xl text-base font-semibold"
          data-ocid="reschedule-submit"
        >
          {reschedule.isPending ? "Rescheduling…" : "Confirm Reschedule"}
        </Button>
      </form>
    </DashboardLayout>
  );
}
