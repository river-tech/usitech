"use client";
import Link from "next/link";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthApi from "../../../lib/api/Auth";


export default function RegisterPage() {
	const auth = AuthApi();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		const result = await auth.register(formData.name, formData.email, formData.password);

		
		if (result.success) {
			setSuccess("Account created successfully! Redirecting to login...");
			router.push("/auth/login");
		} else {
			setError(result.error || "Registration failed");
		}	
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-10">
			<div className="flex flex-col items-center w-full">
				{/* Icon */}
				<div className="flex items-center justify-center w-20 h-20 rounded-xl mb-6" style={{
					background: "linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%)"
				}}>
					<svg width="32" height="32" fill="none" viewBox="0 0 32 32">
						<rect x="0" y="0" width="32" height="32" rx="12" fill="#fff" fillOpacity="0.08"/>
						<circle cx="16" cy="13" r="4" stroke="#fff" strokeWidth="2"/>
						<path d="M10 23c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
							<g>
								<rect x="20" y="18" width="2" height="6" rx="1" fill="#fff"/>
								<rect x="18" y="21" width="6" height="2" rx="1" fill="#fff"/>
							</g>
					</svg>
				</div>
				<h2 className="text-2xl font-bold text-[#0F172A] mb-1 text-center">Create Account</h2>
				<p className="text-[#64748B] text-center mb-7">Join UsITech and start automating your business</p>
				<Card className="w-full max-w-md rounded-2xl border border-gray-200 shadow-sm bg-[#FFFFFF]">
					<CardContent className="pt-8 pb-6 px-6">
						<form onSubmit={handleSubmit} className="space-y-5" aria-label="Register form">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-[#334155] mb-1">Full Name</label>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									aria-label="Full Name"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1">Email Address</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
										<svg width="18" height="18" fill="none" viewBox="0 0 24 24">
											<path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</span>
									<Input
										id="email"
										type="email"
										placeholder="john@example.com"
										aria-label="Email address"
										className="pl-10"
										value={formData.email}
										onChange={handleInputChange}
										required
									/>
								</div>
							</div>
							<div>
								<label htmlFor="password" className="block text-sm font-medium text-[#334155] mb-1">Password</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
										<svg width="18" height="18" fill="none" viewBox="0 0 24 24">
											<rect x="4" y="8" width="16" height="10" rx="2" stroke="#94A3B8" strokeWidth="1.5"/>
											<circle cx="12" cy="13" r="2" fill="#94A3B8"/>
										</svg>
									</span>
									<Input
										id="password"
										type="password"
										placeholder="Create a strong password"
										aria-label="Password"
										className="pl-10"
										value={formData.password}
										onChange={handleInputChange}
										required
									/>
								</div>
							</div>
							<div>
								<label htmlFor="confirmPassword" className="block text-sm font-medium text-[#334155] mb-1">Confirm Password</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
										<svg width="18" height="18" fill="none" viewBox="0 0 24 24">
											<rect x="4" y="8" width="16" height="10" rx="2" stroke="#94A3B8" strokeWidth="1.5"/>
											<circle cx="12" cy="13" r="2" fill="#94A3B8"/>
										</svg>
									</span>
									<Input
										id="confirmPassword"
										type="password"
										placeholder="Confirm your password"
										aria-label="Confirm Password"
										className="pl-10"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										required
									/>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<input
									type="checkbox"
									id="terms"
									className="h-4 w-4 mt-1 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]"
									aria-label="Agree to terms"
								/>
								<label htmlFor="terms" className="text-sm text-[#334155]">
									I agree to the{" "}
									<Link href="#" className="text-[#007BFF] hover:underline">Terms of Service</Link>
									{" "}and{" "}
									<Link href="#" className="text-[#007BFF] hover:underline">Privacy Policy</Link>
								</label>
							</div>
							{error && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
									<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
									</svg>
									<span>{error}</span>
								</div>
							)}
							{success && (
								<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
									<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
									</svg>
									<span>{success}</span>
								</div>
							)}
							<Button 
								type="submit"
								className="w-full rounded-xl bg-gradient-to-r from-[#0057D8] to-[#00A3FF] text-white font-medium shadow-sm hover:shadow transition-all duration-200 text-base py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Create Account
							</Button>
							
						</form>
						<div className="mt-6 text-center text-sm text-[#64748B]">
							Don&apos;t have an account?{" "}
							<Link className="text-[#007BFF] hover:underline font-medium" href="/auth/login">
								Sign in for free
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
