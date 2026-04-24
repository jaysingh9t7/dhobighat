import { AdminLayout } from "@/components/AdminLayout";
import { useAllPickups, useUpdatePickupStatus } from "@/hooks/useQueries";
import type { PickupStatus } from "@/types";
import { CheckCircle, Package, Truck } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS: { value: PickupStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "picked_up", label: "Picked Up" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-primary/15 text-primary",
  picked_up: "bg-yellow-100 text-yellow-900",
  processing: "bg-purple-100 text-purple-900",
  ready: "bg-green-100 text-green-900",
  out_for_delivery: "bg-orange-100 text-orange-900",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-destructive/15 text-destructive",
};

export default function AdminOrdersPage() {
  const { data: pickups = [], isLoading } = useAllPickups();
  const updateStatus = useUpdatePickupStatus();
  const [filter, setFilter] = useState<PickupStatus | "all">("all");

  const filtered =
    filter === "all" ? pickups : pickups.filter((p) => p.status === filter);

  async function handleStatusChange(pickupId: string, status: PickupStatus) {
    await updateStatus.mutateAsync({ pickupId, status });
  }

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Orders & Delivery
      </h1>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          All ({pickups.length})
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            type="button"
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${filter === s.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            data-ocid={`admin-orders-filter-${s.value}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            No orders in this category
          </p>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-card rounded-xl border border-border p-4 shadow-card"
              data-ocid={`admin-order-${p.id}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    #{p.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {p.serviceIds.join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {p.scheduledDate} · {p.timeSlot}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[p.status] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {p.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    ₹{p.finalAmount}
                  </span>
                  {p.isPaid && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-3 h-3" /> Paid
                    </span>
                  )}
                </div>
              </div>

              {p.isExpress && (
                <span className="inline-flex items-center gap-1 text-xs bg-accent/15 text-accent font-medium px-2 py-0.5 rounded-full mb-3">
                  ⚡ Express
                </span>
              )}

              <div className="flex flex-wrap gap-2">
                {p.status !== "picked_up" && p.status !== "cancelled" && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(p.id, "picked_up")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-900 hover:bg-yellow-200 transition-colors"
                    data-ocid={`admin-mark-pickedup-${p.id}`}
                  >
                    <Package className="w-3.5 h-3.5" /> Mark Picked Up
                  </button>
                )}
                {p.status !== "delivered" && p.status !== "cancelled" && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(p.id, "delivered")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-900 hover:bg-green-200 transition-colors"
                    data-ocid={`admin-mark-delivered-${p.id}`}
                  >
                    <Truck className="w-3.5 h-3.5" /> Mark Delivered
                  </button>
                )}
                <select
                  value={p.status}
                  onChange={(e) =>
                    handleStatusChange(p.id, e.target.value as PickupStatus)
                  }
                  className="input-navy text-xs py-1.5 ml-auto max-w-[160px]"
                  aria-label="Change status"
                  data-ocid={`admin-status-select-${p.id}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
