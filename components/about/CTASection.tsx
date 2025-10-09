"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#002B6B] to-[#0057D8] rounded-3xl p-8 md:p-12 shadow-md text-center text-white"
        >
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that have already automated their workflows and are saving hours every week.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push("/workflows")}
              className="bg-white text-[#002B6B] hover:bg-gray-100 font-semibold rounded-xl px-8 py-3 transition-all duration-200 flex items-center gap-2"
              size="lg"
            >
              Browse Workflows
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button 
            onClick={() => router.push("/contact")} 
              className="bg-white/10 text-white hover:bg-white/20 font-semibold rounded-xl px-8 py-3 transition-all duration-200 flex items-center gap-2"
              variant="outline"
              size="lg"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-300/30">
            <p className="text-blue-100 text-sm">
              Start your automation journey today • No credit card required • 30-day money-back guarantee
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
