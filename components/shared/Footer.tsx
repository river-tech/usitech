import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t bg-white">
			<div className="mx-auto max-w-6xl px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{/* Brand + Description */}
					<div>
						<Link href="/" className="flex items-center gap-3 mb-4">
							<span className="relative w-28 h-10 overflow-hidden rounded-lg bg-white">
								<Image src="/logo.png" alt="UsITech" fill className="object-cover" />
							</span>
							<span className="sr-only">UsITech</span>
						</Link>
						<p className="text-gray-600 text-sm leading-relaxed max-w-md">
							Streamline your business with powerful n8n automation workflows. Discover, purchase, and implement professional workflow solutions.
						</p>
						<div className="flex items-center gap-4 mt-4 text-gray-600">
							<Link href="#" aria-label="Twitter" className="hover:text-[#007BFF]">
								<Twitter className="w-5 h-5" />
							</Link>
							<Link href="#" aria-label="LinkedIn" className="hover:text-[#007BFF]">
								<Linkedin className="w-5 h-5" />
							</Link>
							<Link href="#" aria-label="GitHub" className="hover:text-[#007BFF]">
								<Github className="w-5 h-5" />
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-[#0F172A] font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-3 text-gray-600">
							<li><Link href="/workflows" className="hover:text-[#007BFF]">Browse Workflows</Link></li>
							<li><Link href="/search" className="hover:text-[#007BFF]">Search</Link></li>
							<li><Link href="/about" className="hover:text-[#007BFF]">About Us</Link></li>
							<li><Link href="/contact" className="hover:text-[#007BFF]">Contact</Link></li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<h4 className="text-[#0F172A] font-semibold mb-4">Support</h4>
						<ul className="space-y-3 text-gray-600">
							<li><Link href="#" className="hover:text-[#007BFF]">Help Center</Link></li>
							<li><Link href="#" className="hover:text-[#007BFF]">Documentation</Link></li>
							<li><Link href="#" className="hover:text-[#007BFF]">Privacy Policy</Link></li>
							<li><Link href="#" className="hover:text-[#007BFF]">Terms of Service</Link></li>
						</ul>
					</div>
				</div>

				<hr className="mt-10 border-gray-200" />
				<div className="pt-6 text-xs text-gray-500">© {new Date().getFullYear()} UsITech. All rights reserved.</div>
			</div>
		</footer>
	);
}
