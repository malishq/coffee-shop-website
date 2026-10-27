"use client";

import type { ReactNode } from "react";
import { useLenis } from "lenis/react";
import { goToOrder } from "@/lib/order-store";

export function OrderLink({ item, children, className = "" }: { item: string; children: ReactNode; className?: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      className={`link-on text-[16px] font-medium text-ink ${className}`}
      onClick={() => goToOrder(lenis, item)}
    >
      {children}
    </button>
  );
}
