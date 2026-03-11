"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { ChevronLeft, Receipt, Check } from "lucide-react";

export default function NewLedgerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeQuery = searchParams.get("type"); // "income" or "expense"
  
  const { activePropertyId, properties, addLedgerEntry } = useAppStore();
  const activeProperty = properties.find((p) => p.id === activePropertyId);

  const [type, setType] = useState<"income" | "expense">(typeQuery === "expense" ? "expense" : "income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePropertyId || !amount || !description) return;

    addLedgerEntry({
        id: `ledg-mn-${Date.now()}`,
        propertyId: activePropertyId,
        amount: Number(amount),
        type,
        date: new Date().toISOString(),
        description
    });
    router.push("/finance");
  };

  if (!activeProperty) {
      return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="px-5 pt-4 pb-4 flex items-center bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={24} className="text-text-main" />
        </button>
        <h1 className="text-[18px] font-bold text-text-main ml-2 flex-1">手动记账</h1>
      </div>

      <div className="p-5">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6 flex items-center gap-3">
          <span className="text-xl">{activeProperty.icon}</span>
          <div>
            <p className="text-xs text-text-secondary">记账房屋</p>
            <p className="text-sm font-bold text-primary">{activeProperty.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex bg-gray-200 p-1.5 rounded-xl border border-gray-300/50">
              <button
                type="button"
                className={`flex-1 py-2.5 rounded-lg text-[14px] font-bold transition-all ${
                  type === "income" ? "bg-white text-[#137333] shadow-sm" : "text-text-weak hover:text-text-main"
                }`}
                onClick={() => setType("income")}
              >
                收入
              </button>
              <button
                type="button"
                className={`flex-1 py-2.5 rounded-lg text-[14px] font-bold transition-all ${
                  type === "expense" ? "bg-white text-danger shadow-sm" : "text-text-weak hover:text-text-main"
                }`}
                onClick={() => setType("expense")}
              >
                支出
              </button>
            </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="mb-4 text-center">
                <span className={`text-[42px] font-bold font-mono ${type === "income" ? "text-success" : "text-text-main"}`}>
                    <span className="text-2xl opacity-50 mr-1">$</span>
                    <input 
                        type="number" 
                        step="0.01"
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00" 
                        required
                        className="w-[140px] bg-transparent outline-none text-center placeholder:text-gray-300" 
                    />
                </span>
                <div className="w-full h-px bg-divider mt-2 scale-x-[1.2]"></div>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-[13px] text-text-secondary mb-1.5 ml-1 font-semibold">账单备注</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3 text-text-weak pointer-events-none">
                    <Receipt size={16} />
                  </div>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="如：3月租金、维修地漏..."
                    className="w-full pl-9 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-[15px] font-medium"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className={`w-full text-white py-4 rounded-xl font-bold text-[16px] shadow-sm flex items-center justify-center gap-2 transition-colors ${
                  type === "income" ? "bg-[#137333] hover:bg-[#0f5927]" : "bg-danger hover:bg-red-700"
              }`}
            >
              <Check size={18} strokeWidth={3} />
              确认记录{type === "income" ? "收入" : "支出"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
