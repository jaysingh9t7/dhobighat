import { APP_CONFIG } from "@/config";
import { useAdmin } from "@/contexts/admin.context";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [email, setEmail] = useState("admin@mydhobighat.com");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    void navigate({ to: "/admin/dashboard" });
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Back button */}
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 group"
          aria-label="Back to home"
          data-ocid="admin-back-home"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={APP_CONFIG.logo}
              alt="DhobiGhat"
              className="h-20 w-auto object-contain rounded-xl"
              style={{ maxWidth: "160px" }}
            />
          </div>
          <h1 className="font-display font-bold text-2xl text-primary-foreground">
            Admin Portal
          </h1>
          <p className="text-primary-foreground/60 text-sm mt-1">
            DhobiGhat Management System
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-elevated p-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="admin-email"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-navy"
                data-ocid="admin-email-input"
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="admin-pwd"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-pwd"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-navy pr-10"
                  data-ocid="admin-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-destructive text-sm mb-4">{error}</p>}

            <div className="mb-3 p-3 rounded-lg bg-accent/10 border border-accent/20 text-xs text-foreground">
              Default password:{" "}
              <span className="font-mono font-semibold">Dhobighat@2024</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold w-full py-3 rounded-xl text-base font-semibold"
              data-ocid="admin-login-submit"
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-primary-foreground/40 mt-4">
          Restricted access — authorized personnel only
        </p>
      </div>
    </div>
  );
}
