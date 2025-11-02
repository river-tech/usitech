"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthApi from "../../lib/api/Auth";
import { useAuth } from "../../lib/contexts/AuthContext";
import { useNotification } from "../../lib/contexts/NotificationContext";
import { BellIcon } from "lucide-react";

const nav = [
  { href: "/workflows", label: "Workflows" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const authApi = AuthApi();
  const { userAvatar, isLoading: userLoading } = useAuth();
  const { unreadCount } = useNotification();
  
  React.useEffect(() => {
    setOpen(false);
  }, [pathname,userAvatar]);

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    // Check if access token exists
    const accessToken = authApi.getAuthToken();
    if (accessToken) {
      setAuthed(true);
      setLoading(false);
      return;
    }

    // If no access token, check for refresh token
    const refreshToken = authApi.getRefreshToken();
    if (refreshToken) {
      try {
        // Try to refresh the access token
        const result = await authApi.refreshToken();
        if (result) {
          setAuthed(true);
        } else {
          // Refresh failed, clear tokens and set as guest
          authApi.clearTokens();
          setAuthed(false);
        }
      } catch (error) {
        // Clear tokens and set as guest
        authApi.clearTokens();
        setAuthed(false);
      }
    } else {
      // No tokens, set as guest
      setAuthed(false);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    const result = await authApi.logout();
    if (result.success) {
      setAuthed(false);
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* ---------- LOGO (you will insert your logo here) ---------- */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          {/* <span className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#002B6B] to-[#007BFF] flex items-center justify-center">
            <span className="text-white font-bold text-xl select-none" style={{ fontFamily: "Inter, sans-serif" }}>U</span>
          </span> */}
          <span className="relative w-25 h-10 flex items-center justify-center overflow-hidden rounded-lg bg-white">
            <Image
              src="/logo.png"
              alt="USITech"
			  fill
              className="object-cover bg-white"
              
            />
          </span>
        </Link>

        {/* ---------- NAV LINKS ---------- */}
        <nav className="hidden md:flex items-center gap-8">
          {!loading && nav.map((n) => {
            const isActive = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`
                  text-sm font-medium px-1 relative transition-colors duration-200 ease-in-out cursor-pointer
                  ${isActive ? "text-[#002B6B]" : "text-gray-700 hover:text-[#007BFF]"}
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#007BFF] after:rounded-full
                  after:transition-transform after:duration-300 after:ease-in-out
                  ${isActive ? "after:scale-x-100 after:opacity-100" : "after:scale-x-0 after:opacity-0 hover:after:scale-x-100 hover:after:opacity-100"}
                `}
                style={{
                  transitionProperty: "color, background, transform",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* ---------- AUTH / AVATAR ---------- */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-[#007BFF] rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500">Checking...</span>
            </div>
          ) : authed ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard/notifications" className="relative flex items-center justify-center group">
                <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 bg-[#F3F8FF] group-hover:bg-[#e6efff] shadow-sm border border-[#C6E0FF]">
                  <BellIcon className="h-5 w-5 text-[#007BFF] group-hover:text-[#002B6B] transition-colors duration-200" />
                  {/* Notification badge with unread count */}
                  {(unreadCount ?? 0) >= 0 && (
                   <span
                   className="absolute top-[-5px] right-[-5px] w-[20px] h-[20px] bg-[#007BFF] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white shadow"
                 >
                   {unreadCount > 99 ? "99+" : unreadCount}
                 </span>
                  )}
                </span>
                <span className="sr-only">Notifications</span>
              </Link>
              <button
                aria-label="Open dashboard"
                onClick={() => router.push("/dashboard")}
                className="rounded-full cursor-pointer hover:brightness-110 shadow-sm flex items-center justify-center p-0 border-2 border-[#007BFF] bg-white"
                style={{ width: 40, height: 40 }}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white">
                  <Image
                    src={userAvatar || "/defaultAva.jpg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full rounded-full"
                    key={userAvatar} // Force re-render when avatar changes
                  />
                </div>
              </button>
              <button
                onClick={() => handleLogout()}
                className="text-sm text-gray-700 hover:text-[#002B6B] px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-gray-700 hover:text-[#002B6B] hover:scale-102 transition-all duration-200 cursor-pointer hover:brightness-110">
                Login
              </Link>
              <Link href="/auth/register" className="cursor-pointer">
                <Button
                  size="sm"
                  className="rounded-xl hover:scale-102 transition-all duration-200 cursor-pointer bg-gradient-to-r from-[#002B6B] to-[#007BFF] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110 hover:shadow-md"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {open && !loading && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-gray-700 hover:text-[#002B6B] cursor-pointer"
              >
                {n.label}
              </Link>
            ))}
            {authed ? (
              <>
             
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-[#002B6B] cursor-pointer">
                  Dashboard
                </Link>
                <button
                  onClick={() => handleLogout()}
                  className="text-sm text-gray-700 hover:text-[#002B6B] px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-gray-700 hover:text-[#002B6B] cursor-pointer">
                  Login
                </Link>
                <Link href="/auth/register" className="cursor-pointer">
                  <Button className="w-full rounded-xl bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white font-semibold hover:brightness-110 cursor-pointer">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}