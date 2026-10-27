import { ContactForm } from "@/components/ContactForm";
import { DrinkBuilder } from "@/components/DrinkBuilder";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Lots } from "@/components/Lots";
import { Menu } from "@/components/Menu";
import { Reveal } from "@/components/Reveal";
import { Space } from "@/components/Space";
import { Subscription } from "@/components/Subscription";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <Menu />
        <DrinkBuilder />
        <Lots />
        <Subscription />
        <Space />
        <Faq />
        <ContactForm />
      </Reveal>
    </>
  );
}
