"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function AppGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, properties, activePropertyId, setActivePropertyId } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (!currentUser && !isAuthPage) {
      router.replace("/login");
    } else if (currentUser && isAuthPage) {
      router.replace("/");
    }

    // Auto-select first property if none selected
    if (currentUser && !activePropertyId && properties.length > 0) {
      setActivePropertyId(properties[0].id);
    }
  }, [currentUser, mounted, pathname, router, activePropertyId, properties, setActivePropertyId]);

  // Don't render until Zustand rehydrates on client to avoid hydration mismatch
  if (!mounted) return null;

  return <>{children}</>;
}
