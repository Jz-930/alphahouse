"use client";

import { useRouter } from "next/navigation";

export default function ArchivedMessagesPage() {
    const router = useRouter();

    const messages = [
        { sender: "房东", content: "请注意，由于物业要进行外墙清洗，下周二（20日）上午9点到下午5点阳台不可晾晒衣物。", date: "昨天 14:30" },
        { sender: "房东", content: "本月的公共水电账单已经出来，每户分摊 $35.40。请随同下月租金一起支付。", date: "上周五 10:15" }
    ];

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    重要信息归档
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4">
                {messages.map((msg, i) => (
                    <div key={i} className="bg-white rounded-[16px] p-4 border border-divider/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
                        <div className="absolute top-4 right-4 text-warning">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-[28px] h-[28px] rounded-full bg-primary/20 flex items-center justify-center text-primary text-[12px] font-bold shrink-0">
                                {msg.sender[0]}
                            </div>
                            <div className="font-medium text-[14px] text-text-main">{msg.sender}</div>
                            <div className="text-[12px] text-text-weak ml-auto pr-6">{msg.date}</div>
                        </div>
                        <div className="text-[15px] text-text-secondary leading-relaxed pl-[36px]">
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
