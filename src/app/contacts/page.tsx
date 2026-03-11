"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import GlobalPropertySelector from "@/components/GlobalPropertySelector";
import Link from "next/link";
import { UserPlus, Search, Phone, Mail, Building2 } from "lucide-react";

export default function ContactsPage() {
    const { activePropertyId, properties } = useAppStore();
    const [viewMode, setViewMode] = useState<"property" | "global">("property");
    const [searchQ, setSearchQ] = useState("");

    const isAllSelected = activePropertyId === "all";
    const activeProperty = isAllSelected ? { id: "all", name: "全部房产" } : properties.find(p => p.id === activePropertyId);
    
    const effectiveViewMode = isAllSelected ? "global" : viewMode;

    // Mock Contacts Data
    const mockContacts = [
        { id: "c1", name: "David Wong", role: "租客", phone: "+1 (416) 123-4567", email: "david@example.com", propertyIds: ["prop-1"], avatar: "🧑🏻‍💻", bg: "bg-blue-100/50 text-blue-700" },
        { id: "c2", name: "Wang 师傅", role: "水管工", phone: "+1 (416) 555-0909", email: "wang.plumbing@test.ca", propertyIds: ["prop-1"], avatar: "👨‍🔧", bg: "bg-orange-100/50 text-orange-700" },
        { id: "c3", name: "Michael Chen", role: "租客", phone: "+1 (647) 987-6543", email: "michael@example.com", propertyIds: ["prop-2"], avatar: "👨‍💼", bg: "bg-green-100/50 text-green-700" },
        { id: "c4", name: "Mike HVAC", role: "冷暖气", phone: "+1 (437) 999-8888", email: "mike.hvac@test.ca", propertyIds: ["prop-2"], avatar: "❄️", bg: "bg-sky-100/50 text-sky-700" },
        { id: "c5", name: "Alice", role: "租客", phone: "+1 (437) 888-9090", email: "alice@student.ca", propertyIds: ["prop-3"], avatar: "👩‍🎓", bg: "bg-pink-100/50 text-pink-700" },
        { id: "c6", name: "Daniel", role: "租客", phone: "+1 (416) 222-3333", email: "daniel@student.ca", propertyIds: ["prop-3"], avatar: "👨‍🎓", bg: "bg-indigo-100/50 text-indigo-700" },
        { id: "c7", name: "Agent Lily", role: "中介", phone: "+1 (416) 555-0198", email: "lily.agent@realestate.ca", propertyIds: ["prop-1", "prop-2", "prop-3"], avatar: "👩‍💼", bg: "bg-purple-100/50 text-purple-700" },
        { id: "c8", name: "Jack 电工", role: "电工", phone: "+1 (647) 111-2222", email: "jack.electric@test.ca", propertyIds: ["prop-1", "prop-3"], avatar: "⚡", bg: "bg-yellow-100/50 text-yellow-700" },
    ];

    let filtered = mockContacts;
    if (effectiveViewMode === "property" && activePropertyId && !isAllSelected) {
        filtered = filtered.filter(c => c.propertyIds.includes(activePropertyId));
    }
    if (searchQ) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.phone.includes(searchQ));
    }

    if (!activePropertyId && viewMode === "property") {
         return (
             <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6 text-center">
                 <h2 className="text-xl font-bold mb-2">未选择房产</h2>
                 <p className="text-text-secondary text-sm mb-6">请先在主页选择或添加一个房产以查看其联系人</p>
                 <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium">返回主页</Link>
             </div>
         );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-[100px]">
            {/* Header */}
            <div className="px-5 pt-4 pb-4 flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-md z-10">
                <GlobalPropertySelector />
                <button className="w-[36px] h-[36px] rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-gray-50 transition-colors">
                    <UserPlus size={18} />
                </button>
            </div>

            <div className="px-5 my-2">
                <h1 className="text-[22px] font-bold text-text-main tracking-tight">通讯录</h1>
            </div>

            {/* Scope Switch */}
            <div className="px-5 mb-4">
                <div className="bg-white rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-1 flex border border-gray-100">
                    <button 
                        onClick={() => setViewMode("property")}
                        className={`flex-1 py-1.5 text-[13px] font-bold rounded-[10px] transition-colors ${effectiveViewMode === "property" ? "bg-primary text-white shadow-sm" : "text-text-weak hover:text-text-main"} ${isAllSelected ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isAllSelected}
                    >
                        {isAllSelected ? "单套房屋 (请先选择)" : `当前房屋 (${activeProperty?.name || "未选择"})`}
                    </button>
                    <button 
                         onClick={() => setViewMode("global")}
                        className={`flex-1 py-1.5 text-[13px] font-bold text-center rounded-[10px] transition-colors ${effectiveViewMode === "global" ? "bg-background text-text-main shadow-sm border border-divider" : "text-text-weak hover:text-text-main"}`}
                    >
                        全部联系人
                    </button>
                </div>
            </div>

            {/* Global Search */}
            <div className="px-5 mb-6">
                 <div className="bg-white h-[44px] rounded-[14px] shadow-sm border border-gray-100 flex items-center px-3 gap-2 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                    <Search size={16} className="text-gray-400" />
                    <input 
                        type="text" 
                        value={searchQ}
                        onChange={(e) => setSearchQ(e.target.value)}
                        placeholder="搜索姓名、电话或房屋名..."
                        className="flex-1 bg-transparent border-none outline-none text-[14px] text-text-main placeholder:text-gray-400"
                    />
                 </div>
            </div>

            {/* Contacts List */}
            <div className="px-5">
                <div className="text-[12px] font-bold text-text-weak uppercase tracking-wider mb-3 px-1">
                     {effectiveViewMode === "property" ? "所属联系人" : "所有联系人"}
                </div>
                
                {filtered.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl">📇</span>
                        </div>
                        <p className="text-text-main font-semibold mb-1">未找到联系人</p>
                        <p className="text-[13px] text-text-weak">您可以点击右上角添加新的联系人</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden divide-y divide-gray-50">
                        {filtered.map(contact => (
                            <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-[46px] h-[46px] rounded-[14px] bg-gray-100 flex items-center justify-center text-[24px]">
                                            {contact.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-[15px] font-bold text-text-main leading-none">{contact.name}</h3>
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] ${contact.bg}`}>
                                                    {contact.role}
                                                </span>
                                            </div>
                                            {effectiveViewMode === "global" && (
                                                <p className="text-[12px] text-text-weak mt-1 flex items-center gap-1">
                                                    <Building2 size={12}/> {contact.propertyIds.length} 个关联房产
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                     <a href={`tel:${contact.phone}`} onClick={e => e.stopPropagation()} className="flex-1 bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors py-2 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-medium text-text-secondary">
                                         <Phone size={14}/> 拨打
                                     </a>
                                     <button className="flex-1 bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors py-2 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-medium text-text-secondary">
                                         💬 发消息
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
