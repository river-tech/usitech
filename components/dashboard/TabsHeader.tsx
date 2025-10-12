"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Folder, Bell, Settings } from "lucide-react";

export type Tab = "overviews" | "workflows" | "notifications" | "settings";

export interface TabsHeaderProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
    { id: "overviews", label: "Overview", icon: LayoutGrid },
    { id: "workflows", label: "My Workflows", icon: Folder },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function TabsHeader({ activeTab, setActiveTab }: TabsHeaderProps) {
    console.log(activeTab);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Keyboard navigation: ArrowLeft/ArrowRight, Home/End
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (dir !== 0) {
            e.preventDefault();
            const nextIndex = (index + dir + TABS.length) % TABS.length;
            setActiveTab(TABS[nextIndex].id);
            const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
            buttons?.[nextIndex]?.focus();
        }
        if (e.key === "Home") {
            e.preventDefault();
            setActiveTab(TABS[0].id);
            const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
            buttons?.[0]?.focus();
        }
        if (e.key === "End") {
            e.preventDefault();
            setActiveTab(TABS[TABS.length - 1].id);
            const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']");
            buttons?.[TABS.length - 1]?.focus();
        }
    };

    return (
        <div ref={containerRef} className="relative w-full overflow-x-auto">
            <div className="flex items-center justify-evenly gap-10 md:gap-4 border-b border-gray-200">
                {TABS.map((t, i) => {
                    const Icon = t.icon;
                    const selected = activeTab === t.id;
                    return (
                        <button
                            key={t.id}
                            role="tab"
                            aria-selected={selected}
                            aria-controls={`panel-${t.id}`}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onClick={() => setActiveTab(t.id)}
                            className={`relative px-3 md:px-4 py-3 rounded-t-lg text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF] focus-visible:ring-offset-2 cursor-pointer ${
                                selected
                                    ? "text-[#002B6B]"
                                    : "text-gray-600 hover:text-[#007BFF]"
                            }`}
                        >
                            <span className="inline-flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {t.label}
                            </span>
                            {selected && (
                                <motion.span
                                    layoutId="dashboard-tabs-underline"
                                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-[#007BFF]"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}


