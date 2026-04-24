import { AddressForm, EMPTY_ADDRESS } from "@/components/AddressForm";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PICKUP_TIME_SLOTS, SERVICES } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import { useCreatePickup } from "@/hooks/useQueries";
import * as api from "@/services/api.service";
import type { AddressFormData, PickupRequest } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  Tag,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

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

function SectionHeader({
  step,
  label,
  icon,
}: {
  step: number;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <h2 className="font-semibold text-base text-foreground mb-3 flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
        {step}
      </span>
      {icon}
      {label}
    </h2>
  );
}

// ─── Prefill type ─────────────────────────────────────────────────────────────
interface SchedulePrefill {
  serviceId?: string;
  serviceIds?: string[];
  date: string;
  timeSlot: string;
}

const PREFILL_KEY = "dhobighat_schedule_prefill";

export default function SchedulePage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const createPickup = useCreatePickup();

  const weekDates = getNextWeekDates();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isExpress, setIsExpress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>(
    user?.addresses?.[0]?.id ?? "",
  );
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<AddressFormData>(EMPTY_ADDRESS);
  const [addingAddress, setAddingAddress] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [createdPickup, setCreatedPickup] = useState<PickupRequest | null>(
    null,
  );

  // Read search params — TanStack Router exposes them via useSearch.
  // We use a loose cast because the schedule route doesn't declare validateSearch.
  const rawSearch = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const hasPrefillParam = rawSearch.prefill === "1";

  // ── Read prefill from localStorage on mount ──────────────────────────────
  useEffect(() => {
    if (!hasPrefillParam) return;
    try {
      const raw = localStorage.getItem(PREFILL_KEY);
      if (!raw) return;
      const prefill = JSON.parse(raw) as SchedulePrefill;
      localStorage.removeItem(PREFILL_KEY);

      // Support both new serviceIds[] and legacy serviceId string
      if (prefill.serviceIds && prefill.serviceIds.length > 0) {
        setSelectedServices(prefill.serviceIds);
      } else if (prefill.serviceId) {
        setSelectedServices([prefill.serviceId]);
      }
      if (prefill.date) {
        const d = new Date(prefill.date);
        if (!Number.isNaN(d.getTime())) {
          setSelectedDate(d);
        }
      }
      if (prefill.timeSlot) {
        setSelectedSlot(prefill.timeSlot);
      }
    } catch {
      // Malformed JSON — ignore
    }
  }, [hasPrefillParam]);

  const addresses = user?.addresses ?? [];

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  async function handleAddAddress(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!newAddress.flat || !newAddress.building || !newAddress.pincode) {
      setError("Please fill in Flat No., Building, and Pin Code");
      return;
    }
    setError("");
    setAddingAddress(true);
    try {
      const addr = await api.addAddress(user.id, newAddress);
      await refreshUser();
      setSelectedAddress(addr.id);
      setShowAddAddress(false);
      setNewAddress(EMPTY_ADDRESS);
    } catch {
      setError("Failed to add address. Please try again.");
    } finally {
      setAddingAddress(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Please select at least one service");
      return;
    }
    if (!selectedSlot) {
      setError("Please select a pickup time slot");
      return;
    }
    if (!selectedAddress) {
      setError("Please select a pickup address");
      return;
    }
    if (!user) return;
    setError("");

    const result = await createPickup.mutateAsync({
      userId: user.id,
      form: {
        serviceIds: selectedServices,
        date: selectedDate.toISOString().split("T")[0],
        timeSlot: selectedSlot,
        isExpress,
        addressId: selectedAddress,
      },
    });
    setCreatedPickup(result);
    setSubmitted(true);
  }

  if (submitted) {
    const hasDiscount = createdPickup && createdPickup.discountPercent > 0;
    return (
      <DashboardLayout>
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="schedule-success"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Pickup Scheduled!
          </h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-[280px]">
            We'll be at your door at the selected time. Track your request from
            the dashboard.
          </p>

          {/* Pricing summary */}
          {createdPickup && (
            <div className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 mb-5 text-left space-y-2">
              {hasDiscount && (
                <div
                  className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-xl text-xs font-semibold mb-3"
                  data-ocid="schedule-discount-badge"
                >
                  <Tag className="w-3.5 h-3.5 shrink-0" />
                  Loyalty discount applied — {createdPickup.discountPercent}%
                  off
                </div>
              )}
              {hasDiscount && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Original amount</span>
                  <span className="line-through">
                    ₹{createdPickup.totalAmount}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-foreground">
                <span>Final amount</span>
                <span className="text-primary">
                  ₹{createdPickup.finalAmount}
                </span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-xs text-accent font-medium">
                  <span>You saved</span>
                  <span>
                    ₹{createdPickup.totalAmount - createdPickup.finalAmount}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => void navigate({ to: "/dashboard" })}
              className="btn-navy px-6 py-2.5 rounded-xl text-sm"
            >
              Back to Dashboard
            </button>
            <button
              type="button"
              onClick={() => void navigate({ to: "/dashboard/requests" })}
              className="btn-gold px-6 py-2.5 rounded-xl text-sm"
            >
              View Requests
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Back button */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/dashboard" })}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer"
        data-ocid="schedule-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Schedule Pickup
      </h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-7">
        {/* Step 1 — Services */}
        <section>
          <SectionHeader step={1} label="Select Services" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {SERVICES.map((svc) => {
              const sel = selectedServices.includes(svc.id);
              return (
                <button
                  type="button"
                  key={svc.id}
                  onClick={() => toggleService(svc.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-smooth cursor-pointer text-center ${
                    sel
                      ? "border-accent bg-accent/10 shadow-card"
                      : "border-border bg-card hover:border-accent/40"
                  }`}
                  data-ocid={`schedule-service-${svc.id}`}
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
        </section>

        {/* Step 2 — Date */}
        <section>
          <SectionHeader
            step={2}
            label="Pick-Up Date"
            icon={<CalendarDays className="w-4 h-4 text-primary" />}
          />
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
            {weekDates.map((d) => {
              const isSel = d.toDateString() === selectedDate.toDateString();
              const isToday = d.toDateString() === new Date().toDateString();
              return (
                <button
                  type="button"
                  key={d.toISOString()}
                  onClick={() => setSelectedDate(d)}
                  className={`date-btn shrink-0 snap-start min-w-[3.5rem] ${isSel ? "selected" : ""}`}
                  data-ocid={`date-btn-${d.toISOString().split("T")[0]}`}
                >
                  <span
                    className={`text-xs font-medium ${isSel ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {isToday
                      ? "Today"
                      : d.toLocaleDateString("en-IN", { weekday: "short" })}
                  </span>
                  <span className="text-lg font-bold leading-none">
                    {d.getDate()}
                  </span>
                  <span
                    className={`text-xs ${isSel ? "text-white/70" : "text-muted-foreground"}`}
                  >
                    {d.toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 — Time slot */}
        <section>
          <SectionHeader
            step={3}
            label="Pick-Up Time Slot"
            icon={<Clock className="w-4 h-4 text-primary" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PICKUP_TIME_SLOTS.map((slot) => (
              <button
                type="button"
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`time-slot-btn ${selectedSlot === slot.id ? "selected" : ""}`}
                data-ocid={`time-slot-${slot.id}`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </section>

        {/* Step 4 — Express */}
        <section>
          <SectionHeader step={4} label="Express Option" />
          <div
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-smooth ${
              isExpress ? "border-accent bg-accent/8" : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${isExpress ? "bg-accent/20" : "bg-muted"}`}
              >
                <Zap
                  className={`w-5 h-5 ${isExpress ? "text-accent" : "text-muted-foreground"}`}
                />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Express Service
                </p>
                <p className="text-xs text-muted-foreground">
                  Priority processing, faster turnaround
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isExpress}
              onClick={() => setIsExpress((v) => !v)}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${isExpress ? "bg-accent" : "bg-muted"}`}
              data-ocid="schedule-express-toggle"
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${isExpress ? "left-6" : "left-0.5"}`}
              />
            </button>
          </div>
        </section>

        {/* Step 5 — Address */}
        <section>
          <SectionHeader
            step={5}
            label="Address Selector"
            icon={<MapPin className="w-4 h-4 text-primary" />}
          />
          <div className="space-y-2">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-smooth ${
                  selectedAddress === addr.id
                    ? "border-accent bg-accent/8"
                    : "border-border bg-card hover:border-accent/30"
                }`}
                data-ocid={`address-option-${addr.id}`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                  className="mt-0.5"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground">
                    {addr.label}
                    {addr.isDefault && (
                      <span className="ml-2 text-xs font-normal text-accent">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {[addr.flat, addr.building, addr.society]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {addr.city}
                    {addr.pincode ? ` — ${addr.pincode}` : ""}
                  </p>
                </div>
              </label>
            ))}

            {!showAddAddress ? (
              <button
                type="button"
                onClick={() => setShowAddAddress(true)}
                className="flex items-center gap-2 w-full p-3.5 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-smooth text-sm font-medium"
                data-ocid="schedule-add-address"
              >
                <Plus className="w-4 h-4 shrink-0" />
                Add New Address
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="font-semibold text-sm text-foreground mb-3">
                  New Address
                </p>
                <AddressForm
                  value={newAddress}
                  onChange={setNewAddress}
                  onSave={handleAddAddress}
                  onCancel={() => {
                    setShowAddAddress(false);
                    setNewAddress(EMPTY_ADDRESS);
                    setError("");
                  }}
                  saving={addingAddress}
                />
              </div>
            )}
          </div>
        </section>

        {/* Error */}
        {error && (
          <p className="text-destructive text-sm font-medium bg-destructive/8 px-4 py-3 rounded-xl border border-destructive/20">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={createPickup.isPending}
          className="btn-gold w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-semibold shadow-card"
          data-ocid="schedule-submit"
        >
          {createPickup.isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Scheduling…
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Confirm Pickup
            </>
          )}
        </button>
      </form>
    </DashboardLayout>
  );
}
