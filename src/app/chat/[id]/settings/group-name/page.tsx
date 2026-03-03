"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function GroupNamePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [name, setName] = useState(searchParams.get("name") || "群组");

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            {/* Header */}
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    更改群聊名称
                </div>
            </div>

            {/* Content */}
            <div className="p-4 pt-6">
                <div className="bg-white rounded-[16px] overflow-hidden border border-divider/60">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-4 text-[16px] text-text-main outline-none placeholder-text-weak"
                        placeholder="请输入群聊名称"
                    />
                </div>
                <div className="mt-2 text-[13px] text-text-weak px-2">
                    修改群聊名称后，将在群内通知其他成员。
                </div>

                <div
                    onClick={() => router.back()}
                    className="mt-8 bg-primary text-white rounded-[12px] py-3.5 text-center font-bold text-[16px] cursor-pointer hover:bg-primary/90 transition-colors"
                >
                    保存
                </div>
            </div>
        </div>
    );
}
