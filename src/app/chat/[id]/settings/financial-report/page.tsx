"use client";

import { useRouter } from "next/navigation";

export default function FinancialReportPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    该房屋财务报表
                </div>
            </div>

            <div className="p-4 pt-6">
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[20px] p-6 text-white shadow-lg mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white opacity-5 rounded-full translate-x-10 -translate-y-10"></div>
                    <div className="text-[13px] text-white/70 mb-1">今年累计净收益 (YTD)</div>
                    <div className="text-[36px] font-bold mb-6">$ 12,450.00</div>
                    <div className="flex justify-between border-t border-white/10 pt-4">
                        <div>
                            <div className="text-[12px] text-white/50 mb-1">总收入</div>
                            <div className="text-[16px] font-bold text-success">$ 15,000.00</div>
                        </div>
                        <div>
                            <div className="text-[12px] text-white/50 mb-1">总支出</div>
                            <div className="text-[16px] font-bold text-danger">$ 2,550.00</div>
                        </div>
                    </div>
                </div>

                <div className="font-bold text-[15px] mb-4 px-1 text-text-main">本月收支明细</div>
                <div className="bg-white rounded-[16px] overflow-hidden border border-divider/60 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-divider/40">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
                                <span className="font-bold text-[14px]">+</span>
                            </div>
                            <div>
                                <div className="text-[14px] font-medium text-text-main">5月租金收入</div>
                                <div className="text-[12px] text-text-weak">今天 09:30</div>
                            </div>
                        </div>
                        <div className="text-[15px] font-bold text-success">+$2,100.00</div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center text-danger">
                                <span className="font-bold text-[14px]">-</span>
                            </div>
                            <div>
                                <div className="text-[14px] font-medium text-text-main">空调维修费</div>
                                <div className="text-[12px] text-text-weak">4月21日</div>
                            </div>
                        </div>
                        <div className="text-[15px] font-bold text-text-main">-$120.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
