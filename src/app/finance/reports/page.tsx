"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { ChevronLeft, CalendarDays, Download, PieChart, TrendingUp } from "lucide-react";

export default function ReportsPage() {
    const router = useRouter();
    const { activePropertyId, properties, ledgers } = useAppStore();
    const [viewMode, setViewMode] = useState<"property" | "global">("property");
    const isAllSelected = activePropertyId === "all";
    const activeProperty = isAllSelected 
        ? { id: "all", name: "全部房产" }
        : properties.find((p) => p.id === activePropertyId);

    // Calculate report data
    const relevantLedgers = (viewMode === "global" || isAllSelected)
        ? ledgers 
        : ledgers.filter(l => l.propertyId === activePropertyId);

    const totalIncome = relevantLedgers.filter(l => l.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = relevantLedgers.filter(l => l.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
    const netIncome = totalIncome - totalExpense;

    // Very basic mock bar chart heights
    const maxVal = Math.max(totalIncome, totalExpense, 1);
    const incomeHeight = `${Math.max((totalIncome / maxVal) * 100, 10)}%`;
    const expenseHeight = `${Math.max((totalExpense / maxVal) * 100, 10)}%`;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-[80px]">
            {/* Header */}
            <div className="px-5 pt-4 pb-4 flex items-center bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeft size={24} className="text-text-main" />
                </button>
                <h1 className="text-[18px] font-bold text-text-main ml-2 flex-1">数据报表与导出</h1>
                <button className="text-primary text-[14px] font-bold">
                    <Download size={20} />
                </button>
            </div>

            {/* Scope Switch */}
            <div className="px-5 mt-4 mb-4">
                <div className="bg-white rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-1 flex border border-gray-100">
                    <button 
                        onClick={() => setViewMode("property")}
                        className={`flex-1 py-2 text-[13px] font-bold rounded-[10px] transition-colors ${viewMode === "property" && !isAllSelected ? "bg-primary text-white shadow-sm" : "text-text-weak hover:text-text-main"} ${isAllSelected ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isAllSelected}
                    >
                        {isAllSelected ? "单套房屋分析 (请先从顶部选择)" : `当前房屋 (${activeProperty?.name || "未选择"})`}
                    </button>
                    <button 
                         onClick={() => setViewMode("global")}
                        className={`flex-1 py-2 text-[13px] font-bold text-center rounded-[10px] transition-colors ${(viewMode === "global" || isAllSelected) ? "bg-primary text-white shadow-sm" : "text-text-weak hover:text-text-main"}`}
                    >
                        全局报表 (全部套房)
                    </button>
                </div>
            </div>

            {/* Year Selector */}
            <div className="px-5 mb-4 flex justify-between items-center">
                <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-[14px] font-bold text-text-main shadow-sm border border-gray-100">
                    <CalendarDays size={16} className="text-primary"/> 2026 年度
                </button>
                <div className="text-[12px] text-text-weak bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                    共 {relevantLedgers.length} 笔明细
                </div>
            </div>

            {/* Main Stats */}
            <div className="px-5 mb-5">
                 <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <p className="text-[13px] text-text-secondary mb-1 font-medium">年度净利润</p>
                            <h2 className="text-[34px] font-bold text-text-main font-mono tracking-tight leading-none">
                                ${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h2>
                        </div>
                        <div className="w-[48px] h-[48px] bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <TrendingUp size={24} strokeWidth={2.5}/>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-[#E6F4EA]/50 rounded-xl p-4 border border-[#E6F4EA]">
                            <p className="text-[12px] text-text-weak mb-1">总收入</p>
                            <p className="text-[18px] font-bold text-[#137333] font-mono leading-none">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="flex-1 bg-[#FFE8E8]/50 rounded-xl p-4 border border-[#FFE8E8]">
                            <p className="text-[12px] text-text-weak mb-1">总支出</p>
                            <p className="text-[18px] font-bold text-danger font-mono leading-none">${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Chart (Mock Visual) */}
            <div className="px-5 mb-6">
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100">
                    <h3 className="text-[15px] font-bold text-text-main mb-6 flex items-center gap-2">
                        <PieChart size={18} className="text-primary"/> 收支结构分析
                    </h3>
                    
                    <div className="h-[160px] flex items-end justify-center gap-12 px-6 border-b border-gray-100 pb-2">
                        <div className="flex flex-col items-center justify-end w-[60px] h-full gap-2 relative group">
                            <div className="w-full bg-[#137333] rounded-t-lg transition-all" style={{ height: incomeHeight }}></div>
                            <span className="text-[12px] font-bold text-text-secondary">收入</span>
                            {/* Tooltip mock */}
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[11px] px-2 py-1 rounded">
                                {(totalIncome/maxVal*100).toFixed(0)}%
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-end w-[60px] h-full gap-2 relative group">
                            <div className="w-full bg-danger rounded-t-lg transition-all" style={{ height: expenseHeight }}></div>
                            <span className="text-[12px] font-bold text-text-secondary">支出</span>
                             {/* Tooltip mock */}
                             <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[11px] px-2 py-1 rounded">
                                {(totalExpense/maxVal*100).toFixed(0)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Section */}
            <div className="px-5">
                 <button className="w-full bg-[#1A2332] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-black transition-colors flex justify-center items-center gap-2 shadow-md">
                    <Download size={18}/> 导出 PDF 给会计
                 </button>
            </div>
        </div>
    );
}
