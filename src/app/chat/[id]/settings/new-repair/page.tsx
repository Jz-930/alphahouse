"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewRepairPage() {
    const router = useRouter();
    const [type, setType] = useState("管道");
    const [desc, setDesc] = useState("");

    const types = ["管道漏水", "电器故障", "锁具问题", "网络故障", "其他"];

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    新建维修申请
                </div>
            </div>

            <div className="p-4 pt-6 flex-1 flex flex-col">
                <div className="font-bold text-[15px] mb-3 px-1 text-text-main">问题分类</div>
                <div className="flex flex-wrap gap-3 mb-6">
                    {types.map(t => (
                        <div
                            key={t}
                            onClick={() => setType(t)}
                            className={`px-4 py-2 rounded-[20px] text-[14px] font-medium border transition-colors cursor-pointer ${type === t ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-divider/60 text-text-secondary hover:bg-black/5'}`}
                        >
                            {t}
                        </div>
                    ))}
                </div>

                <div className="font-bold text-[15px] mb-3 px-1 text-text-main">详细描述</div>
                <div className="bg-white rounded-[16px] border border-divider/60 overflow-hidden p-4 h-[120px] mb-6 shadow-sm">
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-full h-full resize-none outline-none text-[15px] text-text-main placeholder-text-weak"
                        placeholder="请详细描述需要维修的问题，或可在此上传照片..."
                    />
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-[80px] h-[80px] bg-white border border-dashed border-divider rounded-[12px] flex flex-col items-center justify-center text-text-weak cursor-pointer hover:bg-black/5">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span className="text-[12px]">添加图片</span>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <div className="text-[12px] text-text-weak text-center mb-3">
                        提交后将自动为您与房东/修理工创建一个临时维修讨论群。
                    </div>
                    <div
                        onClick={() => router.back()}
                        className="bg-primary text-white rounded-[12px] py-3.5 text-center font-bold text-[16px] cursor-pointer hover:bg-primary/90 transition-colors shadow-[0_4px_12px_rgba(25,115,232,0.3)]"
                    >
                        提交申请并创建群聊
                    </div>
                </div>
            </div>
        </div>
    );
}
