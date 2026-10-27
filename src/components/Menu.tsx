import Image from "next/image";
import { MENU, formatPrice } from "@/lib/menu";

export function Menu() {
  return (
    <section id="menu" className="wrap scroll-mt-6 py-[clamp(72px,10vw,160px)]" aria-labelledby="menu-title">
      <h2 id="menu-title" data-reveal className="t-head text-ink">
        <span className="block lg:pl-[3vw]">Меню: от эспрессо</span>
        <span className="block">до сырников</span>
      </h2>

      <div className="mt-12 grid grid-cols-12 gap-x-[var(--gutter)] lg:mt-24">
        <figure
          data-reveal-picture
          className="col-span-7 col-start-6 row-start-2 mt-14 self-end lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:w-[22vw] lg:max-w-full"
        >
          <Image
            src="/images/latte-pour.jpg"
            width={1920}
            height={1277}
            alt="Молоко вливают в чашку эспрессо, на пенке получается рисунок"
            className="aspect-[4/5] w-full object-cover object-[55%_45%]"
          />
        </figure>

        <p className="t-small hidden text-muted lg:col-span-1 lg:col-start-6 lg:row-start-1 lg:block">цены</p>

        <div className="col-span-12 row-start-1 lg:col-span-6 lg:col-start-7">
          {MENU.map((group, index) => (
            <ul key={group[0].name} data-reveal-rows className={index ? "mt-11" : ""}>
              {group.map((row) => (
                <li key={row.name} className="grid grid-cols-[1fr_auto] gap-x-4 py-0.5 text-[16px] leading-[1.4] lg:grid-cols-[38%_1fr_auto]">
                  <span className="text-muted">{row.kind}</span>
                  <span className="nums text-right text-ink lg:col-start-3 lg:row-start-1">{formatPrice(row.price)}</span>
                  <span className="col-span-2 font-medium text-ink lg:col-span-1 lg:col-start-2 lg:row-start-1">{row.name}</span>
                </li>
              ))}
            </ul>
          ))}
          <p data-reveal className="mt-11 max-w-[40ch] text-[16px] text-muted">
            Овсяное молоко +40 ₽, своя кружка −20 ₽. Выпечку привозят утром из партнёрской пекарни, к вечеру её обычно не остаётся.
          </p>
        </div>
      </div>
    </section>
  );
}
