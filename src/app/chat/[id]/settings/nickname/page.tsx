"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NicknamePage() {
    const router = useRouter();
    const [nickname, setNickname] = useState("房东");

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    本群昵称
                </div>
            </div>

            <div className="p-4 pt-6">
                <div className="text-[13px] text-text-secondary mb-2 px-2">通过给自己设置有区分度的本群昵称，方便群内成员识别。</div>
                <div className="bg-white rounded-[16px] overflow-hidden border border-divider/60">
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full px-4 py-4 text-[16px] text-text-main outline-none placeholder-text-weak"
                        placeholder="请输入本群昵称"
                    />
                </div>

                <div className="mt-8 bg-white rounded-[16px] border border-divider/60 overflow-hidden">
                    {["房东", "房客", "房东中介", "维修工"].map((name) => (
                        <div
                            key={name}
                            onClick={() => setNickname(name)}
                            className="flex items-center justify-between px-4 py-4 border-b border-divider/40 last:border-none cursor-pointer hover:bg-black/[0.02] active:bg-gray-50"
                        >
                            <span className="text-[15px] text-text-main">{name}</span>
                            {name === nickname && (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                    ))}
                </div>

                <div
                    onClick={() => router.back()}
                    className="mt-8 bg-primary text-white rounded-[12px] py-3.5 text-center font-bold text-[16px] cursor-pointer hover:bg-primary/90 transition-colors"
                >
                    确认修改
                </div>
            </div>
        </div>
    );
}
