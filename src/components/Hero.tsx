"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { Bean, CupSteam } from "@/components/drawings";
import { ButtonLink } from "@/components/ui";
import { asset } from "@/lib/asset";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

const BEANS = [
  { left: "6%", top: "14%", size: 46, rotate: -32, speed: 0.55, fill: "var(--surface-2)" },
  { left: "30%", top: "8%", size: 28, rotate: 18, speed: 0.9, fill: "var(--surface-2)" },
  { left: "52%", top: "20%", size: 36, rotate: -10, speed: 0.4, fill: "var(--accent)" },
  { left: "84%", top: "48%", size: 54, rotate: 34, speed: 0.7, fill: "var(--surface-2)" },
  { left: "64%", top: "78%", size: 32, rotate: -24, speed: 1.1, fill: "var(--surface-2)" },
  { left: "42%", top: "88%", size: 24, rotate: 50, speed: 0.6, fill: "var(--accent)" },
  { left: "92%", top: "84%", size: 40, rotate: -40, speed: 0.85, fill: "var(--surface-2)" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits = gsap.utils.toArray<HTMLElement>("[data-hero-line]").map((line) => SplitText.create(line, { type: "lines,chars", mask: "lines" }));
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        splits.forEach((split, index) => {
          tl.from(split.chars, { yPercent: 115, duration: 0.95, stagger: 0.04 }, index * 0.14);
        });
        tl.from("[data-hero-photo]", { scale: 1.08, autoAlpha: 0, duration: 1.1, ease: "power2.out" }, 0.15);
        tl.from("[data-hero-fade]", { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.5);
        tl.from(".steam", { drawSVG: "0%", duration: 2.2, ease: "power1.inOut", stagger: 0.25 }, 0.4);
        gsap.utils.toArray<SVGPathElement>(".steam").forEach((path, index) => {
          gsap.to(path, { y: -18 - index * 4, duration: 4.6 + index * 0.7, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.8 + index * 0.5 });
          gsap.to(path, { opacity: 0.3, duration: 3.4 + index * 0.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.8 + index * 0.4 });
        });
        const scroll = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.utils.toArray<HTMLElement>("[data-bean]").forEach((bean) => {
          gsap.to(bean, { y: Number(bean.dataset.bean) * 180, rotation: 12, ease: "none", scrollTrigger: scroll });
        });
        gsap.to("[data-hero-cup]", { yPercent: 9, ease: "none", scrollTrigger: scroll });
        gsap.to("[data-hero-photo]", { yPercent: -10, ease: "none", scrollTrigger: scroll });
        return () => splits.forEach((split) => split.revert());
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section id="top" ref={ref} className="wrap relative overflow-hidden lg:h-[calc(100svh-5rem)] lg:max-h-[1080px] lg:min-h-[640px]" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BEANS.map((bean) => (
          <span
            key={`${bean.left}-${bean.top}`}
            data-bean={bean.speed}
            className="absolute block"
            style={{ left: bean.left, top: bean.top, width: bean.size, height: bean.size, transform: `rotate(${bean.rotate}deg)` }}
          >
            <Bean fill={bean.fill} className="h-full w-full" />
          </span>
        ))}
      </div>

      <div className="relative grid h-full grid-cols-12 gap-x-[var(--gutter)] pb-10 pt-4 lg:grid-rows-[minmax(4vh,1fr)_auto_auto_minmax(4vh,1fr)] lg:pb-0 lg:pt-0">
        <figure data-hero-photo className="col-span-6 col-start-7 row-start-1 mb-4 self-end lg:col-span-3 lg:col-start-10 lg:mb-6 lg:mt-[8vh]">
          <Image
            src={asset("/images/beans-dark.jpg")}
            width={1920}
            height={1280}
            alt="Обжаренные зёрна кофе, рассыпанные на тёмной поверхности"
            priority
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>

        <h1 id="hero-title" className="t-display col-span-12 row-start-2 grid grid-cols-12 gap-x-[var(--gutter)] text-ink">
          <span data-hero-line className="col-span-12 lg:col-span-11 lg:col-start-2">
            Зерно
          </span>
          <span data-hero-line className="col-span-12 ml-[22vw] lg:col-span-7 lg:col-start-6 lg:ml-0">
            недели
          </span>
        </h1>

        <div className="relative col-span-9 col-start-1 row-start-4 mt-8 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-2 lg:mt-0 lg:pt-[calc(var(--step-display)+24px)]">
          <figure data-hero-cup className="w-full lg:absolute lg:left-0 lg:top-[calc(var(--step-display)+24px)]">
            <CupSteam className="aspect-[4/5] w-full" />
          </figure>
        </div>

        <div className="col-span-12 row-start-3 mt-7 lg:col-span-5 lg:col-start-6 lg:mt-9">
          <p data-hero-fade className="t-lead max-w-[36ch] text-muted">
            Кофейня со своим ростером на Примерной, 3: обжариваем раз в неделю, варим эспрессо и фильтр, отдаём зерно с собой.
          </p>
          <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            <ButtonLink href={SITE.cta.href}>{SITE.cta.label}</ButtonLink>
            <Link href="#menu" className="link-on text-[16px] font-medium text-ink">
              Меню
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
