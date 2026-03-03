"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchHistoryPage() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    return (
        <div className="flex flex-col min-h-[100dvh] bg-white">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-divider/40">
                <div className="flex-1 bg-background rounded-full px-4 py-2 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-weak" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="搜索聊天记录"
                        className="bg-transparent border-none outline-none w-full text-[15px]"
                        autoFocus
                    />
                </div>
                <button onClick={() => router.back()} className="text-[15px] text-primary whitespace-nowrap">
                    取消
                </button>
            </div>

            {!query && (
                <div className="p-8 mt-4">
                    <h3 className="text-center text-[14px] text-text-weak mb-6">快速搜索指定内容</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="text-primary text-[15px]">日期</div>
                        <div className="text-divider/80">|</div>
                        <div className="text-primary text-[15px]">群成员</div>
                        <div className="text-divider/80">|</div>
                        <div className="text-primary text-[15px]">文件和图片</div>
                        <div className="text-divider/80">|</div>
                        <div className="text-primary text-[15px]">交易记录</div>
                    </div>
                </div>
            )}

            {query && (
                <div className="flex-1 flex flex-col items-center justify-center text-text-weak pb-20">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <p>没有找到相关记录</p>
                </div>
            )}
        </div>
    );
}
