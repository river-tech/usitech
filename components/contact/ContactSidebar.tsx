"use client";

import { motion } from "framer-motion";

export default function ContactSidebar() {
    return (
        <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-[#007BFF]/10 rounded-lg flex items-center justify-center">📍</div>
                <h3 className="text-lg font-semibold text-[#0F172A]">Office Location</h3>
            </div>
            <div className="text-sm text-gray-700">
                <div className="font-semibold">UsITech Headquarters</div>
                {/* <div>123 Tech Street, District 1</div> */}
                <div>Da Nang, Vietnam</div>
            </div>

            <div className="h-px bg-gray-200 my-5" />

            <div className="text-sm text-gray-700">
                <div className="font-semibold">Business Hours</div>
                <div>Mon - Sun: 9:00 AM - 6:00 PM (GMT+7)</div>
            </div>
        </motion.aside>
    );
}


