import { DashboardNav } from "@/components/DashboardNav";
import { APP_CONFIG } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    void router.navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2"
            data-ocid="dashboard-logo"
          >
            <img
              src={APP_CONFIG.logo}
              alt="DhobiGhat"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-display font-bold text-xl">
              <span className="text-foreground">Dhobi</span>
              <span className="text-gold">Ghat</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* User info pill — desktop */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-foreground truncate max-w-[160px]">
                {user?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.phone}
              </span>
            </div>

            {/* Hamburger — 3 lines */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Open navigation menu"
              data-ocid="dashboard-menu-open"
            >
              <div className="flex flex-col gap-[5px] w-[20px]">
                <span className="block h-[2px] w-full bg-foreground rounded-full" />
                <span className="block h-[2px] w-[14px] bg-foreground rounded-full" />
                <span className="block h-[2px] w-full bg-foreground rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out nav drawer */}
      <DashboardNav
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogout={handleLogout}
        user={user}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-muted/40 border-t border-border py-4 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
