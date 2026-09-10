import Link from "next/link";
import type { EventMeta } from "@/lib/types";

export function EventCard({ event }: { event: EventMeta }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="comic-panel group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 transition hover:-translate-y-1 hover:border-marvel-gold/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-800">
        <img
          src={event.cover}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-marvel-gold">
          {event.year}
        </span>
      </div>
      <div className="p-4">
        <h2 className="font-display text-xl font-bold">{event.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{event.summary}</p>
      </div>
    </Link>
  );
}
