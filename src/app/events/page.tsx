import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { Timeline } from "@/components/Timeline";
import { getAllEvents } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Hendelser",
};

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <div className="space-y-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-marvel-gold">
          Crossovers
        </p>
        <h1 className="mt-2 font-display text-5xl">Hendelser</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Store events ligger som Markdown i <code>content/events</code>. Tidslinjen
          sorteres etter året i frontmatter.
        </p>
      </header>
      <Timeline events={events} />
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
