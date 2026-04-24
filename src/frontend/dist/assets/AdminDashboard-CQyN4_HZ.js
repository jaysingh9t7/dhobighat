import { j as jsxRuntimeExports } from "./index-DhEm9TMn.js";
import { A as AdminLayout } from "./AdminLayout-3jg1paCt.js";
import { i as useAdminStats } from "./useQueries-DmaS4Psf.js";
import { U as Users } from "./users-NcbA5j5i.js";
import { P as Package } from "./package-8feS7cyk.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { T as TrendingUp } from "./trending-up-BPWui8-m.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import "./tag-B14AJu_C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode);
function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();
  const cards = [
    {
      label: "Total Users",
      value: (stats == null ? void 0 : stats.totalUsers) ?? 0,
      icon: Users,
      color: "text-primary"
    },
    {
      label: "Today's Pickups",
      value: (stats == null ? void 0 : stats.todayPickups) ?? 0,
      icon: Package,
      color: "text-accent"
    },
    {
      label: "Pending Orders",
      value: (stats == null ? void 0 : stats.pendingOrders) ?? 0,
      icon: Clock,
      color: "text-orange-600"
    },
    {
      label: "Total Revenue",
      value: `₹${(stats == null ? void 0 : stats.totalRevenue) ?? 0}`,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      label: "Paid Amount",
      value: `₹${(stats == null ? void 0 : stats.paidAmount) ?? 0}`,
      icon: CircleCheckBig,
      color: "text-green-700"
    },
    {
      label: "Pending Amount",
      value: `₹${(stats == null ? void 0 : stats.pendingAmount) ?? 0}`,
      icon: DollarSign,
      color: "text-red-600"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Dashboard" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-28 bg-muted animate-pulse rounded-xl"
      },
      `skeleton-${String(i)}`
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: cards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-4 shadow-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: card.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: `w-5 h-5 ${card.color}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-2xl text-foreground", children: card.value })
        ]
      },
      card.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Use the sidebar to manage rates, orders, payments, and loyalty programs." })
    ] })
  ] });
}
export {
  AdminDashboardPage as default
};
