import * as React from "react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t bg-white">
			<div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
				<div>
					<h4 className="font-semibold mb-3">Product</h4>
					<ul className="space-y-2 text-gray-600">
						<li><Link href="/workflows">Workflows</Link></li>
						<li><Link href="/search">Search</Link></li>
						<li><Link href="/about">About</Link></li>
						<li><Link href="/contact">Contact</Link></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-3">Company</h4>
					<ul className="space-y-2 text-gray-600">
						<li><a href="#">Careers</a></li>
						<li><a href="#">Blog</a></li>
						<li><a href="#">Press</a></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-3">Resources</h4>
					<ul className="space-y-2 text-gray-600">
						<li><a href="#">Docs</a></li>
						<li><a href="#">Community</a></li>
						<li><a href="#">Support</a></li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-3">Legal</h4>
					<ul className="space-y-2 text-gray-600">
						<li><a href="#">Terms</a></li>
						<li><a href="#">Privacy</a></li>
						<li><a href="#">Security</a></li>
					</ul>
				</div>
			</div>
			<div className="border-t">
				<div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
					<p>© {new Date().getFullYear()} UsITech. All rights reserved.</p>
					<p>Built with Next.js & TailwindCSS</p>
				</div>
			</div>
		</footer>
	);
}
