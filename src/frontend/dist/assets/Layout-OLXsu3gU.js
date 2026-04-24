import { j as jsxRuntimeExports, b as useAuth, L as Link, A as APP_CONFIG } from "./index-DhEm9TMn.js";
function Layout({
  children,
  showHeader = true,
  showFooter = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    showHeader && /* @__PURE__ */ jsxRuntimeExports.jsx(PublicHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    showFooter && /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function PublicHeader() {
  const { isAuthenticated } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", "data-ocid": "nav-logo", children: [
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
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-3", "data-ocid": "nav-public", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/prices",
          className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "nav-prices",
          children: "Price List"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contact",
          className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "nav-contact",
          children: "Contact"
        }
      ),
      isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/dashboard",
          className: "btn-gold px-4 py-2 rounded-lg text-sm",
          "data-ocid": "nav-dashboard",
          children: "Dashboard"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          className: "btn-gold px-4 py-2 rounded-lg text-sm",
          "data-ocid": "nav-login",
          children: "Login"
        }
      )
    ] })
  ] }) });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Dhobi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Ghat" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: APP_CONFIG.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2 text-foreground", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: APP_CONFIG.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: APP_CONFIG.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2 text-foreground", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: APP_CONFIG.address })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "© ",
        year,
        " DhobiGhat. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: utmUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "underline hover:text-foreground transition-colors",
            children: "caffeine.ai"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Layout as L
};
