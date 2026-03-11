import type { Metadata } from "next";
import { Noto_Sans_SC, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AppGuard from "@/components/AppGuard";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AlphaHouse Demo",
  description: "Property Management Mobile App Demo",
  authors: [{ name: "jiackey" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${notoSansSC.variable} ${dmSans.variable} antialiased`}
      >
        {/* Mobile Shell Outer Wrapper */}
        <main className="relative w-full h-full sm:w-[390px] sm:h-[844px] bg-background rounded-none sm:rounded-[44px] shadow-none sm:shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-0 sm:border-8 border-gray-800 overflow-hidden flex flex-col font-sans shrink-0">

          {/* Simulated Status Bar (54px) */}
          <div className="hidden sm:flex h-[54px] w-full bg-transparent shrink-0 items-center justify-between px-6 pt-2 z-50">
            <span className="text-[14px] font-semibold text-text-main">9:41</span>
            <div className="flex items-center gap-1.5 opacity-80">
              {/* Fake Signal/Wifi/Battery icons */}
              <div className="flex gap-[1px] items-end h-3">
                <div className="w-[3px] h-1.5 bg-text-main rounded-sm"></div>
                <div className="w-[3px] h-2 bg-text-main rounded-sm"></div>
                <div className="w-[3px] h-2.5 bg-text-main rounded-sm"></div>
                <div className="w-[3px] h-3 bg-text-main rounded-sm"></div>
              </div>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12C9.5 12 11.5 11 15.5 8C15.8 7.8 16 7.4 16 7C16 6.6 15.8 6.2 15.5 6C11 2 5 2 0.5 6C0.2 6.2 0 6.6 0 7C0 7.4 0.2 7.8 0.5 8C4.5 11 6.5 12 8 12Z" fill="#1A2332" />
              </svg>
              <div className="w-6 h-3 rounded-[4px] border border-text-main p-[1px] flex items-center relative">
                <div className="h-full bg-text-main rounded-sm w-[80%]"></div>
                <div className="absolute -right-[3px] top-[3px] w-[2px] h-[4px] bg-text-main rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative no-scrollbar bg-background">
            <AppGuard>{children}</AppGuard>
          </div>

          <Navigation />
        </main>
      </body>
    </html>
  );
}
