import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "./Reveal";
import { FAQS } from "../../landingpagedata";

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Everything you might want to know before you upload your first room.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="mb-3 rounded-xl border bg-card px-5 shadow-sm transition-colors last:mb-0 last:border-b data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:text-primary hover:no-underline data-[state=open]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}