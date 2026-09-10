import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAllEventSlugs, getEventBySlug } from "@/lib/markdown";

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
          {meta.characters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.characters.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                >
                  {name}
                </span>
              ))}
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
