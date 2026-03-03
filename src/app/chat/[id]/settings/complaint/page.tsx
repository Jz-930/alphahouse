"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComplaintPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    提交投诉与建议
                </div>
            </div>

            <div className="p-4 pt-6 flex-1 flex flex-col">
                <div className="font-bold text-[15px] mb-2 px-1 text-text-main">标题</div>
                <div className="bg-white rounded-[12px] border border-divider/60 overflow-hidden mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 text-[15px] text-text-main outline-none placeholder-text-weak"
                        placeholder="请输入投诉建议标题简述"
                    />
                </div>

                <div className="font-bold text-[15px] mb-2 px-1 text-text-main mt-2">详细说明</div>
                <div className="bg-white rounded-[16px] border border-divider/60 overflow-hidden p-4 h-[160px] shadow-sm mb-6">
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-full h-full resize-none outline-none text-[15px] text-text-main placeholder-text-weak"
                        placeholder="请详细描述您遇到的问题或您的建议，您的反馈我们将保密处理并尽快跟进..."
                    />
                </div>

                <div className="mt-auto pt-4">
                    <div className="text-[12px] text-text-weak text-center mb-3">
                        提交后将直接发送给平台客服，房东及其他群成员不可见。
                    </div>
                    <div
                        onClick={() => router.back()}
                        className="bg-primary text-white rounded-[12px] py-3.5 text-center font-bold text-[16px] cursor-pointer hover:bg-primary/90 transition-colors shadow-[0_4px_12px_rgba(25,115,232,0.3)]"
                    >
                        提交投诉
                    </div>
                </div>
            </div>
        </div>
    );
}
