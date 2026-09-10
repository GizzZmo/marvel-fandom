import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Character, CharacterMeta, Event, EventMeta } from "./types";

const charactersDir = path.join(process.cwd(), "content/characters");
const eventsDir = path.join(process.cwd(), "content/events");

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const names = fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"));

  const preferred = new Map<string, string>();
  for (const fileName of names) {
    const slug = fileName.replace(/\.mdx?$/, "");
    if (fileName.endsWith(".mdx") || !preferred.has(slug)) {
      preferred.set(slug, fileName);
    }
  }

  return Array.from(preferred.values());
}

export function getAllCharacters(): CharacterMeta[] {
  return readMarkdownFiles(charactersDir)
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(charactersDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        teams: [],
        creators: [],
        aliases: [],
        ...(data as Omit<CharacterMeta, "slug">),
      };
    })
    .sort((a, b) => a.alias.localeCompare(b.alias, "nb"));
}

export function getCharacterBySlug(slug: string): Character {
  const mdPath = path.join(charactersDir, `${slug}.md`);
  const mdxPath = path.join(charactersDir, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      teams: [],
      creators: [],
      aliases: [],
      ...(data as Omit<CharacterMeta, "slug">),
    },
    content,
  };
}

export function getAllCharacterSlugs(): string[] {
  return readMarkdownFiles(charactersDir).map((fileName) =>
    fileName.replace(/\.mdx?$/, ""),
  );
}

export function getAllEvents(): EventMeta[] {
  return readMarkdownFiles(eventsDir)
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(eventsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        characters: [],
        creators: [],
        ...(data as Omit<EventMeta, "slug">),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "nb"));
}

export function getEventBySlug(slug: string): Event {
  const mdPath = path.join(eventsDir, `${slug}.md`);
  const mdxPath = path.join(eventsDir, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      characters: [],
      creators: [],
      ...(data as Omit<EventMeta, "slug">),
    },
    content,
  };
}

export function getAllEventSlugs(): string[] {
  return readMarkdownFiles(eventsDir).map((fileName) =>
    fileName.replace(/\.mdx?$/, ""),
  );
}

export function getUniqueUniverses(characters: CharacterMeta[]): string[] {
  return Array.from(new Set(characters.map((character) => character.universe))).sort();
}

export function getUniqueAlignments(characters: CharacterMeta[]): string[] {
  return Array.from(new Set(characters.map((character) => character.alignment))).sort();
}
