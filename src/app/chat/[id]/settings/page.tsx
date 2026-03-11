"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

function SettingsRow({ icon, title, value, subtext, isLink = true, destructive = false, onClick, iconBgClass = "bg-primary/5 text-primary", href }: any) {
    const content = (
        <div
            onClick={onClick}
            className={`flex items-center justify-between px-4 py-3.5 bg-white border-b border-divider/40 last:border-none active:bg-gray-50 transition-colors ${isLink || href ? 'cursor-pointer hover:bg-black/[0.02]' : ''}`}
        >
            <div className="flex items-center gap-3.5">
                {icon && (
                    <div className={`w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 border border-black/5 ${iconBgClass}`}>
                        <span className="text-[17px]">{icon}</span>
                    </div>
                )}
                <div className="flex flex-col">
                    <div className={`text-[15px] font-medium ${destructive ? 'text-danger' : 'text-text-main'} leading-tight`}>
                        {title}
                    </div>
                    {subtext && (
                        <div className="text-[12px] text-text-weak mt-1 leading-tight">{subtext}</div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-[14px] text-text-secondary font-medium">{value}</span>}
                {isLink && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-weak" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                )}
            </div>
        </div>
    );

    if (href) {
        return <Link href={href} className="block">{content}</Link>;
    }

    return content;
}

function Section({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <div className="mb-[20px] px-4">
            {title && (
                <div className="px-1 py-1.5 mb-1 text-[12px] font-bold text-text-secondary uppercase tracking-widest bg-transparent">
                    {title}
                </div>
            )}
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(32,87,129,0.06)] border border-divider/60">
                {children}
            </div>
        </div>
    );
}

export default function ChatSettingsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const name = searchParams.get("name") || "群组";
    const propName = searchParams.get("prop") || "";

    // Mock role based on chat id
    const isLandlord = true;

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background pb-12">
            {/* Header */}
            <div className="h-[56px] bg-background flex items-center px-4 sticky top-0 z-20">
                <Link href={`/chat/${id}?name=${encodeURIComponent(name)}&prop=${encodeURIComponent(propName)}`} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-white/50 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </Link>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    聊天设置
                </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto pt-3 pb-8">
                {/* Property Association */}
                <Section>
                    <SettingsRow
                        icon="🏢"
                        title="所属房产"
                        value={propName || "未绑定"}
                        subtext="设置此群组关联哪一套房子"
                        iconBgClass="bg-primary/10 text-primary"
                        href={`/chat/${id}/settings/property?prop=${encodeURIComponent(propName)}`}
                    />
                </Section>

                {/* Basic Group Info */}
                <Section>
                    <SettingsRow
                        icon="🏷️"
                        title="群聊名称"
                        value={`${propName} · ${name}`}
                        iconBgClass="bg-[#E6F0F5]"
                        href={`/chat/${id}/settings/group-name?name=${encodeURIComponent(name)}&prop=${encodeURIComponent(propName)}`}
                    />
                    <SettingsRow
                        icon="🪪"
                        title="群二维码"
                        iconBgClass="bg-surface/60"
                        href={`/chat/${id}/settings/qrcode`}
                    />
                    <SettingsRow
                        icon="📢"
                        title="群公告"
                        subtext="租期起止、租金金额、支付日期等"
                        iconBgClass="bg-[#Fdf3E8]"
                        href={`/chat/${id}/settings/announcement`}
                    />
                </Section>

                {/* Identity & Discovery */}
                <Section>
                    <SettingsRow
                        icon="🔍"
                        title="查找聊天记录"
                        iconBgClass="bg-divider/60"
                        href={`/chat/${id}/settings/search-history`}
                    />
                    <SettingsRow
                        icon="👤"
                        title="本群昵称设置"
                        value="房东"
                        subtext="可选：房东、房客1、房东中介等"
                        iconBgClass="bg-surface/60"
                        href={`/chat/${id}/settings/nickname`}
                    />
                </Section>

                <Section>
                    <SettingsRow
                        icon="🔧"
                        title="新建维修申请"
                        subtext="单开临时新群讨论维修问题"
                        iconBgClass="bg-[#FFF0E0]"
                        href={`/chat/${id}/settings/new-repair`}
                    />
                    <SettingsRow
                        icon="🗄️"
                        title="维修历史"
                        subtext="已解决的维修会自动归档于此"
                        iconBgClass="bg-[#F8F9FA]"
                        href={`/chat/${id}/settings/repair-history`}
                    />
                    <SettingsRow
                        icon="📌"
                        title="重要信息归档"
                        subtext="查看已收藏或置顶的聊天内容"
                        iconBgClass="bg-[#FFF4E5]"
                        href={`/chat/${id}/settings/archived-messages`}
                    />
                </Section>

                {/* Landlord Features Section */}
                {isLandlord && (
                    <Section title="房东设置 / Landlord Setting">
                        <SettingsRow
                            icon="👑"
                            title="群管理权限"
                            subtext="房东为永久群主，调整成员权限"
                            iconBgClass="bg-[#FFF0E0]"
                            href={`/chat/${id}/settings/permissions`}
                        />
                        <SettingsRow
                            icon="🧾"
                            title="费用上传"
                            subtext="支持拍照OCR（如地税、管理费等）"
                            iconBgClass="bg-[#E6F0F5]"
                            href={`/chat/${id}/settings/expense-upload`}
                        />
                        <SettingsRow
                            icon="📊"
                            title="财务报表入口"
                            iconBgClass="bg-surface/60"
                            href={`/finance/reports`}
                        />
                    </Section>
                )}

                {/* Everyone Operations Phase 2 */}
                <Section title="即将上线功能">
                    <SettingsRow
                        icon="💳"
                        title="租金支付入口"
                        subtext="第二阶段上线"
                        iconBgClass="bg-primary/5"
                        href={`/chat/${id}/settings/rent-payment`}
                    />
                </Section>

                <Section>
                    <SettingsRow
                        icon="🎧"
                        title="投诉入口"
                        iconBgClass="bg-warning/10"
                        href={`/chat/${id}/settings/complaint`}
                    />
                </Section>

                <Section>
                    <div className="px-4 py-[15px] bg-white flex justify-center items-center cursor-pointer active:bg-gray-50 transition-colors">
                        <span className="text-[15px] font-bold text-danger">清空聊天记录</span>
                    </div>
                </Section>
            </div>
        </div>
    );
}
