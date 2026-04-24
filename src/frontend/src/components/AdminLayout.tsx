import { useAdmin } from "@/contexts/admin.context";
import { Link, useRouter } from "@tanstack/react-router";
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Shield,
  Tag,
  Truck,
  Users,
} from "lucide-react";

const ADMIN_NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/rates", label: "Rate Management", icon: Tag },
  { to: "/admin/orders", label: "Orders & Delivery", icon: Truck },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/loyalty", label: "Loyalty & Offers", icon: Users },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout, email, isPasswordResetDue } = useAdmin();
  const router = useRouter();

  function handleLogout() {
    logout();
    void router.navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-primary border-b border-primary/80 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-primary-foreground text-lg">
              DhobiGhat <span className="text-accent font-semibold">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isPasswordResetDue && (
              <span className="hidden sm:inline text-xs bg-destructive/20 text-destructive-foreground px-2 py-1 rounded-full font-medium">
                Password reset due
              </span>
            )}
            <span className="text-xs text-primary-foreground/70 hidden sm:block truncate max-w-[180px]">
              {email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              data-ocid="admin-logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden md:flex flex-col border-r border-border bg-card">
          <nav className="flex-1 py-4">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                data-ocid={`admin-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex-1 flex flex-col items-center gap-1 py-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="truncate w-full text-center">
                {item.label.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
