"use client";

import { useRouter } from "next/navigation";
import { Star, MessageSquareText, Search, Filter, Image as ImageIcon, FileText } from "lucide-react";

export default function CollectionsPage() {
    const router = useRouter();

    const collections = [
        {
            id: 1,
            type: "text",
            sender: "David (128 Maple)",
            time: "昨天 14:30",
            content: "下个月的租金我已经通过Zelle转过去了，附言写的是 'April Rent 128 Maple'。另外厨房水槽那个漏水问题好像彻底解决了，这几天都没再滴水。",
            tags: ["租金", "报修"],
            bgColor: "bg-blue-50/50"
        },
        {
            id: 2,
            type: "image",
            sender: "维修工 Wang",
            time: "3月15日",
            content: "总水阀已更换完毕，这是换下来的旧件和新阀门装好的照片。已经试水半小时没有任何渗漏。",
            imgSrc: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=200&auto=format&fit=crop",
            tags: ["维修记录"],
            bgColor: "bg-surface"
        },
        {
            id: 3,
            type: "file",
            sender: "Michael (56 Oak)",
            time: "3月10日",
            content: "这是更新后的房屋保险单扫描件，有效期到明年4月份。",
            fileName: "Insurance_Policy_2025.pdf",
            fileSize: "2.4 MB",
            tags: ["文件", "保险"],
            bgColor: "bg-orange-50/50"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
            {/* NavBar */}
            <div className="h-[56px] bg-white shrink-0 flex items-center justify-between px-4 sticky top-0 z-10 border-b border-divider/40">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="w-[34px] h-[34px] flex items-center justify-center active:bg-gray-100 rounded-full transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h1 className="text-[18px] font-bold text-text-main">总收藏</h1>
                </div>
                <div className="flex items-center gap-1.5">
                    <button className="w-[34px] h-[34px] flex items-center justify-center text-text-main active:bg-gray-100 rounded-full transition-colors">
                        <Search size={20} strokeWidth={2} />
                    </button>
                    <button className="w-[34px] h-[34px] flex items-center justify-center text-text-main active:bg-gray-100 rounded-full transition-colors">
                        <Filter size={20} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="px-5 py-4 bg-white/50 backdrop-blur-sm sticky top-[56px] z-10 border-b border-divider/40 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    <button className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-[#1A2332] text-white shrink-0 border border-[#1A2332]">
                        全部收藏 (12)
                    </button>
                    <button className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-white text-text-secondary border border-divider/60 shrink-0">
                        文本消息
                    </button>
                    <button className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-white text-text-secondary border border-divider/60 shrink-0">
                        图片/视频
                    </button>
                    <button className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-white text-text-secondary border border-divider/60 shrink-0">
                        文件
                    </button>
                </div>
            </div>

            {/* Content List */}
            <div className="p-4 flex flex-col gap-3">
                {collections.map((item) => (
                    <div key={item.id} className="bg-white rounded-[16px] p-4 border border-divider/40 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[10px] font-bold text-text-secondary">
                                    {item.sender.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-[14px] font-bold text-text-main leading-none">{item.sender}</div>
                                    <div className="text-[11px] text-text-weak mt-1">{item.time}</div>
                                </div>
                            </div>
                            <Star size={16} className="text-[#F59E0B]" fill="#F59E0B" />
                        </div>

                        {/* Content Area */}
                        <div className={`mt-3 p-3 rounded-[12px] ${item.bgColor}`}>
                            <p className="text-[14px] text-text-main leading-relaxed">
                                {item.content}
                            </p>

                            {item.type === "image" && (
                                <div className="mt-3 relative h-[120px] rounded-[8px] overflow-hidden border border-divider/20">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.imgSrc} alt="Image Attachment" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                        <ImageIcon size={24} className="text-white drop-shadow-md" />
                                    </div>
                                </div>
                            )}

                            {item.type === "file" && (
                                <div className="mt-3 bg-white p-3 rounded-[8px] border border-divider/40 flex items-center gap-3">
                                    <div className="w-[36px] h-[36px] rounded-[6px] bg-red-50 flex items-center justify-center text-red-500">
                                        <FileText size={20} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[13px] font-medium text-text-main truncate mb-0.5">{item.fileName}</div>
                                        <div className="text-[11px] text-text-weak">{item.fileSize}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 mt-3 pl-1">
                            {item.tags.map((tag, idx) => (
                                <span key={idx} className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-[4px]">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State / End */}
            <div className="py-6 flex flex-col items-center justify-center text-text-weak/40 mt-4">
                <MessageSquareText size={32} strokeWidth={1} className="mb-2 opacity-50" />
                <p className="text-[12px]">没有更多收藏记录了</p>
            </div>

            {/* Bottom Padding */}
            <div className="h-[20px] shrink-0"></div>
        </div>
    );
}
