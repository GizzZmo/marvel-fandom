import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { PowerStatsBars } from "@/components/PowerStats";
import { getAllCharacterSlugs, getCharacterBySlug } from "@/lib/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
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
          <div>
            <strong className="text-marvel-red">Univers:</strong> {meta.universe}
          </div>
          <div>
            <strong className="text-marvel-red">Allianse:</strong> {meta.alignment}
          </div>
          {meta.firstAppearance && (
            <div>
              <strong className="text-marvel-red">Første opptreden:</strong>{" "}
              {meta.firstAppearance}
            </div>
          )}
          <div>
            <strong className="text-marvel-red">Lag:</strong>{" "}
            {meta.teams.length > 0 ? meta.teams.join(", ") : "—"}
          </div>
        </div>
        <PowerStatsBars stats={meta.powerStats} />
      </aside>
      <main className="md:col-span-2">
        <MarkdownContent content={content} />
      </main>
    </article>
  );
}
