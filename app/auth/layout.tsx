"use client";

import * as React from "react";
import AuthGuard from "@/components/shared/AuthGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard requireAuth={false}>
            <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] w-full via-[#F8FAFC] to-white">
                <main className="flex items-center justify-center min-h-screen">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
