"use client";

import * as React from "react";
import AuthGuard from "../../components/shared/AuthGuard";
import Header from "../../components/shared/Header";
import AutoRefreshToken from "../../components/shared/AutoRefreshToken";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard requireAuth={true}>
            <AutoRefreshToken />
            <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
                {/* Topbar (sticky) */}
               <Header />

                {/* Main content */}
                <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
                    {children}
                </main>
                {/* <Footer /> */}
            </div>
        </AuthGuard>
    );
}
