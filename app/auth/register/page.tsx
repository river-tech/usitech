import Link from "next/link";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function RegisterPage() {
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
						<form className="space-y-5" aria-label="Register form">
							<div className="flex gap-4">
								<div className="w-1/2">
									<label htmlFor="firstName" className="block text-sm font-medium text-[#334155] mb-1">First Name</label>
									<Input
										id="firstName"
										type="text"
										placeholder="John"
										aria-label="First Name"
									/>
								</div>
								<div className="w-1/2">
									<label htmlFor="lastName" className="block text-sm font-medium text-[#334155] mb-1">Last Name</label>
									<Input
										id="lastName"
										type="text"
										placeholder="Doe"
										aria-label="Last Name"
									/>
								</div>
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
							<Button className="w-full rounded-xl bg-gradient-to-r from-[#0057D8] to-[#00A3FF] text-white font-medium shadow-sm hover:shadow transition-all duration-200 text-base py-2.5">
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
