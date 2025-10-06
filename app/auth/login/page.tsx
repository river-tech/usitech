import Link from "next/link";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-10">
			<div className="flex flex-col items-center w-full">
				<div className="flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{
					background: "linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%)"
				}}>
					<svg width="40" height="40" fill="none" viewBox="0 0 40 40">
						<rect x="0" y="0" width="40" height="40" rx="12" fill="url(#login-gradient)" />
						<circle cx="20" cy="16" r="5" stroke="#fff" strokeWidth="2" />
						<path d="M13 28c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
						<defs>
						</defs>
					</svg>
				</div>
				<h2 className="text-2xl font-bold text-[#0F172A] mb-1 text-center">Welcome Back</h2>
				<p className="text-[#64748B] text-center mb-7">Sign in to your UsITech account</p>
				<Card className="w-full max-w-md rounded-2xl border border-gray-200 shadow-sm bg-[#FFFFFF]">
					<CardContent className="pt-8 pb-6 px-6">
						<form className="space-y-5" aria-label="Login form">
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
										placeholder="Enter your email"
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
										placeholder="Enter your password"
										aria-label="Password"
										className="pl-10"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<label className="flex items-center gap-2 text-sm text-[#334155]">
									<input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]" aria-label="Remember me" />
									<span>Remember me</span>
								</label>
								<Link href="#" className="text-[#007BFF] text-sm hover:underline">Forgot password?</Link>
							</div>
							<Button className="w-full rounded-xl bg-gradient-to-r from-[#0057D8] to-[#00A3FF] text-white font-medium shadow-sm hover:shadow transition-all duration-200 text-base py-2.5">
								Login 
							</Button>


						</form>
						<div className="mt-6 text-center text-sm text-[#64748B]">
							Don&apos;t have an account?{" "}
							<Link className="text-[#007BFF] hover:underline font-medium" href="/auth/register">
								Sign up for free
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
