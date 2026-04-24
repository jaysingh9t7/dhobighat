import { AdminLayout } from "@/components/AdminLayout";
import { DISCOUNT_TIERS } from "@/config";
import { useAssignDiscount, useRepeaterCustomers } from "@/hooks/useQueries";
import type { LoyaltyStat } from "@/types";
import { Award, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

// ─── Tier config ──────────────────────────────────────────────────────────────

const TIER_COLORS: Record<string, string> = {
  Platinum: "bg-purple-100 text-purple-700 border-purple-200",
  Gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Silver: "bg-slate-100 text-slate-600 border-slate-200",
  Bronze: "bg-orange-100 text-orange-700 border-orange-200",
};

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const REPEAT_FILTERS = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "New (0–1)", min: 0, max: 2 },
  { label: "Bronze (2+)", min: 2, max: 4 },
  { label: "Silver (3+)", min: 3, max: 5 },
  { label: "Gold (4+)", min: 4, max: 10 },
  { label: "Platinum", min: 10, max: Number.POSITIVE_INFINITY },
];

// ─── Tier Badge ───────────────────────────────────────────────────────────────

function TierBadge({ customer }: { customer: LoyaltyStat }) {
  if (!customer.tierName) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
        New Customer
      </span>
    );
  }
  const colorClass =
    TIER_COLORS[customer.tierName] ??
    "bg-muted text-muted-foreground border-border";
  const discountPct = customer.discountTier ?? 0;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${colorClass}`}
      data-ocid={`tier-badge-${customer.userId}`}
    >
      <Award className="w-3 h-3 shrink-0" />
      {customer.tierName} ({customer.totalOrders} orders, {discountPct}% off)
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminLoyaltyPage() {
  const { data: customers = [], isLoading } = useRepeaterCustomers();
  const assignDiscount = useAssignDiscount();
  const [activeFilter, setActiveFilter] = useState(0);
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const filter = REPEAT_FILTERS[activeFilter];
  const filtered = customers.filter(
    (c) => c.totalOrders >= filter.min && c.totalOrders < filter.max,
  );

  // Summary counts for header cards
  const tierCounts = {
    total: customers.length,
    bronze: customers.filter((c) => c.tierName === "Bronze").length,
    silver: customers.filter((c) => c.tierName === "Silver").length,
    gold: customers.filter(
      (c) => c.tierName === "Gold" || c.tierName === "Platinum",
    ).length,
  };

  async function handleAssignDiscount(customerId: string, percent: number) {
    setAssigningId(customerId);
    await assignDiscount.mutateAsync({ userId: customerId, percent });
    setAssigningId(null);
  }

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Loyalty & Offers
      </h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Total Users</p>
          <p className="font-bold text-xl text-foreground">
            {tierCounts.total}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-orange-200 p-3 text-center">
          <p className="text-xs text-orange-600 mb-1">Bronze (2 orders)</p>
          <p className="font-bold text-xl text-orange-700">
            {tierCounts.bronze}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-slate-200 p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Silver (3 orders)</p>
          <p className="font-bold text-xl text-slate-600">
            {tierCounts.silver}
          </p>
        </div>
        <div className="bg-card rounded-xl border border-yellow-200 p-3 text-center">
          <p className="text-xs text-yellow-600 mb-1">Gold / Platinum</p>
          <p className="font-bold text-xl text-yellow-700">{tierCounts.gold}</p>
        </div>
      </div>

      {/* Discount tiers legend */}
      <div className="bg-accent/10 rounded-xl border border-accent/20 p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-accent" />
          <p className="font-semibold text-sm text-foreground">
            Automatic Tier Assignment
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold">
            Bronze — 2 orders → 2% off
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
            Silver — 3 orders → 5% off
          </span>
          <span className="px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 text-xs font-semibold">
            Gold — 4 orders → 7% off
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold">
            Platinum — 10 orders → 10% off
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Tiers are assigned automatically after each pickup. Admin can override
          discounts manually below.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {REPEAT_FILTERS.map((f, i) => (
          <button
            type="button"
            key={f.label}
            onClick={() => setActiveFilter(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${
              activeFilter === i
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
            data-ocid={`loyalty-filter-${i}`}
          >
            {f.label}
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
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            No customers in this category yet
          </p>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-3">
          {filtered.map((c: LoyaltyStat) => (
            <div
              key={c.userId}
              className="bg-card rounded-xl border border-border p-4 shadow-card"
              data-ocid={`loyalty-customer-${c.userId}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {c.userName}
                  </p>
                  <p className="text-xs text-muted-foreground">+91 {c.phone}</p>
                  <div className="mt-1.5">
                    <TierBadge customer={c} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    {c.totalOrders} orders
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ₹{c.totalSpent} total
                  </p>
                </div>
              </div>

              {/* Manual override */}
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground shrink-0">
                  Override discount:
                </p>
                <div className="flex gap-1 flex-wrap">
                  {DISCOUNT_TIERS.map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => handleAssignDiscount(c.userId, tier.value)}
                      disabled={
                        assigningId === c.userId ||
                        c.discountTier === tier.value
                      }
                      className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                        c.discountTier === tier.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground"
                      }`}
                      data-ocid={`loyalty-assign-${c.userId}-${tier.id}`}
                    >
                      {tier.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAssignDiscount(c.userId, 0)}
                    disabled={assigningId === c.userId || !c.discountTier}
                    className="px-2 py-0.5 rounded text-xs font-semibold bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all"
                    data-ocid={`loyalty-remove-${c.userId}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
