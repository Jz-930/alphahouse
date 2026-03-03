"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Mock data store for dynamic content rendering
const chatDataStore: Record<string, { propInfo: string, propIcon: string, events: Record<string, unknown>[] }> = {
    "chat-128-rent": {
        propInfo: "Landlord, Tenant David · 2 members",
        propIcon: "🏠",
        events: [
            { type: "system", content: "You invited Tenant David to the chat." },
            { type: "msg-other", sender: "David", role: "租客", avatar: "👨‍💼", avatarBg: "bg-slate-400", time: "12:30", message: "Hi! The rent for this month is ready." },
            { type: "msg-self", time: "12:32", message: "Great! Thanks David." },
            { type: "msg-other", sender: "David", role: "租客", avatar: "👨‍💼", avatarBg: "bg-slate-400", time: "12:34", message: "下个月可能会续租哦" },
        ]
    },
    "chat-128-repair": {
        propInfo: "Landlord, David, Plumber Wang · 3 members",
        propIcon: "🔧",
        events: [
            { type: "system", content: "房客 David 发起了维修申请，临时维修群已创建。" },
            { type: "msg-other", sender: "David", role: "房客", avatar: "👨‍💼", avatarBg: "bg-slate-400", time: "12:20", message: "房东您好！厨房的水管今天突然漏水了，流得挺大的 😰" },
            { type: "repair-card", title: "新建维修申请", desc: "厨房水管漏水 · 紧急程度：高", status: "等待审批" },
            { type: "msg-self", time: "12:22", message: "收到，看到了。麻烦先把水阀关了，我立刻安排维修师傅过去。" },
            { type: "msg-self", time: "12:24", message: "已审批维修申请 ✅ 正在为您匹配维修师傅..." },
            { type: "join", content: "维修工 Wang 师傅已加入群聊", details: ["专长：水管维修 · 评分 4.8⭐", "预计到达：今天 14:00"] },
            { type: "msg-other", sender: "Wang 师傅", role: "维修工", avatar: "👨‍🔧", avatarBg: "bg-white", time: "昨天", message: "好的，看了照片应该是接头老化。我带上配件过去，预计费用 $150-200，下午两点到。" }
        ]
    },
    "chat-56-rent": {
        propInfo: "Landlord, Tenant Michael · 2 members",
        propIcon: "🏡",
        events: [
            { type: "system", content: "Rent cycle started for March." },
            { type: "msg-other", sender: "Michael", role: "租客", avatar: "👨‍💻", avatarBg: "bg-blue-400", time: "周二", message: "Michael 已支付3月租金 $2,100" }
        ]
    },
    "chat-56-agent": {
        propInfo: "Landlord, Agent Lee · 2 members",
        propIcon: "👩‍💼",
        events: [
            { type: "msg-other", sender: "Agent Lee", role: "中介", avatar: "👩‍💼", avatarBg: "bg-purple-400", time: "周一", message: "Agent Lee: 下一任租客已经找到了，背景调查都完美。等下发合同给您看" },
            { type: "msg-self", time: "周一", message: "好的，辛苦了哦" }
        ]
    },
    "chat-lake-rent": {
        propInfo: "Landlord, Tenant Alice · 2 members",
        propIcon: "🏢",
        events: [
            { type: "msg-other", sender: "Alice", role: "租客", avatar: "👩‍🎓", avatarBg: "bg-pink-400", time: "3/13", message: "你好，请问房子有微波炉吗？" },
            { type: "msg-self", time: "3/13", message: "有的，在厨房上方的柜子里嵌入式的" },
            { type: "msg-self", time: "3/14", message: "新的租约已经签好啦，欢迎入住！" }
        ]
    }
};

