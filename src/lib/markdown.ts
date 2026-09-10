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

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"));
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
        ...(data as Omit<CharacterMeta, "slug">),
      };
    })
    .sort((a, b) => a.alias.localeCompare(b.alias, "nb"));
}

export function getCharacterBySlug(slug: string): Character {
  const mdPath = path.join(charactersDir, `${slug}.md`);
  const mdxPath = path.join(charactersDir, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdPath) ? mdPath : mdxPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      teams: [],
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
        ...(data as Omit<EventMeta, "slug">),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "nb"));
}

export function getEventBySlug(slug: string): Event {
  const mdPath = path.join(eventsDir, `${slug}.md`);
  const mdxPath = path.join(eventsDir, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdPath) ? mdPath : mdxPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      characters: [],
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
