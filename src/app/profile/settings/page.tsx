"use client";

import { useRouter } from "next/navigation";
import { User, Bell, Shield, HelpCircle, Info, ChevronRight, LogOut } from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();

    const settingGroups = [
        {
            title: "账号管理",
            items: [
                { id: "profile", name: "个人资料", icon: <User size={20} className="text-[#205781]" />, bg: "bg-blue-50" },
                { id: "security", name: "账号与安全", icon: <Shield size={20} className="text-[#10B981]" />, bg: "bg-green-50" }
            ]
        },
        {
            title: "通用设置",
            items: [
                { id: "notifications", name: "消息通知", icon: <Bell size={20} className="text-[#F59E0B]" />, bg: "bg-orange-50" },
                { id: "privacy", name: "隐私设置", icon: <Lock size={20} className="text-[#8B5CF6]" />, bg: "bg-purple-50" }
            ]
        },
        {
            title: "关于与帮助",
            items: [
                { id: "help", name: "帮助中心", icon: <HelpCircle size={20} className="text-[#6B7280]" />, bg: "bg-gray-100" },
                { id: "about", name: "关于 AlphaHouse", icon: <Info size={20} className="text-[#6B7280]" />, bg: "bg-gray-100" }
            ]
        }
    ];

    // Workaround for Lock icon missing from previous lucide import
    function Lock(props: any) {
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
            {/* NavBar */}
            <div className="h-[56px] bg-white shrink-0 flex items-center justify-center px-4 sticky top-0 z-10 border-b border-divider/40 relative">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] flex items-center justify-center active:bg-gray-100 rounded-full transition-colors absolute left-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h1 className="text-[18px] font-bold text-text-main">设置</h1>
            </div>

            <div className="p-5 flex flex-col gap-6">
                {settingGroups.map((group, idx) => (
                    <div key={idx}>
                        <h2 className="text-[13px] font-semibold text-text-weak mb-2 ml-2 tracking-wide">{group.title}</h2>
                        <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-divider/40">
                            {group.items.map((item, itemIdx) => (
                                <div key={item.id} className="relative active:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center ${item.bg}`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-[16px] font-medium text-text-main">{item.name}</span>
                                        </div>
                                        <ChevronRight size={20} className="text-text-weak/40" />
                                    </div>
                                    {/* Divider */}
                                    {itemIdx < group.items.length - 1 && (
                                        <div className="absolute bottom-0 right-0 left-[64px] h-[1px] bg-divider/40"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Clear Cache */}
                <div className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-sm border border-divider/40 active:bg-gray-50 transition-colors cursor-pointer mt-2">
                    <span className="text-[16px] font-medium text-text-main pl-2">清理系统缓存</span>
                    <span className="text-[14px] text-text-weak font-mono bg-gray-50 px-2 py-0.5 rounded-[6px]">124 MB</span>
                </div>

                {/* Logout Button */}
                <button className="mt-6 w-full py-4 bg-white rounded-[20px] shadow-sm border border-divider/40 flex items-center justify-center gap-2 text-danger active:scale-[0.98] transition-transform">
                    <LogOut size={20} />
                    <span className="text-[16px] font-bold tracking-wide">退出当前账号</span>
                </button>

                {/* Version / App Info */}
                <div className="text-center mt-2 mb-6 opacity-40">
                    <div className="w-[48px] h-[48px] bg-gray-200 rounded-[12px] mx-auto mb-2 flex flex-wrap p-2 gap-1 overflow-hidden pointer-events-none grayscale">
                        <div className="w-[40%] h-[40%] bg-blue-500 rounded-[2px]"></div>
                        <div className="w-[40%] h-[40%] bg-blue-600 rounded-[2px] ml-auto"></div>
                        <div className="w-[80%] h-[40%] bg-blue-700 rounded-[2px] mx-auto mt-auto"></div>
                    </div>
                    <p className="text-[13px] font-bold text-text-main">AlphaHouse</p>
                    <p className="text-[11px] text-text-main mt-1 font-mono">0.4-Cyano&apos;s Display</p>
                </div>
            </div>

            <div className="h-[20px] shrink-0"></div>
        </div>
    );
}
