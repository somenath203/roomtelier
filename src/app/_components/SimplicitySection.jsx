import { Check } from "lucide-react";
import Reveal from "./Reveal";

const POINTS = [
  "No complicated design software",
  "No design expertise required",
  "Just upload, choose, and generate",
];

export default function SimplicitySection() {
  return (
    <section className="border-y bg-muted/40">
      <Reveal className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          From a simple room photo to a completely new vision.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          You don&apos;t need to be an interior designer. Share a photo, pick a
          style, and RoomTelier does the designing.
        </p>

        <ul className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}