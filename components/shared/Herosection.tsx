"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Star, StarHalf, StarOff, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function HeroSection({ workflow }: any) {
  const images: string[] = Array.isArray(workflow.image)
    ? (workflow.image as string[])
    : [workflow.image || "/placeholder-workflow.png"];
  const [selected, setSelected] = useState<string>(images[0]);

  return (
    <section className="mb-8">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 md:p-6 max-w-4xl mx-auto flex flex-col items-center hover:scale-[1.01] duration-500 ease-out">
        {/* Main Image */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-16 after:bg-gradient-to-t after:from-black/10 after:via-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={selected}
                alt={`${workflow.title} banner preview`}
                fill
                className="object-cover will-change-transform"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 justify-start py-2 md:mt-6 overflow-x-auto scrollbar-hide w-full">
            {images.map((img, idx) => {
              const isActive = img === selected;
              return (
                <motion.button
                  type="button"
                  key={img + idx}
                  onClick={() => setSelected(img)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                  className={`relative w-20 h-12 md:w-22 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-sky-500 shadow-lg scale-[1.08]"
                      : "border-transparent opacity-80 hover:opacity-100 hover:shadow-sm"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${workflow.title} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Meta below gallery */}
      <div className="mt-6 w-full px-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
          {workflow.title}
        </h1>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-medium">
                {workflow.category}
              </span>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold text-gray-700">
                  {workflow.rating}
                </span>
                {Array.from({ length: 5 }).map((_, i) => {
                  const fullStars = Math.floor(workflow.rating);
                  const decimal = workflow.rating - fullStars;

                  let isFull = i < fullStars;
                  let isHalf = false;

                  if (i === fullStars) {
                    if (decimal >= 0.75) {
                      // coi như 1 sao đầy nữa
                      isFull = true;
                    } else if (decimal >= 0.25) {
                      // nửa sao
                      isHalf = true;
                    }
                  }

                  if (isFull) {
                    return (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    );
                  } else if (isHalf) {
                    return (
                      <StarHalf
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    );
                  } else {
                    return (
                      <StarOff key={i} className="w-4 h-4 text-gray-300" />
                    );
                  }
                })}
                <span className="text-gray-400 font-medium">
                  ({workflow.downloads})
                </span>
              </div>
            </div>
            
            {/* Wishlist Count */}
            <div className="flex items-center gap-2 mt-2">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-sm text-gray-600 font-medium">
                {workflow.wishlistCount || 0} people wishlisted this workflow
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
