import { APP_CONFIG } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import * as api from "@/services/api.service";
import type { AddressFormData, RegistrationData } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Home,
  KeyRound,
  Lock,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { useRef, useState } from "react";

// =============================================================================
// Types
// =============================================================================

type Flow = "login" | "forgot";

type LoginStep =
  | "phone" // enter phone
  | "password" // returning user with password → enter password
  | "otp" // OTP entry (new user OR returning without password OR forgot pw)
  | "set-password" // set / reset password after OTP
  | "register" // new user → collect name + email
  | "address"; // new user → collect address

// Steps for the progress bar per flow
const NEW_USER_STEPS = [
  "phone",
  "otp",
  "set-password",
  "register",
  "address",
] as const;
const RETURNING_NO_PWD_STEPS = ["phone", "otp", "set-password"] as const;
const RETURNING_STEPS = ["phone", "password"] as const;
const FORGOT_STEPS = ["phone", "otp", "set-password"] as const;

// =============================================================================
// Pincode lookup
// =============================================================================
const PINCODE_MAP: Record<string, { city: string; state: string }> = {
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
  "302001": { city: "Jaipur", state: "Rajasthan" },
};

// =============================================================================
// Helpers
// =============================================================================

function getOtpFromSession(phone: string): string | null {
  const session = api._sessions.get(phone);
  return session ? session.otp : null;
}

