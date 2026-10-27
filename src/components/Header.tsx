"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const links = SITE.nav.filter((link) => SITE.headerNav.includes(link.href));

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="wrap relative z-40">
      <div className="flex h-20 items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link text-[16px] font-medium text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="font-display text-[24px] leading-none text-ink" aria-label={`${SITE.name} — на главную`}>
          {SITE.name}
        </Link>

        <div className="hidden justify-end lg:flex">
          <Link
            href={SITE.cta.href}
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-[16px] font-medium text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-strong active:scale-[0.97]"
          >
            {SITE.cta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="link text-[16px] font-medium text-ink lg:hidden"
        >
          Разделы
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 bg-ground transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="wrap flex h-20 items-center justify-between">
          <span className="font-display text-[24px] leading-none text-ink">{SITE.name}</span>
          <button type="button" onClick={() => setOpen(false)} className="link text-[16px] font-medium text-ink">
            Закрыть
          </button>
        </div>
        <nav aria-label="Мобильное меню" className="wrap flex h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto py-4" data-lenis-prevent>
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-3 font-display text-[32px] leading-none text-ink">
              {link.label}
            </Link>
          ))}
          <Link
            href={SITE.cta.href}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-4 text-[17px] font-medium text-accent-ink"
          >
            {SITE.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
