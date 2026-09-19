import { Coins, FolderOpen, Palette, PenLine, Sparkles, Zap } from "lucide-react";
import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Room Redesign",
    description:
      "Turn an existing room photo into a new interior design concept with AI.",
  },
  {
    icon: Palette,
    title: "Multiple Interior Styles",
    description:
      "Try different interior styles on the same room and find what works for your space.",
  },
  {
    icon: PenLine,
    title: "Personalized Requirements",
    description:
      "Add your own requirements so the design matches your taste and needs.",
  },
  {
    icon: Zap,
    title: "Fast AI Generation",
    description:
      "Get a redesigned room without building 3D models or drawing layouts by hand.",
  },
  {
    icon: FolderOpen,
    title: "Save Your Designs",
    description:
      "Find every design you've generated in your dashboard, ready to revisit.",
  },
  {
    icon: Coins,
    title: "Simple Credit System",
    description:
      "Use credits to generate designs, and buy more whenever you need them.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Everything You Need to Reimagine Your Space
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your first upload to your saved designs, the whole redesign
            process lives in one place.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <li key={feature.title} className="flex">
              <Reveal delay={(index % 3) * 100} className="flex w-full">
                <article className="group w-full rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold transition-colors group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}