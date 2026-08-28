import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CREDITS, PLANS } from "@/config/app";

export type HistoryItem = {
  id: string;
  name: string;
  date: string;
  status: "completed" | "failed";
  thumbnail: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  plan: "free" | "pro" | "business";
  credits: number;
  createdAt: string;
  history: HistoryItem[];
};

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, "name" | "email">>) => void;
  consumeCredit: () => boolean;
  addCredits: (amount: number) => void;
  setPlan: (planId: User["plan"]) => void;
  addHistory: (item: Omit<HistoryItem, "id" | "date">) => void;
};

const STORAGE_KEY = "snapcut.user";

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Local-first auth provider. All calls are isolated here so the storage
 * adapter can be swapped for Supabase / Firebase / a custom n8n endpoint
 * without touching any component.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore corrupt state */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async (email: string, _password: string) => {
      void _password;
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? (JSON.parse(raw) as User) : null;
      if (existing && existing.email.toLowerCase() === email.toLowerCase()) {
        persist(existing);
        return;
      }
      persist({
        id: crypto.randomUUID(),
        name: email.split("@")[0] ?? "Creator",
        email,
        plan: "free",
        credits: CREDITS.signupBonus,
        createdAt: new Date().toISOString(),
        history: [],
      });
    },
    [persist],
  );

  const signup = useCallback(
    async (name: string, email: string, _password: string) => {
      void _password;
      persist({
        id: crypto.randomUUID(),
        name,
        email,
        plan: "free",
        credits: CREDITS.signupBonus,
        createdAt: new Date().toISOString(),
        history: [],
      });
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const updateProfile = useCallback(
    (patch: Partial<Pick<User, "name" | "email">>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [setUser],
  );

  const consumeCredit = useCallback(() => {
    let ok = false;
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.credits < CREDITS.costPerRemoval) return prev;
      ok = true;
      const next = { ...prev, credits: prev.credits - CREDITS.costPerRemoval };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    return ok;
  }, []);

  const addCredits = useCallback((amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, credits: prev.credits + amount };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setPlan = useCallback((planId: User["plan"]) => {
    setUser((prev) => {
      if (!prev) return prev;
      const plan = PLANS.find((p) => p.id === planId);
      const next = { ...prev, plan: planId, credits: plan ? plan.credits : prev.credits };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addHistory = useCallback((item: Omit<HistoryItem, "id" | "date">) => {
    setUser((prev) => {
      if (!prev) return prev;
      const entry: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      const next = { ...prev, history: [entry, ...prev.history].slice(0, 12) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      login,
      signup,
      logout,
      updateProfile,
      consumeCredit,
      addCredits,
      setPlan,
      addHistory,
    }),
    [
      user,
      ready,
      login,
      signup,
      logout,
      updateProfile,
      consumeCredit,
      addCredits,
      setPlan,
      addHistory,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
