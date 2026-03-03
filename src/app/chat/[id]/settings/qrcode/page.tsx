"use client";

import { useRouter } from "next/navigation";

export default function QRCodePage() {
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
                    群二维码
                </div>
            </div>

            <div className="p-8 pt-12 flex flex-col items-center">
                <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] w-full max-w-[320px]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[48px] h-[48px] bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-[20px] font-bold">
                            房
                        </div>
                        <div>
                            <div className="font-bold text-[16px] text-text-main">128 Maple St. 租客群</div>
                            <div className="text-[13px] text-text-secondary mt-0.5">扫一扫上面二维码图案，加群</div>
                        </div>
                    </div>

                    <div className="w-full aspect-square bg-[#F5F7F9] rounded-[16px] flex items-center justify-center border border-divider/40">
                        <div className="grid grid-cols-2 gap-2 opacity-20">
                            <div className="w-[80px] h-[80px] bg-black rounded-tl-[16px]"></div>
                            <div className="w-[80px] h-[80px] bg-black rounded-tr-[16px]"></div>
                            <div className="w-[80px] h-[80px] bg-black rounded-bl-[16px]"></div>
                            <div className="w-[80px] h-[80px] bg-black rounded-br-[16px]"></div>
                        </div>
                        <div className="absolute font-bold text-text-weak tracking-widest text-[14px]">QR CODE PLACEHOLDER</div>
                    </div>
                </div>

                <div className="flex w-full max-w-[320px] gap-4 mt-8">
                    <button className="flex-1 py-3.5 bg-white border border-divider/60 rounded-[12px] font-medium text-text-main hover:bg-black/5 transition-colors">
                        分享
                    </button>
                    <button className="flex-1 py-3.5 bg-primary text-white rounded-[12px] font-medium hover:bg-primary/90 transition-colors">
                        保存到手机
                    </button>
                </div>
            </div>
        </div>
    );
}
