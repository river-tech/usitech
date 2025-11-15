"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { testimonials } from "../../lib/data";
import { ArrowRight, Search, Star, Check, Users, Clock, Shield, Play } from 'lucide-react';
import FeaturedWorkflowsSlider from "../../components/shared/FeaturedWorkflowsSlider";  
import Image from "next/image";
import { useWorkflow } from "../../lib/contexts/WorkflowContext";

// Placeholder for illustration and icons
// const Illustration = () => (
//   <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#EAF4FF] to-[#FFFFFF] rounded-3xl flex items-center justify-center">
//     <div className="icon-placeholder w-32 h-32 bg-gray-200 rounded-full" />
//   </div>
// );

// Helper function to validate and sanitize icon URLs
const getValidIconUrl = (iconUrl: string | null | undefined): string => {
  if (!iconUrl || iconUrl.trim() === '') {
    return "/placeholder-icon.png";
  }
  
  // Check if it's a valid URL or a valid relative path
  try {
    // If it starts with http/https, validate as full URL
    if (iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) {
      new URL(iconUrl); // This will throw if invalid
      return iconUrl;
    }
    // If it starts with /, treat as valid relative path
    if (iconUrl.startsWith('/')) {
      return iconUrl;
    }
    // Otherwise, assume it's a relative path and prepend /
    return `/${iconUrl}`;
  } catch {
    // If URL validation fails, return placeholder
    return "/placeholder-icon.png";
  }
};

const fadeIn = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

// Simple auto-slide carousel for 3 items at a time

export default function HomePage() {
  const { categories } = useWorkflow();

  const  cates = categories.sort((a, b) => b.workflows_count - a.workflows_count);
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative py-24 md:py-32"
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-[#007BFF]/20 pointer-events-none" />
        
        {/* Trust Indicators Bar */}
        <div className="absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center gap-8 text-white/80 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>20+ Hours Saved Weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center gap-8 lg:gap-12 px-4 pt-16">
          {/* Left: Value Proposition */}
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs lg:text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 10,000+ businesses
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Automate Your Business in
              <span className="block bg-gradient-to-r from-[#06b6d4] to-[#007BFF] bg-clip-text text-transparent">
                5 Minutes
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              No-code workflow automation that saves 20+ hours per week. 
              <strong> Start free, scale instantly.</strong>
            </p>
            
            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/workflows">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#FF7A4A] hover:to-[#F9A847] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="default" 
                  size="lg" 
                  className=" text-black hover:text-white bg-[#007BFF ] hover:bg-white/10 px-8 py-4 rounded-xl flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo (2 min)
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-4 lg:gap-6 text-white/80 text-xs lg:text-sm flex-wrap justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
          
          {/* Right: Interactive Demo Preview */}
          <div className="relative w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20">
              <div className="text-center text-white/90">
                <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 bg-gradient-to-r from-[#06b6d4] to-[#007BFF] rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold mb-2">Interactive Workflow Builder</h3>
                <p className="text-xs lg:text-sm">Drag, drop, and automate in minutes</p>
              </div>
            </div>
          </div>
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
            <p className="text-[#002B6B] text-center text-base max-w-xl">
              Hand-picked automation solutions that deliver immediate value to your business
            </p>
          </div>

          <FeaturedWorkflowsSlider />

          <div className="flex justify-center mt-8 ">
            <Link href="/workflows">
              <Button
                variant="default"
                size="lg"
                className=" bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Build My First Automation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Browse by Category */}
      <motion.section
        className="bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] py-16"
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-2xl md:text-3xl text-white mb-4">Browse by Category</h2>
            <p className="text-white/90 text-lg mb-8">
              Find workflows tailored to your specific business needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {cates.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                href={`/workflows?category=${c.name}`}
                className="bg-white hover:bg-[#EAF4FF] hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg flex flex-col items-center p-4 md:p-6 group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl mb-3 flex items-center justify-center bg-gradient-to-br from-[#007BFF] to-[#06b6d4]">
                  <Image 
                    className="object-cover rounded-lg" 
                    src={getValidIconUrl(c?.icon_url)} 
                    alt={c.name} 
                    width={32} 
                    height={32} 
                  />
                </div>
                <div className="font-semibold text-[#1A1A1A] text-sm md:text-base mb-1 text-center">{c.name}</div>
                <div className="text-xs text-gray-500 text-center">{c.workflows_count} workflows</div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/workflows">
              <Button 
                size="lg"
                className="bg-white text-[#007BFF] font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore All Categories
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Results Dashboard */}
    

      {/* Testimonials */}
      <motion.section
        className="bg-[#F9FAFB] py-16"
        {...{
          ...fadeIn,
          transition: { ...fadeIn.transition, ease: [0.25, 0.1, 0.25, 1] }
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-2xl md:text-3xl text-[#002B6B] mb-4">What Our Customers Say</h2>
            <p className="text-base text-[#002B6B] max-w-2xl mx-auto">
              Hear from our customers about their experience with UsITech Workflows
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((t) => (
              <Card
                key={t.name}
                className="bg-white shadow-lg rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-3 lg:mb-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden">
                    <Image 
                      className="object-cover w-full h-full" 
                      src={t.image ?? "/defaultAva.jpg"} 
                      alt={t.name} 
                      width={48} 
                      height={48} 
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A] text-xs lg:text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
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
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-4">Ready to Save 20+ Hours This Week?</h3>
          <p className="text-white/90 text-base lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto">
            Join 10,000+ businesses already automating their workflows. Start your free trial today and see results in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <Link href="/workflows">
              <Button
                className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white font-bold px-6 lg:px-10 py-4 lg:py-5 rounded-xl text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
                size="lg"
              >
                <span className="flex items-center gap-2 justify-center">
                  <span className="hidden sm:inline">Get Started Now - Save 20+ Hours This Week</span>
                  <span className="sm:hidden">Get Started Now</span>
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="default"
                size="lg"
                className="rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F7931E] px-6 lg:px-8 py-4 lg:py-5 bg-transparent text-white font-semibold transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white shadow-none w-full sm:w-auto"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
          
          {/* Final Trust Indicators */}
          <div className="mt-6 lg:mt-8 flex items-center justify-center gap-4 lg:gap-8 text-white/80 text-xs lg:text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
