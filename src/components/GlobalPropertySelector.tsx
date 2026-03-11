"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { ChevronDown, Check, Building2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function GlobalPropertySelector() {
  const { properties, activePropertyId, setActivePropertyId } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const isAllSelected = activePropertyId === "all";
  const displayProperty = isAllSelected 
    ? { id: "all", name: "全部房产", address: "汇总所有消息与账单", icon: "🌍" }
    : properties.find((p) => p.id === activePropertyId) || properties[0];

  if (!displayProperty) return null;

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span className="text-[15px]">{displayProperty.icon || "🏠"}</span>
        <span className="text-[14px] font-bold text-text-main max-w-[120px] truncate">
          {displayProperty.name}
        </span>
        <ChevronDown size={14} className="text-text-secondary" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/5" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-weak">切换房产</span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              {/* All Properties Option */}
              <button
                  onClick={() => {
                    setActivePropertyId("all");
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50",
                    isAllSelected ? "bg-primary/5" : ""
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-[14px]">🌍</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-primary truncate">全部房产</p>
                    <p className="text-[12px] text-text-weak truncate">汇总所有消息与账单</p>
                  </div>
                  {isAllSelected && (
                    <Check size={16} className="text-primary shrink-0" />
                  )}
                </button>

              {properties.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => {
                    setActivePropertyId(prop.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left",
                    activePropertyId === prop.id ? "bg-primary/5" : ""
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-[14px]">{prop.icon || "🏠"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-text-main truncate">{prop.name}</p>
                    <p className="text-[12px] text-text-weak truncate">{prop.address}</p>
                  </div>
                  {activePropertyId === prop.id && (
                    <Check size={16} className="text-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-gray-50">
              <Link 
                href="/profile/properties/new" 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-primary font-medium text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus size={14} className="text-primary" />
                </div>
                添加新房产
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
