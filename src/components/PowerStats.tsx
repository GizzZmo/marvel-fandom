import type { PowerStats } from "@/lib/types";

const labels: Record<keyof PowerStats, string> = {
  strength: "Styrke",
  speed: "Hastighet",
  intelligence: "Intelligens",
  durability: "Utholdenhet",
  energy: "Energi",
};

export function PowerStatsBars({ stats }: { stats?: PowerStats }) {
  if (!stats) {
    return null;
  }

  return (
    <div className="mt-5 space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        Power stats
      </h2>
      {(Object.keys(labels) as Array<keyof PowerStats>).map((key) => {
        const value = stats[key];
        if (typeof value !== "number") {
          return null;
        }

        return (
          <div key={key}>
            <div className="mb-1 flex justify-between text-xs text-zinc-400">
              <span>{labels[key]}</span>
              <span>{value}</span>
            </div>
            <div className="stat-bar">
              <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
