import Link from "next/link";
import type { CharacterMeta } from "@/lib/types";

const alignmentTone: Record<string, string> = {
  Hero: "bg-emerald-500/15 text-emerald-300",
  Villain: "bg-red-500/15 text-red-300",
  "Anti-Hero": "bg-amber-500/15 text-amber-300",
};

export function CharacterCard({ character }: { character: CharacterMeta }) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="comic-panel group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 transition hover:-translate-y-1 hover:border-marvel-red/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <img
          src={character.avatar}
          alt={character.alias}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${alignmentTone[character.alignment] ?? "bg-zinc-800 text-zinc-300"}`}
        >
          {character.alignment}
        </span>
      </div>
      <div className="p-4">
        <h2 className="font-display text-xl font-bold">{character.alias}</h2>
        <p className="text-sm text-zinc-400">{character.name}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-zinc-500">
          {character.universe}
        </p>
      </div>
    </Link>
  );
}
