"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {categories, testimonials } from "../../lib/data";
import { ArrowRight, Search } from 'lucide-react';
import FeaturedWorkflowsSlider from "../../components/shared/FeaturedWorkflowsSlider";  

// Placeholder for illustration and icons
// const Illustration = () => (
//   <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#EAF4FF] to-[#FFFFFF] rounded-3xl flex items-center justify-center">
//     <div className="icon-placeholder w-32 h-32 bg-gray-200 rounded-full" />
//   </div>
// );

const fadeIn = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

// Simple auto-slide carousel for 3 items at a time

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-28"
        style={{
          backgroundImage: "url('/background1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-[#007BFF]/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-bold text-4xl md:text-5xl text-white leading-tight">
              Automate Your Business <br className="hidden md:block" />
              with <span className="bg-gradient-to-r from-[#06b6d4] to-[#007BFF] bg-clip-text text-transparent transition-all duration-500">UsITech Workflows</span>
            </h1>
            <p className="mt-6 text-white leading-relaxed max-w-xl mx-auto md:mx-0 text-lg">
              Ship reliable automation in minutes, not months. Plug-and-play workflows for marketing, CRM, finance, and more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/workflows">
                <Button
                  className="flex items-center gap-2 "
                  variant="default"
                  size="lg"
                >
                  <Search className="w-4 h-6 text-white" />
                  Browse Workflows
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="rounded-xl px-6 py-3 font-medium border-[#007BFF] text-[#007BFF] hover:bg-[#EAF4FF] transition"
                  size="lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          {/* Right: Illustration */}
          {/* <div className="flex-1 flex items-center justify-center">
            <Illustration />
          </div> */}
        </div>
      </motion.section>

      {/* Featured Workflows - SLIDER */}
      <motion.section
        className="bg-white py-16"
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="w-full ">
          <div className="flex flex-col items-center justify-center mb-4 gap-2">
            <h2 className="font-bold text-2xl md:text-3xl text-[#002B6B] text-center">Featured Workflows</h2>
            <p className="text-gray-500 text-center text-base max-w-xl">
              Hand-picked automation solutions that deliver immediate value to your business
            </p>
          </div>

          <FeaturedWorkflowsSlider />

          <div className="flex justify-center mt-8 ">
            <Link href="/workflows">
              <Button
                variant="default"
                size="lg"
                className="rounded-xl gap-2 hover:scale-102 transition-all duration-500 hover:cursor-pointer px-6 py-3 font-semibold border-[#007BFF] text-[#007BFF] bg-white hover:bg-[#EAF4FF] transition-colors shadow-sm hover:shadow-md"
              >
                View All Workflows
              <ArrowRight className="w-4 h-4" fill="currentColor" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Browse by Category */}
      <motion.section
        className="bg-[#F9FAFB] py-16"
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-bold text-2xl md:text-3xl text-[#002B6B] mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/workflows?category=${c.slug}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center p-6 group"
              >
                <div className="icon-placeholder w-10 h-10 bg-gray-200 rounded-xl mb-3" />
                <div className="font-semibold text-[#1A1A1A] text-base mb-1">{c.name}</div>
                <div className="text-xs text-gray-500">{c.count} workflows</div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="bg-[#F9FAFB] py-16"
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-bold text-2xl md:text-3xl text-[#002B6B] mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, i) => (
              <Card
                key={t.name}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  {/* 5-star icons placeholder */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="icon-placeholder w-5 h-5 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 text-base leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="icon-placeholder w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <div className="font-semibold text-[#1A1A1A] text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role} &mdash; {t.role ?? "Company"}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-to-r from-[#002B6B] to-[#0057D8] py-20"
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="font-bold text-3xl md:text-4xl text-white mb-4">Ready to Automate Your Business?</h3>
          <p className="text-white/90 text-lg mb-8">Start with a template and customize in minutes. Experience the power of UsITech workflows today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/workflows">
              <Button
                className="rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#007BFF] to-[#00A3FF] shadow-lg hover:from-[#339CFF] hover:to-[#3388FF] transition"
                size="lg"
              >
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-xl px-6 py-3 font-medium border-white text-white hover:bg-white/10 transition"
                size="lg"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
