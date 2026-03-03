"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnnouncementPage() {
    const router = useRouter();
    const [text, setText] = useState("欢迎加入本群！\n\n1. 房租支付：每月1号前完成支付。\n2. 杂费说明：水电气网费用按月结算平摊。\n3. 维修问题：如有损坏请及时通过“新建维修申请”上报。\n4. 生活公约：晚上11点后请保持安静，保持公共区域整洁。\n\n感谢配合！");

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center justify-between px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="font-bold text-[16px] text-text-main">
                    群公告
                </div>
                <button className="text-[15px] font-medium text-primary px-2" onClick={() => router.back()}>
                    保存
                </button>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="bg-white rounded-[16px] border border-divider/60 flex-1 overflow-hidden p-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-full resize-none outline-none text-[15px] text-text-main leading-relaxed"
                        placeholder="请输入群公告..."
                    />
                </div>
                <div className="mt-4 text-[13px] text-text-weak text-center">
                    公告会发布在群聊天中，所有新进群成员也可看到。
                </div>
            </div>
        </div>
    );
}
