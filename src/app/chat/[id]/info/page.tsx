"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChatInfoPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-full bg-background pb-8">
            {/* Top Bar */}
            <div className="h-[56px] border-b border-divider bg-white shrink-0 flex items-center px-4 sticky top-0 z-10 w-full relative">
                <button onClick={() => router.push(`/chat/${encodeURIComponent(typeof window !== "undefined" ? location.pathname.split("/")[2] : "")}`)} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-gray-100 absolute left-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center">
                    <span className="text-[16px] font-semibold text-text-main">群聊信息</span>
                </div>
            </div>

            {/* House Info Header */}
            <div className="bg-white flex flex-col items-center pt-6 pb-5 border-b border-divider">
                <div className="w-[72px] h-[72px] bg-surface rounded-[20px] flex items-center justify-center text-[36px] mb-3 shadow-[0_2px_8px_rgba(32,87,129,0.1)]">
                    🏠
                </div>
                <h2 className="text-[20px] font-bold text-text-main mb-1">128 Maple St.</h2>
                <p className="text-[13px] text-text-secondary">3室1厅 · 租期 2024.09.01 – 2025.08.31</p>
            </div>

            {/* Member List */}
            <div className="bg-white py-5 mb-[10px] border-b border-divider flex justify-center gap-6">
                <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className="w-[44px] h-[44px] rounded-full bg-primary flex items-center justify-center text-[16px] font-semibold text-white">房东</div>
                    <span className="text-[11px] text-text-secondary">房东 (您)</span>
                    <span className="text-[9px] font-semibold bg-surface px-1.5 py-0.5 rounded text-primary">Lv.I</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className="w-[44px] h-[44px] rounded-full bg-[#7C8594] flex items-center justify-center text-[16px] font-semibold text-white">Da</div>
                    <span className="text-[11px] text-text-secondary">David</span>
                    <span className="text-[9px] font-semibold bg-[#E0F0FF] px-1.5 py-0.5 rounded text-blue-500">房客</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className="w-[44px] h-[44px] rounded-full bg-[#A0845E] flex items-center justify-center text-[16px] font-semibold text-white">Li</div>
                    <span className="text-[11px] text-text-secondary">Lily</span>
                    <span className="text-[9px] font-semibold bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">中介</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 cursor-pointer pt-0.5">
                    <div className="w-[44px] h-[44px] rounded-full border border-dashed border-divider flex items-center justify-center text-[20px] text-text-weak hover:bg-gray-50">
                        +
                    </div>
                </div>
            </div>

            {/* Feature Block A: Repair */}
            <div className="bg-white flex flex-col mb-[10px]">
                <FeatureRow icon="🔧" title="新建维修申请" iconBg="bg-[#FFF0E0]" />
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow icon="📋" title="维修历史" iconBg="bg-[#E0F0FF]" infoText="3 条记录" />
            </div>

            {/* Feature Block B: Finance */}
            <div className="bg-white flex flex-col mb-[10px]">
                <Link href="/finance">
                    <FeatureRow
                        icon="💰"
                        title="财务报表"
                        iconBg="bg-surface/30"
                        infoNode={<span className="text-[10px] text-primary bg-surface/30 px-2 py-0.5 rounded">仅房东</span>}
                    />
                </Link>
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow icon="🧾" title="费用上传" iconBg="bg-[#FFF0E0]" />
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow
                    icon="💳"
                    title="租金支付"
                    iconBg="bg-[#E0F0FF]"
                    infoNode={<span className="text-[10px] text-text-weak bg-background px-2 py-0.5 rounded">第二阶段</span>}
                />
            </div>

            {/* Feature Block C: Group Mgmt */}
            <div className="bg-white flex flex-col mb-[10px]">
                <FeatureRow icon="📢" title="群公告" iconBg="bg-[#F0E6F0]" />
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow icon="📌" title="重要信息归档" iconBg="bg-background" infoText="我的收藏 · 5条" />
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow icon="🔍" title="查找聊天记录" iconBg="bg-background" />
            </div>

            {/* Feature Block D: Settings */}
            <div className="bg-white flex flex-col mb-[10px]">
                <FeatureRow icon="📱" title="群二维码" iconBg="bg-background" infoText="邀请成员加入" />
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow icon="👥" title="群管理权限" iconBg="bg-background" infoText="群主：房东" />
                <div className="w-full h-[1px] bg-divider ml-[74px]"></div>
                <FeatureRow icon="🏷️" title="我在本群的昵称" iconBg="bg-background" infoText="房东" />
            </div>

            {/* Feature Block E: Complain */}
            <div className="bg-white flex flex-col">
                <FeatureRow icon="⚠️" title="投诉" iconBg="bg-[#FFE8E8]" isDanger />
            </div>

        </div>
    );
}

function FeatureRow({
    icon,
    title,
    iconBg,
    infoText,
    infoNode,
    isDanger
}: {
    icon: string,
    title: string,
    iconBg: string,
    infoText?: string,
    infoNode?: React.ReactNode,
    isDanger?: boolean
}) {
    return (
        <div className="flex items-center justify-between px-5 py-[15px] hover:bg-background transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center text-[18px] ${iconBg}`}>
                    {icon}
                </div>
                <span className={`text-[15px] font-medium ${isDanger ? "text-danger" : "text-text-main"}`}>
                    {title}
                </span>
            </div>
            <div className="flex items-center gap-2">
                {infoText && <span className="text-[13px] text-text-weak">{infoText}</span>}
                {infoNode}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
        </div>
    );
}
