export type Alignment = "Hero" | "Villain" | "Anti-Hero";

export interface PowerStats {
  strength: number;
  speed: number;
  intelligence: number;
  durability?: number;
  energy?: number;
}

export interface CharacterMeta {
  slug: string;
  name: string;
  alias: string;
  universe: string;
  firstAppearance?: string;
  alignment: Alignment;
  teams: string[];
  avatar: string;
  powerStats?: PowerStats;
  creators?: string[];
  aliases?: string[];
  species?: string;
  status?: string;
  base?: string;
}

export interface Character {
  meta: CharacterMeta;
  content: string;
}

export interface EventMeta {
  slug: string;
  title: string;
  year: string;
  universe: string;
  type: string;
  characters: string[];
  cover: string;
  summary: string;
  creators?: string[];
  issues?: string;
}

export interface Event {
  meta: EventMeta;
  content: string;
}
