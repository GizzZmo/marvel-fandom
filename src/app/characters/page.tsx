import type { Metadata } from "next";
import { CharacterExplorer } from "@/components/CharacterExplorer";
import {
  getAllCharacters,
  getUniqueAlignments,
  getUniqueUniverses,
} from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Karakterer",
};

export default function CharactersPage() {
  const characters = getAllCharacters();

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-marvel-red">
          Roster
        </p>
        <h1 className="mt-2 font-display text-5xl">Karakterer</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Filtrer på univers og allianse. Nye profiler dukker opp automatisk når du
          legger en Markdown-fil i <code>content/characters</code>.
        </p>
      </header>
      <CharacterExplorer
        characters={characters}
        universes={getUniqueUniverses(characters)}
        alignments={getUniqueAlignments(characters)}
      />
    </div>
  );
}
