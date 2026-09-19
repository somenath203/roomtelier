import Link from "next/link";
import { ChevronRight, ImagePlus, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BeforeAfterSlider from "./BeforeAfterSection";
import Reveal from "./Reveal";
import { DESIGN_ROUTE, SHOWCASE_IMAGES } from "../../landingpagedata";

const FLOW = [
  { icon: ImagePlus, label: "Upload a photo" },
  { icon: Palette, label: "Pick a style" },
  { icon: Sparkles, label: "Get your redesign" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Text is not animated so the headline is visible immediately */}
        <div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Transform Your Room{" "}
            <span className="text-primary">With the Power of AI</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Upload a photo of your room, choose your preferred style, and let AI
            reimagine your space in seconds.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-primary px-8 transition-all duration-300 hover:-translate-y-0.5">
              <Link href={DESIGN_ROUTE}>Start Designing</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 transition-all duration-300 hover:-translate-y-0.5">
              <a href="#features">Explore Features</a>
            </Button>
          </div>

          <ol
            aria-label="How it works in three steps"
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm text-muted-foreground"
          >
            {FLOW.map((item, index) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {item.label}
                </span>
                {index < FLOW.length - 1 && (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={150}>
          <div className="relative pb-3 pr-3 sm:pb-4 sm:pr-4">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-3 right-0 top-3 rounded-2xl bg-primary/10 sm:left-4 sm:top-4"
            />
            <BeforeAfterSlider
              className="relative"
              room="living"
              beforeSrc={SHOWCASE_IMAGES.hero.before}
              afterSrc={SHOWCASE_IMAGES.hero.after}
              caption="Living room, Japandi style"
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}