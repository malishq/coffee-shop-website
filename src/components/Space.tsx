import { Clip } from "@/components/Clip";
import { FloorPlan } from "@/components/drawings";
import { asset } from "@/lib/asset";

const FACTS = [
  { label: "Посадка", value: "24 места" },
  { label: "Каппинг", value: "суббота, 12:00, 6 мест" },
  { label: "Обжарка", value: "понедельник, с утра" },
  { label: "Ростер", value: "5 кг, в зале за стеклом" },
];

export function Space() {
  return (
    <section id="space" className="wrap scroll-mt-6 py-[clamp(72px,10vw,160px)]" aria-labelledby="space-title">
      <h2 id="space-title" data-reveal className="t-head text-ink">
        Зал, ростер и каппинги
      </h2>
      <div className="mt-6 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-4">
        <p data-reveal className="t-lead col-span-12 text-ink lg:col-span-6">
          Ростер стоит в зале за стеклом: по понедельникам его видно и слышно, а со вторника он уже в чашке.
        </p>
        <p data-reveal className="col-span-12 max-w-[46ch] text-[17px] text-muted lg:col-span-5 lg:col-start-8">
          24 места, длинный стол у окна, розетки вдоль стены. По субботам в 12:00 каппинг: четыре лота недели вслепую, шесть мест по записи, 600 ₽,
          которые засчитываются при покупке зерна.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-4 lg:mt-[72px]">
        <figure data-reveal-picture className="relative col-span-12 lg:col-span-8">
          <Clip src={asset("/images/roaster-cooling.webm")} poster={asset("/images/roaster-cooling-poster.jpg")} className="aspect-[4/3] w-full object-cover lg:aspect-[16/10]" />
          <figcaption className="bg-paper p-5 text-[16px] leading-[1.45] text-paper-ink lg:absolute lg:right-0 lg:top-0 lg:w-[320px]">
            Так остывает зерно после обжарки: барабан высыпает его на сито, а лопасти гонят воздух. У нас это слышно каждый понедельник.
          </figcaption>
        </figure>
        <div className="col-span-12 lg:col-span-4">
          <div data-reveal className="aspect-[3/2] bg-paper p-4 lg:aspect-[4/3]">
            <FloorPlan className="h-full w-full" />
          </div>
          <dl data-reveal-group className="t-small mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted">{fact.label}</dt>
                <dd className="text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
