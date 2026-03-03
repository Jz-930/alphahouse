import Link from "next/link";

export default function Home() {
  const properties = [
    {
      id: "prop-1",
      name: "128 Maple St.",
      addressIcon: "🏠",
      chats: [
        {
          id: "chat-128-rent",
          name: "租客 David",
          avatar: "👨‍💼",
          avatarBg: "bg-surface",
          tag: "日常",
          tagStyle: "bg-[#E8F0FE] text-[#1A73E8]",
          message: "David: 下个月可能会续租哦",
          time: "12:34",
          unread: 3,
        },
        {
          id: "chat-128-repair",
          name: "厨房漏水维修组",
          avatar: "🔧",
          avatarBg: "bg-[#FFF0E0]",
          tag: "维修",
          tagStyle: "bg-[#FFE8E8] text-danger",
          message: "Wang师傅：我下午两点到",
          time: "昨天",
          unread: 1,
        }
      ]
    },
    {
      id: "prop-2",
      name: "56 Oak Ave.",
      addressIcon: "🏡",
      chats: [
        {
          id: "chat-56-rent",
          name: "租客 Michael",
          avatar: "👨‍💻",
          avatarBg: "bg-surface",
          tag: "账单",
          tagStyle: "bg-[#E6F4EA] text-[#137333]",
          message: "Michael 已支付3月租金 $2,100",
          time: "周二",
          unread: 0,
        },
        {
          id: "chat-56-agent",
          name: "中介 Agent Lee",
          avatar: "👩‍💼",
          avatarBg: "bg-[#E8E0F0]",
          tag: "招租",
          tagStyle: "bg-[#F3E5F5] text-[#8E24AA]",
          message: "Agent Lee: 下一任租客已经找到了",
          time: "周一",
          unread: 0,
        }
      ]
    },
    {
      id: "prop-3",
      name: "Lakeview Apt Unit 2203",
      addressIcon: "🏢",
      chats: [
        {
          id: "chat-lake-rent",
          name: "租客 Alice",
          avatar: "👩‍🎓",
          avatarBg: "bg-surface",
          tag: "入住",
          tagStyle: "bg-[#FFF0E0] text-[#E65100]",
          message: "You: 新的租约已经签好啦，欢迎入住！",
          time: "3/14",
          unread: 0,
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header */}
      <div className="px-5 pt-2 pb-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <h1 className="text-[26px] font-bold text-text-main">消息</h1>
        <div className="flex items-center gap-3">
          <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] h-[42px] flex items-center px-3 gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="搜索房屋或消息…"
            className="flex-1 bg-transparent text-[14px] text-text-main placeholder-text-weak outline-none"
          />
        </div>
      </div>

      {/* Property Groups */}
      <div className="flex-1 overflow-y-auto">
        {properties.map((property) => (
          <div key={property.id} className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[16px]">{property.addressIcon}</span>
              <h2 className="text-[13px] font-bold text-text-main tracking-wide">
                {property.name}
              </h2>
            </div>
            <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
              {property.chats.map((chat, idx) => (
                <ChatItem key={chat.id} chat={chat} isLast={idx === property.chats.length - 1} propertyName={property.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatItem({ chat, isLast, propertyName }: { chat: { id: string, name: string, avatar?: string, avatarBg: string, tag: string | null, tagStyle?: string, message: string, time: string, unread: number, isRepair?: boolean }; isLast: boolean; propertyName: string }) {
  // Always navigate to a dynamic chat page
  const href = `/chat/${chat.id}?name=${encodeURIComponent(chat.name)}&prop=${encodeURIComponent(propertyName)}`;

  return (
    <Link href={href} className="flex px-4 py-[14px] active:bg-gray-50 transition-colors block relative group cursor-pointer hover:opacity-80">
      <div className="flex gap-3 w-full items-center">
        {/* Avatar */}
        <div className={`w-[52px] h-[52px] rounded-[10px] flex items-center justify-center shrink-0 text-[24px] relative ${chat.avatarBg}`}>
          {chat.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <div className="flex justify-between items-center">
            <h3 className="text-[15px] font-semibold text-text-main truncate pr-2">{chat.name}</h3>
            <span className="text-[12px] text-text-weak whitespace-nowrap shrink-0">{chat.time}</span>
          </div>

          <div className="flex items-center gap-2">
            {chat.tag && (
              <span className={`text-[10px] font-semibold rounded-[4px] px-[6px] py-[2px] whitespace-nowrap shrink-0 ${chat.tagStyle}`}>
                {chat.tag}
              </span>
            )}
            <p className="text-[13px] text-text-secondary truncate">{chat.message}</p>
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
        <div className="absolute bottom-0 right-0 left-[72px] h-[1px] bg-divider"></div>
      )}
    </Link>
  );
}
