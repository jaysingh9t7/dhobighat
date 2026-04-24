import { r as reactExports, j as jsxRuntimeExports } from "./index-DhEm9TMn.js";
import { A as AdminLayout } from "./AdminLayout-3jg1paCt.js";
import { l as useAllPickups, m as useUpdatePickupStatus } from "./useQueries-DmaS4Psf.js";
import { P as Package } from "./package-8feS7cyk.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { T as Truck } from "./users-NcbA5j5i.js";
import "./tag-B14AJu_C.js";
import "./createLucideIcon-CkU-QaFE.js";
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "picked_up", label: "Picked Up" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" }
];
const STATUS_COLORS = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-primary/15 text-primary",
  picked_up: "bg-yellow-100 text-yellow-900",
  processing: "bg-purple-100 text-purple-900",
  ready: "bg-green-100 text-green-900",
  out_for_delivery: "bg-orange-100 text-orange-900",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-destructive/15 text-destructive"
};
function AdminOrdersPage() {
  const { data: pickups = [], isLoading } = useAllPickups();
  const updateStatus = useUpdatePickupStatus();
  const [filter, setFilter] = reactExports.useState("all");
  const filtered = filter === "all" ? pickups : pickups.filter((p) => p.status === filter);
  async function handleStatusChange(pickupId, status) {
    await updateStatus.mutateAsync({ pickupId, status });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Orders & Delivery" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setFilter("all"),
          className: `px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
          children: [
            "All (",
            pickups.length,
            ")"
          ]
        }
      ),
      STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilter(s.value),
          className: `px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${filter === s.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
          "data-ocid": `admin-orders-filter-${s.value}`,
          children: s.label
        },
        s.value
      ))
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted animate-pulse rounded-xl" }, i)) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No orders in this category" })
    ] }),
    !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-4 shadow-card",
        "data-ocid": `admin-order-${p.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm text-foreground", children: [
                "#",
                p.id.slice(-6).toUpperCase()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.serviceIds.join(", ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                p.scheduledDate,
                " · ",
                p.timeSlot
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[p.status] ?? "bg-muted text-muted-foreground"}`,
                  children: p.status.replace(/_/g, " ")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
                "₹",
                p.finalAmount
              ] }),
              p.isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-green-600 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                " Paid"
              ] })
            ] })
          ] }),
          p.isExpress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs bg-accent/15 text-accent font-medium px-2 py-0.5 rounded-full mb-3", children: "⚡ Express" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            p.status !== "picked_up" && p.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleStatusChange(p.id, "picked_up"),
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-900 hover:bg-yellow-200 transition-colors",
                "data-ocid": `admin-mark-pickedup-${p.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" }),
                  " Mark Picked Up"
                ]
              }
            ),
            p.status !== "delivered" && p.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleStatusChange(p.id, "delivered"),
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-900 hover:bg-green-200 transition-colors",
                "data-ocid": `admin-mark-delivered-${p.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" }),
                  " Mark Delivered"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: p.status,
                onChange: (e) => handleStatusChange(p.id, e.target.value),
                className: "input-navy text-xs py-1.5 ml-auto max-w-[160px]",
                "aria-label": "Change status",
                "data-ocid": `admin-status-select-${p.id}`,
                children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.value, children: s.label }, s.value))
              }
            )
          ] })
        ]
      },
      p.id
    )) })
  ] });
}
export {
  AdminOrdersPage as default
};
