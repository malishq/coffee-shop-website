"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { Bean, DrinkCold, DrinkCup, DrinkFilter } from "@/components/drawings";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/menu";
import { goToOrder } from "@/lib/order-store";

type Base = "espresso" | "filter" | "cold";
type Milk = "none" | "dairy" | "oat";
type Syrup = "none" | "vanilla" | "caramel" | "honey" | "cinnamon";
type Size = "250" | "350" | "450";

const BASES: { id: Base; label: string; price: number }[] = [
  { id: "espresso", label: "Эспрессо", price: 200 },
  { id: "filter", label: "Фильтр", price: 250 },
  { id: "cold", label: "Колд брю", price: 300 },
];
const MILKS: { id: Milk; label: string; price: number }[] = [
  { id: "none", label: "Без молока", price: 0 },
  { id: "dairy", label: "Обычное", price: 60 },
  { id: "oat", label: "Овсяное", price: 100 },
];
const SYRUPS: { id: Syrup; label: string; price: number; suffix: string }[] = [
  { id: "none", label: "Без сиропа", price: 0, suffix: "" },
  { id: "vanilla", label: "Ваниль", price: 40, suffix: "с ванилью" },
  { id: "caramel", label: "Карамель", price: 40, suffix: "с карамелью" },
  { id: "honey", label: "Мёд", price: 40, suffix: "с мёдом" },
  { id: "cinnamon", label: "Корица", price: 20, suffix: "с корицей" },
];
const SIZES: { id: Size; label: string; price: number }[] = [
  { id: "250", label: "250 мл", price: 0 },
  { id: "350", label: "350 мл", price: 50 },
  { id: "450", label: "450 мл", price: 100 },
];

function describe(base: Base, milk: Milk, syrup: Syrup, size: Size) {
  const ml = Number(size);
  let name = "";
  if (base === "espresso") {
    if (milk === "none") name = "Американо";
    else name = `${milk === "oat" ? "Овсяный " : ""}${size === "250" ? "капучино" : "латте"}`;
  } else {
    name = base === "filter" ? "Фильтр" : "Колд брю";
    if (milk === "dairy") name += " с молоком";
    if (milk === "oat") name += " с овсяным молоком";
  }
  const suffix = SYRUPS.find((s) => s.id === syrup)?.suffix ?? "";
  if (suffix) name += (name.includes(" с ") ? " и " : " ") + (name.includes(" с ") ? suffix.replace("с ", "") : suffix);
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const caffeine = base === "espresso" ? (size === "450" ? 195 : 130) : base === "filter" ? Math.round(ml * 0.6) : Math.round(ml * 0.7);
  const density = (caffeine / ml) * 100;
  const strength = density >= 68 ? 5 : density >= 55 ? 4 : density >= 40 ? 3 : density >= 25 ? 2 : 1;
  const price =
    (BASES.find((b) => b.id === base)?.price ?? 0) +
    (MILKS.find((m) => m.id === milk)?.price ?? 0) +
    (SYRUPS.find((s) => s.id === syrup)?.price ?? 0) +
    (SIZES.find((s) => s.id === size)?.price ?? 0);
  return { name: `${name}, ${size} мл`, caffeine, strength, price };
}

function Row<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{legend}</legend>
      <div className="t-names flex flex-wrap gap-x-[0.7em] gap-y-0">
        {options.map((option) => (
          <label key={option.id} className="opt relative">
            <input type="radio" name={name} value={option.id} checked={value === option.id} onChange={() => onChange(option.id)} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function DrinkBuilder() {
  const [base, setBase] = useState<Base>("espresso");
  const [milk, setMilk] = useState<Milk>("dairy");
  const [syrup, setSyrup] = useState<Syrup>("none");
  const [size, setSize] = useState<Size>("350");
  const lenis = useLenis();
  const drink = describe(base, milk, syrup, size);
  const disc = milk === "none" ? "var(--coffee)" : milk === "dairy" ? "var(--crema)" : "var(--oat)";

  function order() {
    goToOrder(lenis, `${drink.name}, ${formatPrice(drink.price)}`);
  }

  return (
    <section id="builder" className="wrap relative scroll-mt-6 py-[clamp(72px,10vw,160px)] lg:min-h-[100svh]" aria-labelledby="builder-title">
      <div className="lg:grid lg:min-h-[calc(100svh-2*clamp(72px,10vw,160px))] lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="relative mx-auto w-[86vw] max-w-[520px] lg:absolute lg:left-[58%] lg:top-1/2 lg:mx-0 lg:w-[min(60vh,36vw)] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div
            className="aspect-square w-full rounded-full transition-[background-color] duration-300 ease-out"
            style={{ backgroundColor: disc, ["--disc" as string]: disc }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-[16%] bottom-[6%] top-[-6%]" style={{ ["--disc" as string]: disc }}>
            <DrinkCup milk={milk} size={size} className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${base === "espresso" ? "opacity-100" : "opacity-0"}`} />
            <DrinkFilter milk={milk} size={size} className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${base === "filter" ? "opacity-100" : "opacity-0"}`} />
            <DrinkCold milk={milk} size={size} className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${base === "cold" ? "opacity-100" : "opacity-0"}`} />
          </div>
        </div>

        <form className="mt-10 grid gap-5 lg:col-span-5 lg:col-start-1 lg:mt-0 lg:self-end" onSubmit={(event) => event.preventDefault()}>
          <h2 id="builder-title" className="t-names text-muted">
            Соберите напиток
          </h2>
          <Row legend="Основа" name="base" options={BASES} value={base} onChange={setBase} />
          <Row legend="Молоко" name="milk" options={MILKS} value={milk} onChange={setMilk} />
          <Row legend="Сироп или добавка" name="syrup" options={SYRUPS} value={syrup} onChange={setSyrup} />
          <Row legend="Объём" name="size" options={SIZES} value={size} onChange={setSize} />
          <noscript>
            <p className="text-muted">Цена и крепость считаются в браузере с включённым JavaScript. Базовые цены есть в меню выше.</p>
          </noscript>
        </form>

        <div
          className="mt-10 lg:absolute lg:right-[var(--margin)] lg:top-1/2 lg:mt-0 lg:w-[clamp(170px,16vw,250px)] lg:-translate-y-1/2"
          role="status"
          aria-live="polite"
        >
          <p className="t-lead text-ink">{drink.name}</p>
          <p className="t-title nums mt-2 text-ink">{formatPrice(drink.price)}</p>
          <p className="mt-3 flex items-center gap-2 text-[17px] text-muted">
            <span className="flex gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <Bean key={n} className="h-5 w-5" fill={n <= drink.strength ? "var(--accent)" : "var(--surface-2)"} />
              ))}
            </span>
            <span>
              крепость {drink.strength} из 5, ≈{drink.caffeine} мг кофеина
            </span>
          </p>
          <Button type="button" onClick={order} className="mt-6">
            Заказать с собой
          </Button>
        </div>
      </div>
    </section>
  );
}
