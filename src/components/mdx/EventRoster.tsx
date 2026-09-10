import Link from "next/link";
import { resolveEventCharacters } from "@/lib/relations";
import { getEventBySlug } from "@/lib/markdown";

export function EventRoster({ slug }: { slug: string }) {
  let event;
  try {
    event = getEventBySlug(slug);
  } catch {
    return null;
  }

  const people = resolveEventCharacters(event.meta);

  return (
    <div className="not-prose my-6 flex flex-wrap gap-2">
      {people.map((person) =>
        person.slug ? (
          <Link
            key={person.name}
            href={`/characters/${person.slug}`}
            className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-200 hover:border-marvel-red"
          >
            {person.alias ?? person.name}
          </Link>
        ) : (
          <span
            key={person.name}
            className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500"
          >
            {person.name}
          </span>
        ),
      )}
    </div>
  );
}
