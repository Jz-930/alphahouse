

export default function ContactsPage() {
    const properties = [
        {
            id: "prop-1",
            name: "128 Maple St.",
            contacts: [
                { id: "c1", name: "David Chen", role: "租客", roleStyle: "bg-[#E8F0FE] text-[#1A73E8]", phone: "555-0123", avatar: "👨‍💼", avatarBg: "bg-surface" },
                { id: "c2", name: "Wang 师傅", role: "维修工", roleStyle: "bg-[#FFF0E0] text-[var(--color-warning)]", phone: "555-0199", avatar: "👨‍🔧", avatarBg: "bg-[#FFF0E0]" },
            ]
        },
        {
            id: "prop-2",
            name: "56 Oak Ave.",
            contacts: [
                { id: "c3", name: "Michael James", role: "租客", roleStyle: "bg-[#E8F0FE] text-[#1A73E8]", phone: "555-0456", avatar: "👨‍💻", avatarBg: "bg-surface" },
                { id: "c4", name: "Agent Lee", role: "中介", roleStyle: "bg-[#E8E0F0] text-[#8E24AA]", phone: "555-0789", avatar: "👩‍💼", avatarBg: "bg-[#E8E0F0]" },
                { id: "c5", name: "Sarah Smith", role: "保险经纪", roleStyle: "bg-[#E6F4EA] text-[#137333]", phone: "555-0999", avatar: "👩‍🏫", avatarBg: "bg-[#E6F4EA]" },
            ]
        },
        {
            id: "prop-3",
            name: "Lakeview Apt Unit 2203",
            contacts: [
                { id: "c6", name: "Alice Wong", role: "租客", roleStyle: "bg-[#E8F0FE] text-[#1A73E8]", phone: "555-0111", avatar: "👩‍🎓", avatarBg: "bg-surface" },
            ]
        }
    ];

    return (
        <div className="flex flex-col min-h-full pb-6">
            {/* Header */}
            <div className="px-5 pt-2 pb-4 flex items-center justify-between sticky top-0 bg-background z-10">
                <h1 className="text-[26px] font-bold text-text-main">通讯录</h1>
                <div className="flex items-center gap-3">
                    <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                    <button className="w-[38px] h-[38px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
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
                        placeholder="搜索联系人、电话或角色…"
                        className="flex-1 bg-transparent text-[14px] text-text-main placeholder-text-weak outline-none"
                    />
                </div>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
                {properties.map((property) => (
                    <div key={property.id} className="px-5 pt-4 pb-2">
                        <h2 className="text-[12px] font-semibold text-text-weak tracking-[1px] uppercase mb-2">
                            {property.name}
                        </h2>
                        <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
                            {property.contacts.map((contact, idx) => {
                                const isLast = idx === property.contacts.length - 1;
                                return (
                                    <div key={contact.id} className="flex px-4 py-[14px] active:bg-gray-50 transition-colors block relative group cursor-pointer hover:opacity-80">
                                        <div className="flex gap-3 w-full items-center">
                                            {/* Avatar */}
                                            <div className={`w-[52px] h-[52px] rounded-[10px] flex items-center justify-center shrink-0 text-[24px] relative ${contact.avatarBg}`}>
                                                {contact.avatar}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-[15px] font-semibold text-text-main truncate">{contact.name}</h3>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-semibold rounded-[4px] px-[7px] py-[2px] whitespace-nowrap shrink-0 ${contact.roleStyle}`}>
                                                        {contact.role}
                                                    </span>
                                                    <span className="text-[13px] text-text-secondary truncate font-mono">
                                                        {contact.phone}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button className="w-[32px] h-[32px] rounded-full bg-surface text-primary flex items-center justify-center hover:bg-gray-100 transition-colors">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                    </svg>
                                                </button>
                                                <button className="w-[32px] h-[32px] rounded-full bg-surface text-primary flex items-center justify-center hover:bg-gray-100 transition-colors">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        {!isLast && (
                                            <div className="absolute bottom-0 right-0 left-[72px] h-[1px] bg-divider"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
