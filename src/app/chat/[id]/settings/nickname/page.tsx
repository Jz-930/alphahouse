"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Hammer } from "lucide-react";

export default function PlaceholderPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="px-5 pt-4 pb-4 flex items-center bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
                <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeft size={24} className="text-text-main" />
                </button>
                <h1 className="text-[18px] font-bold text-text-main ml-2 flex-1 capitalize">nickname</h1>
            </div>
            
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center pb-32">
                <div className="w-20 h-20 bg-gray-100 rounded-[24px] flex items-center justify-center text-text-weak mb-6 shadow-sm border border-divider/60">
                    <Hammer size={32} />
                </div>
                <h2 className="text-[20px] font-bold text-text-main mb-2">模块建设中</h2>
                <p className="text-[14px] text-text-secondary leading-relaxed max-w-[260px]">
                    该功能板块正在紧张开发中。<br/>我们会在下一阶段陆续开放此页面的完整交互。
                </p>
                <button onClick={() => router.back()} className="mt-10 bg-primary text-white font-bold py-3.5 px-10 rounded-xl shadow-[0_4px_12px_rgba(25,115,232,0.3)] hover:bg-primary/90 transition-colors">
                    返回上一页
                </button>
            </div>
        </div>
    );
}