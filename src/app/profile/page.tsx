"use client";

import Link from "next/link";
import { ChevronRight, Home, Star, PieChart, CreditCard, Settings, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
    const menuItems = [
        { name: "我的房屋", desc: "查看与管理您的所有房产", icon: <Home size={20} className="text-[#205781]" />, href: "/profile/properties", bg: "bg-[#E0F0FF]/60" },
        { name: "总收藏", desc: "汇总所有聊天中的重要收藏内容", icon: <Star size={20} className="text-[#F59E0B]" />, href: "/profile/collections", bg: "bg-[#FFF8E6]" },
        { name: "报表中心", desc: "总财务报表与单房收支明细", icon: <PieChart size={20} className="text-[#10B981]" />, href: "/finance", bg: "bg-[#E6F8F0]" },
        { name: "支付信息", desc: "管理银行卡与第三方支付对接", icon: <CreditCard size={20} className="text-[#8B5CF6]" />, href: "/profile/payments", bg: "bg-[#F3E8FF]" },
        { name: "设置", desc: "账号与安全、通知隐私设置", icon: <Settings size={20} className="text-[#6B7280]" />, href: "/profile/settings", bg: "bg-[#F3F4F6]" },
    ];

    return (
        <div className="flex flex-col min-h-screen pb-[100px] bg-background overflow-y-auto">
            {/* Header / User Info */}
            <div className="bg-gradient-to-br from-[#205781] to-[#163B56] pt-12 pb-8 px-5 relative overflow-hidden rounded-b-[32px] shadow-[0_4px_24px_rgba(32,87,129,0.15)] flex-shrink-0">
                {/* Decorative Elements */}
                <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.04]"></div>
                <div className="absolute top-[20px] -left-[20px] w-[100px] h-[100px] rounded-full bg-white opacity-[0.04]"></div>

                <div className="relative z-10 flex items-center gap-4 mt-2">
                    <div className="w-[72px] h-[72px] rounded-[24px] bg-white/10 p-1 shadow-sm backdrop-blur-md border border-white/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aland"
                            alt="Aland Zhang"
                            className="w-full h-full rounded-[20px] object-cover bg-white"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-[24px] font-bold text-white mb-2 tracking-tight">Aland Zhang</h1>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                            <span className="text-[12px] text-white/95 font-medium tracking-wide">房东</span>
                        </div>
                    </div>
                    <button className="w-[40px] h-[40px] rounded-full bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform shadow-sm">
                        <ChevronRight size={22} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Menu List */}
            <div className="px-5 mt-6 flex flex-col gap-3.5 flex-shrink-0">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.href} className="bg-white rounded-[20px] p-[18px] flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform border border-divider/40">
                        <div className={`w-[48px] h-[48px] rounded-[14px] flex items-center justify-center shrink-0 ${item.bg}`}>
                            {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[16px] font-bold text-text-main mb-1 tracking-tight">{item.name}</h3>
                            <p className="text-[12px] text-text-weak truncate leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="text-text-weak/40 shrink-0">
                            <ChevronRight size={22} strokeWidth={1.5} />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Logout Button */}
            <div className="px-5 mt-8 flex-shrink-0">
                <button className="w-full py-[18px] bg-white rounded-[20px] text-[16px] font-bold text-danger shadow-[0_2px_12px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-transform border border-divider/40 tracking-wide">
                    退出登录
                </button>
            </div>

            {/* Version */}
            <div className="text-center mt-8 mb-6 flex-shrink-0">
                <p className="text-[12px] text-text-weak/40 font-mono tracking-wider">0.4-Cyano&apos;s Display</p>
                <p className="text-[10px] text-text-weak/30 mt-1">AlphaHouse System</p>
            </div>
        </div>
    );
}
