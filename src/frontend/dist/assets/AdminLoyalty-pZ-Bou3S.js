import { r as reactExports, j as jsxRuntimeExports, D as DISCOUNT_TIERS } from "./index-DhEm9TMn.js";
import { A as AdminLayout } from "./AdminLayout-3jg1paCt.js";
import { p as useRepeaterCustomers, q as useAssignDiscount } from "./useQueries-DmaS4Psf.js";
import { S as Star } from "./star-CLTNlB2X.js";
import { U as Users } from "./users-NcbA5j5i.js";
import { T as TrendingUp } from "./trending-up-BPWui8-m.js";
import { A as Award } from "./award-BnlobylQ.js";
import "./tag-B14AJu_C.js";
import "./createLucideIcon-CkU-QaFE.js";
const TIER_COLORS = {
  Platinum: "bg-purple-100 text-purple-700 border-purple-200",
  Gold: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Silver: "bg-slate-100 text-slate-600 border-slate-200",
  Bronze: "bg-orange-100 text-orange-700 border-orange-200"
};
const REPEAT_FILTERS = [
  { label: "All", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "New (0–1)", min: 0, max: 2 },
  { label: "Bronze (2+)", min: 2, max: 4 },
  { label: "Silver (3+)", min: 3, max: 5 },
  { label: "Gold (4+)", min: 4, max: 10 },
  { label: "Platinum", min: 10, max: Number.POSITIVE_INFINITY }
];
function TierBadge({ customer }) {
  if (!customer.tierName) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground", children: "New Customer" });
  }
  const colorClass = TIER_COLORS[customer.tierName] ?? "bg-muted text-muted-foreground border-border";
  const discountPct = customer.discountTier ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${colorClass}`,
      "data-ocid": `tier-badge-${customer.userId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3 h-3 shrink-0" }),
        customer.tierName,
        " (",
        customer.totalOrders,
        " orders, ",
        discountPct,
        "% off)"
      ]
    }
  );
}
function AdminLoyaltyPage() {
  const { data: customers = [], isLoading } = useRepeaterCustomers();
  const assignDiscount = useAssignDiscount();
  const [activeFilter, setActiveFilter] = reactExports.useState(0);
  const [assigningId, setAssigningId] = reactExports.useState(null);
  const filter = REPEAT_FILTERS[activeFilter];
  const filtered = customers.filter(
    (c) => c.totalOrders >= filter.min && c.totalOrders < filter.max
  );
  const tierCounts = {
    total: customers.length,
    bronze: customers.filter((c) => c.tierName === "Bronze").length,
    silver: customers.filter((c) => c.tierName === "Silver").length,
    gold: customers.filter(
      (c) => c.tierName === "Gold" || c.tierName === "Platinum"
    ).length
  };
  async function handleAssignDiscount(customerId, percent) {
    setAssigningId(customerId);
    await assignDiscount.mutateAsync({ userId: customerId, percent });
    setAssigningId(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Loyalty & Offers" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl text-foreground", children: tierCounts.total })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-orange-200 p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-orange-600 mb-1", children: "Bronze (2 orders)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl text-orange-700", children: tierCounts.bronze })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-slate-200 p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mb-1", children: "Silver (3 orders)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl text-slate-600", children: tierCounts.silver })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-yellow-200 p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-600 mb-1", children: "Gold / Platinum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl text-yellow-700", children: tierCounts.gold })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 rounded-xl border border-accent/20 p-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Automatic Tier Assignment" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold", children: "Bronze — 2 orders → 2% off" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold", children: "Silver — 3 orders → 5% off" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 text-xs font-semibold", children: "Gold — 4 orders → 7% off" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold", children: "Platinum — 10 orders → 10% off" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Tiers are assigned automatically after each pickup. Admin can override discounts manually below." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-4", children: REPEAT_FILTERS.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveFilter(i),
        className: `px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${activeFilter === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
        "data-ocid": `loyalty-filter-${i}`,
        children: f.label
      },
      f.label
    )) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted animate-pulse rounded-xl" }, i)) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-muted-foreground mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No customers in this category yet" })
    ] }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-4 shadow-card",
        "data-ocid": `loyalty-customer-${c.userId}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: c.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "+91 ",
                c.phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { customer: c }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm font-bold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-accent" }),
                c.totalOrders,
                " orders"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "₹",
                c.totalSpent,
                " total"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground shrink-0", children: "Override discount:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-wrap", children: [
              DISCOUNT_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleAssignDiscount(c.userId, tier.value),
                  disabled: assigningId === c.userId || c.discountTier === tier.value,
                  className: `px-2 py-0.5 rounded text-xs font-semibold transition-all ${c.discountTier === tier.value ? "bg-accent text-accent-foreground" : "bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground"}`,
                  "data-ocid": `loyalty-assign-${c.userId}-${tier.id}`,
                  children: tier.label
                },
                tier.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleAssignDiscount(c.userId, 0),
                  disabled: assigningId === c.userId || !c.discountTier,
                  className: "px-2 py-0.5 rounded text-xs font-semibold bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all",
                  "data-ocid": `loyalty-remove-${c.userId}`,
                  children: "Remove"
                }
              )
            ] })
          ] })
        ]
      },
      c.userId
    )) })
  ] });
}
export {
  AdminLoyaltyPage as default
};
