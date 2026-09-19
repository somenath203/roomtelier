import Link from "next/link";
import { Armchair } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Armchair className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-xl font-semibold tracking-tight">
        Room<span className="text-primary">Telier</span>
      </span>
    </Link>
  );
}