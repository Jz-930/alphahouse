"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FinanceLeasePage() {
    const router = useRouter();

    const transactionsCurrent = [
        { name: "David · 第24个月租金", desc: "128 Maple St. · 银行转账", amount: "+$2,100", isIncome: true, icon: "🏠", iconBg: "bg-surface/20" },
        { name: "David · 第23个月租金", desc: "128 Maple St. · 银行转账", amount: "+$2,100", isIncome: true, icon: "🏠", iconBg: "bg-surface/20" },
        { name: "厨房漏水 · 维修费", desc: "128 Maple St. · 王师傅", amount: "-$180", isIncome: false, icon: "🔧", iconBg: "bg-[#FFF0E0]" },
        { name: "David · 第22个月租金", desc: "128 Maple St. · 银行转账", amount: "+$2,100", isIncome: true, icon: "🏠", iconBg: "bg-surface/20" },
    ];

    const transactionsHistory = [
        { name: "押金退还 · Sarah", desc: "128 Maple St. · 租约结束", amount: "-$2,100", isIncome: false, icon: "💰", iconBg: "bg-[#FFE8E8]" },
        { name: "房屋清洁费", desc: "128 Maple St. · 换租清洁", amount: "-$250", isIncome: false, icon: "✨", iconBg: "bg-[#FFF0E0]" },
    ];

    return (
        <div className="flex flex-col min-h-full pb-[100px] bg-background">
            {/* NavBar */}
            <div className="h-[56px] bg-background shrink-0 flex items-center justify-between px-4 sticky top-0 z-10 pt-2 pb-2">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="w-[34px] h-[34px] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h1 className="text-[22px] font-bold text-text-main">财务报表</h1>
                </div>
                <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
            </div>

            {/* Property Selector */}
            <div className="px-5 mt-2 mb-3">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button className="px-4 py-2 rounded-[20px] text-[13px] font-medium bg-primary text-white shrink-0">
                        全部房产
                    </button>
                    <Link href="/finance/property/128-maple" className="px-4 py-2 rounded-[20px] text-[13px] font-medium bg-white border border-divider text-text-secondary shrink-0 block">
                        🏠 128 Maple St.
                    </Link>
                    <Link href="/finance/property/56-oak" className="px-4 py-2 rounded-[20px] text-[13px] font-medium bg-white border border-divider text-text-secondary shrink-0 block">
                        🏡 56 Oak Ave.
                    </Link>
                    <Link href="/finance/property/lakeview" className="px-4 py-2 rounded-[20px] text-[13px] font-medium bg-white border border-divider text-text-secondary shrink-0 block">
                        🏢 Lakeview Apt
                    </Link>
                </div>
            </div>

            {/* Dimension Switch */}
            <div className="px-5 mb-[14px]">
                <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-1 flex">
                    <Link href="/finance" className="flex-1 py-1.5 text-[13px] font-medium text-text-secondary rounded-[8px] text-center block">
                        按自然年
                    </Link>
                    <button className="flex-1 py-1.5 text-[13px] font-medium bg-primary text-white rounded-[8px] shadow-sm">
                        按租期
                    </button>
                </div>
            </div>

            {/* Overview Card */}
            <div className="px-5 mb-3">
                <div className="bg-gradient-to-br from-[#163B56] to-[#0A1D2B] rounded-[14px] p-6 relative overflow-hidden shadow-[0_4px_16px_rgba(10,29,43,0.3)]">
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-[60px] -right-[20px] w-[180px] h-[180px] rounded-full bg-white opacity-[0.03]"></div>

                    <div className="relative z-10 flex justify-between items-end">
                        <div>
                            <p className="text-[13px] text-white/80 mb-2">当前租期汇总 · 全部房产</p>
                            <h2 className="text-[32px] font-bold text-white font-mono tracking-[-1px] mb-1 leading-none">$118,500</h2>
                            <p className="text-[13px] text-white/70">租期累计总收入</p>
                        </div>
                        <div className="text-right">
                            <div className="text-[20px] font-bold text-[#FFF0E0] font-mono leading-none">-$21,480</div>
                            <p className="text-[11px] text-white/50 mt-1">租期累计支出</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress metrics */}
            <div className="px-5 mb-5 flex gap-3">
                <div className="flex-1 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-[12px] font-medium text-text-weak mb-1">收益率</h3>
                        <p className="text-[16px] font-bold text-text-main font-mono">82%</p>
                    </div>
                    <div className="w-[42px] h-[42px] relative flex items-center justify-center">
                        {/* Circular progress */}
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                            <circle cx="21" cy="21" r="18" stroke="currentColor" strokeWidth="3" fill="none" className="text-surface" />
                            <circle cx="21" cy="21" r="18" stroke="currentColor" strokeWidth="3" fill="none" className="text-primary" strokeDasharray="113" strokeDashoffset="20" strokeLinecap="round" />
                        </svg>
                        <span className="text-[10px] font-bold text-primary relative z-10">82</span>
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-4 flex flex-col justify-center">
                    <h3 className="text-[12px] font-medium text-text-weak mb-1">即将到期租约</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-[16px] font-bold text-text-main font-mono">1 <span className="text-[12px] font-normal text-text-secondary">份</span></p>
                        <span className="text-[10px] bg-[#FFE8E8] text-danger px-1.5 py-0.5 rounded-[4px]">90天内</span>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="px-5">
                <h2 className="text-[12px] font-semibold text-text-weak tracking-[1px] uppercase mb-3">按租期明细</h2>

                {/* Current */}
                <div className="mb-4">
                    <div className="text-[12px] font-semibold text-text-main mb-2 flex items-center justify-between">
                        <span>当前生效租约 (3份)</span>
                        <span className="text-primary font-mono\">+$118,500</span>
                    </div>
                    <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                        {transactionsCurrent.map((tx, i) => (
                            <TxRow key={i} tx={tx} isLast={i === transactionsCurrent.length - 1} />
                        ))}
                    </div>
                </div>

                {/* History */}
                <div>
                    <div className="text-[12px] font-semibold text-text-weak mb-2 flex items-center justify-between">
                        <span>历史已结租约 (2024及以前)</span>
                        <span className="text-text-secondary font-mono\">+$245,000</span>
                    </div>
                    <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                        {transactionsHistory.map((tx, i) => (
                            <TxRow key={i} tx={tx} isLast={i === transactionsHistory.length - 1} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

function TxRow({ tx, isLast }: { tx: { name: string, desc: string, amount: string, isIncome: boolean, icon: string, iconBg: string }; isLast: boolean }) {
    return (
        <div className="flex px-4 py-[14px] hover:bg-gray-50 transition-colors relative">
            <div className="flex gap-3 w-full items-center">
                {/* Icon */}
                <div className={`w-[42px] h-[42px] rounded-[8px] flex items-center justify-center text-[20px] shrink-0 ${tx.iconBg}`}>
                    {tx.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-[14px] font-medium text-text-main truncate">{tx.name}</h4>
                    <p className="text-[12px] text-text-weak truncate">{tx.desc}</p>
                </div>

                {/* Amount */}
                <div className={`text-[15px] font-semibold font-mono shrink-0 ${tx.isIncome ? "text-success" : "text-text-main"}`}>
                    {tx.amount}
                </div>
            </div>

            {/* Divider */}
            {!isLast && <div className="absolute bottom-0 right-0 left-[67px] h-[1px] bg-divider"></div>}
        </div>
    );
}
