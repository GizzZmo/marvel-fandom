# Marvel Fandom

Statisk Marvel-wiki bygget med **Next.js App Router**, **Markdown + YAML-frontmatter**, **Tailwind CSS** og **Fuse.js** for lokalt søk.

Nye karakterer og hendelser legges til ved å opprette en `.md`-fil. Ingen database kreves.

## Stack

- Next.js 15 (App Router, SSG via `generateStaticParams`)
- React 19 + TypeScript
- gray-matter for frontmatter
- react-markdown + remark-gfm
- Tailwind CSS + `@tailwindcss/typography`
- Fuse.js for fuzzy-søk i nettleseren

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Innholdsmodell

```text
content/
  characters/   # én .md per karakter
  events/       # én .md per hendelse
```

Sluggen blir filnavnet uten endelse: `spider-man.md` → `/characters/spider-man`.

### Karakter-frontmatter

```yaml
---
name: "Peter Parker"
alias: "Spider-Man"
universe: "Earth-616"
firstAppearance: "Amazing Fantasy #15 (1962)"
alignment: "Hero"          # Hero | Villain | Anti-Hero
teams: ["Avengers"]
avatar: "/images/spiderman.svg"
powerStats:
  strength: 75
  speed: 80
  intelligence: 90
---
```

Resten av filen er vanlig Markdown og rendres i artikkelkolonnen.

### Event-frontmatter

```yaml
---
title: "Secret Wars"
year: "2015"
universe: "Earth-616"
type: "Crossover"
characters: ["Spider-Man", "Doctor Doom"]
cover: "/images/secret-wars.svg"
summary: "Kort ingress som vises i kort og tidslinje."
---
```

## Arkitektur

| Fil | Rolle |
| --- | --- |
| `src/lib/markdown.ts` | Leser `.md`, parser frontmatter, eksponerer lister og slug-oppslag |
| `src/app/characters/[slug]/page.tsx` | Individuell karakterside (SSG) |
| `src/app/events/[slug]/page.tsx` | Individuell eventside (SSG) |
| `src/components/SearchBar.tsx` | Klientsøk mot metadata |
| `src/components/CharacterExplorer.tsx` | Filter på univers og allianse |

Bilder ligger i `public/images`. Demoen bruker originale, stiliserte SVG-er — bytt dem gjerne ut med egne filer.

## Videre utvidelser

- Bytt `.md` mot `.mdx` og embed komponenter som `<PowerGraph />`
- Generer «opptrådte i»-lenker fra `characters`-feltet på events
- Deploy til Vercel: importer repoet og la Next.js-presettet kjøre

## Lisens

MIT. Marvel-navn og konsepter tilhører sine rettighetshavere. Dette repoet er et teknisk fandom-arkiv/demo, ikke et offisielt produkt.
