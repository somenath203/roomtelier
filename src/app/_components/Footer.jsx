import Link from "next/link";
import Logo from "./Logo";
import { DESIGN_ROUTE } from "../../landingpagedata";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              RoomTelier uses AI to turn a photo of your room into a new interior
              design concept.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3 text-sm md:items-end">
              <li>
                <a href="#features" className="text-muted-foreground transition-colors hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground transition-colors hover:text-primary">
                  Q&amp;A
                </a>
              </li>
              <li>
                <Link href={DESIGN_ROUTE} className="text-muted-foreground transition-colors hover:text-primary">
                  Start Designing
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t pt-6 text-sm text-muted-foreground">
          Made with 💖 by Somenath Choudhury
        </p>
      </div>
    </footer>
  );
}