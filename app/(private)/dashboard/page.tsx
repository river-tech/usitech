// import DashboardLayout from "../../../components/dashboard/DashboardLayout";	
"use client";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import StatsGrid from "../../../components/dashboard/StatsGrid";
import TabsHeader, { Tab } from "../../../components/dashboard/TabsHeader";
import TabsContent from "../../../components/dashboard/TabsContent";
import { useState } from "react";
import AccountSummary from "../../../components/dashboard/AccountSummary";

export default function DashboardPage() {
   

    const notifications = [
        { id: "n1", title: "Workflow Update Available", body: "Email Marketing Automation v2.1 is now available", time: "2 hours ago", highlight: true },
        { id: "n2", title: "Purchase Confirmed", body: "Your purchase of CRM Data Sync has been confirmed", time: "1 day ago" },
        { id: "n3", title: "New Features", body: "Check out our new workflow categories", time: "3 days ago" },
    ];
	const [activeTab, setActiveTab] = useState<Tab>("overviews");

    return (
		<>
            <DashboardHeader userName="UsITech User" />
            <StatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 space-y-6">
                    <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
                  
                        <TabsContent activeTab={activeTab} purchases={[
                            { id: "1", name: "Email Marketing Automation", date: "2024-01-15", price: "$49", status: "Active", category: "Marketing" },
                            { id: "2", name: "CRM Data Sync", date: "2024-01-10", price: "$79", status: "Active", category: "CRM" },
                            { id: "3", name: "Social Media Scheduler", date: "2024-01-08", price: "$35", status: "Active", category: "Social Media" },
                        ]} notifications={notifications} />
                    
                </div>
				
                <div className="space-y-6">
                    <AccountSummary memberSince="Jan 2023" plan="Pro" downloads={128} />
                </div>
            </div>
		</>
      
    );
}
