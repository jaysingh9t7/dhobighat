import * as api from "@/services/api.service";
import { createContext, useCallback, useContext, useState } from "react";

interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  lastPasswordReset: number | null;
}

interface AdminContextValue extends AdminState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  isPasswordResetDue: boolean;
}

const AdminContext = createContext<AdminContextValue | null>(null);

const ADMIN_SESSION_KEY = "dg_admin_session";
const PASSWORD_RESET_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function loadAdminSession(): AdminState | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminState;
  } catch {
    return null;
  }
}

function saveAdminSession(state: AdminState) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(state));
}

function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminState>(() => {
    return (
      loadAdminSession() ?? {
        isAuthenticated: false,
        token: null,
        email: null,
        lastPasswordReset: null,
      }
    );
  });

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      const token = await api.adminLogin(email, password);
      if (!token) return false;
      const newState: AdminState = {
        isAuthenticated: true,
        token,
        email,
        lastPasswordReset: Date.now(),
      };
      saveAdminSession(newState);
      setState(newState);
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    clearAdminSession();
    setState({
      isAuthenticated: false,
      token: null,
      email: null,
      lastPasswordReset: null,
    });
  }, []);

  const resetPassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<boolean> => {
      const ok = await api.resetAdminPassword(oldPassword, newPassword);
      if (ok) {
        const newState = { ...state, lastPasswordReset: Date.now() };
        saveAdminSession(newState);
        setState(newState);
      }
      return ok;
    },
    [state],
  );

  const isPasswordResetDue =
    state.lastPasswordReset != null &&
    Date.now() - state.lastPasswordReset > PASSWORD_RESET_INTERVAL_MS;

  return (
    <AdminContext.Provider
      value={{ ...state, login, logout, resetPassword, isPasswordResetDue }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
