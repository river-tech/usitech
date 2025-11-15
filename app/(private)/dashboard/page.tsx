// import DashboardLayout from "../../../components/dashboard/DashboardLayout";	
"use client";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import StatsGrid from "../../../components/dashboard/StatsGrid";
import TabsHeader, { Tab } from "../../../components/dashboard/TabsHeader";
import TabsContent from "../../../components/dashboard/TabsContent";
import { useEffect, useMemo, useState } from "react";
import UserApi from "../../../lib/api/User";
import { UserProfile } from "../../../lib/models/user";
import { useAuth } from "@/lib/contexts/AuthContext";
export default function DashboardPage() {
    const user = useMemo(() => UserApi(), []);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const { userName } = useAuth();
	const [activeTab, setActiveTab] = useState<Tab>("overviews");
    useEffect(() => {
        const getProfile = async () => {
            const result = await user.getUserProfile();
                if (result.success) {
                    setProfile(result.data);
                }
        };
        getProfile();
    }, [user]);

    return (
		<>
            <DashboardHeader userName={userName || "UsITech User"} />
            <StatsGrid />

            <div className="space-y-6 mb-8">
                <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                <TabsContent activeTab={activeTab} profile={profile || { id: "", avatar_url: "", name: "", email: "", created_at: "" } as UserProfile} />
            </div>
		</>
      
    );
}
