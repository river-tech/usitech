import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Shield, Clock, Users, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { DetailWorkflow, RelatedWorkflow } from "@/lib/models/workflow";
import { useAuth } from "@/lib/contexts/AuthContext";
import WishlistButton from "./WishlistButton";

// Sidebar Card
export default  function SidebarCard({ workflow, relatedWorkflows }: { workflow: DetailWorkflow, relatedWorkflows: RelatedWorkflow[] }) {
    const isFree = workflow?.price === 0;
    const router = useRouter();
    const {isAuthenticated} = useAuth();


    return (
        <div className="sticky top-6 space-y-6">
            {/* Pricing / Actions */} 
            {isAuthenticated && (
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center">
                        {!isFree && (
                            <div className="mb-4 py-2 flex flex-col items-center justify-center">
                                <div className="relative flex items-end gap-2">
                                    <span className="text-2xl font-extrabold text-[#007BFF] drop-shadow-sm">
                                        {workflow?.price?.toLocaleString("vi-VN")}₫
                                    </span>
                                </div>
                                {/* Có thể hiển thị giá cũ ở đây nếu có */}
                            </div>
                        )}
                        {isFree && <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>}
                    </div>

                    {/* Nếu đã mua, hiện nút Completed, không cho mua nữa */}
                    {!workflow.is_buy ? (
                        <Button
                            onClick={() => router.push(`/dashboard/checkout/${workflow?.id}`)}
                            className="w-full bg-gradient-to-r from-[#007BFF] to-[#06B6D4] hover:from-[#0066cc] hover:to-[#0597b5] text-white font-semibold py-3 rounded-xl mt-2"
                            disabled={workflow.is_buy}
                        >
                            {isFree ? "Get This free" : "Buy Now"}
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            disabled
                            className="w-full bg-gray-100 text-gray-500 font-semibold py-3 rounded-xl mt-2 cursor-default"
                        >
                            {isFree ? "Already Got" : "Have bought"}
                        </Button>
                    )}
                    
                    {/* Wishlist Button */}
                    <div className="mt-2">
                        <WishlistButton 
                            workflowId={workflow.id} 
                            isLiked={workflow.is_like}
                            className="w-full"
                        />
                    </div>

                    <hr className="my-4 border-t border-gray-200" />
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> 30-day money-back guarantee</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {workflow?.time_to_setup} minutes setup</div>
                        <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {workflow?.downloads_count} downloads</div>
                    </div>
                </CardContent>
            </Card>
            )}

            {/* Author */}
            <Card className="rounded-xl shadow-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#007BFF] to-[#06B6D4] text-white flex items-center justify-center font-semibold">
                            US
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-900">UsTech Team</p>
                            <p className="text-sm text-gray-600">Automation Expert</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Professional team specializing in business automation solutions with over 5 years of
                        experience in n8n workflows.
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-700">
                        <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {workflow?.rating_avg} rating</span>
                        <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {workflow?.downloads_count} downloads</span>
                    </div>
                    <Link href="/workflows?author=ustech" className="inline-block mt-5 w-full">
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
                        {relatedWorkflows
                            .filter((w: RelatedWorkflow) => w.id !== workflow?.id)
                            .slice(0, 3)
                            .map((w: RelatedWorkflow) => (
                                <Link key={w.id} href={`/workflows/${w.id}`} className="block">
                                    <div className="flex items-center rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors p-4">
                                        {/* Image */}
                                        <div className="relative w-[72px] h-[56px] rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                                            <Image
                                                src={w.thumbnail_url && w.thumbnail_url.startsWith("http")
                                                    ? w.thumbnail_url
                                                    : "/placeholder-workflow.png"
                                                }
                                                alt={w.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Texts and price */}
                                        <div className="flex flex-1 items-center justify-between ml-4 min-w-0">
                                            <div className="min-w-0">
                                                <p className="text-base font-semibold text-gray-900 leading-snug truncate">{w.title}</p>
                                                <div className="mt-2 flex items-center gap-1 text-sm text-gray-700">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span>{w.rating_avg}</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 text-gray-900 font-bold text-right flex-shrink-0" style={{ minWidth: 54 }}>
                                                {w.price === 0 ? "Free" : `${w.price.toLocaleString("vi-VN")}đ`}
                                            </div>
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