function LoadingSpinner({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      {label}
    </span>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return msg ? (
    <p className="text-destructive text-sm mb-4 flex items-center gap-1.5">
      <span>⚠</span> {msg}
    </p>
  ) : null;
}

// =============================================================================
// Header
// =============================================================================
function PageHeader({ onBack }: { onBack: () => void }) {
  return (
    <header
      className="px-4 py-4 flex items-center gap-3"
      style={{ background: "oklch(var(--navy))" }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        aria-label="Back"
        data-ocid="login-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2">
        <img
          src={APP_CONFIG.logo}
          alt="DhobiGhat"
          className="h-10 w-auto object-contain rounded-lg"
          style={{ maxWidth: "120px" }}
        />
      </div>
    </header>
  );
}

// =============================================================================
// Progress bar
// =============================================================================
function ProgressBar({
  steps,
  currentStep,
}: {
  steps: readonly string[];
  currentStep: string;
}) {
  const currentIdx = steps.indexOf(currentStep as (typeof steps)[number]);

  const STEP_LABELS: Record<string, { label: string; icon: React.ReactNode }> =
    {
      phone: { label: "Phone", icon: <Phone className="w-4 h-4" /> },
      password: { label: "Login", icon: <Lock className="w-4 h-4" /> },
      otp: { label: "Verify", icon: <ShieldCheck className="w-4 h-4" /> },
      "set-password": {
        label: "Password",
        icon: <KeyRound className="w-4 h-4" />,
      },
      register: { label: "Profile", icon: <UserPlus className="w-4 h-4" /> },
      address: { label: "Address", icon: <Home className="w-4 h-4" /> },
    };

  return (
    <div
      className="px-4 py-3 border-b border-border"
      style={{ background: "oklch(var(--navy-deep))" }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((s, i) => {
          const isActive = s === currentStep;
          const isDone = i < currentIdx;
          const meta = STEP_LABELS[s] ?? { label: s, icon: null };
          return (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isDone
                      ? "oklch(var(--gold))"
                      : isActive
                        ? "oklch(var(--gold) / 0.9)"
                        : "oklch(var(--navy) / 0.5)",
                    border:
                      isActive || isDone
                        ? "2px solid oklch(var(--gold))"
                        : "2px solid oklch(1 0 0 / 0.15)",
                    color: isDone || isActive ? "white" : "oklch(1 0 0 / 0.3)",
                  }}
                >
                  {isDone ? <CheckCircle className="w-4 h-4" /> : meta.icon}
                </div>
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color:
                      isActive || isDone
                        ? "oklch(1 0 0 / 0.9)"
                        : "oklch(1 0 0 / 0.3)",
                  }}
                >
                  {meta.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-1 mb-4 transition-all duration-300"
                  style={{
                    background:
                      i < currentIdx
                        ? "oklch(var(--gold))"
                        : "oklch(1 0 0 / 0.12)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// Password input with show/hide toggle
// =============================================================================
function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  dataOcid,
  autoFocus,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dataOcid?: string;
  autoFocus?: boolean;
}) {
  const [show, setShow] = useState(false);
  // Track whether we've already focused once — prevents re-focusing on every re-render
  const hasFocused = useRef(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "••••••••"}
        className="input-navy w-full pr-10"
        data-ocid={dataOcid}
        ref={(el) => {
          if (autoFocus && el && !hasFocused.current) {
            hasFocused.current = true;
            setTimeout(() => el.focus(), 50);
          }
        }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

// =============================================================================
// Main component
// =============================================================================
export default function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { next?: string };
  const nextPath = search?.next ?? "/dashboard";
  const { login, loginWithPassword } = useAuth();

  const [flow, setFlow] = useState<Flow>("login");
  const [step, setStep] = useState<LoginStep>("phone");

  // User state from phone check
  const [isNewUser, setIsNewUser] = useState(false);
  const [userHasPassword, setUserHasPassword] = useState(false);

  // Field values
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [testOtp, setTestOtp] = useState<string | null>(null);

  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: "",
    email: "",
    phone: "",
  });
  const [addressData, setAddressData] = useState<AddressFormData>({
    label: "Home",
    flat: "",
    building: "",
    society: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "India",
  });

  // Determine progress steps based on current state
  function getSteps(): readonly string[] {
    if (flow === "forgot") return FORGOT_STEPS;
    if (!isNewUser && userHasPassword) return RETURNING_STEPS;
    if (!isNewUser && !userHasPassword) return RETURNING_NO_PWD_STEPS;
    return NEW_USER_STEPS;
  }

  // ── Step: Phone ──────────────────────────────────────────────────────────
  async function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit number");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      if (flow === "forgot") {
        // Forgot password: always send OTP regardless of existence
        await api.sendOTP(phone);
        setTestOtp(getOtpFromSession(phone));
        setStep("otp");
        return;
      }

      const result = await api.checkUserExists(phone);
      setIsNewUser(!result.exists);
      setUserHasPassword(result.hasPassword);

      if (result.exists && result.hasPassword) {
        // Returning user with password → skip OTP, go to password step
        setStep("password");
      } else {
        // New user OR returning without password → send OTP
        await api.sendOTP(phone);
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

  // ── Step: Password (returning user login) ─────────────────────────────────
  async function handlePasswordLogin(e: React.FormEvent) {
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

  // ── Step: OTP verify ──────────────────────────────────────────────────────
  async function handleOTPVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const valid = await api.verifyOTP(phone, otp);
      if (!valid) {
        setError("Incorrect OTP. Try again.");
        setIsLoading(false);
        return;
      }
      // OTP valid → go to set-password
      setStep("set-password");
    } catch {
      setError("OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  }

  // ── Step: Set/Reset Password ──────────────────────────────────────────────
  async function handleSetPassword(e: React.FormEvent) {
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
      const result = await api.setupPassword(phone, otp, newPassword);
      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      if (flow === "forgot") {
        // Forgot password: password reset done → go back to login
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
        // New user: proceed to register profile
        setStep("register");
      } else {
        // Returning user without password: log them in now
        await login(phone);
        void navigate({ to: nextPath });
      }
    } catch {
      setError("Failed to set password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // ── Step: Register ────────────────────────────────────────────────────────
  function handleRegister(e: React.FormEvent) {
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

  // ── Step: Address ─────────────────────────────────────────────────────────
  function handlePincodeChange(value: string) {
    const pin = value.replace(/\D/g, "");
    setAddressData((d) => ({ ...d, pincode: pin }));
    if (pin.length === 6) {
      const match = PINCODE_MAP[pin];
      setAddressData((d) => ({
        ...d,
        pincode: pin,
        city: match?.city ?? "Mumbai",
        state: match?.state ?? "Maharashtra",
      }));
    }
  }

  async function handleAddressSubmit(e: React.FormEvent) {
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
      const result = await api.registerUser(registrationData);
      await api.addAddress(result.user.id, addressData);
      (
        window as {
          __dhobiSetAuth?: (u: typeof result.user, t: string) => void;
        }
      ).__dhobiSetAuth?.(result.user, result.token);
      void navigate({ to: nextPath });
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // ── Resend OTP ────────────────────────────────────────────────────────────
  async function handleResendOTP() {
    setOtp("");
    setTestOtp(null);
    await api.sendOTP(phone);
    setTestOtp(getOtpFromSession(phone));
  }

  const steps = getSteps();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        onBack={() => {
          if (step === "phone" || flow === "forgot") {
            if (flow === "forgot") {
              setFlow("login");
              setStep("phone");
            } else void navigate({ to: "/" });
          } else {
            // Go back within multi-step flow
            const backMap: Partial<Record<LoginStep, LoginStep>> = {
              password: "phone",
              otp: "phone",
              "set-password": "otp",
              register: "set-password",
              address: "register",
            };
            const prev = backMap[step];
            if (prev) setStep(prev);
            else void navigate({ to: "/" });
          }
          setError("");
        }}
      />

      <ProgressBar steps={steps} currentStep={step} />

      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* OTP test banner */}
          {testOtp && step === "otp" && (
            <div
              className="mb-4 p-3 rounded-xl border text-sm font-medium flex items-center gap-2"
              style={{
                background: "oklch(var(--gold) / 0.1)",
                borderColor: "oklch(var(--gold) / 0.3)",
                color: "oklch(var(--gold))",
              }}
              data-ocid="otp-test-banner"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                Test Mode — Your OTP is:{" "}
                <span className="font-bold tracking-widest">{testOtp}</span>
              </span>
            </div>
          )}

          {/* Forgot password banner */}
          {flow === "forgot" && (
            <div
              className="mb-4 p-3 rounded-xl border text-sm font-medium flex items-center gap-2"
              style={{
                background: "oklch(var(--navy) / 0.06)",
                borderColor: "oklch(var(--navy) / 0.2)",
                color: "oklch(var(--navy))",
              }}
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              <span>
                Reset Password — verify your number to set a new password.
              </span>
            </div>
          )}

          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            {/* ── PHONE STEP ── */}
            {step === "phone" && (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                    {flow === "forgot" ? "Forgot Password?" : "Welcome Back"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {flow === "forgot"
                      ? "Enter your registered mobile number to reset your password"
                      : "Enter your mobile number to continue"}
                  </p>
                </div>

                <form onSubmit={handlePhoneSubmit} noValidate>
                  <div className="mb-5">
                    <label
                      className="block text-sm font-semibold text-foreground mb-2"
                      htmlFor="phone"
                    >
                      Mobile Number
                    </label>
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-1.5 px-3 py-3 rounded-xl border text-sm font-semibold shrink-0"
                        style={{
                          background: "oklch(var(--navy) / 0.06)",
                          borderColor: "oklch(var(--navy) / 0.15)",
                          color: "oklch(var(--navy))",
                        }}
                      >
                        <span className="text-base">🇮🇳</span> +91
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="9876543210"
                        className="input-navy flex-1 text-lg font-medium tracking-wide"
                        data-ocid="login-phone-input"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {flow === "forgot"
                        ? "An OTP will be sent to verify your identity"
                        : "We'll check if you have an account"}
                    </p>
                  </div>

                  <ErrorMsg msg={error} />

                  <button
                    type="submit"
                    disabled={isLoading || phone.length < 10}
                    className="btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50"
                    data-ocid="login-phone-submit"
                  >
                    {isLoading ? (
                      <LoadingSpinner label="Please wait…" />
                    ) : (
                      <>
                        {flow === "forgot" ? "Send OTP" : "Continue"}{" "}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {flow === "login" && (
                  <div className="mt-5 pt-5 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                      By continuing, you agree to our{" "}
                      <span
                        className="underline cursor-pointer"
                        style={{ color: "oklch(var(--gold))" }}
                      >
                        Terms of Service
                      </span>{" "}
                      &amp;{" "}
                      <span
                        className="underline cursor-pointer"
                        style={{ color: "oklch(var(--gold))" }}
                      >
                        Privacy Policy
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── PASSWORD STEP (returning user) ── */}
            {step === "password" && (
              <div className="p-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setPassword("");
                    setError("");
                  }}
                  className="flex items-center gap-1 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors"
                  data-ocid="password-back-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change number
                </button>

                <div className="mb-6">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{
                        background: "oklch(var(--gold) / 0.12)",
                        color: "oklch(var(--gold))",
                      }}
                    >
                      {phone[0] ?? "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        +91 {phone}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Welcome back!
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePasswordLogin} noValidate>
                  <div className="mb-5">
                    <label
                      className="block text-sm font-semibold text-foreground mb-1.5"
                      htmlFor="login-password"
                    >
                      Password
                    </label>
                    <PasswordInput
                      id="login-password"
                      value={password}
                      onChange={setPassword}
                      dataOcid="login-password-input"
                      autoFocus
                    />
                  </div>

                  <ErrorMsg msg={error} />

                  <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50"
                    data-ocid="login-password-submit"
                  >
                    {isLoading ? (
                      <LoadingSpinner label="Logging in…" />
                    ) : (
                      <>
                        <Lock className="w-4 h-4" /> Log In
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFlow("forgot");
                      setStep("phone");
                      setPassword("");
                      setError("");
                    }}
                    className="w-full text-center text-sm mt-4 py-2 transition-colors hover:underline"
                    style={{ color: "oklch(var(--gold))" }}
                    data-ocid="forgot-password-btn"
                  >
                    Forgot Password?
                  </button>
                </form>
              </div>
            )}

            {/* ── OTP STEP ── */}
            {step === "otp" && (
              <div className="p-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setError("");
                    setTestOtp(null);
                  }}
                  className="flex items-center gap-1 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors"
                  data-ocid="otp-back-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change number
                </button>

                <div className="mb-6">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                    Verify OTP
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Code sent to{" "}
                    <span className="font-semibold text-foreground">
                      +91 {phone}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleOTPVerify} noValidate>
                  <div className="mb-5">
                    <label
                      className="block text-sm font-semibold text-foreground mb-2"
                      htmlFor="otp"
                    >
                      Enter 6-digit OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="• • • • • •"
                      className="input-navy text-center text-2xl tracking-[0.5em] font-bold w-full"
                      data-ocid="login-otp-input"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5 text-center">
                      OTP is valid for 10 minutes
                    </p>
                  </div>

                  <ErrorMsg msg={error} />

                  <button
                    type="submit"
                    disabled={isLoading || otp.length < 6}
                    className="btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50"
                    data-ocid="login-otp-submit"
                  >
                    {isLoading ? (
                      <LoadingSpinner label="Verifying…" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" /> Verify &amp;
                        Continue
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleResendOTP()}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors py-2"
                    data-ocid="otp-resend-btn"
                  >
                    Didn't receive? Resend OTP
                  </button>
                </form>
              </div>
            )}

            {/* ── SET PASSWORD STEP ── */}
            {step === "set-password" && (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <KeyRound
                      className="w-5 h-5"
                      style={{ color: "oklch(var(--gold))" }}
                    />
                    <h2 className="font-display font-bold text-2xl text-foreground">
                      {flow === "forgot"
                        ? "Set New Password"
                        : "Create Password"}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {flow === "forgot"
                      ? "Choose a new password for your account"
                      : "Set a password so you can log in quickly next time"}
                  </p>
                </div>

                <form onSubmit={handleSetPassword} noValidate>
                  <div className="space-y-4 mb-5">
                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="new-pwd"
                      >
                        New Password <span className="text-destructive">*</span>
                      </label>
                      <PasswordInput
                        id="new-pwd"
                        value={newPassword}
                        onChange={setNewPassword}
                        placeholder="Min. 6 characters"
                        dataOcid="set-password-input"
                        autoFocus
                      />
                      {newPassword.length > 0 && newPassword.length < 6 && (
                        <p className="text-destructive text-xs mt-1">
                          At least 6 characters required
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="confirm-pwd"
                      >
                        Confirm Password{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <PasswordInput
                        id="confirm-pwd"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Repeat your password"
                        dataOcid="confirm-password-input"
                      />
                      {confirmPassword.length > 0 &&
                        confirmPassword !== newPassword && (
                          <p className="text-destructive text-xs mt-1">
                            Passwords do not match
                          </p>
                        )}
                    </div>
                  </div>

                  <ErrorMsg msg={error} />

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      newPassword.length < 6 ||
                      newPassword !== confirmPassword
                    }
                    className="btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50"
                    data-ocid="set-password-submit"
                  >
                    {isLoading ? (
                      <LoadingSpinner label="Saving…" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        {flow === "forgot"
                          ? "Reset Password"
                          : "Set Password & Continue"}
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ── REGISTER STEP ── */}
            {step === "register" && (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                    Create Account
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Almost there! Tell us a bit about yourself
                  </p>
                </div>

                <form onSubmit={handleRegister} noValidate>
                  <div className="space-y-4 mb-5">
                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="reg-name"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="reg-name"
                        type="text"
                        value={registrationData.name}
                        onChange={(e) =>
                          setRegistrationData((d) => ({
                            ...d,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Your full name"
                        className="input-navy"
                        data-ocid="register-name-input"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="reg-email"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        value={registrationData.email}
                        onChange={(e) =>
                          setRegistrationData((d) => ({
                            ...d,
                            email: e.target.value,
                          }))
                        }
                        placeholder="you@example.com"
                        className="input-navy"
                        data-ocid="register-email-input"
                      />
                    </div>

                    <div>
                      <p className="block text-sm font-semibold text-foreground mb-1.5">
                        Mobile Number
                      </p>
                      <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-muted/50 cursor-not-allowed">
                        <span className="text-base">🇮🇳</span>
                        <span className="text-sm text-muted-foreground font-medium">
                          +91 {phone}
                        </span>
                        <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Verified via OTP
                      </p>
                    </div>
                  </div>

                  <ErrorMsg msg={error} />

                  <button
                    type="submit"
                    className="btn-gold w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-base font-semibold"
                    data-ocid="register-submit"
                  >
                    Continue to Address <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ── ADDRESS STEP ── */}
            {step === "address" && (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin
                      className="w-5 h-5"
                      style={{ color: "oklch(var(--gold))" }}
                    />
                    <h2 className="font-display font-bold text-2xl text-foreground">
                      Your Address
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Where should we pick up your laundry from?
                  </p>
                </div>

                <form onSubmit={handleAddressSubmit} noValidate>
                  <div className="space-y-4">
                    {/* Label */}
                    <div>
                      <p className="block text-sm font-semibold text-foreground mb-1.5">
                        Address Label
                      </p>
                      <div className="flex gap-2">
                        {["Home", "Office", "Other"].map((lbl) => (
                          <button
                            key={lbl}
                            type="button"
                            onClick={() =>
                              setAddressData((d) => ({ ...d, label: lbl }))
                            }
                            className={[
                              "flex-1 py-2 rounded-lg text-sm font-medium border transition-all",
                              addressData.label === lbl
                                ? "text-white border-transparent"
                                : "bg-background text-muted-foreground border-border hover:border-primary/30",
                            ].join(" ")}
                            style={
                              addressData.label === lbl
                                ? {
                                    background: "oklch(var(--navy))",
                                    borderColor: "oklch(var(--navy))",
                                  }
                                : {}
                            }
                          >
                            {lbl === "Home"
                              ? "🏠"
                              : lbl === "Office"
                                ? "🏢"
                                : "📍"}{" "}
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="block text-sm font-semibold text-foreground mb-1.5"
                          htmlFor="addr-flat"
                        >
                          Flat No. <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="addr-flat"
                          type="text"
                          value={addressData.flat}
                          onChange={(e) =>
                            setAddressData((d) => ({
                              ...d,
                              flat: e.target.value,
                            }))
                          }
                          placeholder="301"
                          className="input-navy"
                          data-ocid="address-flat-input"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-foreground mb-1.5"
                          htmlFor="addr-building"
                        >
                          Building <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="addr-building"
                          type="text"
                          value={addressData.building}
                          onChange={(e) =>
                            setAddressData((d) => ({
                              ...d,
                              building: e.target.value,
                            }))
                          }
                          placeholder="Oberoi Towers"
                          className="input-navy"
                          data-ocid="address-building-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="addr-society"
                      >
                        Society / Area
                      </label>
                      <input
                        id="addr-society"
                        type="text"
                        value={addressData.society}
                        onChange={(e) =>
                          setAddressData((d) => ({
                            ...d,
                            society: e.target.value,
                          }))
                        }
                        placeholder="Andheri West"
                        className="input-navy"
                        data-ocid="address-society-input"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="addr-landmark"
                      >
                        Landmark
                      </label>
                      <input
                        id="addr-landmark"
                        type="text"
                        value={addressData.landmark}
                        onChange={(e) =>
                          setAddressData((d) => ({
                            ...d,
                            landmark: e.target.value,
                          }))
                        }
                        placeholder="Near Kokilaben Hospital"
                        className="input-navy"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-semibold text-foreground mb-1.5"
                        htmlFor="addr-pin"
                      >
                        Pin Code <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="addr-pin"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={addressData.pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="400053"
                        className="input-navy"
                        data-ocid="address-pincode-input"
                      />
                      {addressData.pincode.length === 6 && addressData.city && (
                        <p
                          className="text-xs mt-1 flex items-center gap-1"
                          style={{ color: "oklch(var(--gold))" }}
                        >
                          <CheckCircle className="w-3 h-3" /> Auto-detected:{" "}
                          {addressData.city}, {addressData.state}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="block text-sm font-semibold text-foreground mb-1.5"
                          htmlFor="addr-city"
                        >
                          City
                        </label>
                        <input
                          id="addr-city"
                          type="text"
                          value={addressData.city}
                          onChange={(e) =>
                            setAddressData((d) => ({
                              ...d,
                              city: e.target.value,
                            }))
                          }
                          placeholder="Mumbai"
                          className="input-navy"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-semibold text-foreground mb-1.5"
                          htmlFor="addr-state"
                        >
                          State
                        </label>
                        <input
                          id="addr-state"
                          type="text"
                          value={addressData.state}
                          onChange={(e) =>
                            setAddressData((d) => ({
                              ...d,
                              state: e.target.value,
                            }))
                          }
                          placeholder="Maharashtra"
                          className="input-navy"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="block text-sm font-semibold text-foreground mb-1.5">
                        Country
                      </p>
                      <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-muted/50">
                        <span className="text-base">🇮🇳</span>
                        <span className="text-sm font-medium text-foreground">
                          India
                        </span>
                      </div>
                    </div>
                  </div>

                  <ErrorMsg msg={error} />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-gold w-full py-3.5 rounded-xl mt-5 flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50"
                    data-ocid="address-submit"
                  >
                    {isLoading ? (
                      <LoadingSpinner label="Creating account…" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" /> Complete
                        Registration
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Serving Mumbai with premium laundry care since 2024
          </p>
        </div>
      </div>
    </div>
  );
}
