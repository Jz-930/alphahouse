"use client";

import { useRouter } from "next/navigation";

export default function ExpenseUploadPage() {
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
                    费用上传与OCR识别
                </div>
            </div>

            <div className="p-4 pt-6 flex-1 flex flex-col items-center">
                <div className="w-full bg-white rounded-[24px] border-2 border-dashed border-primary/30 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors mb-8 shadow-sm">
                    <div className="w-[64px] h-[64px] rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>
                    <div className="font-bold text-[16px] text-text-main mb-1">拍照或上传账单</div>
                    <div className="text-[13px] text-text-weak text-center">
                        系统将自动提取金额并记录至财务报表
                    </div>
                </div>

                <div className="w-full bg-white rounded-[16px] p-5 shadow-sm border border-divider/60">
                    <div className="font-bold text-[15px] mb-4 text-text-main">近期上传记录 (AI识别)</div>
                    <div className="space-y-4 relative">
                        <div className="absolute left-[11px] top-4 bottom-2 w-[2px] bg-divider/40"></div>
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-success/20 flex items-center justify-center text-success">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div className="font-bold text-[14px]">管理费用账单 - 自动识别成功</div>
                            <div className="text-[12px] text-text-weak mt-1">2024年4月1日 · 提取金额: $350.00</div>
                        </div>
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-success/20 flex items-center justify-center text-success">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div className="font-bold text-[14px]">地税账单 2024Q1 - 自动识别成功</div>
                            <div className="text-[12px] text-text-weak mt-1">2024年3月15日 · 提取金额: $1,250.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
