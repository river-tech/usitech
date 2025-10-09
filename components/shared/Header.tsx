"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "../../lib/auth";
const nav = [
  { href: "/workflows", label: "Workflows" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* ---------- LOGO (you will insert your logo here) ---------- */}
        <Link href="/" className="flex items-center gap-2">
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
          {nav.map((n) => {
            const isActive = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`
                  text-sm font-medium px-1 relative transition-colors duration-200 ease-in-out
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
          {authed ? (
            <div className="flex items-center gap-3">
              <button
                aria-label="Open dashboard"
                onClick={() => router.push("/dashboard")}
                className="w-9 h-9 rounded-full cursor-pointer bg-gradient-to-br from-[#002B6B] to-[#007BFF] hover:brightness-110 shadow-sm"
              />
              <button
                onClick={() => { logout(); setAuthed(false); router.push("/"); }}
                className="text-sm text-gray-700 hover:text-[#002B6B] px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-gray-700 hover:text-[#002B6B] hover:scale-102 transition-all duration-200 hover:cursor-pointer hover:brightness-110">
                Login
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="rounded-xl hover:scale-102 transition-all duration-200 hover:cursor-pointer bg-gradient-to-r from-[#002B6B] to-[#007BFF] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110 hover:shadow-md"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-gray-700 hover:text-[#002B6B]"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/auth/login" className="text-sm text-gray-700 hover:text-[#002B6B]">
              Login
            </Link>
            <Link href="/auth/register">
              <Button className="w-full rounded-xl bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white font-semibold hover:brightness-110">
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}