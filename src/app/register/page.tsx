"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { Mail, Phone, Lock, User, ChevronRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password || !name) return;
    
    // Mock successful registration
    login({
      id: `user-${Date.now()}`,
      name: name,
      phone: method === "phone" ? identifier : "",
      email: method === "email" ? identifier : ""
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-main">创建 AlphaHouse 账号</h1>
          <p className="text-text-secondary mt-2 text-sm">开启您的智能防漏账房东体验</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${method === "phone" ? "bg-white text-text-main shadow-sm" : "text-text-secondary hover:text-text-main"}`}
            onClick={() => setMethod("phone")}
          >
            手机号注册
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${method === "email" ? "bg-white text-text-main shadow-sm" : "text-text-secondary hover:text-text-main"}`}
            onClick={() => setMethod("email")}
          >
            邮箱注册
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-weak">
              <User size={18} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="您的姓名或称呼"
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[15px]"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-weak">
              {method === "phone" ? <Phone size={18} /> : <Mail size={18} />}
            </div>
            <input
              type={method === "phone" ? "tel" : "email"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={method === "phone" ? "请输入手机号" : "请输入邮箱"}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[15px]"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-weak">
              <Lock size={18} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="设置密码"
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[15px]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 mt-6"
          >
            立即注册
            <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            已有账号？{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              直接登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
