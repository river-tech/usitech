"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import AuthApi from "../../lib/api/Auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authed, setAuthed] = React.useState(false);
    const [checking, setChecking] = React.useState(true);
    const auth = AuthApi();
    React.useEffect(() => {
        setAuthed(auth.getAuthToken() ? true : false);
        setChecking(false);
    }, []);

    if (checking) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center text-gray-600">Checking access…</div>
        );
    }

    if (!authed) {
        return (
            <div className=" mx-auto h-screen w-full px-4 py-16 flex items-center justify-center bg-gradient-to-br from-[#EAF2FF] via-[#F8FAFC] to-white">
                <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md p-8 md:p-10 text-center max-w-lg w-full">
                    <div className="mx-auto mb-5 h-10 w-32 relative">
                        <Image src="/logo.png" alt="UsITech" fill className="object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Restricted Area</h1>
                    <p className="text-gray-600 mt-2">This content is available to authenticated users. Please sign in from the main site if you believe this is an error.</p>
				<Button
				onClick={() => router.push("/")}
				className="flex items-center justify-center mt-4"
				variant="default"
				>
					Back to Home <ArrowRight className="w-4 h-4" />
				</Button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
