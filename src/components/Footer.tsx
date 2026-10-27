import Link from "next/link";
import { SITE } from "@/lib/site";

const CREDITS = [
  { title: "Roasted coffee beans on the surface. 01", author: "A S M Jobaer", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Roasted_coffee_beans_on_the_surface._01.jpg", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { title: "Latte art 3", author: "Kim Sanso", licence: "CC0", page: "https://commons.wikimedia.org/wiki/File:Latte_art_3.jpg", licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  { title: "Roasted coffee beans", author: "MarkSweep", licence: "общественное достояние", page: "https://commons.wikimedia.org/wiki/File:Roasted_coffee_beans.jpg", licenceUrl: "https://creativecommons.org/publicdomain/mark/1.0/" },
  { title: "Coffee cherries, Tarrazú", author: "Tarrazu", licence: "общественное достояние", page: "https://commons.wikimedia.org/wiki/File:Coffee-cherries-green-coffee-tarrazu-costa-rica.jpg", licenceUrl: "https://creativecommons.org/publicdomain/mark/1.0/" },
  { title: "Kaffe – Ystad 2024 (видео)", author: "Jonn Leffmann", licence: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Kaffe_-_Ystad-2024.ogg", licenceUrl: "https://creativecommons.org/licenses/by/3.0/" },
];

export function Footer() {
  return (
    <footer className="bg-paper text-paper-ink">
      <div className="wrap flex flex-col justify-between pb-8 pt-10 lg:min-h-[90svh] lg:pt-14">
        <div>
          <svg viewBox="0 0 1000 262" className="w-full" role="img" aria-label={SITE.name}>
            <text x="0" y="200" textLength="1000" lengthAdjust="spacingAndGlyphs" fontFamily="var(--font-display)" fontSize="260" fill="currentColor">
              {SITE.name}
            </text>
          </svg>

          <div className="mt-12 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10 lg:mt-[72px]">
            <div className="t-title col-span-12 flex flex-col gap-3 lg:col-span-5">
              <a href={SITE.phoneHref} className="link w-fit">
                {SITE.phone}
              </a>
              <span>{SITE.address}</span>
            </div>
            <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 text-[16px] leading-[1.5] sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              <div className="flex flex-col gap-1.5">
                <span className="font-medium">Разделы</span>
                {SITE.nav.map((link) => (
                  <Link key={link.href} href={link.href} className="link-on w-fit text-paper-muted">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-medium">Часы</span>
                {SITE.hours.map((h) => (
                  <span key={h.days} className="text-paper-muted">
                    {h.days} {h.time}
                  </span>
                ))}
                <span className="text-paper-muted">Обжарка: {SITE.roastDay}</span>
                <span className="text-paper-muted">Каппинг: {SITE.cupping}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-medium">Заказ</span>
                <Link href="#order" className="link-on w-fit text-paper-muted">
                  Заказать с собой
                </Link>
                <Link href="#builder" className="link-on w-fit text-paper-muted">
                  Собрать напиток
                </Link>
                <Link href="#subscription" className="link-on w-fit text-paper-muted">
                  Подписка на зерно
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <p className="t-small max-w-[110ch] text-paper-muted">
            Фотографии и видео с Wikimedia Commons:{" "}
            {CREDITS.map((credit, index) => (
              <span key={credit.title}>
                <a href={credit.page} className="link-on">
                  «{credit.title}»
                </a>
                , {credit.author},{" "}
                <a href={credit.licenceUrl} className="link-on">
                  {credit.licence}
                </a>
                {index < CREDITS.length - 1 ? "; " : "."}
              </span>
            ))}
          </p>
          <div className="t-small mt-6 flex items-center justify-between gap-4 text-paper-muted">
            <span>© 2026 {SITE.name}</span>
            <a href="#top" className="link-on">
              Наверх
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
