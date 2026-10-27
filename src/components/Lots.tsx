import Image from "next/image";
import { RoastProfile } from "@/components/drawings";
import { LOTS, formatPrice } from "@/lib/menu";
import { SITE } from "@/lib/site";

const STRIPS = ["bg-accent text-accent-ink", "bg-paper text-paper-ink", "bg-surface-2 text-ink", "bg-[var(--coffee)] text-ink"];

export function Lots() {
  return (
    <section id="beans" className="wrap scroll-mt-6 pt-[clamp(72px,10vw,160px)]" aria-labelledby="beans-title">
      <div className="grid grid-cols-12 items-end gap-x-[var(--gutter)]">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="beans-title" data-reveal className="t-title text-ink">
            Лоты недели
          </h2>
          <p data-reveal className="t-lead mt-5 max-w-[46ch] text-ink">
            Обжариваем по понедельникам на пятикилограммовом ростере, и на каждой пачке стоит дата. Четыре лота на полке, пятый, Гватемала, в
            ротации. 250 г с собой или в фильтр у стойки.
          </p>
        </div>
        <figure data-reveal-picture className="col-span-8 col-start-5 mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <Image
            src="/images/cherries-tarrazu.jpg"
            width={1600}
            height={1200}
            alt="Ягоды кофе и пергаментное зерно сушатся на солнце на столах"
            className="aspect-[16/10] w-full object-cover object-[20%_65%]"
          />
          <figcaption className="t-small mt-2 text-muted">Сушка кофе на патио, Тарразу, Коста-Рика</figcaption>
        </figure>
      </div>

      <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-2 lg:mt-12 lg:grid-cols-4 lg:gap-3">
        {LOTS.map((lot, index) => (
          <li key={lot.country} className="flex flex-col">
            <div className="relative aspect-[4/5] bg-surface">
              <RoastProfile curve={lot.curve} roast={lot.roast} className="absolute left-[8%] top-[8%] h-[46%] w-[84%]" />
              <p className="absolute inset-x-[8%] bottom-[7%]">
                <span className="t-title block text-ink">{lot.country}</span>
                <span className="block text-[16px] text-muted">{lot.region}</span>
              </p>
            </div>
            <div className={`${STRIPS[index % STRIPS.length]} t-small nums px-3 py-3`}>
              <p className="grid grid-cols-2 gap-x-2 lg:flex lg:justify-between">
                <span>{lot.process}</span>
                <span className="text-right lg:text-left">{lot.altitude}</span>
                <span>{lot.roast}</span>
                <span className="text-right lg:text-left">250 г</span>
              </p>
              <p className="mt-1 flex justify-between gap-2">
                <span>обжарка {SITE.roastDate}</span>
                <span className="whitespace-nowrap font-medium">{formatPrice(lot.price)}</span>
              </p>
              <p className="mt-1">{lot.notes}</p>
            </div>
          </li>
        ))}
      </ul>

      <figure className="relative -mx-[var(--margin)] mt-16 h-[100svh] min-h-[520px] overflow-hidden lg:mt-24">
        <Image
          data-parallax="5"
          src="/images/beans-dark.jpg"
          width={1920}
          height={1280}
          alt="Россыпь обжаренных зёрен на тёмной поверхности, крупный план"
          className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover"
        />
        <figcaption className="t-head absolute bottom-10 left-[var(--margin)] max-w-[14ch] text-ink lg:bottom-14">Понедельник — день обжарки</figcaption>
      </figure>
    </section>
  );
}
