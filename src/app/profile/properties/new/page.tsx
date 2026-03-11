"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { ChevronLeft, MapPin, Building, Home, Beaker } from "lucide-react";

const ICONS = ["🏠", "🏡", "🏢", "🏬", "别墅", "公寓"];

export default function NewPropertyPage() {
  const router = useRouter();
  const addProperty = useAppStore((state) => state.addProperty);
  const setActivePropertyId = useAppStore((state) => state.setActivePropertyId);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("🏠");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    const newProp = {
      id: `prop-${Date.now()}`,
      name,
      address,
      icon: selectedIcon,
    };

    addProperty(newProp);
    setActivePropertyId(newProp.id);
    router.push("/profile/properties");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-5 pt-4 pb-4 flex items-center bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <Link href="/profile/properties" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="text-[18px] font-bold text-text-main ml-2 flex-1">添加新房屋</h1>
      </div>

      <div className="p-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="text-[15px] font-bold mb-4 flex items-center gap-2">
              <Building size={16} className="text-primary" />
              基本信息
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 ml-1">房屋代称 (如：多大旁边公寓)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入易记的代称"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-[15px]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 ml-1">详细地址</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3 text-text-weak pointer-events-none">
                    <MapPin size={16} />
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="请输入详细地址"
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-[15px]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
            <h2 className="text-[15px] font-bold mb-4">选择图标</h2>
            <div className="flex flex-wrap gap-3">
              {ICONS.map((icon, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center text-[22px] transition-all ${
                    selectedIcon === icon 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {icon.length > 2 ? <span className="text-[12px] font-bold">{icon}</span> : icon}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-sm"
            >
              保存并设为当前房屋
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
