import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-12 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-marvel-red">404</p>
      <h1 className="mt-3 font-display text-5xl">Siden ble slukt av en portal</h1>
      <p className="mt-3 text-zinc-400">Vi fant verken karakteren eller eventet du lette etter.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-marvel-red px-5 py-2.5 text-sm font-semibold"
      >
        Tilbake til huben
      </Link>
    </div>
  );
}
