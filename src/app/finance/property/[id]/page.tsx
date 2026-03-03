"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PropertyFinancePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const getPropertyInfo = () => {
        switch (id) {
            case '128-maple':
                return { name: "128 Maple St.", icon: "🏠", income: "$25,200", expense: "$8,150" };
            case '56-oak':
                return { name: "56 Oak Ave.", icon: "🏡", income: "$21,600", expense: "$4,200" };
            case 'lakeview':
                return { name: "Lakeview Apt", icon: "🏢", income: "$28,800", expense: "$14,630" };
            default:
                return { name: "未知房产", icon: "❓", income: "$0", expense: "$0" };
        }
    };

    const propInfo = getPropertyInfo();

    const transactionsMarch = [
        { name: `租金收入`, desc: `${propInfo.name} · 银行转账`, amount: "+$2,100", isIncome: true, icon: propInfo.icon, iconBg: "bg-surface/20" },
        { name: `维修费`, desc: `${propInfo.name} · 王师傅`, amount: "-$180", isIncome: false, icon: "🔧", iconBg: "bg-[#FFF0E0]" },
        { name: "地产税 Q1", desc: `${propInfo.name} · OCR识别`, amount: "-$1,250", isIncome: false, icon: "🏛️", iconBg: "bg-[#FFE8E8]" },
    ];

    const transactionsFeb = [
        { name: `租金收入`, desc: `${propInfo.name} · 银行转账`, amount: "+$2,100", isIncome: true, icon: propInfo.icon, iconBg: "bg-surface/20" },
        { name: `物业管理费`, desc: `${propInfo.name} · 月度`, amount: "-$380", isIncome: false, icon: "📋", iconBg: "bg-[#FFF0E0]" },
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
                    <h1 className="text-[22px] font-bold text-text-main">单套财务</h1>
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
                    <Link href="/finance" className="px-4 py-2 rounded-[20px] text-[13px] font-medium bg-white border border-divider text-text-secondary shrink-0 block">
                        全部房产
                    </Link>
                    <Link href="/finance/property/128-maple" className={`px-4 py-2 rounded-[20px] text-[13px] font-medium shrink-0 block ${id === '128-maple' ? 'bg-primary text-white border-primary' : 'bg-white border border-divider text-text-secondary'}`}>
                        🏠 128 Maple St.
                    </Link>
                    <Link href="/finance/property/56-oak" className={`px-4 py-2 rounded-[20px] text-[13px] font-medium shrink-0 block ${id === '56-oak' ? 'bg-primary text-white border-primary' : 'bg-white border border-divider text-text-secondary'}`}>
                        🏡 56 Oak Ave.
                    </Link>
                    <Link href="/finance/property/lakeview" className={`px-4 py-2 rounded-[20px] text-[13px] font-medium shrink-0 block ${id === 'lakeview' ? 'bg-primary text-white border-primary' : 'bg-white border border-divider text-text-secondary'}`}>
                        🏢 Lakeview Apt
                    </Link>
                </div>
            </div>

            {/* Dimension Switch */}
            <div className="px-5 mb-[14px]">
                <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-1 flex">
                    <button className="flex-1 py-1.5 text-[13px] font-medium bg-primary text-white rounded-[8px] shadow-sm">
                        按自然年
                    </button>
                    <Link href="/finance/lease" className="flex-1 py-1.5 text-[13px] font-medium text-text-secondary rounded-[8px] text-center block">
                        按租期
                    </Link>
                </div>
            </div>

            {/* Overview Card */}
            <div className="px-5 mb-3">
                <div className="bg-gradient-to-br from-[#205781] to-[#163B56] rounded-[14px] p-6 relative overflow-hidden shadow-[0_4px_16px_rgba(32,87,129,0.2)]">
                    {/* Decorative Circle */}
                    <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-white opacity-5"></div>

                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <p className="text-[13px] text-white/80 mb-2">2025年度 · {propInfo.name}</p>
                            <h2 className="text-[36px] font-bold text-white font-mono tracking-[-1px] mb-1 leading-none">{propInfo.income}</h2>
                            <p className="text-[13px] text-white/70">年度总收入</p>
                        </div>
                        <div className="text-[48px] opacity-20 filter grayscale">
                            {propInfo.icon}
                        </div>
                    </div>
                </div>
            </div>

            {/* Income / Expense Cards */}
            <div className="px-5 mb-4 flex gap-3">
                <div className="flex-1 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[18px]">
                    <h3 className="text-[12px] font-medium text-text-weak mb-1">年度支出</h3>
                    <p className="text-[20px] font-bold text-warning font-mono mb-2 leading-none">{propInfo.expense}</p>
                    <div className="w-full bg-surface rounded-full h-1 mt-2">
                        <div className="bg-warning h-1 rounded-full w-[35%]"></div>
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[18px]">
                    <h3 className="text-[12px] font-medium text-text-weak mb-1">投资回报率</h3>
                    <p className="text-[20px] font-bold text-success font-mono mb-2 leading-none">6.4%</p>
                    <div className="text-[10px] font-medium text-text-secondary flex items-center">
                        表现优于均值 1.2%
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="px-5 mt-6">
                <h2 className="text-[12px] font-semibold text-text-weak tracking-[1px] uppercase mb-3 text-center">———— 单套明细 ————</h2>

                {/* March */}
                <div className="mb-4">
                    <div className="text-[12px] font-semibold text-text-weak mb-2">3月</div>
                    <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                        {transactionsMarch.map((tx, i) => (
                            <TxRow key={i} tx={tx} isLast={i === transactionsMarch.length - 1} />
                        ))}
                    </div>
                </div>

                {/* February */}
                <div>
                    <div className="text-[12px] font-semibold text-text-weak mb-2">2月</div>
                    <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                        {transactionsFeb.map((tx, i) => (
                            <TxRow key={i} tx={tx} isLast={i === transactionsFeb.length - 1} />
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
