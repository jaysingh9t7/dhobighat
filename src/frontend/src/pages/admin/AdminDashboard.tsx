import { AdminLayout } from "@/components/AdminLayout";
import { useAdminStats } from "@/hooks/useQueries";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  const cards = [
    {
      label: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Today's Pickups",
      value: stats?.todayPickups ?? 0,
      icon: Package,
      color: "text-accent",
    },
    {
      label: "Pending Orders",
      value: stats?.pendingOrders ?? 0,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      label: "Total Revenue",
      value: `₹${stats?.totalRevenue ?? 0}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Paid Amount",
      value: `₹${stats?.paidAmount ?? 0}`,
      icon: CheckCircle,
      color: "text-green-700",
    },
    {
      label: "Pending Amount",
      value: `₹${stats?.pendingAmount ?? 0}`,
      icon: DollarSign,
      color: "text-red-600",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">
        Dashboard
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={`skeleton-${String(i)}`}
              className="h-28 bg-muted animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-card rounded-xl border border-border p-4 shadow-card"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {card.label}
                </p>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="font-bold text-2xl text-foreground">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
        <p className="text-sm font-semibold text-foreground mb-1">
          Quick Actions
        </p>
        <p className="text-xs text-muted-foreground">
          Use the sidebar to manage rates, orders, payments, and loyalty
          programs.
        </p>
      </div>
    </AdminLayout>
  );
}
