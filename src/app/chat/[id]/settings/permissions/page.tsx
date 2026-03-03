"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PermissionsPage() {
    const router = useRouter();
    const [allowInvite, setAllowInvite] = useState(false);
    const [allowEdit, setAllowEdit] = useState(false);
    const [allowPin, setAllowPin] = useState(true);

    return (
        <div className="flex flex-col min-h-[100dvh] bg-background">
            <div className="h-[56px] bg-white flex items-center px-4 sticky top-0 z-20 border-b border-divider/40">
                <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center hover:bg-black/5 -ml-2 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div className="flex-1 text-center font-bold text-[16px] text-text-main pr-[26px]">
                    群管理权限
                </div>
            </div>

            <div className="p-4 pt-6">
                <div className="bg-white rounded-[16px] overflow-hidden border border-divider/60">
                    <div className="flex items-center justify-between px-4 py-4 border-b border-divider/40">
                        <div>
                            <div className="text-[15px] font-medium text-text-main">允许普通成员邀请他人进群</div>
                            <div className="text-[12px] text-text-weak mt-1">关闭后，只有群主或管理员可以邀请</div>
                        </div>
                        <div
                            onClick={() => setAllowInvite(!allowInvite)}
                            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${allowInvite ? 'bg-primary' : 'bg-divider/80'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${allowInvite ? 'translate-x-[26px]' : 'translate-x-0.5'}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-4 border-b border-divider/40">
                        <div>
                            <div className="text-[15px] font-medium text-text-main">允许普通成员修改群聊名称</div>
                            <div className="text-[12px] text-text-weak mt-1">关闭后，只有群主或管理员可以修改</div>
                        </div>
                        <div
                            onClick={() => setAllowEdit(!allowEdit)}
                            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${allowEdit ? 'bg-primary' : 'bg-divider/80'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${allowEdit ? 'translate-x-[26px]' : 'translate-x-0.5'}`}></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-4">
                        <div>
                            <div className="text-[15px] font-medium text-text-main">允许普通成员置顶消息</div>
                            <div className="text-[12px] text-text-weak mt-1">开启后，所有人均可置顶重要消息</div>
                        </div>
                        <div
                            onClick={() => setAllowPin(!allowPin)}
                            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${allowPin ? 'bg-primary' : 'bg-divider/80'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${allowPin ? 'translate-x-[26px]' : 'translate-x-0.5'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-[16px] overflow-hidden border border-divider/60 px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-[15px] font-bold text-danger text-center w-full cursor-pointer">
                            转让群主
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
