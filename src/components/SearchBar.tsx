"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { CharacterMeta, EventMeta } from "@/lib/types";

interface SearchBarProps {
  characters: CharacterMeta[];
  events: EventMeta[];
}

export function SearchBar({ characters, events }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const characterIndex = useMemo(
    () =>
      new Fuse(characters, {
        keys: ["alias", "name", "universe", "teams", "alignment"],
        threshold: 0.35,
      }),
    [characters],
  );

  const eventIndex = useMemo(
    () =>
      new Fuse(events, {
        keys: ["title", "summary", "universe", "characters", "type"],
        threshold: 0.35,
      }),
    [events],
  );

  const characterHits = query.trim() ? characterIndex.search(query).slice(0, 5) : [];
  const eventHits = query.trim() ? eventIndex.search(query).slice(0, 4) : [];
  const open = query.trim().length > 0;

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Søk etter helter, skurker eller events…"
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none ring-marvel-red/40 placeholder:text-zinc-500 focus:border-marvel-red focus:ring-2"
      />
      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
          {characterHits.length === 0 && eventHits.length === 0 ? (
            <p className="px-4 py-3 text-sm text-zinc-500">Ingen treff.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto py-2">
              {characterHits.length > 0 && (
                <section>
                  <p className="px-4 pb-1 text-[11px] uppercase tracking-wider text-zinc-500">
                    Karakterer
                  </p>
                  {characterHits.map(({ item }) => (
                    <Link
                      key={item.slug}
                      href={`/characters/${item.slug}`}
                      className="flex items-center justify-between px-4 py-2 text-sm hover:bg-zinc-900"
                      onClick={() => setQuery("")}
                    >
                      <span>{item.alias}</span>
                      <span className="text-xs text-zinc-500">{item.name}</span>
                    </Link>
                  ))}
                </section>
              )}
              {eventHits.length > 0 && (
                <section className="mt-1 border-t border-zinc-800 pt-2">
                  <p className="px-4 pb-1 text-[11px] uppercase tracking-wider text-zinc-500">
                    Hendelser
                  </p>
                  {eventHits.map(({ item }) => (
                    <Link
                      key={item.slug}
                      href={`/events/${item.slug}`}
                      className="flex items-center justify-between px-4 py-2 text-sm hover:bg-zinc-900"
                      onClick={() => setQuery("")}
                    >
                      <span>{item.title}</span>
                      <span className="text-xs text-zinc-500">{item.year}</span>
                    </Link>
                  ))}
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
