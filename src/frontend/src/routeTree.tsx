import { AdminProvider, useAdmin } from "@/contexts/admin.context";
import { AuthProvider, useAuth } from "@/contexts/auth.context";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy page imports
const HomePage = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/pages/Login"));
const ServicesPage = lazy(() => import("@/pages/Services"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const RequestsPage = lazy(() => import("@/pages/Requests"));
const SchedulePage = lazy(() => import("@/pages/Schedule"));
const ReschedulePage = lazy(() => import("@/pages/Reschedule"));
const PricesPage = lazy(() => import("@/pages/Prices"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const PayPage = lazy(() => import("@/pages/Pay"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminRatesPage = lazy(() => import("@/pages/admin/AdminRates"));
const AdminOrdersPage = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/AdminPayments"));
const AdminLoyaltyPage = lazy(() => import("@/pages/admin/AdminLoyalty"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

// Root route — wraps everything with providers
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <AdminProvider>
        <Outlet />
      </AdminProvider>
    </AuthProvider>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <SuspenseWrapper>
      <HomePage />
    </SuspenseWrapper>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <SuspenseWrapper>
      <LoginPage />
    </SuspenseWrapper>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <SuspenseWrapper>
      <ServicesPage />
    </SuspenseWrapper>
  ),
});

const pricesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prices",
  component: () => (
    <SuspenseWrapper>
      <PricesPage />
    </SuspenseWrapper>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <SuspenseWrapper>
      <ContactPage />
    </SuspenseWrapper>
  ),
});

// User auth guard component
function UserGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    void redirect({ to: "/login" });
    return null;
  }
  return <>{children}</>;
}

// Dashboard routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <UserGuard>
      <SuspenseWrapper>
        <DashboardPage />
      </SuspenseWrapper>
    </UserGuard>
  ),
});

const dashboardRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/requests",
  component: () => (
    <UserGuard>
      <SuspenseWrapper>
        <RequestsPage />
      </SuspenseWrapper>
    </UserGuard>
  ),
});

const dashboardScheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/schedule",
  component: () => (
    <UserGuard>
      <SuspenseWrapper>
        <SchedulePage />
      </SuspenseWrapper>
    </UserGuard>
  ),
});

const dashboardRescheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/reschedule",
  validateSearch: (search: Record<string, unknown>) => ({
    pickupId: typeof search.pickupId === "string" ? search.pickupId : undefined,
  }),
  component: () => (
    <UserGuard>
      <SuspenseWrapper>
        <ReschedulePage />
      </SuspenseWrapper>
    </UserGuard>
  ),
});

const payRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pay",
  component: () => (
    <UserGuard>
      <SuspenseWrapper>
        <PayPage />
      </SuspenseWrapper>
    </UserGuard>
  ),
});

// Admin auth guard
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) {
    void redirect({ to: "/admin" });
    return null;
  }
  return <>{children}</>;
}

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <SuspenseWrapper>
      <AdminLoginPage />
    </SuspenseWrapper>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <AdminGuard>
      <SuspenseWrapper>
        <AdminDashboardPage />
      </SuspenseWrapper>
    </AdminGuard>
  ),
});

const adminRatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/rates",
  component: () => (
    <AdminGuard>
      <SuspenseWrapper>
        <AdminRatesPage />
      </SuspenseWrapper>
    </AdminGuard>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <AdminGuard>
      <SuspenseWrapper>
        <AdminOrdersPage />
      </SuspenseWrapper>
    </AdminGuard>
  ),
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/payments",
  component: () => (
    <AdminGuard>
      <SuspenseWrapper>
        <AdminPaymentsPage />
      </SuspenseWrapper>
    </AdminGuard>
  ),
});

const adminLoyaltyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/loyalty",
  component: () => (
    <AdminGuard>
      <SuspenseWrapper>
        <AdminLoyaltyPage />
      </SuspenseWrapper>
    </AdminGuard>
  ),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  servicesRoute,
  pricesRoute,
  contactRoute,
  dashboardRoute,
  dashboardRequestsRoute,
  dashboardScheduleRoute,
  dashboardRescheduleRoute,
  payRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminRatesRoute,
  adminOrdersRoute,
  adminPaymentsRoute,
  adminLoyaltyRoute,
]);