function ChatContent() {
    const params = useParams();
    const searchParams = useSearchParams();

    const id = params.id as string;
    const name = searchParams.get("name") || "群组";
    const propName = searchParams.get("prop") || "";

    const data = chatDataStore[id] || {
        propInfo: "Unknown Members",
        propIcon: "💬",
        events: [
            { type: "system", content: "Chat created." }
        ]
    };

    return (
        <div className="flex flex-col h-full bg-background relative">
            {/* Header */}
            <div className="h-[56px] border-b border-divider bg-white shrink-0 flex items-center justify-between px-4 z-10 sticky top-0">
                <Link href="/" className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </Link>
                <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-center gap-1">
                        <span className="text-[14px]">{data.propIcon}</span>
                        <span className="text-[15px] font-semibold text-text-main truncate max-w-[200px]">
                            {propName} · {name}
                        </span>
                    </div>
                    <span className="text-[11px] text-text-secondary">{data.propInfo}</span>
                </div>
                <button className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 no-scrollbar pb-[150px]">
                {/* Date Divider */}
                <div className="flex justify-center">
                    <div className="bg-black/5 rounded-full px-3 py-1 text-[11px] text-text-weak">
                        Today
                    </div>
                </div>

                {data.events.map((evt: Record<string, any>, idx: number) => {
                    if (evt.type === "system") {
                        return (
                            <div key={idx} className="flex justify-center">
                                <div className="bg-white/80 rounded-[12px] px-4 py-2 text-[12px] text-text-secondary shadow-sm text-center max-w-[280px]">
                                    {evt.content}
                                </div>
                            </div>
                        );
                    }
                    if (evt.type === "msg-other") {
                        const initial = evt.sender?.slice(0, 2) || "U";
                        return (
                            <div key={idx} className="flex gap-2 relative group">
                                <div className={`w-8 h-8 rounded-[10px] ${evt.avatarBg} text-white flex justify-center items-center text-[12px] font-bold shrink-0 border border-black/5`}>
                                    {evt.avatar.length <= 2 ? evt.avatar : initial}
                                </div>
                                <div className="flex flex-col items-start max-w-[72%]">
                                    <span className="text-[11px] text-text-weak mb-1 ml-1">{evt.role} · {evt.sender}</span>
                                    <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-divider/30 rounded-[14px] px-3.5 py-2.5 text-[14px] text-text-main leading-relaxed relative">
                                        {evt.message}
                                        <span className="text-[10px] text-black/30 float-right mt-2 ml-3">{evt.time}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    if (evt.type === "msg-self") {
                        return (
                            <div key={idx} className="flex justify-end gap-2 mt-1">
                                <div className="bg-[#1C4C70] text-white shadow-[0_2px_8px_rgba(32,87,129,0.15)] rounded-[14px] px-3.5 py-2.5 text-[14px] leading-relaxed max-w-[72%]">
                                    {evt.message}
                                    <span className="text-[10px] text-white/60 float-right mt-2 ml-3">{evt.time}</span>
                                </div>
                            </div>
                        );
                    }
                    if (evt.type === "repair-card") {
                        return (
                            <div key={idx} className="flex gap-2">
                                <div className="w-8 h-8 shrink-0 opacity-0"></div>
                                <div className="flex flex-col items-start max-w-full">
                                    <div className="bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-divider/40 w-[260px] overflow-hidden">
                                        <div className="h-[140px] bg-gradient-to-br from-orange-200/80 to-orange-100/80 flex items-center justify-center relative">
                                            <span className="text-[54px] drop-shadow-md">🚿</span>
                                            <div className="absolute left-3 bottom-2 bg-white/60 backdrop-blur-md text-text-main text-[11px] px-2 py-0.5 rounded-[4px] font-medium">
                                                维修申请
                                            </div>
                                        </div>
                                        <div className="p-3.5">
                                            <h4 className="text-[15px] font-bold text-text-main mb-1">{evt.title}</h4>
                                            <p className="text-[13px] text-text-secondary leading-tight mb-3">
                                                {evt.desc}
                                            </p>
                                            <div className="inline-flex bg-[#FFF0E0] text-warning text-[12px] font-semibold px-3 py-1 rounded-[6px] items-center gap-1.5">
                                                <span>⏳</span> {evt.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    if (evt.type === "join") {
                        return (
                            <div key={idx} className="mt-4 mb-2 flex justify-start">
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-[10px] bg-[#FFF0E0] text-warning flex justify-center items-center text-[16px] shrink-0 border border-orange-200/50 shadow-sm">
                                        🔧
                                    </div>
                                    <div className="bg-surface/30 border border-primary/10 rounded-[14px] px-3.5 py-2.5 text-[13px] text-text-main leading-relaxed max-w-[260px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                                        <span className="font-semibold block mb-1 text-[14px]">{evt.content}</span>
                                        {evt.details?.map((d: string, i: number) => (
                                            <span key={i} className="block text-text-secondary text-[12px]">{d}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Bottom Area (Fixed via absolute positioning) */}
            <div className="absolute bottom-0 w-full flex flex-col bg-background/95 backdrop-blur z-20">
                <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                    <button className="h-[30px] px-4 rounded-[8px] bg-white border border-divider text-[12px] font-medium text-text-secondary shrink-0 hover:border-primary hover:text-primary transition-all flex items-center gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        <span className="opacity-80">📋</span> 维修申请
                    </button>
                    <button className="h-[30px] px-4 rounded-[8px] bg-white border border-divider text-[12px] font-medium text-text-secondary shrink-0 hover:border-primary hover:text-primary transition-all flex items-center gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        <span className="opacity-80">📸</span> 上传账单
                    </button>
                    <button className="h-[30px] px-4 rounded-[8px] bg-white border border-divider text-[12px] font-medium text-text-secondary shrink-0 hover:border-primary hover:text-primary transition-all flex items-center gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        <span className="opacity-80">📌</span> 重要置顶
                    </button>
                </div>
                <div className="bg-white border-t border-divider px-3 py-[10px] pb-7 flex items-end gap-3 rounded-t-[20px] shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
                    <button className="w-[32px] h-[32px] flex items-center justify-center text-text-secondary hover:text-primary transition-colors shrink-0 mb-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </button>
                    <div className="flex-1 bg-gray-50 border border-divider/60 rounded-[12px] min-h-[44px] flex items-center px-3 py-1 relative transition-colors focus-within:border-primary/40 focus-within:bg-white">
                        <textarea
                            placeholder="输入消息..."
                            className="flex-1 bg-transparent border-none outline-none text-[15px] resize-none px-1 max-h-[80px] leading-[30px] self-center py-0 custom-scrollbar mt-[2px]"
                            rows={1}
                        />
                    </div>
                    <button className="w-[42px] h-[42px] rounded-[12px] bg-primary flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(32,87,129,0.2)] hover:scale-105 active:scale-95 transition-all mb-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-[2px]">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="p-4">Loading chat...</div>}>
            <ChatContent />
        </Suspense>
    );
}
