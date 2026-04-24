import { APP_CONFIG } from "@/config";
import { useAuth } from "@/contexts/auth.context";
import { Link } from "@tanstack/react-router";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function Layout({
  children,
  showHeader = true,
  showFooter = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && <PublicHeader />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

function PublicHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-ocid="nav-logo">
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
        <nav className="flex items-center gap-3" data-ocid="nav-public">
          <Link
            to="/prices"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav-prices"
          >
            Price List
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav-contact"
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="btn-gold px-4 py-2 rounded-lg text-sm"
              data-ocid="nav-dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn-gold px-4 py-2 rounded-lg text-sm"
              data-ocid="nav-login"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display font-bold text-lg">
                <span className="text-foreground">Dhobi</span>
                <span className="text-gold">Ghat</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {APP_CONFIG.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-foreground">
              Contact
            </h4>
            <p className="text-sm text-muted-foreground">{APP_CONFIG.phone}</p>
            <p className="text-sm text-muted-foreground">{APP_CONFIG.email}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2 text-foreground">
              Address
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {APP_CONFIG.address}
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} DhobiGhat. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={utmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
