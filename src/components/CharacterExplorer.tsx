"use client";

import { useMemo, useState } from "react";
import { CharacterCard } from "./CharacterCard";
import type { Alignment, CharacterMeta } from "@/lib/types";

interface CharacterExplorerProps {
  characters: CharacterMeta[];
  universes: string[];
  alignments: string[];
}

export function CharacterExplorer({
  characters,
  universes,
  alignments,
}: CharacterExplorerProps) {
  const [universe, setUniverse] = useState("Alle");
  const [alignment, setAlignment] = useState("Alle");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return characters.filter((character) => {
      const universeOk = universe === "Alle" || character.universe === universe;
      const alignmentOk = alignment === "Alle" || character.alignment === alignment;
      const queryOk =
        needle.length === 0 ||
        character.alias.toLowerCase().includes(needle) ||
        character.name.toLowerCase().includes(needle) ||
        character.teams.some((team) => team.toLowerCase().includes(needle));

      return universeOk && alignmentOk && queryOk;
    });
  }, [alignment, characters, query, universe]);

  return (
    <div>
      <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filtrer på navn, alias eller lag…"
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none focus:border-marvel-red"
        />
        <select
          value={universe}
          onChange={(event) => setUniverse(event.target.value)}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm"
        >
          <option>Alle</option>
          {universes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          value={alignment}
          onChange={(event) => setAlignment(event.target.value as Alignment | "Alle")}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm"
        >
          <option>Alle</option>
          {alignments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
          Ingen karakterer matcher filtrene.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}
