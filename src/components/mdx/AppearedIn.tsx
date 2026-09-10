import Link from "next/link";
import { getEventsForCharacter } from "@/lib/relations";

export function AppearedIn({
  character,
  title = "Opptrådte i",
}: {
  character: string;
  title?: string;
}) {
  const events = getEventsForCharacter(character);

  if (events.length === 0) {
    return (
      <aside className="not-prose my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-500">
        Ingen events i arkivet lister <strong className="text-zinc-300">{character}</strong> i
        frontmatter-feltet <code>characters</code> ennå.
      </aside>
    );
  }

  return (
    <aside className="not-prose my-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-marvel-red">{title}</p>
      <p className="mt-1 text-xs text-zinc-500">
        Generert fra <code>characters</code>-listen i event-filene.
      </p>
      <ul className="mt-4 divide-y divide-zinc-800">
        {events.map((event) => (
          <li key={event.slug} className="flex items-baseline justify-between gap-4 py-2">
            <Link href={`/events/${event.slug}`} className="font-medium text-zinc-100 hover:text-marvel-red">
              {event.title}
            </Link>
            <span className="shrink-0 text-xs text-zinc-500">
              {event.year} · {event.type}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
