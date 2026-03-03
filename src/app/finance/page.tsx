"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FinancePage() {
    const router = useRouter();

    const transactionsMarch = [
        { name: "David · 3月租金", desc: "128 Maple St. · 银行转账", amount: "+$2,100", isIncome: true, icon: "🏠", iconBg: "bg-surface/20" },
        { name: "Michael · 3月租金", desc: "56 Oak Ave. · 银行转账", amount: "+$1,800", isIncome: true, icon: "🏡", iconBg: "bg-surface/20" },
        { name: "水管维修 · Wang 师傅", desc: "128 Maple St. · 维修费", amount: "-$180", isIncome: false, icon: "🔧", iconBg: "bg-[#FFF0E0]" },
        { name: "地产税 Q1", desc: "128 Maple St. · OCR识别", amount: "-$1,250", isIncome: false, icon: "🏛️", iconBg: "bg-[#FFE8E8]" },
    ];

    const transactionsFeb = [
        { name: "David · 2月租金", desc: "128 Maple St. · 银行转账", amount: "+$2,100", isIncome: true, icon: "🏠", iconBg: "bg-surface/20" },
        { name: "Michael · 2月租金", desc: "56 Oak Ave. · 银行转账", amount: "+$1,800", isIncome: true, icon: "🏡", iconBg: "bg-surface/20" },
        { name: "物业管理费", desc: "Lakeview Apt · 月度", amount: "-$380", isIncome: false, icon: "📋", iconBg: "bg-[#FFF0E0]" },
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

                    <div className="relative z-10">
                        <p className="text-[13px] text-white/80 mb-2">2025年度 · 全部房产</p>
                        <h2 className="text-[36px] font-bold text-white font-mono tracking-[-1px] mb-1 leading-none">$48,620</h2>
                        <p className="text-[13px] text-white/70">年度净收入</p>
                    </div>
                </div>
            </div>

            {/* Income / Expense Cards */}
            <div className="px-5 mb-4 flex gap-3">
                <div className="flex-1 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[18px]">
                    <h3 className="text-[12px] font-medium text-text-weak mb-1">总收入</h3>
                    <p className="text-[22px] font-bold text-success font-mono mb-2 leading-none">$75,600</p>
                    <div className="text-[11px] font-medium text-success flex items-center">
                        ↑ 8.2% 同比去年
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[18px]">
                    <h3 className="text-[12px] font-medium text-text-weak mb-1">总支出</h3>
                    <p className="text-[22px] font-bold text-warning font-mono mb-2 leading-none">$26,980</p>
                    <div className="text-[11px] font-medium text-danger flex items-center">
                        ↑ 12.1% 同比去年
                    </div>
                </div>
            </div>

            {/* Trend Chart Mock */}
            <div className="px-5 mb-4">
                <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] p-[18px]">
                    <h3 className="text-[14px] font-semibold text-text-main mb-4">月度收支趋势</h3>

                    <div className="h-[100px] flex items-end justify-between gap-2 px-2">
                        {/* Jan */}
                        <div className="flex-1 flex flex-col justify-end gap-1 h-full max-w-[40px]">
                            <div className="w-full flex gap-[2px] items-end justify-center h-full">
                                <div className="w-1/2 bg-surface rounded-t-[4px] h-[60%]"></div>
                                <div className="w-1/2 bg-[#FFF0E0] rounded-t-[4px] h-[30%]"></div>
                            </div>
                        </div>
                        {/* Feb */}
                        <div className="flex-1 flex flex-col justify-end gap-1 h-full max-w-[40px]">
                            <div className="w-full flex gap-[2px] items-end justify-center h-full">
                                <div className="w-1/2 bg-surface rounded-t-[4px] h-[75%]"></div>
                                <div className="w-1/2 bg-[#FFF0E0] rounded-t-[4px] h-[40%]"></div>
                            </div>
                        </div>
                        {/* March (Current) */}
                        <div className="flex-1 flex flex-col justify-end gap-1 h-full max-w-[40px]">
                            <div className="w-full flex gap-[2px] items-end justify-center h-full">
                                <div className="w-1/2 bg-primary rounded-t-[4px] h-[85%]"></div>
                                <div className="w-1/2 bg-warning rounded-t-[4px] h-[50%]"></div>
                            </div>
                        </div>
                        {/* April (Predict) */}
                        <div className="flex-1 flex flex-col justify-end gap-1 h-full max-w-[40px] opacity-40">
                            <div className="w-full flex gap-[2px] items-end justify-center h-full">
                                <div className="w-1/2 bg-surface rounded-t-[4px] h-[65%]"></div>
                                <div className="w-1/2 bg-[#FFF0E0] rounded-t-[4px] h-[35%]"></div>
                            </div>
                        </div>
                        {/* May (Predict) */}
                        <div className="flex-1 flex flex-col justify-end gap-1 h-full max-w-[40px] opacity-40">
                            <div className="w-full flex gap-[2px] items-end justify-center h-full">
                                <div className="w-1/2 bg-surface rounded-t-[4px] h-[70%]"></div>
                                <div className="w-1/2 bg-[#FFF0E0] rounded-t-[4px] h-[30%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* X Axis labels */}
                    <div className="flex justify-between mt-2 px-2">
                        <span className="text-[10px] text-text-weak flex-1 text-center">1月</span>
                        <span className="text-[10px] text-text-weak flex-1 text-center">2月</span>
                        <span className="text-[10px] text-text-main font-semibold flex-1 text-center">3月</span>
                        <span className="text-[10px] text-text-weak flex-1 text-center">4月</span>
                        <span className="text-[10px] text-text-weak flex-1 text-center">5月</span>
                    </div>

                    <div className="w-full h-[1px] bg-divider my-3"></div>

                    {/* Legend */}
                    <div className="flex gap-4 justify-center">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-[2px] bg-primary"></div><span className="text-[10px] text-text-weak">收入</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-[2px] bg-warning"></div><span className="text-[10px] text-text-weak">支出</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-[2px] bg-surface opacity-40"></div><span className="text-[10px] text-text-weak">预测</span></div>
                    </div>
                </div>
            </div>

            {/* OCR Banner */}
            <div className="px-5 mb-5">
                <div className="bg-[#E0F0FF] rounded-[8px] p-3 flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <span className="text-[16px]">📸</span>
                    <span className="text-[13px] font-medium text-blue-500 text-center leading-tight">拍照上传地税单/管理费账单，OCR自动识别入账</span>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="px-5">
                <h2 className="text-[12px] font-semibold text-text-weak tracking-[1px] uppercase mb-3">近期账目明细</h2>

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
