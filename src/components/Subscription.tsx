import Image from "next/image";
import { OrderLink } from "@/components/OrderLink";
import { PLANS, TERMS } from "@/lib/menu";

export function Subscription() {
  return (
    <section id="subscription" className="wrap scroll-mt-6 py-[clamp(72px,10vw,160px)]" aria-labelledby="subscription-title">
      <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
        <div className="col-span-12 lg:col-span-3">
          <h2 id="subscription-title" data-reveal className="t-title text-ink">
            Подписка на зерно
          </h2>
          <figure data-reveal-picture className="mt-8 w-[60%] lg:w-full">
            <Image
              src="/images/beans-roasted.jpg"
              width={1600}
              height={1200}
              alt="Обжаренные зёрна арабики крупным планом"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </div>

        <div className="col-span-12 mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-16">
          <div>
            <h3 data-reveal className="text-[24px] font-medium leading-tight text-ink">
              Варианты, ₽ в месяц
            </h3>
            <ul data-reveal-rows className="mt-6 grid gap-[22px]">
              {PLANS.map((plan) => (
                <li key={plan.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[17px] font-medium text-ink">{plan.name}</span>
                    <span className="nums text-[17px] font-medium text-ink">{plan.price.toLocaleString("ru-RU")}</span>
                  </div>
                  <p className="mt-1 max-w-[36ch] text-[16px] text-muted">{plan.text}</p>
                  <OrderLink item={plan.order} className="mt-2">
                    Оформить
                  </OrderLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 lg:mt-0">
            <h3 data-reveal className="text-[24px] font-medium leading-tight text-ink">
              Условия
            </h3>
            <ul data-reveal-rows className="mt-6 grid gap-[22px]">
              {TERMS.map((term) => (
                <li key={term.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[17px] font-medium text-ink">{term.name}</span>
                    <span className="nums text-[17px] font-medium text-ink">{term.value}</span>
                  </div>
                  <p className="mt-1 max-w-[36ch] text-[16px] text-muted">{term.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
