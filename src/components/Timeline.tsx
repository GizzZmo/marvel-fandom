import Link from "next/link";
import type { EventMeta } from "@/lib/types";

export function Timeline({ events }: { events: EventMeta[] }) {
  const chronological = [...events].sort((a, b) => a.year.localeCompare(b.year));

  return (
    <ol className="relative space-y-6 border-l border-zinc-800 pl-6">
      {chronological.map((event) => (
        <li key={event.slug} className="relative">
          <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-marvel-red shadow-[0_0_12px_rgba(230,36,41,0.8)]" />
          <p className="text-xs font-semibold uppercase tracking-widest text-marvel-gold">
            {event.year}
          </p>
          <Link
            href={`/events/${event.slug}`}
            className="mt-1 inline-block font-display text-lg font-bold hover:text-marvel-red"
          >
            {event.title}
          </Link>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">{event.summary}</p>
        </li>
      ))}
    </ol>
  );
}
