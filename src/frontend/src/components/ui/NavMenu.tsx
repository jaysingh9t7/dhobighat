import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export interface NavItem {
  to: string;
  label: string;
}

interface NavMenuProps {
  items: NavItem[];
  className?: string;
}

export function NavMenu({ items, className }: NavMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop inline */}
      <nav className="hidden md:flex items-center gap-1">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-card border-b border-border shadow-elevated z-50">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors border-b border-border last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
