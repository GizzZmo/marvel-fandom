import type { CharacterMeta, EventMeta } from "./types";
import { getAllCharacters, getAllEvents } from "./markdown";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function characterMatchesName(character: CharacterMeta, name: string): boolean {
  const needle = normalize(name);
  const aliases = character.aliases ?? [];

  return (
    normalize(character.alias) === needle ||
    normalize(character.name) === needle ||
    normalize(character.slug) === needle ||
    normalize(character.slug.replace(/-/g, " ")) === needle ||
    aliases.some((alias) => normalize(alias) === needle)
  );
}

export function getCharacterByName(nameOrAlias: string): CharacterMeta | undefined {
  return getAllCharacters().find((character) =>
    characterMatchesName(character, nameOrAlias),
  );
}

export function getEventsForCharacter(nameOrAlias: string): EventMeta[] {
  const subject = getCharacterByName(nameOrAlias);

  return getAllEvents()
    .filter((event) =>
      event.characters.some((listed) => {
        if (normalize(listed) === normalize(nameOrAlias)) {
          return true;
        }
        return subject ? characterMatchesName(subject, listed) : false;
      }),
    )
    .sort((a, b) => a.year.localeCompare(b.year));
}

export function resolveEventCharacters(event: EventMeta): Array<{
  name: string;
  slug?: string;
  alias?: string;
}> {
  const roster = getAllCharacters();

  return event.characters.map((name) => {
    const match = roster.find((character) => characterMatchesName(character, name));
    return match
      ? { name, slug: match.slug, alias: match.alias }
      : { name };
  });
}
