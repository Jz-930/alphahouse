"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Building2, Shield, Settings, HelpCircle, LogOut, ChevronRight, PieChart, Wallet } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, properties, logout, setActivePropertyId } = useAppStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navToGlobalFinance = () => {
    setActivePropertyId("all");
    router.push("/finance");
  };

  const navToGlobalReport = () => {
    setActivePropertyId("all");
    router.push("/finance/reports");
  };

  if (!currentUser) return null;

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      {/* Header Profile Card */}
      <div className="bg-white px-6 pt-12 pb-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative shadow-sm">
            <span className="text-primary text-2xl font-bold">
              {currentUser.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-text-main truncate">{currentUser.name}</h1>
            <p className="text-sm text-text-secondary mt-1 truncate">
              {currentUser.phone || currentUser.email || "未绑定联系方式"}
            </p>
          </div>
          <Link href="/profile/edit" className="p-2 text-primary text-sm font-medium hover:bg-gray-50 rounded-lg">
            编辑
          </Link>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-4">

        {/* Finance Core Section */}
        <div className="bg-gradient-to-br from-[#1A365D] to-[#2B6CB0] rounded-2xl shadow-md overflow-hidden relative">
           <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.03] pointer-events-none"></div>
           <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center relative z-10">
               <span className="text-[16px] font-bold text-white tracking-wide">核心功能</span>
           </div>
           
           <div 
             onClick={navToGlobalFinance}
             className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/10 active:bg-white/10"
           >
             <div className="flex items-center gap-3">
               <div className="w-[32px] h-[32px] bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/10">
                 <Wallet size={18} className="text-white" />
               </div>
               <div>
                 <span className="text-[15px] font-bold text-white">收支统计</span>
                 <p className="text-[11px] text-white/70 mt-0.5">多房产聚合流水与账单</p>
               </div>
             </div>
             <ChevronRight size={18} className="text-white/40" />
           </div>

           <div 
             onClick={navToGlobalReport}
             className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer active:bg-white/10"
           >
             <div className="flex items-center gap-3">
               <div className="w-[32px] h-[32px] bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/10">
                 <PieChart size={18} className="text-white" />
               </div>
               <div>
                 <span className="text-[15px] font-bold text-white">财务报表</span>
                 <p className="text-[11px] text-white/70 mt-0.5">利润分析与一键导出</p>
               </div>
             </div>
             <ChevronRight size={18} className="text-white/40" />
           </div>
        </div>
        
        {/* Core Management */}
        <div className="bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">
          <Link href="/profile/properties" className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px] bg-blue-50 rounded-xl flex items-center justify-center">
                <Building2 size={18} className="text-blue-500" />
              </div>
              <div>
                <span className="text-[15px] font-medium text-text-main">房屋管理</span>
                <p className="text-[12px] text-text-weak mt-0.5">管理您的 {properties.length} 套房产</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Link>
        </div>

        {/* Settings Group */}
        <div className="bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] overflow-hidden">
          <Link href="/profile/security" className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px] bg-orange-50 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-orange-500" />
              </div>
              <span className="text-[15px] font-medium text-text-main">账号安全</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Link>

          <Link href="/profile/settings" className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px] bg-purple-50 rounded-xl flex items-center justify-center">
                <Settings size={18} className="text-purple-500" />
              </div>
              <span className="text-[15px] font-medium text-text-main">通用设置</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Link>

          <Link href="/profile/help" className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px] bg-green-50 rounded-xl flex items-center justify-center">
                <HelpCircle size={18} className="text-green-500" />
              </div>
              <span className="text-[15px] font-medium text-text-main">帮助与关于</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Link>
        </div>

        {/* Logout */}
        <div className="pt-4">
          <button 
            onClick={handleLogout}
            className="w-full bg-white text-danger py-4 rounded-2xl font-medium text-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] active:bg-gray-50 transition-colors"
          >
            退出登录
          </button>
        </div>

      </div>
    </div>
  );
}
