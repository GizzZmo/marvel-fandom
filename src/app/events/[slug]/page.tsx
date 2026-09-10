import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAllCharacters, getAllEventSlugs, getEventBySlug } from "@/lib/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getEventBySlug(slug);
    return {
      title: meta.title,
      description: meta.summary,
    };
  } catch {
    return { title: "Hendelse ikke funnet" };
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;

  let event;
  try {
    event = getEventBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = event;
  const roster = getAllCharacters();
  const linkedCharacters = meta.characters.map((name) => {
    const match = roster.find(
      (character) =>
        character.alias.toLowerCase() === name.toLowerCase() ||
        character.name.toLowerCase() === name.toLowerCase(),
    );
    return { name, slug: match?.slug };
  });

  return (
    <article className="space-y-8">
      <header className="overflow-hidden rounded-3xl border border-zinc-800">
        <img src={meta.cover} alt={meta.title} className="h-64 w-full object-cover" />
        <div className="bg-zinc-900 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-marvel-gold">
            {meta.type} · {meta.year} · {meta.universe}
          </p>
          <h1 className="mt-2 font-display text-5xl">{meta.title}</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">{meta.summary}</p>
          <div className="mt-4 space-y-1 text-sm text-zinc-400">
            {meta.creators && meta.creators.length > 0 && (
              <p>
                <span className="text-marvel-gold">Skapere:</span> {meta.creators.join(", ")}
              </p>
            )}
            {meta.issues && (
              <p>
                <span className="text-marvel-gold">Omfang:</span> {meta.issues}
              </p>
            )}
          </div>
          {linkedCharacters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {linkedCharacters.map((character) =>
                character.slug ? (
                  <Link
                    key={character.name}
                    href={`/characters/${character.slug}`}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300 hover:border-marvel-red hover:text-white"
                  >
                    {character.name}
                  </Link>
                ) : (
                  <span
                    key={character.name}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                  >
                    {character.name}
                  </span>
                ),
              )}
            </div>
          )}
          <Link
            href="/events"
            className="mt-6 inline-block text-sm text-zinc-400 hover:text-white"
          >
            ← Tilbake til hendelser
          </Link>
        </div>
      </header>
      <MarkdownContent content={content} />
    </article>
  );
}
