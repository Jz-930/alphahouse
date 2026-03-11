"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { Plus, Camera, Filter } from "lucide-react";
import GlobalPropertySelector from "@/components/GlobalPropertySelector";

export default function FinancePage() {
    const { activePropertyId, properties, ledgers } = useAppStore();

    const isAllSelected = activePropertyId === "all";
    // Filter ledgers for active property or return all if 'all' is selected
    const activeLedgers = isAllSelected ? ledgers : (activePropertyId ? ledgers.filter(l => l.propertyId === activePropertyId) : []);

    // Aggregate calculations
    const totalIncome = activeLedgers.filter(l => l.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = activeLedgers.filter(l => l.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
    const netIncome = totalIncome - totalExpense;

    // Sort by date descending
    const sortedLedgers = [...activeLedgers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!activePropertyId) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6 text-center">
                <h2 className="text-xl font-bold mb-2">未选择房产</h2>
                <p className="text-text-secondary text-sm mb-6">请先在主页选择或添加一个房产以查看财务报表</p>
                <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium">
                    返回主页
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-[100px] relative">
            {/* Header */}
            <div className="px-5 pt-4 pb-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10 shadow-sm">
                <GlobalPropertySelector />
                <button className="w-[36px] h-[36px] rounded-full bg-gray-100 flex items-center justify-center text-text-main hover:bg-gray-200 transition-colors">
                    <Filter size={18} />
                </button>
            </div>

            <div className="px-5 my-2">
                <h1 className="text-[22px] font-bold text-text-main tracking-tight">财务与账单</h1>
            </div>

            {/* Overview Card */}
            <div className="px-5 mb-4">
                <div className="bg-gradient-to-br from-[#1A365D] to-[#2B6CB0] rounded-[20px] p-6 relative overflow-hidden shadow-md">
                    <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.03]"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-[13px] text-white/80 mb-1 font-medium">{isAllSelected ? "全部房产总净收入" : "当前房屋净收入"}</p>
                            <h2 className="text-[36px] font-bold text-white font-mono tracking-tight mb-2 leading-none">
                                ${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h2>
                        </div>
                        <Link href="/finance/reports" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium backdrop-blur-sm transition-colors border border-white/10">
                            年度报表
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                        <div>
                            <p className="text-[11px] text-white/60 mb-0.5">总收入</p>
                            <p className="text-[15px] font-semibold text-white font-mono tracking-wide">+${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="w-[1px] h-8 bg-white/10 self-center"></div>
                        <div>
                            <p className="text-[11px] text-white/60 mb-0.5">总支出</p>
                            <p className="text-[15px] font-semibold text-white font-mono tracking-wide">-${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="px-5 mb-6 flex gap-3">
                <Link href="/finance/new?type=income" className="flex-1 bg-white py-3 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-green-100 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors text-[#137333] font-semibold text-sm">
                    <Plus size={16} /> 记一笔收入
                </Link>
                <Link href="/finance/new?type=expense" className="flex-1 bg-white py-3 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-red-100 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors text-danger font-semibold text-sm">
                    <Plus size={16} /> 记一笔支出
                </Link>
            </div>

            {/* OCR Banner */}
            <div className="px-5 mb-6">
                <div className="bg-[#E0F0FF] rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Camera size={16} />
                    </div>
                    <p className="text-[13px] font-semibold text-[#1A4B8F] leading-tight">拍照上传地税单/管理费账单<br/><span className="font-normal opacity-80">OCR自动识别入账</span></p>
                </div>
            </div>

            {/* Ledger Timeline */}
            <div className="px-5">
                <div className="flex justify-between items-end mb-4 px-1">
                    <h2 className="text-[15px] font-bold text-text-main tracking-wide">账目明细</h2>
                    <span className="text-[12px] text-text-weak font-medium">{sortedLedgers.length} 笔记录</span>
                </div>

                {sortedLedgers.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl">📝</span>
                        </div>
                        <p className="text-text-main font-semibold mb-1">暂无账目记录</p>
                        <p className="text-[13px] text-text-weak">在群聊中生成工单或点击上方按钮记账</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden">
                        {sortedLedgers.map((tx, i) => (
                            <TxRow key={tx.id} tx={tx} isLast={i === sortedLedgers.length - 1} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function TxRow({ tx, isLast }: { tx: any; isLast: boolean }) {
    const isIncome = tx.type === "income";
    const amountStr = (isIncome ? "+$" : "-$") + tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
    const dateFormatted = new Date(tx.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });

    return (
        <div className="flex px-4 py-4 hover:bg-gray-50 transition-colors relative cursor-pointer group">
            <div className="flex gap-3.5 w-full items-center">
                {/* Icon */}
                <div className={`w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-sm ${
                    isIncome ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#FFE8E8] text-danger"
                }`}>
                    {tx.workOrderId ? <span className="text-lg">🔧</span> : <span className="text-lg font-bold">{isIncome ? '收' : '支'}</span>}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="text-[15px] font-bold text-text-main truncate leading-none">{tx.description}</h4>
                        {tx.workOrderId && (
                            <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0">工单</span>
                        )}
                    </div>
                    <p className="text-[12px] text-text-weak truncate font-medium">{dateFormatted}</p>
                </div>

                {/* Amount */}
                <div className={`text-[16px] font-bold font-mono shrink-0 tracking-tight ${isIncome ? "text-success" : "text-text-main"}`}>
                    {amountStr}
                </div>
            </div>

            {/* Divider */}
            {!isLast && <div className="absolute bottom-0 right-4 left-[69px] h-[1px] bg-gray-100"></div>}
        </div>
    );
}
