import { k as useAdmin, h as useRouter, j as jsxRuntimeExports, L as Link } from "./index-DhEm9TMn.js";
import { S as Shield, T as Truck, U as Users } from "./users-NcbA5j5i.js";
import { L as LogOut, T as Tag, C as CreditCard } from "./tag-B14AJu_C.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode);
const ADMIN_NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/rates", label: "Rate Management", icon: Tag },
  { to: "/admin/orders", label: "Orders & Delivery", icon: Truck },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/loyalty", label: "Loyalty & Offers", icon: Users }
];
function AdminLayout({ children }) {
  const { logout, email, isPasswordResetDue } = useAdmin();
  const router = useRouter();
  function handleLogout() {
    logout();
    void router.navigate({ to: "/admin" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-primary border-b border-primary/80 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary-foreground text-lg", children: [
          "DhobiGhat ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: "Admin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        isPasswordResetDue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs bg-destructive/20 text-destructive-foreground px-2 py-1 rounded-full font-medium", children: "Password reset due" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary-foreground/70 hidden sm:block truncate max-w-[180px]", children: email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleLogout,
            className: "flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm",
            "data-ocid": "admin-logout",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 max-w-7xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "w-56 shrink-0 hidden md:flex flex-col border-r border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 py-4", children: ADMIN_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: "flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
          "data-ocid": `admin-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 shrink-0" }),
            item.label
          ]
        },
        item.to
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex", children: ADMIN_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: "flex-1 flex flex-col items-center gap-1 py-2 text-xs text-muted-foreground hover:text-primary transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate w-full text-center", children: item.label.split(" ")[0] })
          ]
        },
        item.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto pb-16 md:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-6", children }) })
    ] })
  ] });
}
export {
  AdminLayout as A
};
