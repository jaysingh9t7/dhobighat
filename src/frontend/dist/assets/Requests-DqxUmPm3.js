import { u as useNavigate, b as useAuth, j as jsxRuntimeExports } from "./index-DhEm9TMn.js";
import { D as DashboardLayout } from "./DashboardLayout-C1HrT8kQ.js";
import { B as Badge } from "./badge-B_vJLzXC.js";
import { T as TriangleAlert, B as Button } from "./button-056b_yem.js";
import { u as useUserPickups } from "./useQueries-DmaS4Psf.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { P as Package } from "./package-8feS7cyk.js";
import { Z as Zap } from "./zap-CjUkV88X.js";
import { C as CalendarDays } from "./calendar-days-D1hGWSfi.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { M as MapPin } from "./map-pin-D8mqcdW5.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { R as RefreshCw } from "./refresh-cw-CpwTUfNU.js";
import "./x-SeTMXdzH.js";
import "./createLucideIcon-CkU-QaFE.js";
import "./tag-B14AJu_C.js";
import "./phone-Beqcrkz1.js";
import "./chevron-right-DKcnBIaf.js";
import "./utils-PXmmHler.js";
import "./index-ChT6nWzq.js";
function getPickupBadge(status) {
  if (status === "picked_up" || status === "processing" || status === "ready" || status === "out_for_delivery" || status === "delivered") {
    return {
      label: "Pickup Done ✓",
      variant: "default",
      className: "bg-green-100 text-green-800 border-green-200"
    };
  }
  if (status === "cancelled") {
    return {
      label: "Cancelled",
      variant: "destructive",
      className: "bg-destructive/10 text-destructive border-destructive/30"
    };
  }
  if (status === "confirmed") {
    return {
      label: "Confirmed",
      variant: "outline",
      className: "border-primary/30 text-primary bg-primary/8"
    };
  }
  return {
    label: "Pending",
    variant: "secondary",
    className: "bg-muted text-muted-foreground border-border"
  };
}
function getDropBadge(status) {
  if (status === "delivered") {
    return {
      label: "Drop Done ✓",
      variant: "default",
      className: "bg-blue-100 text-blue-800 border-blue-200"
    };
  }
  if (status === "out_for_delivery") {
    return {
      label: "On the Way",
      variant: "outline",
      className: "bg-orange-50 text-orange-700 border-orange-200"
    };
  }
  return {
    label: "Pending",
    variant: "secondary",
    className: "bg-muted text-muted-foreground border-border"
  };
}
function getRescheduleState(pickup) {
  if (pickup.status === "delivered" || pickup.status === "cancelled" || pickup.status === "picked_up" || pickup.status === "processing" || pickup.status === "ready" || pickup.status === "out_for_delivery") {
    return "not_applicable";
  }
  const slotStart = pickup.timeSlot.split("–")[0].split("-")[0].trim();
  const scheduledDt = /* @__PURE__ */ new Date(`${pickup.scheduledDate} ${slotStart}`);
  const diffMs = scheduledDt.getTime() - Date.now();
  if (diffMs > 60 * 60 * 1e3) return "allowed";
  if (diffMs > 0) return "too_late";
  return "not_applicable";
}
const STEPS = [
  "pending",
  "confirmed",
  "picked_up",
  "processing",
  "ready",
  "out_for_delivery",
  "delivered"
];
function PickupProgressBar({ status }) {
  if (status === "cancelled") return null;
  const idx = STEPS.indexOf(status);
  if (idx === -1) return null;
  const pct = Math.round((idx + 1) / STEPS.length * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scheduled" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivered" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full bg-accent transition-all duration-500",
        style: { width: `${pct}%` }
      }
    ) })
  ] });
}
function RequestCard({
  pickup,
  onReschedule
}) {
  const pickupBadge = getPickupBadge(pickup.status);
  const dropBadge = getDropBadge(pickup.status);
  const rescheduleState = getRescheduleState(pickup);
  const orderRef = `#${pickup.id.slice(-6).toUpperCase()}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card rounded-2xl border border-border shadow-card overflow-hidden",
      "data-ocid": `request-card-${pickup.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: pickup.serviceIds.join(" · ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: orderRef })
          ] }),
          pickup.isExpress && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold text-accent shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
            "Express"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: pickup.scheduledDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: pickup.timeSlot })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: pickup.addressId ? `Address ref: ${pickup.addressId.slice(-6).toUpperCase()}` : "Address on file" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide", children: "Pickup Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: pickupBadge.variant,
                className: `text-xs px-2 py-0.5 rounded-full border font-medium ${pickupBadge.className}`,
                children: pickupBadge.label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide", children: "Drop Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: dropBadge.variant,
                className: `text-xs px-2 py-0.5 rounded-full border font-medium ${dropBadge.className}`,
                children: dropBadge.label
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PickupProgressBar, { status: pickup.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 px-4 py-3 flex items-center justify-between gap-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
              "₹",
              pickup.finalAmount
            ] }),
            pickup.discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-green-600 font-medium", children: [
              "(",
              pickup.discountPercent,
              "% off)"
            ] }),
            pickup.isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-green-600 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              "Paid"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
              "Unpaid"
            ] })
          ] }),
          rescheduleState === "allowed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => onReschedule(pickup.id),
              className: "shrink-0 text-xs border-accent/40 text-accent hover:bg-accent/10 hover:border-accent gap-1.5",
              "data-ocid": `reschedule-btn-${pickup.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                "Reschedule"
              ]
            }
          ),
          rescheduleState === "too_late" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "shrink-0 text-xs text-destructive flex items-center gap-1 font-medium",
              "data-ocid": `reschedule-too-late-${pickup.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
                "Too late"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function RequestsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pickups = [], isLoading } = useUserPickups(user == null ? void 0 : user.id);
  function handleReschedule(pickupId) {
    void navigate({
      to: "/dashboard/reschedule",
      search: { pickupId }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/dashboard" }),
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
        "data-ocid": "requests-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Requests" }),
      pickups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        pickups.length,
        " order",
        pickups.length !== 1 ? "s" : ""
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border overflow-hidden animate-pulse",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-40 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-24" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-muted rounded-full w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-muted rounded-full w-24" })
          ] })
        ]
      },
      i
    )) }),
    !isLoading && pickups.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-border",
        "data-ocid": "empty-requests-list",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1.5", children: "No requests yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Schedule your first pickup to get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void navigate({ to: "/dashboard/schedule" }),
              className: "btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold",
              "data-ocid": "empty-state-schedule-cta",
              children: "Schedule Pickup"
            }
          )
        ]
      }
    ),
    !isLoading && pickups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "requests-list", children: pickups.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      RequestCard,
      {
        pickup: p,
        onReschedule: handleReschedule
      },
      p.id
    )) })
  ] });
}
export {
  RequestsPage as default
};
