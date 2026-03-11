"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import GlobalPropertySelector from "@/components/GlobalPropertySelector";

export default function Home() {
  const { activePropertyId, properties } = useAppStore();
  
  // Example dummy chats associated with properties to demonstrate the UI
  // Real app would fetch this from the store based on activePropertyId
  const dummyChats = {
    "prop-1": [
      {
        id: "chat-128-rent",
        name: "租客 David",
        avatar: "👨‍💼",
        avatarBg: "bg-blue-50 text-blue-600",
        tag: "日常",
        tagStyle: "bg-[#E8F0FE] text-[#1A73E8]",
        message: "好的，房租已经转过去啦",
        time: "12:34",
        unread: 0,
      },
      {
        id: "chat-128-repair",
        name: "128 厨房漏水维修组",
        avatar: "🔧",
        avatarBg: "bg-orange-50 text-orange-600",
        tag: "工单",
        tagStyle: "bg-orange-100 text-orange-700",
        message: "Wang师傅：我下午两点到，买配件大概$50",
        time: "昨天",
        unread: 1,
      },
      {
        id: "chat-128-former-tenant",
        name: "前租客 退房清算",
        avatar: "📦",
        avatarBg: "bg-gray-100 text-gray-600",
        tag: "押金",
        tagStyle: "bg-gray-200 text-gray-700",
        message: "查房完毕，清洁费扣除$100后退还押金",
        time: "周一",
        unread: 0,
      }
    ],
    "prop-2": [
      {
        id: "chat-56-rent",
        name: "租客 Michael",
        avatar: "👨‍💻",
        avatarBg: "bg-green-50 text-green-600",
        tag: "账单",
        tagStyle: "bg-[#E6F4EA] text-[#137333]",
        message: "Michael 已支付3月租金 $1,800",
        time: "周二",
        unread: 0,
      },
      {
        id: "chat-56-hvac",
        name: "暖炉年度检查",
        avatar: "❄️",
        avatarBg: "bg-sky-50 text-sky-600",
        tag: "工单",
        tagStyle: "bg-sky-100 text-sky-700",
        message: "检查完毕，一切正常。出风口已经清洗。",
        time: "3月10日",
        unread: 0,
      }
    ],
    "prop-3": [
      {
        id: "chat-lakeview-group",
        name: "Apt 4B 租客群",
        avatar: "👨‍👩‍👧",
        avatarBg: "bg-purple-50 text-purple-600",
        tag: "群聊",
        tagStyle: "bg-purple-100 text-purple-700",
        message: "Alice: 房东你好，大门的锁好像有点卡",
        time: "刚刚",
        unread: 2,
      },
      {
        id: "chat-lakeview-agent",
        name: "中介 Lily",
        avatar: "👩‍💼",
        avatarBg: "bg-pink-50 text-pink-600",
        tag: "招租",
        tagStyle: "bg-pink-100 text-pink-700",
        message: "下周有两组客人想看房，你哪天方便？",
        time: "昨天",
        unread: 0,
      }
    ]
  };

  const isAllSelected = activePropertyId === "all";
  
  const activePropertyChats = isAllSelected
    ? Object.values(dummyChats).flat().sort((a, b) => b.unread - a.unread)
    : (activePropertyId && dummyChats[activePropertyId as keyof typeof dummyChats] 
        ? dummyChats[activePropertyId as keyof typeof dummyChats] 
        : []);

  const activeProperty = isAllSelected
    ? { id: "all", name: "全部房产" }
    : properties.find(p => p.id === activePropertyId);

  if (!activePropertyId || !activeProperty) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-2">未选择房产</h2>
        <p className="text-text-secondary text-sm mb-6">请在上方选择或添加一个房产以查看消息和账单</p>
        <Link href="/profile/properties/new" className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium">
          添加房产
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header with Global Property Selector */}
      <div className="px-5 pt-4 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <GlobalPropertySelector />
        <div className="flex items-center gap-3">
          <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center relative cursor-pointer active:scale-95 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      <div className="px-5 mb-2 mt-2 flex justify-between items-center">
         <h1 className="text-[22px] font-bold text-text-main tracking-tight">消息工单</h1>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] h-[44px] flex items-center px-3 gap-2 border border-transparent focus-within:border-primary/20 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder={`搜索 ${activeProperty.name} 的联系人或消息…`}
            className="flex-1 bg-transparent text-[14px] text-text-main placeholder-text-weak outline-none"
          />
        </div>
      </div>

      {/* Active Property Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5">
          {activePropertyChats.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                💬
              </div>
              <p className="text-text-main font-medium mb-1">暂无消息</p>
              <p className="text-[13px] text-text-secondary">此房产下还没有任何聊天或工单</p>
            </div>
          ) : (
            <div className="bg-white rounded-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
              {activePropertyChats.map((chat, idx) => (
                <ChatItem 
                  key={chat.id} 
                  chat={chat} 
                  isLast={idx === activePropertyChats.length - 1} 
                  propertyName={activeProperty.name} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatItem({ chat, isLast, propertyName }: { chat: any; isLast: boolean; propertyName: string }) {
  // Navigate to dynamic chat page
  const href = `/chat/${chat.id}?name=${encodeURIComponent(chat.name)}&prop=${encodeURIComponent(propertyName)}`;

  return (
    <Link href={href} className="flex px-4 py-[16px] active:bg-gray-50 transition-colors block relative group cursor-pointer">
      <div className="flex gap-3 w-full items-center">
        {/* Avatar */}
        <div className={`w-[52px] h-[52px] rounded-[12px] flex items-center justify-center shrink-0 text-[24px] relative ${chat.avatarBg}`}>
          {chat.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
          <div className="flex justify-between items-center">
            <h3 className="text-[15px] font-semibold text-text-main truncate pr-2">{chat.name}</h3>
            <span className="text-[12px] text-text-weak whitespace-nowrap shrink-0 font-medium">{chat.time}</span>
          </div>

          <div className="flex items-center gap-2">
            {chat.tag && (
              <span className={`text-[10px] font-bold rounded-[6px] px-[6px] py-[2px] whitespace-nowrap shrink-0 ${chat.tagStyle}`}>
                {chat.tag}
              </span>
            )}
            <p className="text-[13px] text-text-secondary truncate leading-snug">{chat.message}</p>
          </div>
        </div>

        {/* Badge */}
        {chat.unread > 0 && (
          <div className="w-[20px] h-[20px] rounded-full bg-danger flex items-center justify-center text-[11px] font-bold text-white shrink-0 shadow-sm ml-1">
            {chat.unread}
          </div>
        )}
      </div>

      {/* Divider */}
      {!isLast && (
        <div className="absolute bottom-0 right-0 left-[76px] h-[1px] bg-divider"></div>
      )}
    </Link>
  );
}
