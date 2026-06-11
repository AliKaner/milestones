// Tailwind statik sınıf isimleri gerektirdiği için her aksan rengini
// önceden tanımlanmış sınıf demetleriyle eşliyoruz.
export type Accent =
  | "emerald"
  | "sky"
  | "violet"
  | "amber"
  | "rose"
  | "lime"
  | "fuchsia"
  | "cyan"
  | "indigo";

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
  rose: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    ring: "ring-rose-500/40",
    nodeDone: "bg-rose-500 border-rose-300 text-black",
    nodeStarted: "bg-rose-400/20 border-rose-400 text-rose-200",
    line: "bg-rose-500",
    card: "border-rose-500/40 bg-rose-500/5",
    text: "text-rose-300",
    bar: "from-rose-500 to-pink-400",
  },
  lime: {
    badge: "border-lime-500/30 bg-lime-500/10 text-lime-300",
    ring: "ring-lime-500/40",
    nodeDone: "bg-lime-500 border-lime-300 text-black",
    nodeStarted: "bg-lime-400/20 border-lime-400 text-lime-200",
    line: "bg-lime-500",
    card: "border-lime-500/40 bg-lime-500/5",
    text: "text-lime-300",
    bar: "from-lime-500 to-green-400",
  },
  fuchsia: {
    badge: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300",
    ring: "ring-fuchsia-500/40",
    nodeDone: "bg-fuchsia-500 border-fuchsia-300 text-black",
    nodeStarted: "bg-fuchsia-400/20 border-fuchsia-400 text-fuchsia-200",
    line: "bg-fuchsia-500",
    card: "border-fuchsia-500/40 bg-fuchsia-500/5",
    text: "text-fuchsia-300",
    bar: "from-fuchsia-500 to-purple-400",
  },
  cyan: {
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    ring: "ring-cyan-500/40",
    nodeDone: "bg-cyan-500 border-cyan-300 text-black",
    nodeStarted: "bg-cyan-400/20 border-cyan-400 text-cyan-200",
    line: "bg-cyan-500",
    card: "border-cyan-500/40 bg-cyan-500/5",
    text: "text-cyan-300",
    bar: "from-cyan-500 to-teal-400",
  },
  indigo: {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    ring: "ring-indigo-500/40",
    nodeDone: "bg-indigo-500 border-indigo-300 text-black",
    nodeStarted: "bg-indigo-400/20 border-indigo-400 text-indigo-200",
    line: "bg-indigo-500",
    card: "border-indigo-500/40 bg-indigo-500/5",
    text: "text-indigo-300",
    bar: "from-indigo-500 to-blue-400",
  },
};
