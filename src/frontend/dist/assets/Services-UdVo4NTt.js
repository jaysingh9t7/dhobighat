import { u as useNavigate, b as useAuth, r as reactExports, j as jsxRuntimeExports, S as SERVICES, P as PICKUP_TIME_SLOTS } from "./index-DhEm9TMn.js";
import { D as DashboardLayout } from "./DashboardLayout-C1HrT8kQ.js";
import { S as ServiceIcon } from "./ServiceIcon-mecTTRCV.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { C as CalendarDays } from "./calendar-days-D1hGWSfi.js";
import { C as Clock } from "./clock-CZBJaJX8.js";
import { C as CircleCheck } from "./circle-check-DokRLRsv.js";
import "./x-SeTMXdzH.js";
import "./createLucideIcon-CkU-QaFE.js";
import "./refresh-cw-CpwTUfNU.js";
import "./tag-B14AJu_C.js";
import "./phone-Beqcrkz1.js";
import "./chevron-right-DKcnBIaf.js";
import "./zap-CjUkV88X.js";
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
  "Dec"
];
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
function StepHeader({
  step,
  label,
  done,
  locked
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors",
        style: {
          background: done ? "oklch(0.7 0.15 72)" : locked ? "oklch(0.88 0.03 240)" : "oklch(0.26 0.1 258)",
          color: done ? "oklch(0.12 0.04 258)" : locked ? "oklch(0.5 0.04 240)" : "white"
        },
        children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : step
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "font-display font-semibold text-base",
        style: {
          color: locked ? "oklch(0.5 0.04 240)" : "oklch(0.12 0.04 258)"
        },
        children: label
      }
    )
  ] });
}
function ServicesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const weekDates = getNextWeekDates();
  const [selectedServiceIds, setSelectedServiceIds] = reactExports.useState([]);
  const [selectedDateIdx, setSelectedDateIdx] = reactExports.useState(null);
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const step1Done = selectedServiceIds.length > 0;
  const step2Done = selectedDateIdx !== null;
  const step3Done = selectedSlot !== null;
  const allDone = step1Done && step2Done && step3Done;
  function toggleService(id) {
    setSelectedServiceIds(
      (prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }
  function handleSchedule() {
    if (!allDone) return;
    const date = weekDates[selectedDateIdx];
    const prefill = {
      serviceIds: selectedServiceIds,
      date: date.toISOString(),
      timeSlot: selectedSlot
    };
    localStorage.setItem("dhobighat_schedule_prefill", JSON.stringify(prefill));
    if (isAuthenticated) {
      void navigate({
        to: "/dashboard/schedule",
        search: { prefill: "1" }
      });
    } else {
      void navigate({
        to: "/login",
        search: { next: "/dashboard/schedule?prefill=1" }
      });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/" }),
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
        "data-ocid": "services-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Our Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select one or more services, pick a date, and choose a time slot to schedule your pickup." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "bg-card rounded-2xl border border-border p-5",
          "data-ocid": "services-step1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StepHeader,
              {
                step: 1,
                label: "Select Services (choose one or more)",
                done: step1Done,
                locked: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3", children: SERVICES.map((svc) => {
              const sel = selectedServiceIds.includes(svc.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggleService(svc.id),
                  className: `flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-smooth cursor-pointer text-center ${sel ? "border-accent bg-accent/10 shadow-card" : "border-border bg-background hover:border-accent/40"}`,
                  "data-ocid": `services-svc-${svc.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-11 h-11 rounded-xl flex items-center justify-center ${sel ? "bg-primary" : "bg-muted"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ServiceIcon,
                          {
                            name: svc.icon,
                            className: `w-5 h-5 ${sel ? "text-accent" : "text-muted-foreground"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-semibold leading-snug ${sel ? "text-foreground" : "text-muted-foreground"}`,
                        children: svc.name
                      }
                    ),
                    sel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-bold", children: "✓" })
                  ]
                },
                svc.id
              );
            }) }),
            step1Done && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent font-medium mt-3", children: [
              selectedServiceIds.length,
              " service",
              selectedServiceIds.length !== 1 ? "s" : "",
              " selected"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: `bg-card rounded-2xl border border-border p-5 transition-opacity duration-300 ${step1Done ? "opacity-100" : "opacity-40 pointer-events-none"}`,
          "data-ocid": "services-step2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StepHeader,
              {
                step: 2,
                label: "Choose a Date",
                done: step2Done,
                locked: !step1Done
              }
            ),
            !step1Done && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Complete Step 1 to unlock date selection." }),
            step1Done && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 snap-x -mx-1 px-1", children: weekDates.map((date, i) => {
              const isSel = selectedDateIdx === i;
              const isToday = i === 0;
              const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedDateIdx(isSel ? null : i),
                  className: `date-btn shrink-0 snap-start min-w-[3.5rem] ${isSel ? "selected" : ""}`,
                  "data-ocid": `services-date-${i}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CalendarDays,
                      {
                        className: `w-3.5 h-3.5 mb-0.5 ${isSel ? "text-accent" : "text-muted-foreground"}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-medium ${isSel ? "text-white/80" : "text-muted-foreground"}`,
                        children: isToday ? "Today" : DAY_ABBR[date.getDay()]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold leading-none", children: date.getDate() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs ${isSel ? "text-white/70" : "text-muted-foreground"}`,
                        children: MONTH_ABBR[date.getMonth()]
                      }
                    )
                  ]
                },
                dateKey
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: `bg-card rounded-2xl border border-border p-5 transition-opacity duration-300 ${step2Done ? "opacity-100" : "opacity-40 pointer-events-none"}`,
          "data-ocid": "services-step3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StepHeader,
              {
                step: 3,
                label: "Choose a Time Slot",
                done: step3Done,
                locked: !step2Done
              }
            ),
            !step2Done && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Complete Step 2 to unlock time slot selection." }),
            step2Done && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: PICKUP_TIME_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedSlot(selectedSlot === slot.id ? null : slot.id),
                className: `time-slot-btn ${selectedSlot === slot.id ? "selected" : ""}`,
                "data-ocid": `services-slot-${slot.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Clock,
                    {
                      className: `w-3.5 h-3.5 mb-0.5 ${selectedSlot === slot.id ? "text-accent" : "text-muted-foreground"}`
                    }
                  ),
                  slot.label
                ]
              },
              slot.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
        !allDone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mb-3", children: !step1Done ? "Select at least one service to get started" : !step2Done ? "Pick a date to continue" : "Choose a time slot to schedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleSchedule,
            disabled: !allDone,
            className: `w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-semibold shadow-card transition-smooth ${allDone ? "btn-gold cursor-pointer" : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"}`,
            "data-ocid": "services-schedule-pickup",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
              "Schedule Pickup"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ServicesPage as default
};
