"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PropertyAssociationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialProp = searchParams.get("prop") || "";

    const [selectedProp, setSelectedProp] = useState(initialProp);

    const properties = [
        { id: "prop-1", name: "128 Maple St." },
        { id: "prop-2", name: "56 Oak Ave." },
        { id: "prop-3", name: "Lakeview Apt 4B" },
        { id: "prop-none", name: "不关联任何房产" }
    ];

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.push(`/chat/${encodeURIComponent(typeof window !== "undefined" ? location.pathname.split("/")[2] : "")}/settings`)} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    所属房产设置
                </div>
            </div>

            <div className="p-4 pt-6">
                <div className="text-[13px] text-text-secondary mb-4 px-2 leading-relaxed">
                    将此功能群与您名下的房产进行关联后，可以在此群内启用租金账单生成、维修工单指派等专属功能。
                </div>

                <div className="bg-white rounded-[16px] border border-divider/60 overflow-hidden mb-8 shadow-sm">
                    {properties.map((p) => {
                        const isSelected = selectedProp === p.name || (p.id === "prop-none" && !selectedProp);
                        return (
                            <div
                                key={p.id}
                                onClick={() => setSelectedProp(p.id === "prop-none" ? "" : p.name)}
                                className="flex items-center justify-between px-4 py-4 border-b border-divider/40 last:border-none cursor-pointer hover:bg-black/[0.02] active:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {p.id !== "prop-none" ? (
                                        <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 border border-black/5 ${isSelected ? 'bg-primary/10 text-primary' : 'bg-surface/80 text-text-weak'}`}>
                                            <span className="text-[17px]">🏢</span>
                                        </div>
                                    ) : (
                                        <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 border border-black/5 ${isSelected ? 'bg-primary/10 text-primary' : 'bg-surface/80 text-text-weak'}`}>
                                            <span className="text-[17px]">🚫</span>
                                        </div>
                                    )}
                                    <span className={`text-[15px] font-medium ${p.id === "prop-none" && !isSelected ? 'text-text-weak' : 'text-text-main'}`}>
                                        {p.name}
                                    </span>
                                </div>
                                {isSelected && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div
                    onClick={() => router.push(`/chat/${encodeURIComponent(typeof window !== "undefined" ? location.pathname.split("/")[2] : "")}/settings`)}
                    className="bg-primary text-white rounded-[12px] py-3.5 text-center font-bold text-[16px] cursor-pointer hover:bg-primary/90 transition-colors shadow-[0_4px_12px_rgba(25,115,232,0.3)]"
                >
                    保存设置
                </div>
            </div>
        </div>
    );
}
