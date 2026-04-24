import { DashboardLayout } from "@/components/DashboardLayout";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PICKUP_TIME_SLOTS, SERVICES } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

// ─── Step header ──────────────────────────────────────────────────────────────
function StepHeader({
  step,
  label,
  done,
  locked,
}: {
  step: number;
  label: string;
  done: boolean;
  locked: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors"
        style={{
          background: done
            ? "oklch(0.7 0.15 72)"
            : locked
              ? "oklch(0.88 0.03 240)"
              : "oklch(0.26 0.1 258)",
          color: done
            ? "oklch(0.12 0.04 258)"
            : locked
              ? "oklch(0.5 0.04 240)"
              : "white",
        }}
      >
        {done ? <CheckCircle2 className="w-4 h-4" /> : step}
      </div>
      <h2
        className="font-display font-semibold text-base"
        style={{
          color: locked ? "oklch(0.5 0.04 240)" : "oklch(0.12 0.04 258)",
        }}
      >
        {label}
      </h2>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const weekDates = getNextWeekDates();

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const step1Done = selectedServiceIds.length > 0;
  const step2Done = selectedDateIdx !== null;
  const step3Done = selectedSlot !== null;
  const allDone = step1Done && step2Done && step3Done;

  function toggleService(id: string) {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function handleSchedule() {
    if (!allDone) return;

    const date = weekDates[selectedDateIdx!];
    const prefill = {
      serviceIds: selectedServiceIds,
      date: date.toISOString(),
      timeSlot: selectedSlot,
    };
    localStorage.setItem("dhobighat_schedule_prefill", JSON.stringify(prefill));

    if (isAuthenticated) {
      void navigate({
        to: "/dashboard/schedule",
        search: { prefill: "1" } as Record<string, string>,
      });
    } else {
      void navigate({
        to: "/login",
        search: { next: "/dashboard/schedule?prefill=1" } as Record<
          string,
          string
        >,
      });
    }
  }

  return (
    <DashboardLayout>
      {/* Back button */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/" })}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
        data-ocid="services-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-foreground mb-1">
          Our Services
        </h1>
        <p className="text-sm text-muted-foreground">
          Select one or more services, pick a date, and choose a time slot to
          schedule your pickup.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Step 1: Select Services ──────────────────────────────────────── */}
        <section
          className="bg-card rounded-2xl border border-border p-5"
          data-ocid="services-step1"
        >
          <StepHeader
            step={1}
            label="Select Services (choose one or more)"
            done={step1Done}
            locked={false}
          />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {SERVICES.map((svc) => {
              const sel = selectedServiceIds.includes(svc.id);
              return (
                <button
                  type="button"
                  key={svc.id}
                  onClick={() => toggleService(svc.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-smooth cursor-pointer text-center ${
                    sel
                      ? "border-accent bg-accent/10 shadow-card"
                      : "border-border bg-background hover:border-accent/40"
                  }`}
                  data-ocid={`services-svc-${svc.id}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${sel ? "bg-primary" : "bg-muted"}`}
                  >
                    <ServiceIcon
                      name={svc.icon}
                      className={`w-5 h-5 ${sel ? "text-accent" : "text-muted-foreground"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold leading-snug ${sel ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {svc.name}
                  </span>
                  {sel && (
                    <span className="text-xs text-accent font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>
          {step1Done && (
            <p className="text-xs text-accent font-medium mt-3">
              {selectedServiceIds.length} service
              {selectedServiceIds.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </section>

        {/* ── Step 2: Choose a Date ────────────────────────────────────────── */}
        <section
          className={`bg-card rounded-2xl border border-border p-5 transition-opacity duration-300 ${step1Done ? "opacity-100" : "opacity-40 pointer-events-none"}`}
          data-ocid="services-step2"
        >
          <StepHeader
            step={2}
            label="Choose a Date"
            done={step2Done}
            locked={!step1Done}
          />
          {!step1Done && (
            <p className="text-sm text-muted-foreground italic">
              Complete Step 1 to unlock date selection.
            </p>
          )}
          {step1Done && (
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x -mx-1 px-1">
              {weekDates.map((date, i) => {
                const isSel = selectedDateIdx === i;
                const isToday = i === 0;
                const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                return (
                  <button
                    type="button"
                    key={dateKey}
                    onClick={() => setSelectedDateIdx(isSel ? null : i)}
                    className={`date-btn shrink-0 snap-start min-w-[3.5rem] ${isSel ? "selected" : ""}`}
                    data-ocid={`services-date-${i}`}
                  >
                    <CalendarDays
                      className={`w-3.5 h-3.5 mb-0.5 ${isSel ? "text-accent" : "text-muted-foreground"}`}
                    />
                    <span
                      className={`text-xs font-medium ${isSel ? "text-white/80" : "text-muted-foreground"}`}
                    >
                      {isToday ? "Today" : DAY_ABBR[date.getDay()]}
                    </span>
                    <span className="text-lg font-bold leading-none">
                      {date.getDate()}
                    </span>
                    <span
                      className={`text-xs ${isSel ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {MONTH_ABBR[date.getMonth()]}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Step 3: Choose a Time Slot ───────────────────────────────────── */}
        <section
          className={`bg-card rounded-2xl border border-border p-5 transition-opacity duration-300 ${step2Done ? "opacity-100" : "opacity-40 pointer-events-none"}`}
          data-ocid="services-step3"
        >
          <StepHeader
            step={3}
            label="Choose a Time Slot"
            done={step3Done}
            locked={!step2Done}
          />
          {!step2Done && (
            <p className="text-sm text-muted-foreground italic">
              Complete Step 2 to unlock time slot selection.
            </p>
          )}
          {step2Done && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PICKUP_TIME_SLOTS.map((slot) => (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() =>
                    setSelectedSlot(selectedSlot === slot.id ? null : slot.id)
                  }
                  className={`time-slot-btn ${selectedSlot === slot.id ? "selected" : ""}`}
                  data-ocid={`services-slot-${slot.id}`}
                >
                  <Clock
                    className={`w-3.5 h-3.5 mb-0.5 ${selectedSlot === slot.id ? "text-accent" : "text-muted-foreground"}`}
                  />
                  {slot.label}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── Schedule Pickup CTA ──────────────────────────────────────────── */}
        <div className="pb-4">
          {!allDone && (
            <p className="text-xs text-muted-foreground text-center mb-3">
              {!step1Done
                ? "Select at least one service to get started"
                : !step2Done
                  ? "Pick a date to continue"
                  : "Choose a time slot to schedule"}
            </p>
          )}
          <button
            type="button"
            onClick={handleSchedule}
            disabled={!allDone}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-semibold shadow-card transition-smooth ${
              allDone
                ? "btn-gold cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            }`}
            data-ocid="services-schedule-pickup"
          >
            <CheckCircle2 className="w-5 h-5" />
            Schedule Pickup
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
