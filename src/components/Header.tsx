import Link from "next/link";

const links = [
  { href: "/", label: "Hub" },
  { href: "/characters", label: "Karakterer" },
  { href: "/events", label: "Hendelser" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-marvel-red font-display text-lg font-black tracking-tight text-white shadow-[0_0_24px_rgba(230,36,41,0.45)]">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-wide">
            MARVEL
            <span className="text-zinc-400 group-hover:text-marvel-red"> FANDOM</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
