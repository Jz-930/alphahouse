"use client";

import { useState } from "react";
import { Search, MapPin, Star, ShieldCheck, Wrench, Zap, Info, Phone } from "lucide-react";
import GlobalPropertySelector from "@/components/GlobalPropertySelector";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

const CATEGORIES = [
    { id: "plumbing", name: "水管/漏水", icon: "🚿", color: "bg-blue-50 text-blue-600" },
    { id: "hvac", name: "冷暖气", icon: "❄️", color: "bg-sky-50 text-sky-600" },
    { id: "electric", name: "电路/电器", icon: "⚡", color: "bg-yellow-50 text-yellow-600" },
    { id: "clean", name: "保洁/除虫", icon: "🧹", color: "bg-green-50 text-green-600" },
    { id: "general", name: "综合维修", icon: "🔨", color: "bg-gray-100 text-gray-700" },
];

const MOCK_WORKERS = [
    { id: "w1", name: "Wang 师傅", category: "plumbing", phone: "416-555-0909", rating: 4.9, jobs: 124, licensed: true, desc: "专治疑难漏水，响应速度快" },
    { id: "w2", name: "Jack 电工团队", category: "electric", phone: "647-111-2222", rating: 4.8, jobs: 89, licensed: true, desc: "持牌电工，全套安装检测" },
    { id: "w3", name: "Mike HVAC", category: "hvac", phone: "437-999-8888", rating: 4.7, jobs: 210, licensed: true, desc: "空调暖炉维修清洗" },
    { id: "w4", name: "Alfonso 装修", category: "general", phone: "416-123-1414", rating: 4.5, jobs: 45, licensed: false, desc: "补洞粉刷，换锁换地板" },
]

export default function WorkersPage() {
    const { activePropertyId, properties } = useAppStore();
    const [activeCat, setActiveCat] = useState("plumbing");
    const [searchQ, setSearchQ] = useState("");

    const activeProperty = properties.find(p => p.id === activePropertyId);

    let filtered = MOCK_WORKERS.filter(w => w.category === activeCat);
    if (searchQ) {
        filtered = MOCK_WORKERS.filter(w => 
            w.name.toLowerCase().includes(searchQ.toLowerCase()) || 
            w.phone.includes(searchQ) ||
            w.desc.includes(searchQ)
        );
    }

    if (!activePropertyId) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6 text-center">
                <h2 className="text-xl font-bold mb-2">未选择房产</h2>
                <p className="text-text-secondary text-sm mb-6">请先在主页选择一个房产，才能为该房产呼叫维修工</p>
                <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium">返回主页</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-[100px]">
             {/* Header */}
             <div className="px-5 pt-4 pb-4 flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-md z-20">
                <GlobalPropertySelector />
            </div>

            <div className="px-5 my-2">
                <h1 className="text-[22px] font-bold text-text-main tracking-tight">维修工市场</h1>
            </div>

             {/* Global Search */}
             <div className="px-5 mb-5 relative z-10">
                 <div className="bg-white h-[46px] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center px-4 gap-2 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input 
                        type="text" 
                        value={searchQ}
                        onChange={(e) => setSearchQ(e.target.value)}
                        placeholder="搜索专长、名字或电话..."
                        className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-text-main placeholder:text-gray-400 placeholder:font-normal"
                    />
                 </div>
            </div>

            {/* Categories */}
            {!searchQ && (
                <div className="px-5 mb-6">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {CATEGORIES.map(cat => (
                             <button
                                key={cat.id}
                                onClick={() => setActiveCat(cat.id)}
                                className={`shrink-0 h-[80px] w-[72px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                                    activeCat === cat.id 
                                        ? "bg-primary text-white shadow-md scale-105" 
                                        : "bg-white text-text-secondary border border-gray-100 active:scale-95"
                                }`}
                             >
                                <span className={`text-[24px]`}>{cat.icon}</span>
                                <span className="text-[11px] font-bold tracking-wider">{cat.name}</span>
                             </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Platform Guarantee Banner */}
             {!searchQ && activeCat === "plumbing" && (
                <div className="px-5 mb-6">
                     <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-4 border border-orange-200 flex items-center gap-3">
                         <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                             <ShieldCheck size={20}/>
                         </div>
                         <div>
                             <h4 className="text-[14px] font-bold text-orange-900 leading-tight">AlphaHouse 平台优选认证</h4>
                             <p className="text-[11px] text-orange-800 mt-0.5">持牌率98%以上，平台监督售后无忧</p>
                         </div>
                     </div>
                </div>
             )}

            {/* Workers List */}
            <div className="px-5">
                <div className="text-[13px] font-bold text-text-main mb-3 px-1 flex justify-between items-center">
                    {searchQ ? "搜索结果" : CATEGORIES.find(c => c.id === activeCat)?.name + "师傅推荐"}
                    <span className="text-[11px] font-normal text-text-weak bg-gray-200 px-2 py-0.5 rounded-full">{filtered.length} 名</span>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map(w => (
                         <div key={w.id} className="bg-white rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/80">
                             <div className="flex justify-between items-start mb-3">
                                 <div className="flex gap-3">
                                     <div className="w-[52px] h-[52px] bg-slate-50 rounded-[16px] text-[28px] flex items-center justify-center border border-gray-100 shadow-inner">
                                         👨‍🔧
                                     </div>
                                     <div>
                                         <h3 className="text-[16px] font-bold text-text-main leading-tight flex items-center gap-1.5">
                                            {w.name}
                                            {w.licensed && <ShieldCheck size={14} className="text-[#137333]"/>}
                                         </h3>
                                         <div className="flex items-center gap-2 mt-1">
                                             <div className="flex items-center text-[12px] font-bold text-orange-500 bg-orange-50 px-1.5 rounded-md">
                                                 <Star size={11} className="mr-[2px] mb-[1px]" fill="currentColor"/> {w.rating}
                                             </div>
                                             <span className="text-[11px] text-text-weak font-medium">{w.jobs} 次服务</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             <p className="text-[13px] text-text-secondary bg-gray-50 p-2.5 rounded-xl mb-4 leading-relaxed border border-gray-100 border-dashed">
                                 {w.desc}
                             </p>

                             <div className="flex gap-2.5">
                                 <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors py-3 rounded-[12px] flex items-center justify-center gap-1.5 text-[14px] font-bold text-text-main">
                                     <Phone size={16}/> 致电
                                 </button>
                                 <button className="flex-1 bg-primary hover:bg-primary/90 transition-colors py-3 rounded-[12px] flex items-center justify-center gap-1.5 text-[14px] font-bold text-white shadow-sm">
                                     邀请进群
                                 </button>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
