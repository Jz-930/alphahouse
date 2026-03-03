"use client";

import { useRouter } from "next/navigation";

export default function RentPaymentPage() {
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
                    租金支付
                </div>
            </div>

            <div className="p-4 pt-8 flex-1 flex flex-col items-center">
                <div className="text-[14px] text-text-secondary mb-2">本期应付租金 (5月)</div>
                <div className="text-[48px] font-bold text-text-main mb-8">$ 2,100.00</div>

                <div className="w-full bg-white rounded-[16px] border border-divider/60 shadow-sm p-4 mb-8">
                    <div className="flex items-center justify-between mb-4 border-b border-divider/40 pb-4">
                        <span className="text-[14px] text-text-secondary">支付截止日期</span>
                        <span className="text-[14px] font-medium text-text-main">2024-05-01</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[14px] text-text-secondary">收款方</span>
                        <span className="text-[14px] font-medium text-text-main">AlphaHouse Property LLC</span>
                    </div>
                </div>

                <div className="mt-auto w-full">
                    <div className="bg-primary/5 border border-primary/20 rounded-[12px] p-4 flex items-start gap-3 mb-6">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        <div className="text-[13px] text-text-secondary leading-relaxed">
                            该功能属于第二阶段计划，当前为演示界面。实际将会接入 Stripe / Plaid 支持信用卡及银行转账。
                        </div>
                    </div>

                    <div
                        onClick={() => router.back()}
                        className="bg-primary text-white rounded-[12px] py-3.5 text-center font-bold text-[16px] cursor-pointer hover:bg-primary/90 transition-colors shadow-[0_4px_12px_rgba(25,115,232,0.3)] mb-4"
                    >
                        去支付 (Demo)
                    </div>
                </div>
            </div>
        </div>
    );
}
