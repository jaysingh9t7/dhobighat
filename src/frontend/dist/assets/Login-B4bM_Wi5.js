import { u as useNavigate, a as useSearch, b as useAuth, r as reactExports, j as jsxRuntimeExports, s as sendOTP, c as checkUserExists, v as verifyOTP, d as setupPassword, e as registerUser, f as addAddress, A as APP_CONFIG, _ as _sessions } from "./index-DhEm9TMn.js";
import { c as createLucideIcon } from "./createLucideIcon-CkU-QaFE.js";
import { R as RefreshCw, H as House } from "./refresh-cw-CpwTUfNU.js";
import { A as ArrowLeft } from "./arrow-left-COY82fyG.js";
import { C as CircleCheckBig } from "./circle-check-big-ByU2TAuH.js";
import { M as MapPin } from "./map-pin-D8mqcdW5.js";
import { E as EyeOff, a as Eye } from "./eye-Cun7Kdy2.js";
import { P as Phone } from "./phone-Beqcrkz1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const NEW_USER_STEPS = [
  "phone",
  "otp",
  "set-password",
  "register",
  "address"
];
const RETURNING_NO_PWD_STEPS = ["phone", "otp", "set-password"];
const RETURNING_STEPS = ["phone", "password"];
const FORGOT_STEPS = ["phone", "otp", "set-password"];
const PINCODE_MAP = {
  "400053": { city: "Mumbai", state: "Maharashtra" },
  "400001": { city: "Mumbai", state: "Maharashtra" },
  "400050": { city: "Mumbai", state: "Maharashtra" },
  "400058": { city: "Mumbai", state: "Maharashtra" },
  "400102": { city: "Mumbai", state: "Maharashtra" },
  "411001": { city: "Pune", state: "Maharashtra" },
  "110001": { city: "New Delhi", state: "Delhi" },
  "110011": { city: "New Delhi", state: "Delhi" },
  "560001": { city: "Bengaluru", state: "Karnataka" },
  "600001": { city: "Chennai", state: "Tamil Nadu" },
  "700001": { city: "Kolkata", state: "West Bengal" },
  "500001": { city: "Hyderabad", state: "Telangana" },
  "380001": { city: "Ahmedabad", state: "Gujarat" },
  "302001": { city: "Jaipur", state: "Rajasthan" }
};
function getOtpFromSession(phone) {
  const session = _sessions.get(phone);
  return session ? session.otp : null;
}
function LoadingSpinner({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" }),
    label
  ] });
}
function ErrorMsg({ msg }) {
  return msg ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-sm mb-4 flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
    " ",
    msg
  ] }) : null;
}
function PageHeader({ onBack }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "px-4 py-4 flex items-center gap-3",
      style: { background: "oklch(var(--navy))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "flex items-center justify-center w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0",
            "aria-label": "Back",
            "data-ocid": "login-back-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: APP_CONFIG.logo,
            alt: "DhobiGhat",
            className: "h-10 w-auto object-contain rounded-lg",
            style: { maxWidth: "120px" }
          }
        ) })
      ]
    }
  );
}
function ProgressBar({
  steps,
  currentStep
}) {
  const currentIdx = steps.indexOf(currentStep);
  const STEP_LABELS = {
    phone: { label: "Phone", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }) },
    password: { label: "Login", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }) },
    otp: { label: "Verify", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }) },
    "set-password": {
      label: "Password",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" })
    },
    register: { label: "Profile", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }) },
    address: { label: "Address", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }) }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "px-4 py-3 border-b border-border",
      style: { background: "oklch(var(--navy-deep))" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between max-w-md mx-auto", children: steps.map((s, i) => {
        const isActive = s === currentStep;
        const isDone = i < currentIdx;
        const meta = STEP_LABELS[s] ?? { label: s, icon: null };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                style: {
                  background: isDone ? "oklch(var(--gold))" : isActive ? "oklch(var(--gold) / 0.9)" : "oklch(var(--navy) / 0.5)",
                  border: isActive || isDone ? "2px solid oklch(var(--gold))" : "2px solid oklch(1 0 0 / 0.15)",
                  color: isDone || isActive ? "white" : "oklch(1 0 0 / 0.3)"
                },
                children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : meta.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-medium",
                style: {
                  color: isActive || isDone ? "oklch(1 0 0 / 0.9)" : "oklch(1 0 0 / 0.3)"
                },
                children: meta.label
              }
            )
          ] }),
          i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 h-0.5 mx-1 mb-4 transition-all duration-300",
              style: {
                background: i < currentIdx ? "oklch(var(--gold))" : "oklch(1 0 0 / 0.12)"
              }
            }
          )
        ] }, s);
      }) })
    }
  );
}
function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  dataOcid,
  autoFocus
}) {
  const [show, setShow] = reactExports.useState(false);
  const hasFocused = reactExports.useRef(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type: show ? "text" : "password",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder: placeholder ?? "••••••••",
        className: "input-navy w-full pr-10",
        "data-ocid": dataOcid,
        ref: (el) => {
          if (autoFocus && el && !hasFocused.current) {
            hasFocused.current = true;
            setTimeout(() => el.focus(), 50);
          }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setShow((s) => !s),
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
        tabIndex: -1,
        "aria-label": show ? "Hide password" : "Show password",
        children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
      }
    )
  ] });
}
function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const nextPath = (search == null ? void 0 : search.next) ?? "/dashboard";
  const { login, loginWithPassword } = useAuth();
  const [flow, setFlow] = reactExports.useState("login");
  const [step, setStep] = reactExports.useState("phone");
  const [isNewUser, setIsNewUser] = reactExports.useState(false);
  const [userHasPassword, setUserHasPassword] = reactExports.useState(false);
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [testOtp, setTestOtp] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [registrationData, setRegistrationData] = reactExports.useState({
    name: "",
    email: "",
    phone: ""
  });
  const [addressData, setAddressData] = reactExports.useState({
    label: "Home",
    flat: "",
    building: "",
    society: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "India"
  });
  function getSteps() {
    if (flow === "forgot") return FORGOT_STEPS;
    if (!isNewUser && userHasPassword) return RETURNING_STEPS;
    if (!isNewUser && !userHasPassword) return RETURNING_NO_PWD_STEPS;
    return NEW_USER_STEPS;
  }
  async function handlePhoneSubmit(e) {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit number");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      if (flow === "forgot") {
        await sendOTP(phone);
        setTestOtp(getOtpFromSession(phone));
        setStep("otp");
        return;
      }
      const result = await checkUserExists(phone);
      setIsNewUser(!result.exists);
      setUserHasPassword(result.hasPassword);
      if (result.exists && result.hasPassword) {
        setStep("password");
      } else {
        await sendOTP(phone);
        setTestOtp(getOtpFromSession(phone));
        if (!result.exists) setRegistrationData((d) => ({ ...d, phone }));
        setStep("otp");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handlePasswordLogin(e) {
    e.preventDefault();
    if (!password) {
      setError("Enter your password");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await loginWithPassword(phone, password);
      void navigate({ to: nextPath });
    } catch {
      setError("Incorrect password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleOTPVerify(e) {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const valid = await verifyOTP(phone, otp);
      if (!valid) {
        setError("Incorrect OTP. Try again.");
        setIsLoading(false);
        return;
      }
      setStep("set-password");
    } catch {
      setError("OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSetPassword(e) {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const result = await setupPassword(phone, otp, newPassword);
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }
      if (flow === "forgot") {
        setFlow("login");
        setStep("phone");
        setPhone("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setTestOtp(null);
        return;
      }
      if (isNewUser) {
        setStep("register");
      } else {
        await login(phone);
        void navigate({ to: nextPath });
      }
    } catch {
      setError("Failed to set password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  function handleRegister(e) {
    e.preventDefault();
    if (!registrationData.name.trim() || !registrationData.email.trim()) {
      setError("Please fill all required fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(registrationData.email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setStep("address");
  }
  function handlePincodeChange(value) {
    const pin = value.replace(/\D/g, "");
    setAddressData((d) => ({ ...d, pincode: pin }));
    if (pin.length === 6) {
      const match = PINCODE_MAP[pin];
      setAddressData((d) => ({
        ...d,
        pincode: pin,
        city: (match == null ? void 0 : match.city) ?? "Mumbai",
        state: (match == null ? void 0 : match.state) ?? "Maharashtra"
      }));
    }
  }
  async function handleAddressSubmit(e) {
    var _a;
    e.preventDefault();
    if (!addressData.flat.trim() || !addressData.building.trim()) {
      setError("Flat No. and Building are required");
      return;
    }
    if (addressData.pincode.length !== 6) {
      setError("Enter a valid 6-digit pin code");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const result = await registerUser(registrationData);
      await addAddress(result.user.id, addressData);
      (_a = window.__dhobiSetAuth) == null ? void 0 : _a.call(window, result.user, result.token);
      void navigate({ to: nextPath });
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleResendOTP() {
    setOtp("");
    setTestOtp(null);
    await sendOTP(phone);
    setTestOtp(getOtpFromSession(phone));
  }
  const steps = getSteps();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        onBack: () => {
          if (step === "phone" || flow === "forgot") {
            if (flow === "forgot") {
              setFlow("login");
              setStep("phone");
            } else void navigate({ to: "/" });
          } else {
            const backMap = {
              password: "phone",
              otp: "phone",
              "set-password": "otp",
              register: "set-password",
              address: "register"
            };
            const prev = backMap[step];
            if (prev) setStep(prev);
            else void navigate({ to: "/" });
          }
          setError("");
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { steps, currentStep: step }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-start justify-center px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      testOtp && step === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-4 p-3 rounded-xl border text-sm font-medium flex items-center gap-2",
          style: {
            background: "oklch(var(--gold) / 0.1)",
            borderColor: "oklch(var(--gold) / 0.3)",
            color: "oklch(var(--gold))"
          },
          "data-ocid": "otp-test-banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Test Mode — Your OTP is:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tracking-widest", children: testOtp })
            ] })
          ]
        }
      ),
      flow === "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-4 p-3 rounded-xl border text-sm font-medium flex items-center gap-2",
          style: {
            background: "oklch(var(--navy) / 0.06)",
            borderColor: "oklch(var(--navy) / 0.2)",
            color: "oklch(var(--navy))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reset Password — verify your number to set a new password." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-lg overflow-hidden", children: [
        step === "phone" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: flow === "forgot" ? "Forgot Password?" : "Welcome Back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: flow === "forgot" ? "Enter your registered mobile number to reset your password" : "Enter your mobile number to continue" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePhoneSubmit, noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-semibold text-foreground mb-2",
                  htmlFor: "phone",
                  children: "Mobile Number"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1.5 px-3 py-3 rounded-xl border text-sm font-semibold shrink-0",
                    style: {
                      background: "oklch(var(--navy) / 0.06)",
                      borderColor: "oklch(var(--navy) / 0.15)",
                      color: "oklch(var(--navy))"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🇮🇳" }),
                      " +91"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "phone",
                    type: "tel",
                    inputMode: "numeric",
                    pattern: "[0-9]{10}",
                    maxLength: 10,
                    value: phone,
                    onChange: (e) => setPhone(e.target.value.replace(/\D/g, "")),
                    placeholder: "9876543210",
                    className: "input-navy flex-1 text-lg font-medium tracking-wide",
                    "data-ocid": "login-phone-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: flow === "forgot" ? "An OTP will be sent to verify your identity" : "We'll check if you have an account" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading || phone.length < 10,
                className: "btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50",
                "data-ocid": "login-phone-submit",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Please wait…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  flow === "forgot" ? "Send OTP" : "Continue",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              }
            )
          ] }),
          flow === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-5 border-t border-border text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "By continuing, you agree to our",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "underline cursor-pointer",
                style: { color: "oklch(var(--gold))" },
                children: "Terms of Service"
              }
            ),
            " ",
            "&",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "underline cursor-pointer",
                style: { color: "oklch(var(--gold))" },
                children: "Privacy Policy"
              }
            )
          ] }) })
        ] }),
        step === "password" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setStep("phone");
                setPassword("");
                setError("");
              },
              className: "flex items-center gap-1 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors",
              "data-ocid": "password-back-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                " Change number"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold",
                style: {
                  background: "oklch(var(--gold) / 0.12)",
                  color: "oklch(var(--gold))"
                },
                children: phone[0] ?? "?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
                "+91 ",
                phone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Welcome back!" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePasswordLogin, noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-semibold text-foreground mb-1.5",
                  htmlFor: "login-password",
                  children: "Password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PasswordInput,
                {
                  id: "login-password",
                  value: password,
                  onChange: setPassword,
                  dataOcid: "login-password-input",
                  autoFocus: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading || !password,
                className: "btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50",
                "data-ocid": "login-password-submit",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Logging in…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                  " Log In"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setFlow("forgot");
                  setStep("phone");
                  setPassword("");
                  setError("");
                },
                className: "w-full text-center text-sm mt-4 py-2 transition-colors hover:underline",
                style: { color: "oklch(var(--gold))" },
                "data-ocid": "forgot-password-btn",
                children: "Forgot Password?"
              }
            )
          ] })
        ] }),
        step === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setStep("phone");
                setOtp("");
                setError("");
                setTestOtp(null);
              },
              className: "flex items-center gap-1 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors",
              "data-ocid": "otp-back-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                " Change number"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Verify OTP" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Code sent to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                "+91 ",
                phone
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleOTPVerify, noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  className: "block text-sm font-semibold text-foreground mb-2",
                  htmlFor: "otp",
                  children: "Enter 6-digit OTP"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "otp",
                  type: "text",
                  inputMode: "numeric",
                  maxLength: 6,
                  value: otp,
                  onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
                  placeholder: "• • • • • •",
                  className: "input-navy text-center text-2xl tracking-[0.5em] font-bold w-full",
                  "data-ocid": "login-otp-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 text-center", children: "OTP is valid for 10 minutes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading || otp.length < 6,
                className: "btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50",
                "data-ocid": "login-otp-submit",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Verifying…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                  " Verify & Continue"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void handleResendOTP(),
                className: "w-full text-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors py-2",
                "data-ocid": "otp-resend-btn",
                children: "Didn't receive? Resend OTP"
              }
            )
          ] })
        ] }),
        step === "set-password" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KeyRound,
                {
                  className: "w-5 h-5",
                  style: { color: "oklch(var(--gold))" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: flow === "forgot" ? "Set New Password" : "Create Password" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: flow === "forgot" ? "Choose a new password for your account" : "Set a password so you can log in quickly next time" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSetPassword, noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "new-pwd",
                    children: [
                      "New Password ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PasswordInput,
                  {
                    id: "new-pwd",
                    value: newPassword,
                    onChange: setNewPassword,
                    placeholder: "Min. 6 characters",
                    dataOcid: "set-password-input",
                    autoFocus: true
                  }
                ),
                newPassword.length > 0 && newPassword.length < 6 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: "At least 6 characters required" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "confirm-pwd",
                    children: [
                      "Confirm Password",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PasswordInput,
                  {
                    id: "confirm-pwd",
                    value: confirmPassword,
                    onChange: setConfirmPassword,
                    placeholder: "Repeat your password",
                    dataOcid: "confirm-password-input"
                  }
                ),
                confirmPassword.length > 0 && confirmPassword !== newPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs mt-1", children: "Passwords do not match" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading || newPassword.length < 6 || newPassword !== confirmPassword,
                className: "btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50",
                "data-ocid": "set-password-submit",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Saving…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                  flow === "forgot" ? "Reset Password" : "Set Password & Continue"
                ] })
              }
            )
          ] })
        ] }),
        step === "register" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Create Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Almost there! Tell us a bit about yourself" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRegister, noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "reg-name",
                    children: [
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "reg-name",
                    type: "text",
                    value: registrationData.name,
                    onChange: (e) => setRegistrationData((d) => ({
                      ...d,
                      name: e.target.value
                    })),
                    placeholder: "Your full name",
                    className: "input-navy",
                    "data-ocid": "register-name-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "reg-email",
                    children: [
                      "Email Address",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "reg-email",
                    type: "email",
                    value: registrationData.email,
                    onChange: (e) => setRegistrationData((d) => ({
                      ...d,
                      email: e.target.value
                    })),
                    placeholder: "you@example.com",
                    className: "input-navy",
                    "data-ocid": "register-email-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-sm font-semibold text-foreground mb-1.5", children: "Mobile Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-muted/50 cursor-not-allowed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🇮🇳" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-medium", children: [
                    "+91 ",
                    phone
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 ml-auto text-green-600" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Verified via OTP" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                className: "btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold",
                "data-ocid": "register-submit",
                children: [
                  "Continue to Address ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ] })
        ] }),
        step === "address" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  className: "w-5 h-5",
                  style: { color: "oklch(var(--gold))" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Your Address" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Where should we pick up your laundry from?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddressSubmit, noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-sm font-semibold text-foreground mb-1.5", children: "Address Label" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Home", "Office", "Other"].map((lbl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAddressData((d) => ({ ...d, label: lbl })),
                    className: [
                      "flex-1 py-2 rounded-lg text-sm font-medium border transition-all",
                      addressData.label === lbl ? "text-white border-transparent" : "bg-background text-muted-foreground border-border hover:border-primary/30"
                    ].join(" "),
                    style: addressData.label === lbl ? {
                      background: "oklch(var(--navy))",
                      borderColor: "oklch(var(--navy))"
                    } : {},
                    children: [
                      lbl === "Home" ? "🏠" : lbl === "Office" ? "🏢" : "📍",
                      " ",
                      lbl
                    ]
                  },
                  lbl
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "block text-sm font-semibold text-foreground mb-1.5",
                      htmlFor: "addr-flat",
                      children: [
                        "Flat No. ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "addr-flat",
                      type: "text",
                      value: addressData.flat,
                      onChange: (e) => setAddressData((d) => ({
                        ...d,
                        flat: e.target.value
                      })),
                      placeholder: "301",
                      className: "input-navy",
                      "data-ocid": "address-flat-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "block text-sm font-semibold text-foreground mb-1.5",
                      htmlFor: "addr-building",
                      children: [
                        "Building ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "addr-building",
                      type: "text",
                      value: addressData.building,
                      onChange: (e) => setAddressData((d) => ({
                        ...d,
                        building: e.target.value
                      })),
                      placeholder: "Oberoi Towers",
                      className: "input-navy",
                      "data-ocid": "address-building-input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "addr-society",
                    children: "Society / Area"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "addr-society",
                    type: "text",
                    value: addressData.society,
                    onChange: (e) => setAddressData((d) => ({
                      ...d,
                      society: e.target.value
                    })),
                    placeholder: "Andheri West",
                    className: "input-navy",
                    "data-ocid": "address-society-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "addr-landmark",
                    children: "Landmark"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "addr-landmark",
                    type: "text",
                    value: addressData.landmark,
                    onChange: (e) => setAddressData((d) => ({
                      ...d,
                      landmark: e.target.value
                    })),
                    placeholder: "Near Kokilaben Hospital",
                    className: "input-navy"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "block text-sm font-semibold text-foreground mb-1.5",
                    htmlFor: "addr-pin",
                    children: [
                      "Pin Code ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "addr-pin",
                    type: "text",
                    inputMode: "numeric",
                    maxLength: 6,
                    value: addressData.pincode,
                    onChange: (e) => handlePincodeChange(e.target.value),
                    placeholder: "400053",
                    className: "input-navy",
                    "data-ocid": "address-pincode-input"
                  }
                ),
                addressData.pincode.length === 6 && addressData.city && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs mt-1 flex items-center gap-1",
                    style: { color: "oklch(var(--gold))" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                      " Auto-detected:",
                      " ",
                      addressData.city,
                      ", ",
                      addressData.state
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-semibold text-foreground mb-1.5",
                      htmlFor: "addr-city",
                      children: "City"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "addr-city",
                      type: "text",
                      value: addressData.city,
                      onChange: (e) => setAddressData((d) => ({
                        ...d,
                        city: e.target.value
                      })),
                      placeholder: "Mumbai",
                      className: "input-navy"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-sm font-semibold text-foreground mb-1.5",
                      htmlFor: "addr-state",
                      children: "State"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "addr-state",
                      type: "text",
                      value: addressData.state,
                      onChange: (e) => setAddressData((d) => ({
                        ...d,
                        state: e.target.value
                      })),
                      placeholder: "Maharashtra",
                      className: "input-navy"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-sm font-semibold text-foreground mb-1.5", children: "Country" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-muted/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🇮🇳" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "India" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading,
                className: "btn-gold w-full py-3.5 rounded-xl mt-5 flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50",
                "data-ocid": "address-submit",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Creating account…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                  " Complete Registration"
                ] })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-5", children: "Serving Mumbai with premium laundry care since 2024" })
    ] }) })
  ] });
}
export {
  LoginPage as default
};
