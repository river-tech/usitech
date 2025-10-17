// import DashboardLayout from "../../../components/dashboard/DashboardLayout";	
"use client";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import StatsGrid from "../../../components/dashboard/StatsGrid";
import TabsHeader, { Tab } from "../../../components/dashboard/TabsHeader";
import TabsContent from "../../../components/dashboard/TabsContent";
import { useState } from "react";
import { NotificationType } from "../../../lib/models";

export default function DashboardPage() {
   

    const notifications = [
        { id: "n1", title: "Workflow Update Available", body: "Email Marketing Automation v2.1 is now available", time: "2 hours ago", highlight: true, type: NotificationType.SUCCESS },
        { id: "n2", title: "Purchase Confirmed", body: "Your purchase of CRM Data Sync has been confirmed", time: "1 day ago", type: NotificationType.SUCCESS },
        { id: "n3", title: "New Features", body: "Check out our new workflow categories", time: "3 days ago", type: NotificationType.SUCCESS },
        { id: "n4", title: "System Maintenance", body: "Scheduled maintenance on Oct 10, 2:00 AM UTC", time: "5 days ago", type: NotificationType.WARNING },
        { id: "n5", title: "Payment Failed", body: "Your payment for Marketing Automation failed", time: "1 week ago", type: NotificationType.ERROR },
    ];
	const [activeTab, setActiveTab] = useState<Tab>("overviews");

    return (
		<>
            <DashboardHeader userName="UsITech User" />
            <StatsGrid />

            <div className="space-y-6 mb-8">
                <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                <TabsContent activeTab={activeTab} purchases={[
                    { id: "1", name: "Email Marketing Automation", date: "2024-01-15", price: "$49", status: "Active", category: "Marketing" },
                    { id: "2", name: "CRM Data Sync", date: "2024-01-10", price: "$79", status: "Active", category: "CRM" },
                    { id: "3", name: "Social Media Scheduler", date: "2024-01-08", price: "$35", status: "Active", category: "Social Media" },
                ]} notifications={notifications} />
            </div>
		</>
      
    );
}
