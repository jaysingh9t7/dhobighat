import { g as useRouterState, j as jsxRuntimeExports, L as Link, r as reactExports, b as useAuth, h as useRouter, A as APP_CONFIG } from "./index-DhEm9TMn.js";
import { X } from "./x-SeTMXdzH.js";
import { H as House, R as RefreshCw } from "./refresh-cw-CpwTUfNU.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import { T as Tag, C as CreditCard, L as LogOut } from "./tag-B14AJu_C.js";
import { P as Phone } from "./phone-Beqcrkz1.js";
import { C as ChevronRight } from "./chevron-right-DKcnBIaf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 18h11", key: "11hvi2" }],
  ["path", { d: "M10 6h11", key: "c7qv1k" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
];
const ListOrdered = createLucideIcon("list-ordered", __iconNode);
const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: House },
  { to: "/services", label: "Our Services", icon: LayoutGrid },
  { to: "/dashboard/schedule", label: "Request Pickup", icon: Calendar },
  { to: "/dashboard/reschedule", label: "Reschedule Pickup", icon: RefreshCw },
  { to: "/dashboard/requests", label: "My Request List", icon: ListOrdered },
  { to: "/prices", label: "Price List", icon: Tag },
  { to: "/contact", label: "Contact Us", icon: Phone },
  { to: "/pay", label: "Pay Now", icon: CreditCard }
];
function DashboardNav({
  isOpen,
  onClose,
  onLogout,
  user
}) {
  var _a, _b;
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-[100] bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full border-none",
      "aria-modal": "true",
      "aria-label": "Navigation menu",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-card shadow-elevated flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-primary px-5 pt-10 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-2 border-accent/50 bg-accent/20 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-xl text-gold", children: ((_b = (_a = user == null ? void 0 : user.name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) ?? "U" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-base text-primary-foreground truncate", children: (user == null ? void 0 : user.name) ?? "User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/70 mt-0.5", children: user == null ? void 0 : user.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-2 rounded-lg hover:bg-white/10 transition-smooth -mt-1 -mr-1",
                "aria-label": "Close menu",
                "data-ocid": "dashboard-menu-close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-primary-foreground/80" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto py-2", children: NAV_ITEMS.map((item, index) => {
            const isActive = item.to === "/dashboard" ? currentPath === "/dashboard" : currentPath.startsWith(item.to);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                onClick: onClose,
                className: `flex items-center gap-3 px-4 py-3.5 transition-smooth group border-r-2 ${isActive ? "bg-primary/8 border-primary" : "border-transparent hover:bg-muted"}`,
                "data-ocid": `nav-item-${item.to.replace(/\//g, "-").slice(1)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-smooth ${isActive ? "bg-primary" : "bg-muted group-hover:bg-primary/10"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        item.icon,
                        {
                          className: `w-4 h-4 ${isActive ? "text-primary-foreground" : "text-primary"}`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `flex-1 font-medium text-sm ${isActive ? "text-primary" : "text-foreground"}`,
                      children: [
                        index + 1,
                        ". ",
                        item.label
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      className: `w-4 h-4 shrink-0 transition-opacity ${isActive ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-40 text-muted-foreground"}`
                    }
                  )
                ]
              },
              item.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                onClose();
                onLogout();
              },
              className: "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-destructive hover:bg-destructive/8 transition-smooth",
              "data-ocid": "nav-logout",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "9. Logout" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  function handleLogout() {
    logout();
    void router.navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/dashboard",
          className: "flex items-center gap-2",
          "data-ocid": "dashboard-logo",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: APP_CONFIG.logo,
                alt: "DhobiGhat",
                className: "h-9 w-auto object-contain",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Dhobi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Ghat" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate max-w-[160px]", children: user == null ? void 0 : user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: user == null ? void 0 : user.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMenuOpen(true),
            className: "p-2 rounded-lg hover:bg-muted transition-smooth",
            "aria-label": "Open navigation menu",
            "data-ocid": "dashboard-menu-open",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[5px] w-[20px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-[2px] w-full bg-foreground rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-[2px] w-[14px] bg-foreground rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-[2px] w-full bg-foreground rounded-full" })
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DashboardNav,
      {
        isOpen: menuOpen,
        onClose: () => setMenuOpen(false),
        onLogout: handleLogout,
        user
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 max-w-2xl w-full mx-auto px-4 py-6", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-muted/40 border-t border-border py-4 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ".",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : ""
          )}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-foreground transition-colors",
          children: "Built with love using caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  DashboardLayout as D
};
