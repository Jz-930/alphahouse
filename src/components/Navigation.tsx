"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquareText, Users, Wrench, User } from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();

    // Define main tab pages where tab bar is visible
    const isMainTab = pathname === "/" || pathname === "/workers" || pathname.startsWith("/finance") || pathname === "/profile" || pathname === "/contacts";

    if (!isMainTab) return null;

    const tabs = [
        { name: "消息", path: "/", icon: <MessageSquareText size={24} strokeWidth={1.5} />, showBadge: true },
        { name: "通讯录", path: "/contacts", icon: <Users size={24} strokeWidth={1.5} /> },
        { name: "维修工", path: "/workers", icon: <Wrench size={24} strokeWidth={1.5} /> },
        { name: "我的", path: "/finance", icon: <User size={24} strokeWidth={1.5} /> }, // Request mentioned re-using finance page for "My"
    ];

    return (
        <div className="h-[82px] w-full bg-white border-t border-divider shrink-0 flex items-start justify-around pt-3 rounded-none sm:rounded-b-[44px]">
            {tabs.map((tab) => {
                const isActive = tab.path === "/" ? pathname === "/" : pathname.startsWith(tab.path);
                return (
                    <Link
                        key={tab.name}
                        href={tab.path}
                        className={`flex flex-col items-center gap-1.5 relative ${isActive ? "text-primary" : "text-text-weak"
                            }`}
                    >
                        <div className="text-[24px] relative">
                            <span className={isActive ? "opacity-100" : "grayscale opacity-50"}>{tab.icon}</span>
                            {tab.showBadge && (
                                <div className="absolute -top-1 -right-2 w-5 h-5 bg-danger rounded-full border-2 border-white flex items-center justify-center text-white text-[11px] font-bold">
                                    4
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-medium">{tab.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}
