import type { User } from "@/types";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Home,
  LayoutGrid,
  ListOrdered,
  LogOut,
  Phone,
  RefreshCw,
  Tag,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/services", label: "Our Services", icon: LayoutGrid },
  { to: "/dashboard/schedule", label: "Request Pickup", icon: Calendar },
  { to: "/dashboard/reschedule", label: "Reschedule Pickup", icon: RefreshCw },
  { to: "/dashboard/requests", label: "My Request List", icon: ListOrdered },
  { to: "/prices", label: "Price List", icon: Tag },
  { to: "/contact", label: "Contact Us", icon: Phone },
  { to: "/pay", label: "Pay Now", icon: CreditCard },
] as const;

interface DashboardNavProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  user: User | null;
}

export function DashboardNav({
  isOpen,
  onClose,
  onLogout,
  user,
}: DashboardNavProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full border-none"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />

      {/* Slide-in panel from right */}
      <div className="absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-card shadow-elevated flex flex-col">
        {/* User header — navy gradient */}
        <div className="gradient-primary px-5 pt-10 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full border-2 border-accent/50 bg-accent/20 flex items-center justify-center mb-3">
                <span className="font-bold text-xl text-gold">
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
              <p className="font-semibold text-base text-primary-foreground truncate">
                {user?.name ?? "User"}
              </p>
              <p className="text-sm text-primary-foreground/70 mt-0.5">
                {user?.phone}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-smooth -mt-1 -mr-1"
              aria-label="Close menu"
              data-ocid="dashboard-menu-close"
            >
              <X className="w-5 h-5 text-primary-foreground/80" />
            </button>
          </div>
        </div>

        {/* Nav items list */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              item.to === "/dashboard"
                ? currentPath === "/dashboard"
                : currentPath.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3.5 transition-smooth group border-r-2 ${
                  isActive
                    ? "bg-primary/8 border-primary"
                    : "border-transparent hover:bg-muted"
                }`}
                data-ocid={`nav-item-${item.to.replace(/\//g, "-").slice(1)}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-smooth ${
                    isActive
                      ? "bg-primary"
                      : "bg-muted group-hover:bg-primary/10"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-primary"}`}
                  />
                </div>
                <span
                  className={`flex-1 font-medium text-sm ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {index + 1}. {item.label}
                </span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-opacity ${
                    isActive
                      ? "opacity-100 text-primary"
                      : "opacity-0 group-hover:opacity-40 text-muted-foreground"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-destructive hover:bg-destructive/8 transition-smooth"
            data-ocid="nav-logout"
          >
            <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
              <LogOut className="w-4 h-4 text-destructive" />
            </div>
            <span className="font-medium text-sm">9. Logout</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}
