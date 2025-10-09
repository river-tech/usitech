"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Download, HelpCircle, CreditCard } from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const actions: ActionItem[] = [
  { id: "browse", title: "Browse Workflows", description: "Explore the latest automation templates.", href: "/workflows", icon: ShoppingBag },
  { id: "download", title: "Download Workflows", description: "Access your purchased downloads.", href: "/dashboard/workflows", icon: Download },
  { id: "support", title: "Support Center", description: "Get help and documentation.", href: "/contact", icon: HelpCircle },
  { id: "billing", title: "Billing History", description: "View invoices and payments.", href: "/dashboard/settings", icon: CreditCard },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <Link key={a.id} href={a.href} className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002B6B] to-[#007BFF] flex items-center justify-center text-white">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-[#0F172A]">{a.title}</div>
                <div className="text-xs text-gray-600">{a.description}</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#007BFF]" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}


