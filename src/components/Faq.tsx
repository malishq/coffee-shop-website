import { FAQ } from "@/lib/menu";

export function Faq() {
  return (
    <section id="faq" className="wrap scroll-mt-6 py-[clamp(72px,10vw,160px)]" aria-labelledby="faq-title">
      <h2 id="faq-title" data-reveal className="t-head text-ink">
        Вопросы и ответы
      </h2>
      <div className="mt-12 grid grid-cols-12 gap-x-[var(--gutter)] lg:mt-20">
        <div data-reveal-group className="col-span-12 grid gap-4 lg:col-span-8 lg:col-start-5 lg:gap-5">
          {FAQ.map((item) => (
            <details key={item.q} className="faq -mx-[var(--margin)] px-[var(--margin)] py-3 open:bg-surface lg:-mx-6 lg:px-6 lg:py-4">
              <summary className="t-question flex cursor-pointer items-start justify-between gap-6 text-ink">
                <span>{item.q}</span>
                <svg className="chev mt-1 h-5 w-5 shrink-0 transition-transform duration-300" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 7l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="answer mt-4 max-w-[48ch] text-[17px] text-ink">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
