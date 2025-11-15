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
  const authApi = React.useMemo(() => AuthApi(), []);
  const { userAvatar } = useAuth();
  const { unreadCount } = useNotification();
  
  React.useEffect(() => {
    setOpen(false);
  }, [pathname, userAvatar]);

  const checkAuthStatus = React.useCallback(async () => {
    setLoading(true);
    const accessToken = authApi.getAuthToken();
    if (accessToken) {
      setAuthed(true);
      setLoading(false);
      return;
    }
    const refreshToken = authApi.getRefreshToken();
    if (refreshToken) {
      try {
        const result = await authApi.refreshToken();
        if (result) {
          setAuthed(true);
        } else {
          authApi.clearTokens();
          setAuthed(false);
        }
      } catch {
        authApi.clearTokens();
        setAuthed(false);
      }
    } else {
      setAuthed(false);
    }
    setLoading(false);
  }, [authApi]);

  React.useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogout = async () => {
    await authApi.logout();
    setAuthed(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* ---------- LOGO (you will insert your logo here) ---------- */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
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
          {!loading &&
            nav.map((n) => {
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

        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <button
          className="flex items-center justify-center md:hidden p-2 rounded-full hover:bg-gray-100 transition-all"
          aria-label="Mở menu"
          onClick={() => setOpen(true)}
          type="button"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#002B6B]">
            <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>

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
                className="rounded-full cursor-pointer hover:brightness-110 shadow-sm flex items-center justify-center p-0  bg-white"
                style={{ width: 40, height: 40 }}
              >
                <div className=" rounded-full overflow-hidden flex items-center justify-center bg-white">
                  <Image
                    src={userAvatar || "/defaultAva.jpg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full rounded-full"
                    key={userAvatar}
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden flex flex-col">
          <div
            className={`
              bg-white w-full mt-auto rounded-t-2xl shadow-lg
              transition-transform transition-opacity duration-400
              animate-slide-up-header-menu
            `}
            style={{
              animation: 'slideUpHeaderMenu 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-lg text-[#002B6B]">Menu</span>
              <button
                aria-label="Đóng menu"
                className="text-gray-500 hover:text-gray-700 p-1 rounded"
                onClick={() => setOpen(false)}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 flex flex-col gap-1">
              {nav.map((n, idx) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`
                    py-3 px-2 rounded-lg text-base font-medium
                    transition-all duration-200
                    ${
                      pathname === n.href
                        ? "bg-blue-50 text-[#007BFF]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#002B6B]"
                    }
                  `}
                  style={{
                    animation: `fadeInHeaderMenu 0.35s ${(0.02 + idx * 0.03).toFixed(2)}s both`
                  }}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}

              {authed ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`
                      py-3 px-2 rounded-lg text-base font-medium
                      transition-all duration-200
                      ${
                        pathname.startsWith("/dashboard")
                          ? "bg-blue-50 text-[#007BFF]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#002B6B]"
                      }
                    `}
                    style={{ animation: `fadeInHeaderMenu 0.35s 0.13s both` }}
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/notifications"
                    className={`
                      py-3 px-2 rounded-lg text-base font-medium flex items-center
                      transition-all duration-200
                      ${
                        pathname === "/dashboard/notifications"
                          ? "bg-blue-50 text-[#007BFF]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#002B6B]"
                      }
                    `}
                    style={{ animation: `fadeInHeaderMenu 0.35s 0.16s both` }}
                    onClick={() => setOpen(false)}
                  >
                    <BellIcon size={18} className="mr-2" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-[#007BFF] rounded-full">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-base text-left py-3 px-2 rounded-lg text-gray-700 hover:text-[#B1001A] hover:bg-red-50 border transition-colors mt-2 border-gray-100"
                    style={{ animation: `fadeInHeaderMenu 0.35s 0.18s both` }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={`
                      py-3 px-2 rounded-lg text-base font-medium text-gray-700
                      hover:bg-gray-50 hover:text-[#002B6B] transition-all
                    `}
                    style={{ animation: `fadeInHeaderMenu 0.35s 0.13s both` }}
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setOpen(false)}
                    className="mt-1"
                    style={{ animation: `fadeInHeaderMenu 0.35s 0.16s both` }}
                  >
                    <Button className="w-full rounded-xl bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white font-semibold hover:brightness-110 cursor-pointer">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
            {authed && (
              <div
                className="flex items-center gap-3 px-6 py-4 border-t border-gray-100"
                style={{ animation: `fadeInHeaderMenu 0.35s 0.21s both` }}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image
                    src={userAvatar || "/defaultAva.jpg"}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <span className="text-sm text-gray-600">Tài khoản của bạn</span>
              </div>
            )}
          </div>
          <style jsx global>{`
            @keyframes slideUpHeaderMenu {
              from {
                transform: translateY(80px);
                opacity: 0.5;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            @keyframes fadeInHeaderMenu {
              from {
                opacity: 0;
                transform: translateY(15px);
              }
              to {
                opacity: 1;
                transform: translateY(0px);
              }
            }
          `}</style>
        </div>
      )}
    </header>
  );
}
