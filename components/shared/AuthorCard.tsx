import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Star, Users } from "lucide-react";

export default function AuthorCard() {
    return (
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
                    <Button variant="outline" className="w-full ">View Author’s Workflows</Button>
                </Link>
            </CardContent>
        </Card>
    );
}


