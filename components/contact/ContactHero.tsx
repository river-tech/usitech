"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
    return (
        <section className="bg-gradient-to-b from-[#EAF2FF] to-white">
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-bold text-3xl md:text-4xl text-[#0F172A]"
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-3 text-gray-600 max-w-2xl mx-auto"
                >
                    Have questions about our workflows? Need support? We&apos;re here to help!
                </motion.p>
            </div>
        </section>
    );
}


