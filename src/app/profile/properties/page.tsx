"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, MapPin, Users, Home } from "lucide-react";

export default function PropertiesPage() {
    const router = useRouter();

    const properties = [
        {
            id: "128-maple",
            name: "128 Maple St.",
            address: "128 Maple Street, Springfield, IL 62701",
            type: "独立屋 (Single Family)",
            status: "已出租",
            tenants: 2,
            icon: "🏠",
            rent: "$2,100/月",
            bgColor: "from-[#E0F0FF] to-[#F5FAFF]",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            id: "56-oak",
            name: "56 Oak Ave.",
            address: "56 Oak Avenue, Springfield, IL 62704",
            type: "联排别墅 (Townhouse)",
            status: "已出租",
            tenants: 3,
            icon: "🏡",
            rent: "$1,800/月",
            bgColor: "from-[#E6F8F0] to-[#F2FCF7]",
            iconBg: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            id: "lakeview",
            name: "Lakeview Apt 4B",
            address: "88 Lakeview Drive, Apt 4B, Chicago, IL 60611",
            type: "公寓 (Apartment)",
            status: "空置招标",
            tenants: 0,
            icon: "🏢",
            rent: "$3,200/月 (预期)",
            bgColor: "from-[#FFF0E0] to-[#FFF8F0]",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* NavBar */}
            <div className="h-[56px] bg-white shrink-0 flex items-center justify-between px-4 sticky top-0 z-10 border-b border-divider/40">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="w-[34px] h-[34px] flex items-center justify-center active:bg-gray-100 rounded-full transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h1 className="text-[18px] font-bold text-text-main">我的房屋</h1>
                </div>
                <button className="w-[34px] h-[34px] flex items-center justify-center text-primary active:bg-blue-50 rounded-full transition-colors">
                    <Plus size={24} strokeWidth={2} />
                </button>
            </div>

            {/* List */}
            <div className="p-5 flex flex-col gap-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-white rounded-[16px] p-4 border border-divider/40 shadow-sm flex flex-col gap-1">
                        <span className="text-[12px] text-text-weak font-medium">总房屋数</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[24px] font-bold text-text-main">3</span>
                            <span className="text-[12px] text-text-weak">套</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-[16px] p-4 border border-divider/40 shadow-sm flex flex-col gap-1">
                        <span className="text-[12px] text-text-weak font-medium">在租状态</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[24px] font-bold text-success">2</span>
                            <span className="text-[12px] text-text-weak">/ 3 套</span>
                        </div>
                    </div>
                </div>

                <h2 className="text-[14px] font-semibold text-text-main mt-2 mb-1">房产列表</h2>

                {properties.map((prop) => (
                    <Link href={`/finance/property/${prop.id}`} key={prop.id} className="bg-white rounded-[20px] overflow-hidden border border-divider/40 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all group block">
                        <div className={`p-4 bg-gradient-to-br ${prop.bgColor} border-b border-divider/20 flex flex-col gap-3 relative overflow-hidden`}>
                            {/* Decorative */}
                            <div className="absolute -right-6 -top-6 text-[100px] opacity-5 select-none pointer-events-none">
                                {prop.icon}
                            </div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="flex gap-3 items-center">
                                    <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center ${prop.iconBg} ${prop.iconColor} shadow-sm`}>
                                        <Home size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-[16px] font-bold text-text-main leading-tight mb-0.5">{prop.name}</h3>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-[4px] inline-block ${prop.status === '已出租' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning-dark'}`}>
                                            {prop.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex flex-col gap-2.5">
                            <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-text-weak mt-0.5 shrink-0" />
                                <span className="text-[13px] text-text-weak leading-snug">{prop.address}</span>
                            </div>

                            <div className="h-[1px] w-full bg-divider/40 my-1"></div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <Users size={14} className="text-text-weak shrink-0" />
                                    <span className="text-[13px] text-text-main font-medium truncate">租客: {prop.tenants} 人</span>
                                </div>
                                <div className="text-[14px] font-bold text-primary font-mono shrink-0">
                                    {prop.rent}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Add dummy padding at bottom */}
            <div className="h-[20px] shrink-0"></div>
        </div>
    );
}
