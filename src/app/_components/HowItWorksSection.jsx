import Reveal from "./Reveal";
import { STEPS } from "../../landingpagedata";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps from your room photo to a new design.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mx-auto mt-14 grid max-w-md gap-10 lg:max-w-none lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-6">
                {/* Connector: vertical on mobile/tablet, horizontal on desktop */}
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-10 left-6 top-14 w-px -translate-x-1/2 bg-border lg:-right-8 lg:bottom-auto lg:left-14 lg:top-6 lg:h-px lg:w-auto lg:translate-x-0"
                  />
                )}

                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground shadow-md">
                  {index + 1}
                </span>

                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}