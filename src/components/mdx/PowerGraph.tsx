import type { PowerStats } from "@/lib/types";

const labels: Record<keyof PowerStats, string> = {
  strength: "Styrke",
  speed: "Hastighet",
  intelligence: "Intelligens",
  durability: "Utholdenhet",
  energy: "Energi",
};

const keys: Array<keyof PowerStats> = [
  "strength",
  "speed",
  "intelligence",
  "durability",
  "energy",
];

interface PowerGraphProps extends Partial<PowerStats> {
  title?: string;
}

export function PowerGraph({ title = "Power graph", ...stats }: PowerGraphProps) {
  const values = keys
    .map((key) => ({ key, label: labels[key], value: stats[key] }))
    .filter((entry): entry is { key: keyof PowerStats; label: string; value: number } => {
      return typeof entry.value === "number";
    });

  if (values.length === 0) {
    return null;
  }

  const size = 280;
  const center = size / 2;
  const radius = 96;
  const angle = (2 * Math.PI) / values.length;

  const points = values.map((entry, index) => {
    const ratio = Math.min(100, Math.max(0, entry.value)) / 100;
    const theta = -Math.PI / 2 + index * angle;
    return {
      ...entry,
      x: center + Math.cos(theta) * radius * ratio,
      y: center + Math.sin(theta) * radius * ratio,
      lx: center + Math.cos(theta) * (radius + 22),
      ly: center + Math.sin(theta) * (radius + 22),
    };
  });

  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5">
      <figcaption className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-marvel-red">
        {title}
      </figcaption>
      <div className="grid items-center gap-6 md:grid-cols-[280px_1fr]">
        <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-64 w-64">
          {[0.25, 0.5, 0.75, 1].map((ring) => (
            <circle key={ring} cx={center} cy={center} r={radius * ring} fill="none" stroke="#27272a" />
          ))}
          {points.map((point) => (
            <line
              key={point.key}
              x1={center}
              y1={center}
              x2={center + ((point.lx - center) * radius) / (radius + 22)}
              y2={center + ((point.ly - center) * radius) / (radius + 22)}
              stroke="#3f3f46"
            />
          ))}
          <polygon points={polygon} fill="rgba(230,36,41,0.28)" stroke="#E62429" strokeWidth="2" />
          {points.map((point) => (
            <g key={point.key}>
              <circle cx={point.x} cy={point.y} r="4" fill="#F5C518" />
              <text x={point.lx} y={point.ly} textAnchor="middle" dominantBaseline="middle" className="fill-zinc-300" fontSize="10">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
        <ul className="space-y-3">
          {values.map((entry) => (
            <li key={entry.key}>
              <div className="mb-1 flex justify-between text-xs text-zinc-400">
                <span>{entry.label}</span>
                <span>{entry.value}</span>
              </div>
              <div className="stat-bar">
                <span style={{ width: `${entry.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
