"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Plus, Receipt, FileText, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const chatDataStore: Record<string, { propInfo: string, propIcon: string, events: Record<string, unknown>[] }> = {
    "chat-128-rent": {
        propInfo: "房东 (您), 租客 David · 2人",
        propIcon: "🏠",
        events: [
            { id: "e1", type: "system", content: "您邀请 租客 David 加入了聊天" },
            { id: "e2", type: "msg-other", sender: "David", role: "租客", avatar: "👨‍💼", avatarBg: "bg-blue-500", time: "12:30", message: "你好房东，刚才水管好像修好了" },
            { id: "e3", type: "msg-other", sender: "David", role: "租客", avatar: "👨‍💼", avatarBg: "bg-blue-500", time: "12:34", message: "好的，房租已经转过去啦" },
        ]
    },
    "chat-128-repair": {
        propInfo: "Wang 师傅, 房东 (您) · 2人",
        propIcon: "🔧",
        events: [
            { id: "e1", type: "system", content: "您邀请 Wang 师傅 加入了工单群" },
            { id: "e2", type: "msg-other", sender: "Wang师傅", role: "维修", avatar: "👨‍🔧", avatarBg: "bg-orange-500", time: "昨天", message: "房东你好，我看了视频，应该是下水管接口松动" },
            { id: "e3", type: "msg-other", sender: "Wang师傅", role: "维修", avatar: "👨‍🔧", avatarBg: "bg-orange-500", time: "昨天", message: "我下午两点到，买配件大概$50" },
        ]
    },
    "chat-56-rent": {
        propInfo: "房东 (您), 租客 Michael · 2人",
        propIcon: "🏡",
        events: [
            { id: "e1", type: "system", content: "已成功缴纳 2月 租金" },
            { id: "e2", type: "msg-other", sender: "Michael", role: "租客", avatar: "👨‍💻", avatarBg: "bg-green-500", time: "周二", message: "Michael 已支付3月租金 $1,800" },
        ]
    },
    "chat-56-hvac": {
        propInfo: "Mike HVAC, 房东 (您) · 2人",
        propIcon: "❄️",
        events: [
            { id: "e1", type: "system", content: "年度暖炉保养工单已建立" },
             { id: "e2", type: "msg-other", sender: "Mike", role: "HVAC", avatar: "❄️", avatarBg: "bg-sky-500", time: "3月10日", message: "检查完毕，一切正常。出风口已经清洗。" },
        ]
    },
    "chat-lakeview-group": {
        propInfo: "Apt 4B 租客群 · 4人",
        propIcon: "🏢",
        events: [
            { id: "e1", type: "system", content: "欢迎来到 Lakeview Apt 4B 官方住户群" },
            { id: "e2", type: "msg-other", sender: "Alice", role: "租客A", avatar: "👩‍🎓", avatarBg: "bg-pink-500", time: "刚刚", message: "房东你好，大门的锁好像有点卡，有时候钥匙拔不出来" },
        ]
    },
    "chat-lakeview-agent": {
        propInfo: "中介 Lily, 房东 (您) · 2人",
        propIcon: "👩‍💼",
        events: [
            { id: "e1", type: "msg-other", sender: "Lily", role: "中介", avatar: "👩‍💼", avatarBg: "bg-purple-500", time: "昨天", message: "招租广告已经发了，目前反馈不错" },
            { id: "e2", type: "msg-other", sender: "Lily", role: "中介", avatar: "👩‍💼", avatarBg: "bg-purple-500", time: "昨天", message: "下周有两组客人想看房，你哪天方便？" },
        ]
    }
};

function ChatContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const name = searchParams.get("name") || "群组";
    const propName = searchParams.get("prop") || "";

    const { activePropertyId, workOrders, addWorkOrder, addLedgerEntry, updateWorkOrder } = useAppStore();

    const initialData = chatDataStore[id] || {
        propInfo: "未知成员",
        propIcon: "💬",
        events: [
            { id: "init", type: "system", content: "已创建基于房屋的聊天" }
        ]
    };

    const [events, setEvents] = useState<any[]>(initialData.events);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Modals
    const [activeModal, setActiveModal] = useState<"none" | "new_wo" | "expense" | "income">("none");
    const [formAmount, setFormAmount] = useState("");
    const [formDesc, setFormDesc] = useState("");

    // Find active work order for this chat
    const activeWO = workOrders.find(w => w.chatThreadId === id && w.status !== "completed");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [events, activeWO]);

    const handleCreateWorkOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activePropertyId || !formDesc) return;

        const newWo = {
            id: `wo-${Date.now()}`,
            propertyId: activePropertyId,
            chatThreadId: id,
            status: "in_progress" as const,
            totalCost: Number(formAmount) || 0,
            title: formDesc
        };
        addWorkOrder(newWo);
        setEvents(prev => [...prev, {
            id: `wo-evt-${Date.now()}`,
            type: "system",
            content: `工单已发起: ${formDesc}`
        }]);
        setActiveModal("none");
        setFormDesc("");
        setFormAmount("");
        setIsMenuOpen(false);
    };

    const handleAddLedger = (e: React.FormEvent, type: "income" | "expense") => {
        e.preventDefault();
        if (!activePropertyId || !formAmount || !formDesc) return;

        addLedgerEntry({
            id: `ledg-${Date.now()}`,
            propertyId: activePropertyId,
            workOrderId: activeWO?.id,
            amount: Number(formAmount),
            type,
            date: new Date().toISOString(),
            description: formDesc
        });

        // Add a message bubble acting as a receipt
        setEvents(prev => [...prev, {
            id: `receipt-${Date.now()}`,
            type: "receipt",
            receiptType: type,
            amount: Number(formAmount),
            desc: formDesc,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        if (activeWO && type === 'expense') {
             updateWorkOrder(activeWO.id, { totalCost: activeWO.totalCost + Number(formAmount) });
        }

        setActiveModal("none");
        setFormDesc("");
        setFormAmount("");
        setIsMenuOpen(false);
    };

    const handleCompleteWO = () => {
        if (!activeWO) return;
        updateWorkOrder(activeWO.id, { status: "completed" });
        setEvents(prev => [...prev, {
            id: `sys-${Date.now()}`,
            type: "system",
            content: `✅ 工单已完结。所有关联帐目已冻结入账。`
        }]);
        setIsMenuOpen(false);
    };

    return (
        <div className="flex flex-col h-full bg-background relative">
            {/* Header */}
            <div className="h-[56px] border-b border-divider bg-white shrink-0 flex items-center justify-between px-4 z-10 sticky top-0">
                <button onClick={() => router.push("/")} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 flex flex-col items-center">
                    <div className="flex items-center gap-1">
                        <span className="text-[14px]">{initialData.propIcon}</span>
                        <span className="text-[15px] font-semibold text-text-main truncate max-w-[200px]">
                            {name}
                        </span>
                    </div>
                    <span className="text-[11px] text-text-secondary">{initialData.propInfo}</span>
                </div>
                <Link href={`/chat/${id}/settings`} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </Link>
            </div>

            {/* Active Work Order Banner */}
            {activeWO && (
                <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-bold text-primary">进行中工单: {activeWO.title}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary">已记账: ${activeWO.totalCost}</span>
                </div>
            )}

            {/* Message List */}
            <div className={`flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 no-scrollbar pb-[180px]`}>
                <div className="flex justify-center">
                    <div className="bg-black/5 rounded-full px-3 py-1 text-[11px] text-text-weak">今天</div>
                </div>

                {events.map((evt) => {
                    if (evt.type === "system") {
                        return (
                            <div key={evt.id} className="flex justify-center">
                                <div className="bg-white/80 rounded-[12px] px-4 py-2 text-[12px] text-text-secondary shadow-sm text-center max-w-[280px]">
                                    {evt.content}
                                </div>
                            </div>
                        );
                    }
                    if (evt.type === "msg-other") {
                        const initial = evt.sender?.slice(0, 2) || "U";
                        return (
                            <div key={evt.id} className="flex gap-2 relative group">
                                <div className={`w-8 h-8 rounded-[10px] ${evt.avatarBg} text-white flex justify-center items-center text-[12px] font-bold shrink-0 border border-black/5`}>
                                    {evt.avatar || initial}
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
                    if (evt.type === "receipt") {
                        const isIncome = evt.receiptType === "income";
                        return (
                            <div key={evt.id} className="flex justify-end gap-2 mt-1">
                                <div className="bg-white border text-left shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-[14px] p-3 max-w-[72%] border-l-[4px] border-l-primary relative overflow-hidden">
                                     <div className="absolute -right-4 -top-4 opacity-5 text-primary">
                                         <Receipt size={64} />
                                     </div>
                                     <div className="flex items-center gap-1.5 mb-2 relative z-10">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isIncome ? 'bg-[#E6F4EA] text-[#137333]':'bg-[#FFE8E8] text-danger'}`}>
                                            <span className="text-[10px] font-bold">{isIncome ? '入' : '出'}</span>
                                        </div>
                                        <span className="text-[12px] font-semibold text-text-secondary">记账凭证</span>
                                     </div>
                                     <h4 className="text-[18px] font-bold text-text-main mb-1 tracking-tight">${evt.amount}</h4>
                                     <p className="text-[13px] text-text-secondary leading-tight">{evt.desc}</p>
                                     <span className="text-[10px] text-black/40 float-right mt-2">{evt.time}</span>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
                <div ref={chatEndRef} />
            </div>

            {/* Bottom Input Area */}
            <div className="absolute bottom-0 w-full flex flex-col bg-background/95 backdrop-blur z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                {/* Expandable Finance/Work Order Action Bar */}
                {isMenuOpen && (
                    <div className="px-4 py-3 bg-white border-t border-divider grid grid-cols-4 gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
                        {activeWO ? (
                            <>
                                <button onClick={() => setActiveModal("expense")} className="flex flex-col items-center gap-1.5">
                                    <div className="w-12 h-12 bg-danger/10 text-danger rounded-[16px] flex items-center justify-center">
                                        <span className="font-bold text-lg">-</span>
                                    </div>
                                    <span className="text-[11px] text-text-secondary font-medium">记支出</span>
                                </button>
                                <button onClick={() => setActiveModal("income")} className="flex flex-col items-center gap-1.5">
                                    <div className="w-12 h-12 bg-[#E6F4EA] text-[#137333] rounded-[16px] flex items-center justify-center">
                                        <span className="font-bold text-lg">+</span>
                                    </div>
                                    <span className="text-[11px] text-text-secondary font-medium">记收入</span>
                                </button>
                                <button onClick={handleCompleteWO} className="flex flex-col items-center gap-1.5">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-[16px] flex items-center justify-center">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <span className="text-[11px] text-text-secondary font-medium">结束工单</span>
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setActiveModal("new_wo")} className="flex flex-col items-center gap-1.5">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-[16px] flex items-center justify-center relative shadow-sm border border-primary/20">
                                    <FileText size={22} className="relative z-10" />
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger animate-pulse border border-white"></div>
                                </div>
                                <span className="text-[12px] font-bold tracking-wide text-text-main mt-1">发起工单</span>
                            </button>
                        )}
                    </div>
                )}

                <div className="bg-white border-t border-divider px-3 py-3 pb-8 flex items-end gap-3 rounded-t-[20px]">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={cn(
                            "w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all shrink-0 mb-1 border-2 shadow-sm text-white",
                            isMenuOpen ? "bg-text-secondary border-text-secondary/20 rotate-45" : "bg-primary border-primary/20 hover:scale-105 active:scale-95"
                        )}
                    >
                        <Plus size={20} strokeWidth={3} />
                    </button>
                    
                    <div className="flex-1 bg-gray-50 border border-divider/60 rounded-[16px] min-h-[44px] flex items-center px-4 py-1 transition-colors focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-[0_2px_8px_rgba(32,87,129,0.08)]">
                        <textarea
                            placeholder={activeWO ? "输入消息...(当前在工单中)" : "输入消息..."}
                            className="flex-1 bg-transparent border-none outline-none text-[15px] resize-none px-1 max-h-[80px] leading-[30px] self-center py-0 custom-scrollbar mt-[2px]"
                            rows={1}
                        />
                    </div>
                </div>
            </div>

            {/* Modals Background Overlay */}
            {activeModal !== "none" && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center sm:items-center">
                    <div className="w-full sm:w-[400px] bg-white rounded-t-[32px] sm:rounded-[32px] p-6 animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">
                                {activeModal === "new_wo" ? "发起工单" : activeModal === "expense" ? "记录支出" : "记录收入"}
                            </h3>
                            <button onClick={() => setActiveModal("none")} className="p-2 bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={activeModal === "new_wo" ? handleCreateWorkOrder : (e) => handleAddLedger(e, activeModal === "expense" ? "expense" : "income")} className="space-y-4">
                            <div>
                                <label className="block text-sm text-text-secondary mb-1.5 ml-1">
                                    {activeModal === "new_wo" ? "事项简述 (如：厨房下水管维修)" : "记账备注"}
                                </label>
                                <input
                                    type="text"
                                    value={formDesc}
                                    onChange={e => setFormDesc(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                                    placeholder="必填"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-text-secondary mb-1.5 ml-1">
                                    {activeModal === "new_wo" ? "预估费用 ($)" : "金额 ($)"}
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formAmount}
                                    onChange={e => setFormAmount(e.target.value)}
                                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-lg"
                                    placeholder="0.00"
                                />
                            </div>

                            <button type="submit" className={cn(
                                "w-full py-4 rounded-xl text-white font-bold text-[16px] mt-6 shadow-sm",
                                activeModal === "new_wo" ? "bg-primary" : activeModal === "expense" ? "bg-danger" : "bg-[#137333]"
                            )}>
                                {activeModal === "new_wo" ? "创建工单" : "确认记账"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
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
