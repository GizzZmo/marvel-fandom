import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PowerStatsBars } from "@/components/PowerStats";
import {
  getAllCharacterSlugs,
  getAllEvents,
  getCharacterBySlug,
} from "@/lib/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <div>
      <strong className="text-marvel-red">{label}:</strong> {value}
    </div>
  );
}

export function generateStaticParams() {
  return getAllCharacterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getCharacterBySlug(slug);
    return {
      title: meta.alias,
      description: `${meta.alias} (${meta.name}) — ${meta.universe}`,
    };
  } catch {
    return { title: "Karakter ikke funnet" };
  }
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params;

  let character;
  try {
    character = getCharacterBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = character;
  const relatedEvents = getAllEvents().filter((event) => {
    const haystack = event.characters.map((name) => name.toLowerCase());
    return (
      haystack.includes(meta.alias.toLowerCase()) ||
      haystack.includes(meta.name.toLowerCase())
    );
  });

  return (
    <article className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <aside className="comic-panel h-fit rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
        <img
          src={meta.avatar}
          alt={meta.alias}
          className="mb-4 aspect-square w-full rounded-lg object-cover"
        />
        <h1 className="font-display text-3xl">{meta.alias}</h1>
        <p className="mb-4 text-zinc-400">{meta.name}</p>
        <div className="space-y-2 text-sm">
          <Fact label="Univers" value={meta.universe} />
          <Fact label="Allianse" value={meta.alignment} />
          <Fact label="Art" value={meta.species} />
          <Fact label="Status" value={meta.status} />
          <Fact label="Base" value={meta.base} />
          <Fact label="Første opptreden" value={meta.firstAppearance} />
          <Fact
            label="Skapere"
            value={meta.creators && meta.creators.length > 0 ? meta.creators.join(", ") : undefined}
          />
          <Fact
            label="Også kjent som"
            value={meta.aliases && meta.aliases.length > 0 ? meta.aliases.join(", ") : undefined}
          />
          <Fact
            label="Lag"
            value={meta.teams.length > 0 ? meta.teams.join(", ") : "—"}
          />
        </div>
        <PowerStatsBars stats={meta.powerStats} />
        {relatedEvents.length > 0 && (
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Opptrådte i
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {relatedEvents.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="text-zinc-200 hover:text-marvel-red"
                  >
                    {event.title}
                  </Link>
                  <span className="text-zinc-500"> · {event.year}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
      <main className="md:col-span-2">
        <MarkdownContent content={content} />
      </main>
    </article>
  );
}
