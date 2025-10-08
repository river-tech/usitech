"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Image skeleton */}
          <div className="aspect-video bg-gray-200">
            <Skeleton className="w-full h-full" />
          </div>

          <div className="p-5 space-y-4">
            {/* Category & Rating skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Tags skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-14" />
            </div>

            {/* Footer skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-6 w-12" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
