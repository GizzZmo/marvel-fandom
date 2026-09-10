import Link from "next/link";
import { getEventsForCharacter } from "@/lib/relations";

export function ComicTimeline({ character }: { character: string }) {
  const events = getEventsForCharacter(character);

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="not-prose my-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-marvel-gold">
        Comic timeline
      </p>
      <ol className="relative space-y-5 border-l border-zinc-800 pl-6">
        {events.map((event) => (
          <li key={event.slug} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-marvel-red shadow-[0_0_12px_rgba(230,36,41,0.8)]" />
            <p className="text-[11px] font-semibold uppercase tracking-widest text-marvel-gold">
              {event.year}
            </p>
            <Link
              href={`/events/${event.slug}`}
              className="font-display text-xl hover:text-marvel-red"
            >
              {event.title}
            </Link>
            <p className="mt-1 text-sm text-zinc-400">{event.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
