"use client";

import * as React from "react";
import ProtectedRoute from "../../components/shared/ProtectedRoute";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {


    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
                {/* Topbar (sticky) */}
               <Header />

                {/* Main content */}
                <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
                    {children}
                </main>
				{/* <Footer /> */}
            </div>
        </ProtectedRoute>
    );
}
