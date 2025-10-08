"use client";

import { motion } from "framer-motion";
import { teamMembers } from "../../lib/about/mock";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function TeamSection() {
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
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            The passionate individuals behind UsITech, dedicated to making automation accessible to everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {member.avatarUrl ? (
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                          src={member.avatarUrl}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#002B6B] to-[#007BFF] flex items-center justify-center text-white text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-[#007BFF] font-medium mb-3">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
