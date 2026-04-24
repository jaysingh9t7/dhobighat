import * as api from "@/services/api.service";
import type { User } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (phone: string) => Promise<void>;
  loginWithPassword: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "dg_session";

function loadSession(): { user: User; token: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { user: User; token: string };
  } catch {
    return null;
  }
}

function saveSession(user: User, token: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user, token }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const session = loadSession();
    return {
      user: session?.user ?? null,
      token: session?.token ?? null,
      isLoading: false,
      isAuthenticated: session != null,
    };
  });

  const login = useCallback(async (phone: string) => {
    const result = await api.loginWithPhone(phone);
    if (!result) throw new Error("Login failed");
    saveSession(result.user, result.token);
    setState({
      user: result.user,
      token: result.token,
      isLoading: false,
      isAuthenticated: true,
    });
  }, []);

  const loginWithPassword = useCallback(
    async (phone: string, password: string) => {
      const result = await api.loginWithPassword(phone, password);
      if (!result) throw new Error("Invalid phone or password");
      saveSession(result.user, result.token);
      setState({
        user: result.user,
        token: result.token,
        isLoading: false,
        isAuthenticated: true,
      });
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  const refreshUser = useCallback(async () => {
    if (!state.user) return;
    const updated = await api.getUser(state.user.id);
    if (updated) {
      setState((prev) => ({ ...prev, user: updated }));
      if (state.token) saveSession(updated, state.token);
    }
  }, [state.user, state.token]);

  // Expose a way to set user from registration flow
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__dhobiSetAuth = (user: User, token: string) => {
      saveSession(user, token);
      setState({ user, token, isLoading: false, isAuthenticated: true });
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, loginWithPassword, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
