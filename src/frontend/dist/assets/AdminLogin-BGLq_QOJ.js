import { u as useNavigate, k as useAdmin, r as reactExports, j as jsxRuntimeExports, A as APP_CONFIG } from "./index-DhEm9TMn.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { E as EyeOff, a as Eye } from "./eye-Cun7Kdy2.js";
import "./createLucideIcon-CkU-QaFE.js";
function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [email, setEmail] = reactExports.useState("admin@mydhobighat.com");
  const [password, setPassword] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  if (isAuthenticated) {
    void navigate({ to: "/admin/dashboard" });
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!password) {
      setError("Enter your password");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const ok = await login(email, password);
      if (!ok) {
        setError("Invalid email or password");
        return;
      }
      void navigate({ to: "/admin/dashboard" });
    } finally {
      setIsLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-primary px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/" }),
        className: "flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 group",
        "aria-label": "Back to home",
        "data-ocid": "admin-back-home",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-0.5 transition-transform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Back to Home" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: APP_CONFIG.logo,
          alt: "DhobiGhat",
          className: "h-20 w-auto object-contain rounded-xl",
          style: { maxWidth: "160px" }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-primary-foreground", children: "Admin Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/60 text-sm mt-1", children: "DhobiGhat Management System" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-elevated p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-sm font-medium text-foreground mb-1.5",
            htmlFor: "admin-email",
            children: "Admin Email"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "admin-email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "input-navy",
            "data-ocid": "admin-email-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-sm font-medium text-foreground mb-1.5",
            htmlFor: "admin-pwd",
            children: "Password"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "admin-pwd",
              type: showPwd ? "text" : "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Enter password",
              className: "input-navy pr-10",
              "data-ocid": "admin-password-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPwd((v) => !v),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": showPwd ? "Hide password" : "Show password",
              children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 p-3 rounded-lg bg-accent/10 border border-accent/20 text-xs text-foreground", children: [
        "Default password:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: "Dhobighat@2024" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "btn-gold w-full py-3 rounded-xl text-base font-semibold",
          "data-ocid": "admin-login-submit",
          children: isLoading ? "Signing in…" : "Sign In"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-primary-foreground/40 mt-4", children: "Restricted access — authorized personnel only" })
  ] }) });
}
export {
  AdminLoginPage as default
};
