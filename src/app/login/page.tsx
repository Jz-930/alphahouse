"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { Mail, Phone, Lock, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) return;
    
    // Mock successful login
    login({
      id: "user-1",
      name: "房东阿力",
      phone: loginMethod === "phone" ? identifier : "1234567890",
      email: loginMethod === "email" ? identifier : "admin@alphahouse.com"
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary text-3xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold text-text-main">AlphaHouse</h1>
          <p className="text-text-secondary mt-1 text-sm">专业的北美房东记账与管理工具</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${loginMethod === "phone" ? "bg-white text-text-main shadow-sm" : "text-text-secondary hover:text-text-main"}`}
            onClick={() => setLoginMethod("phone")}
          >
            手机号登录
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${loginMethod === "email" ? "bg-white text-text-main shadow-sm" : "text-text-secondary hover:text-text-main"}`}
            onClick={() => setLoginMethod("email")}
          >
            邮箱登录
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-weak">
              {loginMethod === "phone" ? <Phone size={18} /> : <Mail size={18} />}
            </div>
            <input
              type={loginMethod === "phone" ? "tel" : "email"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={loginMethod === "phone" ? "请输入手机号" : "请输入邮箱"}
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
              placeholder="请输入密码 (Demo输入任意即可)"
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[15px]"
              required
            />
          </div>

          <div className="flex justify-end pt-1">
            <Link href="#" className="text-sm text-primary hover:underline">
              忘记密码？
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-[15px] hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            登录
            <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            还没有账号？{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
