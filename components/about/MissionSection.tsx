"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { CheckCircle } from "lucide-react";

export default function MissionSection() {
  const missionPoints = [
    "Democratize access to enterprise-grade automation tools",
    "Provide reliable, tested workflows that businesses can trust",
    "Support our community with comprehensive resources and assistance"
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-[#0F172A] mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-gray-700 leading-relaxed">
                We believe that automation should be accessible to businesses of all sizes. Our mission is to break down the barriers that prevent small and medium businesses from leveraging the same powerful automation tools that large enterprises use.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By providing pre-built, tested workflows and comprehensive support, we enable businesses to focus on what they do best while we handle the technical complexity of automation.
              </p>
            </div>
          </motion.div>

          {/* Mission Points */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-6">
                  What We Stand For
                </h3>
                <div className="space-y-4">
                  {missionPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
