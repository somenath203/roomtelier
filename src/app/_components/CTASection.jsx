import Link from "next/link";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";
import { DESIGN_ROUTE } from "../../landingpagedata";

export default function CTASection() {
  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
      <Reveal className="mx-auto max-w-5xl rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground shadow-xl sm:px-12 md:py-20">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Reimagine Your Space?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85">
          Upload your room, choose a style, and let AI bring your next interior
          design idea to life.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 bg-background px-8 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/90"
        >
          <Link href={DESIGN_ROUTE}>Start Designing</Link>
        </Button>

        <p className="mt-4 text-sm text-primary-foreground/75">
          Each design uses one credit.
        </p>
      </Reveal>
    </section>
  );
}