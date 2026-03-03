"use client";

import { useRouter } from "next/navigation";

export default function RepairHistoryPage() {
    const router = useRouter();

    const history = [
        { id: "REP-0421", title: "主卧空调不制冷", date: "2024-04-21", status: "已解决", cost: "$ 120" },
        { id: "REP-0315", title: "厨房水槽下水管漏水", date: "2024-03-15", status: "已解决", cost: "$ 80" }
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
                    维修历史记录
                </div>
            </div>

            <div className="p-4 pt-4 flex flex-col gap-4">
                {history.map(item => (
                    <div key={item.id} className="bg-white rounded-[16px] p-4 border border-divider/60 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-[16px] text-text-main">{item.title}</div>
                            <div className="text-[12px] font-medium bg-success/10 text-success px-2 py-1 rounded-[6px]">
                                {item.status}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[13px] text-text-weak mt-4">
                            <div>单号: {item.id}</div>
                            <div>日期: {item.date}</div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-divider/40 flex justify-between items-center">
                            <span className="text-[14px] text-text-secondary">产生费用</span>
                            <span className="text-[16px] font-bold text-text-main">{item.cost}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
