"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { ChevronLeft, Plus, Building2, Home, MapPin, Settings } from "lucide-react";

export default function PropertiesListPage() {
  const { properties, activePropertyId, setActivePropertyId } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="px-5 pt-4 pb-4 flex items-center bg-white sticky top-0 z-10 shadow-sm">
        <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="text-[18px] font-bold text-text-main ml-2 flex-1">我的房屋</h1>
        <Link href="/profile/properties/new" className="w-[36px] h-[36px] bg-primary/10 rounded-full flex items-center justify-center">
          <Plus size={20} className="text-primary" />
        </Link>
      </div>

      <div className="p-5">
        <div className="text-sm text-text-secondary mb-4 px-1">
          共管理 {properties.length} 套房产
        </div>

        <div className="space-y-4">
          {properties.map((prop) => (
            <div 
              key={prop.id} 
              className={`bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 transition-all ${
                activePropertyId === prop.id ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-xl flex items-center justify-center text-[20px]">
                    {prop.icon || "🏠"}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-text-main">{prop.name}</h3>
                    <p className="text-[13px] text-text-weak flex items-center gap-1 mt-0.5">
                      <MapPin size={12} />
                      {prop.address}
                    </p>
                  </div>
                </div>
                {activePropertyId === prop.id && (
                  <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-1 rounded-md">
                    当前选择
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-50 mt-1">
                <button 
                  onClick={() => setActivePropertyId(prop.id)}
                  className={`flex-1 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                    activePropertyId === prop.id 
                      ? 'bg-gray-100 text-text-secondary cursor-default' 
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {activePropertyId === prop.id ? '已选中' : '设为当前房屋'}
                </button>
                <Link 
                  href={`/profile/properties/${prop.id}/edit`}
                  className="w-[40px] h-[40px] flex items-center justify-center bg-gray-50 rounded-xl text-text-secondary hover:bg-gray-100"
                >
                  <Settings size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
