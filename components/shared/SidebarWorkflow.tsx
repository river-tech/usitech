import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Shield, Clock, Users, Star } from "lucide-react";
import { workflows } from "../../lib/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Sidebar Card
export default  function SidebarCard({ workflow }: any) {
    const isFree = workflow.price === "Free";
    const originalPrice = isFree ? 0 : 69;
    const currentPrice = isFree ? 0 : 49;
    const savings = Math.max(originalPrice - currentPrice, 0);
    const router = useRouter();
    const [isWishList, setIsWishList] = useState(false)
    return (
        <div className="sticky top-6 space-y-6">
            {/* Pricing / Actions */} 
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center">
                        {!isFree && (
                            <div className="mb-3 flex items-center flex-col justify-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 line-through">${originalPrice}</span>
                                    <div className="text-3xl font-bold text-gray-900">${currentPrice}</div>
                                </div>
                                {savings > 0 && (
                                    <div className="text-xs text-green-600 font-semibold">Save ${savings}</div>
                                )}
                            </div>
                        )}
                        {isFree && <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>}
                    </div>
                    <Button onClick={() => router.push(`/dashboard/checkout/${workflow.id}`)} className="w-full bg-gradient-to-r from-[#007BFF] to-[#06B6D4] hover:from-[#0066cc] hover:to-[#0597b5] text-white font-semibold py-3 rounded-xl mt-2">
                        {isFree ? "Get This free" : "Buy Now"}
                    </Button>
                    <Button
                        onClick={() => setIsWishList((prev) => !prev)}
                        className={`w-full mt-2 bg-gradient-to-r 
                            ${isWishList 
                                ? "from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 text-white" 
                                : "from-[#FF6B35] to-[#F7931E] hover:from-[#FF7A4A] hover:to-[#F9A847] text-white"
                            }`}
                    >
                        <Heart className={`w-4 h-4 mr-2 ${isWishList ? "fill-current text-red-500" : ""}`} />
                        {isWishList ? "Added to wishlist" : "Add to wishlist"}
                    </Button>
                    <hr className="my-4 border-t border-gray-200" />
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> 30-day money-back guarantee</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {workflow.timeToSetup} setup</div>
                        <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {workflow.downloads} downloads</div>
                    </div>
                </CardContent>
            </Card>

            {/* Author */}
            <Card className="rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#007BFF] to-[#06B6D4] text-white flex items-center justify-center font-semibold">
                            UT
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-900">UsITech Team</p>
                            <p className="text-sm text-gray-600">Automation Expert</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Professional team specializing in business automation solutions with over 5 years of
                        experience in n8n workflows.
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-700">
                        <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-current" /> 4.9 rating</span>
                        <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 50K+ downloads</span>
                    </div>
                    <Link href="/workflows?author=usitech" className="inline-block mt-5 w-full">
                        <Button variant="outline" className="w-full">View Author’s Workflows</Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Related Workflows */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">Related Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {workflows
                            .filter((w: any) => w.category === workflow.category && w.id !== workflow.id)
                            .slice(0, 3)
                            .map((w: any) => (
                                <Link key={w.id} href={`/workflows/${w.id}`} className="block">
                                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-gray-200 bg-white">
                                                <Image src={(Array.isArray(w.image) ? w.image[0] : w.image) || "/placeholder-workflow.png"} alt={w.title} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-gray-900">{w.title}</p>
                                                <div className="mt-1 flex items-center gap-1 text-sm text-gray-700">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" /> {w.rating}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right text-gray-900 font-bold">
                                            {w.price === 0 || w.price === "Free" ? "Free" : `$${w.price}`}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}