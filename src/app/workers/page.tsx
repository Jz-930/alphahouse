"use client";



export default function WorkersPage() {
    const categories = [
        { name: "水管", emoji: "🔧", active: true },
        { name: "暖通空调", emoji: "❄️" },
        { name: "电工", emoji: "⚡" },
        { name: "门窗", emoji: "🪟" },
        { name: "粉刷", emoji: "🎨" },
        { name: "锁具", emoji: "🔒" },
    ];

    const workers = [
        {
            id: "w1",
            name: "James Wang",
            isCertified: true,
            isFeatured: true,
            rating: "4.9",
            jobs: "286 单完成",
            tags: ["水管维修", "卫浴安装", "管道疏通"],
            price: "$80",
            avatarBg: "bg-[#FFF0E0]",
            avatarEmoji: "👨‍🔧",
        },
        {
            id: "w2",
            name: "Michael Chen",
            isCertified: false,
            isFeatured: false,
            rating: "4.7",
            jobs: "152 单完成",
            tags: ["水管维修", "热水器"],
            price: "$65",
            avatarBg: "bg-[#E0F0FF]",
            avatarEmoji: "👨‍🔧",
        },
        {
            id: "w3",
            name: "Sarah Liu",
            isCertified: true,
            isFeatured: false,
            rating: "4.8",
            jobs: "98 单完成",
            tags: ["全屋水管", "紧急抢修"],
            price: "$90",
            avatarBg: "bg-surface/20",
            avatarEmoji: "👩‍🔧",
        },
        {
            id: "w4",
            name: "David Zhao",
            isCertified: false,
            isFeatured: false,
            rating: "4.5",
            jobs: "67 单完成",
            tags: ["管道疏通", "水龙头更换"],
            price: "$55",
            avatarBg: "bg-[#F0E6F0]",
            avatarEmoji: "👨‍🔧",
        },
    ];

    return (
        <div className="flex flex-col min-h-full pb-6">
            {/* NavBar */}
            <div className="h-[60px] bg-background shrink-0 flex items-center justify-between px-5 sticky top-0 z-10 pt-2 pb-2">
                <h1 className="text-[26px] font-bold text-text-main">维修服务</h1>
                <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>

            {/* Categories */}
            <div className="pl-5 mb-5 pb-1">
                <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 pr-5">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className={`min-w-[90px] h-[80px] bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center shrink-0 transition-all cursor-pointer ${cat.active ? "border-2 border-primary -translate-y-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]" : "border border-transparent hover:-translate-y-[1px]"
                                }`}
                        >
                            <span className="text-[28px] mb-1">{cat.emoji}</span>
                            <span className={`text-[12px] font-medium ${cat.active ? "text-primary" : "text-text-secondary"}`}>
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Worker List */}
            <div className="px-5">
                <h2 className="text-[12px] font-semibold text-text-weak tracking-[1px] uppercase mb-3">推荐维修人员</h2>

                {workers.map((worker) => (
                    <WorkerCard key={worker.id} worker={worker} />
                ))}
            </div>
        </div>
    );
}

function WorkerCard({ worker }: { worker: { id: string, name: string, isCertified: boolean, isFeatured: boolean, rating: string, jobs: string, tags: string[], price: string, avatarBg: string, avatarEmoji: string } }) {
    return (
        <div className={`bg-white rounded-[14px] p-4 mb-3 relative group transition-all hover:-translate-y-[1px] ${worker.isFeatured ? "border-2 border-surface shadow-[0_4px_16px_rgba(181,216,194,0.3)]" : "shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
            }`}>

            {/* Featured Banner */}
            {worker.isFeatured && (
                <div className="absolute -top-[1px] right-4 bg-primary text-white text-[10px] font-bold px-[10px] py-[2px] rounded-b-[6px] shadow-sm z-10 tracking-[0.5px]">
                    平台推荐
                </div>
            )}

            <div className="flex gap-3">
                {/* Avatar */}
                <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 text-[24px] ${worker.avatarBg}`}>
                    {worker.avatarEmoji}
                </div>

                {/* Info */}
                <div className="flex-1 w-full min-w-0">

                    <div className="flex items-center gap-2 mb-0.5 mt-0.5">
                        <h3 className="text-[15px] font-semibold text-text-main truncate max-w-[120px]">{worker.name}</h3>
                        {worker.isCertified && (
                            <span className="text-[10px] font-semibold text-primary bg-surface/30 px-1.5 py-[1px] rounded-[4px] shrink-0 whitespace-nowrap">
                                ✓ 平台认证
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[13px] font-semibold text-warning">⭐ {worker.rating}</span>
                        <span className="text-[12px] text-text-weak">·</span>
                        <span className="text-[12px] text-text-weak">{worker.jobs}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {worker.tags.map((tag: string, i: number) => (
                            <span key={i} className="text-[11px] text-text-secondary bg-background px-2 py-0.5 rounded-[4px]">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between w-full border-t border-divider pt-3 mt-1">
                        <div className="flex flex-col">
                            <span className="text-[11px] text-text-weak leading-none mb-1">起步价</span>
                            <span className="text-[16px] font-bold text-text-main font-mono leading-none">{worker.price}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button className="w-[34px] h-[34px] rounded-full bg-background flex items-center justify-center hover:bg-surface/50 transition-colors">
                                <span className="text-[15px] grayscale opacity-70">📞</span>
                            </button>
                            <button className="w-[34px] h-[34px] rounded-full bg-background flex items-center justify-center hover:bg-surface/50 transition-colors">
                                <span className="text-[15px] grayscale opacity-70">📧</span>
                            </button>
                            <button className="bg-primary text-white text-[13px] font-semibold px-4 py-1.5 rounded-[20px] hover:bg-[#163B56] transition-colors shadow-sm ml-1">
                                拉入群聊
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
