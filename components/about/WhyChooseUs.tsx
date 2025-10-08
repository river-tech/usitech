"use client";

import { motion } from "framer-motion";
import { features } from "../../lib/about/mock";
import { Card, CardContent } from "../ui/card";
import { 
  Shield, 
  Star, 
  Headphones, 
  RefreshCw, 
  DollarSign, 
  Users 
} from "lucide-react";

const iconMap = {
  professional: Shield,
  quality: Star,
  support: Headphones,
  updates: RefreshCw,
  pricing: DollarSign,
  community: Users
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-bold text-3xl md:text-4xl text-[#0F172A] mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            We&apos;re committed to providing the best automation solutions with unmatched quality and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#002B6B] to-[#007BFF] rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
