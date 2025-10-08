"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { AboutHeroProps } from "../../lib/about/types";

export default function AboutHero({ videoUrl, posterUrl }: AboutHeroProps) {
  const videoSource = videoUrl || process.env.NEXT_PUBLIC_ABOUT_VIDEO_URL;
  
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative w-full rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {videoSource ? (
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    poster={posterUrl}
                    aria-label="Company overview video"
                  >
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#002B6B] to-[#007BFF] flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Video Coming Soon</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h1 className="font-bold text-3xl md:text-4xl text-[#0F172A] mb-6">
              Empowering Businesses Through Automation
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700 leading-relaxed">
                We believe that every business deserves access to powerful automation tools that can transform their operations and drive growth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to democratize automation by providing enterprise-grade workflows that are easy to implement, reliable, and cost-effective.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-[#002B6B] to-[#007BFF] hover:brightness-110 text-white font-semibold rounded-xl shadow-md transition-all duration-200 px-8 py-3">
                Explore Workflows
              </Button>
              <Button className="border-[#007BFF] text-[#002B6B] hover:bg-[#EAF2FF] border-2 font-semibold rounded-xl transition-all duration-200 px-8 py-3">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
