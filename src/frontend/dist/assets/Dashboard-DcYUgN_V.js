import { u as useNavigate, b as useAuth, j as jsxRuntimeExports, S as SERVICES } from "./index-DhEm9TMn.js";
import { D as DashboardLayout } from "./DashboardLayout-C1HrT8kQ.js";
import { S as ServiceIcon } from "./ServiceIcon-mecTTRCV.js";
import { u as useUserPickups, a as useMyLoyaltyStats } from "./useQueries-DmaS4Psf.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import { C as ChevronRight } from "./chevron-right-DKcnBIaf.js";
import { P as Package } from "./package-8feS7cyk.js";
import { A as Award } from "./award-BnlobylQ.js";
import { S as Star } from "./star-CLTNlB2X.js";
import "./x-SeTMXdzH.js";
import "./refresh-cw-CpwTUfNU.js";
import "./tag-B14AJu_C.js";
import "./phone-Beqcrkz1.js";
import "./zap-CjUkV88X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 19h6", key: "xwg31i" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5", key: "1glfrc" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }]
];
const CalendarPlus = createLucideIcon("calendar-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
      key: "143lza"
    }
  ],
  ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
  ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
  ["path", { d: "M8 7h8", key: "i86dvs" }],
  ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
  ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }]
];
const Medal = createLucideIcon("medal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const TIER_CONFIG = {
  Bronze: {
    icon: Medal,
    ringClass: "ring-2 ring-amber-400/50",
    badgeBg: "bg-amber-500/15 border border-amber-400/30",
    badgeText: "text-amber-400",
    progressBg: "bg-amber-400/15",
    progressFill: "bg-amber-400",
    glow: "shadow-[0_0_18px_rgba(245,158,11,0.18)]",
    label: "Bronze"
  },
  Silver: {
    icon: Star,
    ringClass: "ring-2 ring-slate-300/50",
    badgeBg: "bg-slate-400/15 border border-slate-300/30",
    badgeText: "text-slate-300",
    progressBg: "bg-slate-300/15",
    progressFill: "bg-slate-300",
    glow: "shadow-[0_0_18px_rgba(148,163,184,0.18)]",
    label: "Silver"
  },
  Gold: {
    icon: Trophy,
    ringClass: "ring-2 ring-yellow-400/50",
    badgeBg: "bg-yellow-500/15 border border-yellow-400/30",
    badgeText: "text-yellow-400",
    progressBg: "bg-yellow-400/15",
    progressFill: "bg-yellow-400",
    glow: "shadow-[0_0_18px_rgba(250,204,21,0.22)]",
    label: "Gold"
  },
  Platinum: {
    icon: Crown,
    ringClass: "ring-2 ring-violet-400/50",
    badgeBg: "bg-violet-500/15 border border-violet-400/30",
    badgeText: "text-violet-400",
    progressBg: "bg-violet-400/15",
    progressFill: "bg-violet-400",
    glow: "shadow-[0_0_22px_rgba(167,139,250,0.25)]",
    label: "Platinum"
  },
  none: {
    icon: Award,
    ringClass: "ring-2 ring-border",
    badgeBg: "bg-muted/60 border border-border",
    badgeText: "text-muted-foreground",
    progressBg: "bg-muted/40",
    progressFill: "bg-primary",
    glow: "",
    label: "No Tier Yet"
  }
};
const TIER_THRESHOLDS = {
  Bronze: 2,
  Silver: 3,
  Gold: 4,
  Platinum: 10
};
function TierCard({
  tierName,
  discountPercent,
  qualifyingOrderCount,
  ordersToNextTier,
  nextTierName,
  nextTierPercent
}) {
  const key = tierName ?? "none";
  const cfg = TIER_CONFIG[key] ?? TIER_CONFIG.none;
  const TierIcon = cfg.icon;
  const isPlatinum = tierName === "Platinum";
  const prevThreshold = tierName ? TIER_THRESHOLDS[tierName] ?? 0 : 0;
  const nextThreshold = nextTierName ? TIER_THRESHOLDS[nextTierName] : null;
  const progressPct = isPlatinum ? 100 : nextThreshold ? Math.round(
    (qualifyingOrderCount - prevThreshold) / (nextThreshold - prevThreshold) * 100
  ) : Math.min(Math.round(qualifyingOrderCount / 2 * 100), 100);
  const clampedPct = Math.max(0, Math.min(100, progressPct));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `mb-6 rounded-2xl border bg-card p-4 ${cfg.ringClass} ${cfg.glow} relative overflow-hidden`,
      "data-ocid": "loyalty-tier-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 opacity-[0.06] pointer-events-none rounded-full blur-2xl bg-current" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-12 h-12 rounded-xl ${cfg.badgeBg} flex items-center justify-center shrink-0 mt-0.5`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TierIcon, { className: `w-6 h-6 ${cfg.badgeText}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground", children: "My Loyalty Tier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`,
                  children: cfg.label
                }
              ),
              discountPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full", children: [
                discountPercent,
                "% off"
              ] })
            ] }),
            isPlatinum ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
              "🎉 You're Platinum! Enjoy",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${cfg.badgeText}`, children: "10% off" }),
              " ",
              "on every order."
            ] }) : tierName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                ordersToNextTier,
                " more large",
                " ",
                ordersToNextTier === 1 ? "order" : "orders"
              ] }),
              " ",
              "to reach",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-semibold ${cfg.badgeText}`, children: [
                nextTierName,
                " (",
                nextTierPercent,
                "% off)"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
              "Complete your first large order",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: "(2+ services)" }),
              " to unlock",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-amber-400", children: "Bronze" }),
              " and get ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "2% off" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-2 rounded-full ${cfg.progressBg} overflow-hidden`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-full rounded-full ${cfg.progressFill} transition-all duration-700 ease-out`,
                      style: { width: `${clampedPct}%` }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  qualifyingOrderCount,
                  " qualifying",
                  " ",
                  qualifyingOrderCount === 1 ? "order" : "orders"
                ] }),
                isPlatinum ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${cfg.badgeText}`, children: "Max tier reached ✓" }) : nextTierName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  nextTierName,
                  " at ",
                  nextThreshold,
                  " orders"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/55 mt-2 leading-snug", children: "Large orders = 2+ services selected" })
          ] })
        ] })
      ]
    }
  );
}
const STATUS_STYLES = {
  pending: {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    bg: "bg-muted/60"
  },
  confirmed: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10" },
  picked_up: { dot: "bg-accent", text: "text-accent", bg: "bg-accent/10" },
  processing: {
    dot: "bg-secondary-foreground",
    text: "text-secondary-foreground",
    bg: "bg-secondary"
  },
  ready: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/15" },
  out_for_delivery: {
    dot: "bg-accent",
    text: "text-accent-foreground",
    bg: "bg-accent/20"
  },
  delivered: { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10" },
  cancelled: {
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10"
  }
};
const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  picked_up: "Picked Up",
  processing: "Processing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${style.dot} shrink-0` }),
        STATUS_LABELS[status]
      ]
    }
  );
}
function DashboardPage() {
  var _a;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: pickups = [] } = useUserPickups(user == null ? void 0 : user.id);
  const { data: loyaltyStats } = useMyLoyaltyStats(user == null ? void 0 : user.id);
  const recentPickups = pickups.slice(0, 3);
  const greeting = getGreeting();
  const firstName = ((_a = user == null ? void 0 : user.name) == null ? void 0 : _a.split(" ")[0]) ?? "there";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/" }),
        className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5 cursor-pointer",
        "data-ocid": "dashboard-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Home"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 rounded-2xl gradient-primary text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-primary-foreground/80 mb-0.5", children: [
        greeting,
        " 👋"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl", children: [
        "Hello, ",
        firstName,
        "!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/70 mt-1", children: "What can we clean for you today?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierCard,
      {
        tierName: (loyaltyStats == null ? void 0 : loyaltyStats.tierName) ?? null,
        discountPercent: (loyaltyStats == null ? void 0 : loyaltyStats.discountPercent) ?? 0,
        qualifyingOrderCount: (loyaltyStats == null ? void 0 : loyaltyStats.qualifyingOrderCount) ?? 0,
        ordersToNextTier: (loyaltyStats == null ? void 0 : loyaltyStats.ordersToNextTier) ?? 2,
        nextTierName: (loyaltyStats == null ? void 0 : loyaltyStats.nextTierName) ?? "Bronze",
        nextTierPercent: (loyaltyStats == null ? void 0 : loyaltyStats.nextTierPercent) ?? 2
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base text-foreground mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-5 rounded-full bg-accent inline-block" }),
        "Our Services"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3", children: SERVICES.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => void navigate({ to: "/dashboard/schedule" }),
          className: "service-card-hover flex flex-col items-center gap-2 p-3 rounded-2xl border-2 border-border bg-card hover:border-accent/60 hover:shadow-card cursor-pointer text-center",
          "data-ocid": `dashboard-service-${svc.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceIcon, { name: svc.icon, className: "w-6 h-6 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xs text-foreground leading-snug", children: svc.name })
          ]
        },
        svc.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/dashboard/schedule" }),
        className: "btn-gold w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-semibold shadow-card",
        "data-ocid": "dashboard-schedule-pickup",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "w-5 h-5" }),
          "Schedule Pickup",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-base text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-5 rounded-full bg-accent inline-block" }),
          "Recent Requests"
        ] }),
        pickups.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void navigate({ to: "/dashboard/requests" }),
            className: "text-sm text-primary font-medium hover:underline",
            children: "View all →"
          }
        )
      ] }),
      pickups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border",
          "data-ocid": "empty-requests",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No requests yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 max-w-[220px] mx-auto", children: "Schedule your first pickup and we'll handle the rest" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/dashboard/schedule" }),
                className: "btn-navy px-6 py-2.5 rounded-xl text-sm",
                "data-ocid": "empty-schedule-cta",
                children: "Schedule Pickup"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        recentPickups.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border border-border p-4 flex items-start justify-between gap-3 hover:shadow-card transition-smooth",
            "data-ocid": `request-item-${p.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate mb-1", children: p.serviceIds.map((s) => s.replace(/-/g, " ")).join(", ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  p.scheduledDate,
                  " · ",
                  p.timeSlot
                ] }),
                p.isExpress && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent mt-1 inline-block", children: "⚡ Express" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
                  "₹",
                  p.finalAmount
                ] })
              ] })
            ]
          },
          p.id
        )),
        pickups.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => void navigate({ to: "/dashboard/requests" }),
            className: "w-full py-2.5 text-sm font-medium text-primary border border-border rounded-xl hover:bg-muted transition-smooth",
            children: [
              "View all ",
              pickups.length,
              " requests →"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function getGreeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
export {
  DashboardPage as default
};
