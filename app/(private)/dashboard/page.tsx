// import DashboardLayout from "../../../components/dashboard/DashboardLayout";	
"use client";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import StatsGrid from "../../../components/dashboard/StatsGrid";
import TabsHeader, { Tab } from "../../../components/dashboard/TabsHeader";
import TabsContent from "../../../components/dashboard/TabsContent";
import { useEffect, useState } from "react";
import { Notification } from "../../../lib/models/notification";
import UserApi from "../../../lib/api/User";
import { UserProfile } from "../../../lib/models/user";
import { useAuth } from "@/lib/contexts/AuthContext";
import { DetailWorkflow } from "@/lib/models/workflow";
import NotificationApi from "@/lib/api/Notification";
import WorkflowApi from "@/lib/api/Workflow";
export default function DashboardPage() {
    const user = UserApi();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [workflows, setWorkflows] = useState<DetailWorkflow[]>([]);
    const { userName } = useAuth();
    const notificationApi = NotificationApi();
    const workflowApi = WorkflowApi();

   

	const [activeTab, setActiveTab] = useState<Tab>("overviews");
    useEffect(() => {
        const getProfile = async () => {
            const result = await user.getUserProfile();
                if (result.success) {
                    setProfile(result.data);
                }
                const resultNotifications = await notificationApi.getMyNotifications();
                if (resultNotifications.success) {
                    setNotifications(resultNotifications.data);
                }
                const resultWorkflows = await workflowApi.getMyWorkflows();
                if (resultWorkflows.success) {
                    setWorkflows(resultWorkflows.data);
                }
        };
        getProfile();
    }, []);

    return (
		<>
            <DashboardHeader userName={userName || "UsITech User"} />
            <StatsGrid />

            <div className="space-y-6 mb-8">
                <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                <TabsContent activeTab={activeTab} profile={profile || { id: "", avatar_url: "", name: "", email: "", created_at: "" } as UserProfile} notifications={notifications } workflows={workflows} />
            </div>
		</>
      
    );
}
