import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

export type Order = { item: string; stamp: number };

let state: Order = { item: "", stamp: 0 };
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setOrder(item: string) {
  state = { item, stamp: Date.now() };
  listeners.forEach((listener) => listener());
}

export function useOrder() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => state,
  );
}

export function goToOrder(lenis: Lenis | null | undefined, item: string) {
  setOrder(item);
  const focusName = () => document.getElementById("order-name")?.focus({ preventScroll: true });
  if (!lenis) {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(focusName, 900);
    return;
  }
  lenis.scrollTo(window.scrollY, { immediate: true, force: true });
  lenis.scrollTo("#order", { lock: true, duration: 1.4, onComplete: focusName });
}
