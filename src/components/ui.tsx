import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[16px] font-medium transition-[background-color,color,transform] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97]";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  ghost: "bg-surface-2 text-ink hover:bg-accent hover:text-accent-ink",
  paper: "bg-paper-ink text-paper hover:bg-accent hover:text-accent-ink",
};

type Variant = keyof typeof variants;

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`wrap scroll-mt-6 py-[clamp(72px,10vw,160px)] ${className}`}>
      {children}
    </section>
  );
}
