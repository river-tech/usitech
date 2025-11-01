import Image from "next/image";
import Link from "next/link";
import { Star, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Workflow } from "@/lib/models/workflow";
import WishlistButton from "./WishlistButton";

export default function WorkflowCard({ workflow }: { workflow: Workflow }) {
    
  return (
    <article className="group bg-white border border-gray-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer font-inter">
      {/* Image Section */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
        <Image
          src={
            workflow?.image_urls?.[0] && workflow.image_urls[0].startsWith("http")
              ? workflow.image_urls[0]
              : "/placeholder-workflow.png"
          }
          alt={`${workflow?.title || "Workflow"} workflow automation template preview`}
          width={600}
          height={338}
          className="object-cover w-full h-full rounded-t-xl"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category + Rating */}
        <div className="flex justify-between items-center mt-3 mb-2">
          <span className="bg-sky-50 text-sky-700 font-medium text-xs px-2 py-1 rounded-full">
            {workflow.categories?.[0] || "Uncategorized"}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {workflow.rating_avg?.toFixed(1) || "5.0"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-sky-600 transition-colors">
          {workflow.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {workflow.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {workflow.features?.slice(0, 3).map((feature: string, i: number) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Stats & Pricing */}
        <div className="flex justify-between items-center mt-auto mx-2 mb-3 gap-2">
          {/* Left: Downloads */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{workflow.downloads_count}</span>
          </div>

          {/* Right: Price + Wishlist + CTA */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end leading-none">
              <span className="text-sm font-semibold text-gray-900">
                {workflow.price === 0 ? "Free" : `${workflow.price} ₫`}
              </span>
            </div>
          </div>
          
        </div>
        <Link href={`/workflows/${workflow.id}`}>
              <Button className="bg-gradient-to-r w-full from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex-shrink-0">
                View
              </Button> 
            </Link>
      </div>
    </article>
  );
}