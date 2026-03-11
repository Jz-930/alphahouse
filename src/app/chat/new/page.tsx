"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { ChevronLeft, Users, FileText, Check } from "lucide-react";

export default function NewChatPage() {
  const router = useRouter();
  const { activePropertyId, properties } = useAppStore();
  const activeProperty = properties.find((p) => p.id === activePropertyId);

  const [groupName, setGroupName] = useState("");
  const [notice, setNotice] = useState("");

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName) return;

    // Mock create group chat
    // In a real app we'd dispatch to Zustand/API
    console.log("Created group chat:", groupName, notice, "in property:", activePropertyId);
    router.push("/");
  };

  if (!activeProperty) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full bg-gray-50">
        <p>请先在主页选择一个房屋来发起群聊</p>
        <Link href="/" className="mt-4 text-primary font-medium border border-primary px-4 py-2 rounded-xl">
          返回主页
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="px-5 pt-4 pb-4 flex items-center bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-text-main" />
        </button>
        <h1 className="text-[18px] font-bold text-text-main ml-2 flex-1">创建群聊</h1>
      </div>

      <div className="p-5">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6 flex items-center gap-3">
          <span className="text-xl">{activeProperty.icon}</span>
          <div>
            <p className="text-xs text-text-secondary">当前从属房屋</p>
            <p className="text-sm font-bold text-primary">{activeProperty.name}</p>
          </div>
        </div>

        <form onSubmit={handleCreateGroup} className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="text-[15px] font-bold mb-4 flex items-center gap-2">
              <Users size={16} className="text-primary" />
              群聊配置
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 ml-1">群聊名称</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="如：128 Maple 漏水维修群"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-[15px]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 ml-1">群公告 (选填)</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3 text-text-weak pointer-events-none">
                    <FileText size={16} />
                  </div>
                  <input
                    type="text"
                    value={notice}
                    onChange={(e) => setNotice(e.target.value)}
                    placeholder="群组要求或注意事项"
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-[15px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Check size={18} />
              完成创建
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
