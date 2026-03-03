"use client";

import { useRouter } from "next/navigation";
import { Plus, CreditCard, Wallet, Landmark, ChevronRight, Lock } from "lucide-react";

export default function PaymentsPage() {
    const router = useRouter();

    const paymentMethods = [
        {
            id: 1,
            type: "bank",
            name: "Chase Bank",
            number: "**** 4589",
            isDefault: true,
            icon: <Landmark size={24} className="text-[#0B6EFD]" />,
            bgColor: "bg-[#F0F5FF]"
        },
        {
            id: 2,
            type: "card",
            name: "Visa Credit",
            number: "**** 1288",
            isDefault: false,
            icon: <CreditCard size={24} className="text-[#F59E0B]" />,
            bgColor: "bg-[#FFF8E6]"
        },
        {
            id: 3,
            type: "zelle",
            name: "Zelle",
            number: "zhang@example.com",
            isDefault: false,
            icon: <Wallet size={24} className="text-[#8B5CF6]" />,
            bgColor: "bg-[#F3E8FF]"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
            {/* NavBar */}
            <div className="h-[56px] bg-white shrink-0 flex items-center justify-between px-4 sticky top-0 z-10 border-b border-divider/40">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="w-[34px] h-[34px] flex items-center justify-center active:bg-gray-100 rounded-full transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h1 className="text-[18px] font-bold text-text-main">支付信息</h1>
                </div>
                <button className="w-[34px] h-[34px] flex items-center justify-center text-primary active:bg-blue-50 rounded-full transition-colors">
                    <Plus size={24} strokeWidth={2} />
                </button>
            </div>

            <div className="p-5 flex flex-col gap-5">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[#10B981] to-[#047857] rounded-[24px] p-6 text-white relative overflow-hidden shadow-[0_8px_24px_rgba(16,185,129,0.25)]">
                    <div className="absolute -top-[40px] -right-[40px] w-[200px] h-[200px] rounded-full bg-white opacity-[0.08]"></div>
                    <div className="absolute bottom-[20px] -left-[20px] w-[100px] h-[100px] rounded-full bg-white opacity-[0.08]"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[14px] font-medium text-white/80">钱包余额</span>
                            <button className="px-3 py-1 bg-white/15 rounded-full text-[12px] font-medium backdrop-blur-sm border border-white/20">提现</button>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-[36px] font-bold font-mono tracking-tight">$8,520.00</span>
                        </div>
                        <div className="text-[13px] text-white/70 flex items-center gap-1.5 mt-2">
                            <Lock size={14} className="opacity-80" />
                            <span>您的资金受银行级加密保护</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div>
                    <h2 className="text-[14px] font-semibold text-text-main mb-3 ml-1">已绑定的支付方式</h2>

                    <div className="flex flex-col gap-3">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-sm border border-divider/40 active:scale-[0.98] transition-transform cursor-pointer">
                                <div className={`w-[48px] h-[48px] rounded-[16px] flex items-center justify-center shrink-0 ${method.bgColor}`}>
                                    {method.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-[16px] font-bold text-text-main leading-tight">{method.name}</h3>
                                        {method.isDefault && (
                                            <span className="px-1.5 py-0.5 rounded-[4px] bg-primary/10 text-primary text-[10px] font-semibold">首选</span>
                                        )}
                                    </div>
                                    <p className="text-[13px] text-text-weak font-mono tracking-wide">{method.number}</p>
                                </div>
                                <ChevronRight size={20} className="text-text-weak/50 shrink-0" />
                            </div>
                        ))}
                    </div>

                    <button className="mt-4 w-full bg-white rounded-[20px] p-4 flex items-center justify-center gap-2 border border-dashed border-primary/40 text-primary font-medium hover:bg-blue-50/50 transition-colors active:scale-[0.98]">
                        <Plus size={18} strokeWidth={2.5} />
                        添加新的支付方式
                    </button>
                </div>

                {/* Payment History Link */}
                <div className="mt-2 bg-white rounded-[20px] p-4 flex items-center justify-between shadow-sm border border-divider/40 active:scale-[0.98] transition-transform cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-[36px] h-[36px] rounded-[10px] bg-gray-100 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="12 8 12 12 14 14"></polyline>
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                        </div>
                        <span className="text-[15px] font-semibold text-text-main">交易记录</span>
                    </div>
                    <ChevronRight size={20} className="text-text-weak/50" />
                </div>
            </div>

            <div className="h-[20px] shrink-0"></div>
        </div>
    );
}
