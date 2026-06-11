// Tailwind statik sınıf isimleri gerektirdiği için her aksan rengini
// önceden tanımlanmış sınıf demetleriyle eşliyoruz.
export type Accent = "emerald" | "sky" | "violet" | "amber";

type AccentClasses = {
  badge: string;
  ring: string;
  nodeDone: string;
  nodeStarted: string;
  line: string;
  card: string;
  text: string;
  bar: string;
};

export const accents: Record<Accent, AccentClasses> = {
  emerald: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    ring: "ring-emerald-500/40",
    nodeDone: "bg-emerald-500 border-emerald-300 text-black",
    nodeStarted: "bg-emerald-400/20 border-emerald-400 text-emerald-200",
    line: "bg-emerald-500",
    card: "border-emerald-500/40 bg-emerald-500/5",
    text: "text-emerald-300",
    bar: "from-emerald-500 to-teal-400",
  },
  sky: {
    badge: "border-sky-500/30 bg-sky-500/10 text-sky-300",
    ring: "ring-sky-500/40",
    nodeDone: "bg-sky-500 border-sky-300 text-black",
    nodeStarted: "bg-sky-400/20 border-sky-400 text-sky-200",
    line: "bg-sky-500",
    card: "border-sky-500/40 bg-sky-500/5",
    text: "text-sky-300",
    bar: "from-sky-500 to-cyan-400",
  },
  violet: {
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    ring: "ring-violet-500/40",
    nodeDone: "bg-violet-500 border-violet-300 text-black",
    nodeStarted: "bg-violet-400/20 border-violet-400 text-violet-200",
    line: "bg-violet-500",
    card: "border-violet-500/40 bg-violet-500/5",
    text: "text-violet-300",
    bar: "from-violet-500 to-fuchsia-400",
  },
  amber: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    ring: "ring-amber-500/40",
    nodeDone: "bg-amber-500 border-amber-300 text-black",
    nodeStarted: "bg-amber-400/20 border-amber-400 text-amber-200",
    line: "bg-amber-500",
    card: "border-amber-500/40 bg-amber-500/5",
    text: "text-amber-300",
    bar: "from-amber-500 to-orange-400",
  },
};
