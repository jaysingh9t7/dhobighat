import { u as useNavigate, a as useSearch, b as useAuth, r as reactExports, j as jsxRuntimeExports, P as PICKUP_TIME_SLOTS } from "./index-DhEm9TMn.js";
import { D as DashboardLayout } from "./DashboardLayout-C1HrT8kQ.js";
import { B as Button, T as TriangleAlert } from "./button-056b_yem.js";
import { u as useUserPickups, c as useReschedulePickup } from "./useQueries-DmaS4Psf.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import { C as CalendarDays } from "./calendar-days-D1hGWSfi.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import "./x-SeTMXdzH.js";
import "./refresh-cw-CpwTUfNU.js";
import "./tag-B14AJu_C.js";
import "./phone-Beqcrkz1.js";
import "./chevron-right-DKcnBIaf.js";
import "./utils-PXmmHler.js";
import "./index-ChT6nWzq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function getNextWeekDates() {
  const dates = [];
  const today = /* @__PURE__ */ new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}
function parseSlotTime(timeStr) {
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
function getScheduledDateTime(pickup) {
  const { hours, minutes } = parseSlotTime(pickup.timeSlot);
  const [year, month, day] = pickup.scheduledDate.split("-").map(Number);
  const d = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return d;
}
function canReschedule(pickup) {
  if (pickup.status === "delivered" || pickup.status === "cancelled" || pickup.status === "picked_up" || pickup.status === "processing" || pickup.status === "ready" || pickup.status === "out_for_delivery")
    return false;
  const scheduledTime = getScheduledDateTime(pickup);
  const now = /* @__PURE__ */ new Date();
  return scheduledTime.getTime() - now.getTime() > 60 * 60 * 1e3;
}
function isTooLate(pickup) {
  if (pickup.status === "delivered" || pickup.status === "cancelled" || pickup.status === "picked_up" || pickup.status === "processing" || pickup.status === "ready" || pickup.status === "out_for_delivery")
    return false;
  const scheduledTime = getScheduledDateTime(pickup);
  const now = /* @__PURE__ */ new Date();
  const diffMs = scheduledTime.getTime() - now.getTime();
  return diffMs > 0 && diffMs <= 60 * 60 * 1e3;
}
function formatPickupTime(pickup) {
  const dt = getScheduledDateTime(pickup);
  return dt.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function timeUntil(pickup) {
  const diffMs = getScheduledDateTime(pickup).getTime() - Date.now();
  if (diffMs <= 0) return "Now";
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remaining = mins % 60;
  return remaining > 0 ? `${hrs}h ${remaining}m` : `${hrs}h`;
}
function ReschedulePage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/dashboard/reschedule" });
  const { user, isAuthenticated } = useAuth();
  const { data: pickups = [], isLoading, refetch } = useUserPickups(user == null ? void 0 : user.id);
  const reschedule = useReschedulePickup();
  const [selectedPickupId, setSelectedPickupId] = reactExports.useState(
    search.pickupId ?? ""
  );
  const [selectedDate, setSelectedDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selectedSlot, setSelectedSlot] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (user == null ? void 0 : user.id) {
      void refetch();
    }
  }, [user == null ? void 0 : user.id, refetch]);
  reactExports.useEffect(() => {
    if (search.pickupId && pickups.length > 0 && !selectedPickupId) {
      setSelectedPickupId(search.pickupId);
    }
  }, [search.pickupId, pickups.length, selectedPickupId]);
  const weekDates = getNextWeekDates();
  const reschedulablePickups = pickups.filter(canReschedule);
  const tooLatePickups = pickups.filter(isTooLate);
  const hasAnyActivePickups = reschedulablePickups.length > 0 || tooLatePickups.length > 0;
  async function handleSubmit(e) {
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
      timeSlot: selectedSlot
    });
    setSubmitted(true);
  }
  const BackBtn = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => void navigate({ to: "/dashboard" }),
      className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
      "data-ocid": "reschedule-back-btn",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        "Back"
      ]
    }
  );
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Pickup Rescheduled!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs", children: "Your new pickup time has been confirmed. We'll be there on time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: () => void navigate({ to: "/dashboard/requests" }),
            variant: "outline",
            className: "px-6",
            children: "View My Requests"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void navigate({ to: "/dashboard" }),
            className: "btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold",
            children: "Back to Dashboard"
          }
        )
      ] })
    ] }) });
  }
  if (!isAuthenticated || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Reschedule Pickup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-14 bg-muted/20 rounded-2xl border-2 border-dashed border-border",
          "data-ocid": "reschedule-not-logged-in",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "Not logged in" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Please log in to view and reschedule your pickups." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/login" }),
                className: "btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold",
                children: "Log In"
              }
            )
          ]
        }
      )
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Reschedule Pickup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-muted animate-pulse rounded-xl" }, i)) })
    ] });
  }
  if (!isLoading && pickups.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Reschedule Pickup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-14 bg-muted/20 rounded-2xl border-2 border-dashed border-border",
          "data-ocid": "no-reschedule-pickups",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No pickup is eligible to reschedule" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 max-w-xs mx-auto", children: "You don't have any scheduled pickups yet. Schedule one first to be able to reschedule." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/dashboard/schedule" }),
                className: "btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold",
                children: "Schedule a Pickup"
              }
            )
          ]
        }
      )
    ] });
  }
  if (!isLoading && !hasAnyActivePickups) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Reschedule Pickup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-14 bg-muted/20 rounded-2xl border-2 border-dashed border-border",
          "data-ocid": "no-reschedule-pickups",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No pickup is eligible to reschedule" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 max-w-xs mx-auto", children: "All your pickups are either already completed or cancelled." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/dashboard/schedule" }),
                className: "btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold",
                children: "Schedule a New Pickup"
              }
            )
          ]
        }
      )
    ] });
  }
  if (!isLoading && reschedulablePickups.length === 0 && tooLatePickups.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Reschedule Pickup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-4 bg-destructive/8 border border-destructive/25 rounded-xl mb-5",
          "data-ocid": "no-eligible-reschedule-banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive text-sm", children: "No pickup is eligible to reschedule" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Pickups must be rescheduled at least 1 hour before the scheduled time. All your upcoming pickups are within the 1-hour window." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3", children: "Your Upcoming Pickups" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: tooLatePickups.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-4 rounded-xl border border-border bg-card opacity-70",
          "data-ocid": `too-late-${p.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: p.serviceIds.join(", ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-destructive/10 text-destructive font-medium px-2 py-0.5 rounded-full shrink-0", children: [
                  "In ",
                  timeUntil(p)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatPickupTime(p) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium mt-1", children: "Cannot reschedule — less than 1 hour away" })
            ] })
          ]
        },
        p.id
      )) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Reschedule Pickup" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-base text-foreground mb-3", children: "1. Select Pickup to Reschedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: reschedulablePickups.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: `flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPickupId === p.id ? "border-accent bg-accent/8" : "border-border bg-card hover:border-accent/30"}`,
            "data-ocid": `reschedule-pickup-${p.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "radio",
                  name: "pickup",
                  value: p.id,
                  checked: selectedPickupId === p.id,
                  onChange: () => setSelectedPickupId(p.id),
                  className: "mt-1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: p.serviceIds.join(", ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full shrink-0", children: [
                    "In ",
                    timeUntil(p)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatPickupTime(p) }),
                p.isExpress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block mt-1 text-xs bg-accent/15 text-accent font-medium px-1.5 py-0.5 rounded", children: "Express" })
              ] })
            ]
          },
          p.id
        )) })
      ] }),
      tooLatePickups.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3", children: "Cannot Reschedule (Too Close)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: tooLatePickups.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 p-3.5 rounded-xl border border-border bg-destructive/5 opacity-70",
            "data-ocid": `too-late-${p.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: p.serviceIds.join(", ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-destructive/10 text-destructive font-medium px-2 py-0.5 rounded-full shrink-0", children: [
                    "In ",
                    timeUntil(p)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatPickupTime(p) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium mt-0.5", children: "Cannot reschedule — less than 1 hour away" })
              ] })
            ]
          },
          p.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary" }),
          "2. Select New Date"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 -mx-1 px-1", children: weekDates.map((d) => {
          const isSelected = d.toDateString() === selectedDate.toDateString();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedDate(d),
              className: `date-btn shrink-0 ${isSelected ? "selected" : ""}`,
              "data-ocid": `date-btn-${d.getDate()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: d.toLocaleDateString("en-IN", { weekday: "short" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold leading-none", children: d.getDate() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: d.toLocaleDateString("en-IN", { month: "short" }) })
              ]
            },
            d.toISOString()
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
          "3. Select New Time Slot"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: PICKUP_TIME_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedSlot(slot.id),
            className: `time-slot-btn ${selectedSlot === slot.id ? "selected" : ""}`,
            "data-ocid": `slot-btn-${slot.id}`,
            children: slot.label
          },
          slot.id
        )) })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm", role: "alert", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: reschedule.isPending || !selectedPickupId,
          className: "btn-gold w-full py-3.5 rounded-xl text-base font-semibold",
          "data-ocid": "reschedule-submit",
          children: reschedule.isPending ? "Rescheduling…" : "Confirm Reschedule"
        }
      )
    ] })
  ] });
}
export {
  ReschedulePage as default
};
