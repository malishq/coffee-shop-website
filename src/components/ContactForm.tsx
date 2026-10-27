"use client";

import { useState, type FormEvent } from "react";
import { useOrder } from "@/lib/order-store";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`order-${name}`} className="coupon-field block bg-paper-2 px-4 py-2.5">
        <span className="t-small block text-paper-muted">{label}</span>
        {children}
      </label>
      {error && (
        <p className="t-small mt-1 font-medium text-paper-ink" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const order = useOrder();
  const [item, setItem] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState({ item: "", time: "" });
  const [seen, setSeen] = useState(0);

  if (order.stamp !== seen) {
    setSeen(order.stamp);
    setItem(order.item);
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Как к вам обращаться?";
    if (!/^\+?[\d\s()-]{10,18}$/.test(data.phone ?? "")) next.phone = "Введите номер телефона";
    if (!data.item?.trim()) next.item = "Что приготовить или отложить?";
    if (!data.time) next.time = "К какому времени?";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
      setDone({ item: data.item, time: data.time });
      setStatus("sent");
      setItem("");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="order" className="wrap scroll-mt-6 py-[clamp(72px,10vw,160px)]" aria-labelledby="order-title">
      <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
        <div data-reveal className="col-span-12 flex flex-col bg-paper text-paper-ink lg:col-span-10 lg:col-start-2 lg:flex-row">
          <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:w-[46%] lg:p-12">
            <h2 id="order-title" className="t-title text-paper-ink">
              Закажите с собой
              <br />к нужному времени
            </h2>
            <div className="text-[16px] leading-[1.5]">
              <p>Приготовим к указанному времени и напишем, когда напиток будет на стойке. Зерно и подписку тоже можно оформить здесь.</p>
              <p className="mt-4">
                {SITE.address}
                <br />
                {SITE.hours.map((h) => `${h.days} ${h.time}`).join(", ")}
                <br />
                <a href={SITE.phoneHref} className="link font-medium">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="relative mx-6 border-t-[5px] border-dotted border-ground sm:mx-8 lg:mx-0 lg:my-12 lg:w-0 lg:border-l-[5px] lg:border-t-0" aria-hidden="true">
            <span className="absolute -left-[22px] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-ground sm:-left-[30px] lg:-top-[26px] lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0" />
            <span className="absolute -right-[22px] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-ground sm:-right-[30px] lg:-bottom-[26px] lg:left-1/2 lg:top-auto lg:-translate-x-1/2 lg:translate-y-0" />
          </div>

          <div className="flex-1 p-6 sm:p-8 lg:p-12">
            {status === "sent" ? (
              <div role="status" className="flex h-full flex-col justify-center">
                <p className="t-title">Заказ принят</p>
                <p className="mt-4 text-[17px]">
                  {done.item}. Будет готов к {done.time}. Если что-то нужно уточнить, перезвоним.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="link-on mt-6 w-fit text-[16px] font-medium text-paper-ink">
                  Ещё один заказ
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-2.5">
                <Field label="Имя" name="name" error={errors.name}>
                  <input id="order-name" name="name" autoComplete="name" className="h-7 text-[16px]" />
                </Field>
                <Field label="Телефон" name="phone" error={errors.phone}>
                  <input id="order-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7" className="h-7 text-[16px]" />
                </Field>
                <Field label="Напиток или зерно" name="item" error={errors.item}>
                  <input
                    id="order-item"
                    name="item"
                    value={item}
                    onChange={(event) => setItem(event.target.value)}
                    placeholder="Например: латте на овсяном, 350 мл"
                    className="h-7 text-[16px]"
                  />
                </Field>
                <Field label="К какому времени" name="time" error={errors.time}>
                  <input id="order-time" name="time" type="time" min="07:30" max="22:00" step={300} className="h-7 text-[16px]" />
                </Field>
                <Field label="Комментарий" name="comment">
                  <textarea id="order-comment" name="comment" rows={2} className="resize-none text-[16px]" />
                </Field>
                {status === "error" && (
                  <p className="text-[16px] font-medium" role="alert">
                    Не удалось отправить. Позвоните нам или попробуйте ещё раз.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 h-14 w-full bg-accent text-[17px] font-medium text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-strong active:scale-[0.99] disabled:opacity-60"
                >
                  {status === "sending" ? "Отправляем…" : "Отправить заказ"}
                </button>
                <p className="t-small text-paper-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
