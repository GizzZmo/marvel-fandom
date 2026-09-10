import Link from "next/link";
import { CharacterCard } from "@/components/CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import { Timeline } from "@/components/Timeline";
import { getAllCharacters, getAllEvents } from "@/lib/markdown";

export default function HomePage() {
  const characters = getAllCharacters();
  const events = getAllEvents();
  const featured = characters.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-marvel-red">
          Earth-616 / MCU-hub
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none md:text-7xl">
          Et fandom-arkiv bygget på Markdown
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Legg til en ny helt eller et nytt event ved å opprette en{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">.md</code>-fil
          med YAML-frontmatter. Next.js genererer sidene statisk.
        </p>
        <div className="mt-8">
          <SearchBar characters={characters} events={events} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/characters"
            className="rounded-full bg-marvel-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Utforsk karakterer
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:border-zinc-500"
          >
            Se hendelser
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl">Utvalgte karakterer</h2>
          <Link href="/characters" className="text-sm text-zinc-400 hover:text-white">
            Alle karakterer →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-display text-3xl">Tidslinje</h2>
        <Timeline events={events} />
      </section>
    </div>
  );
}
