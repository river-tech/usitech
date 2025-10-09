// Lightweight client-side auth helpers for demo/private routes
// In production, replace with real auth (NextAuth, custom JWT, etc.)

export type DemoUser = {
  id: string;
  name: string;
  email: string;
};

const STORAGE_KEY = "usitech_auth";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getUser(): DemoUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getUser();
}

export function loginDemo(user: Partial<DemoUser> = {}): DemoUser {
  const demo: DemoUser = {
    id: user.id || "demo-user",
    name: user.name || "UsITech User",
    email: user.email || "user@usitech.demo",
  };
  if (isBrowser()) localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
  return demo;
}

export function logout(): void {
  if (isBrowser()) localStorage.removeItem(STORAGE_KEY);
}


