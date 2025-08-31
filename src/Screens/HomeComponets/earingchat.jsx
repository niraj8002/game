// colored NO1/NO2/NO3 ribbons and crowns, title accent, and spacing tweaks. Mobile-first, plain JSX.
import react from "react";
import win from "../../assets/winner.jpg";
import userlast  from "../../assets/userlast.webp"

// Crown SVG with configurable color
function Crown({ className = "", color = "fill-amber-400" }) {
  return (
    <svg
      viewBox="0 0 64 32"
      aria-hidden="true"
      className={`w-6 h-6 drop-shadow ${color} ${className}`}
    >
      <path d="M6 28h52v2H6v-2Zm2-4 8-12 8 8 10-14 10 14 8-6 6 10H8Z" />
      <circle cx="16" cy="11" r="2.4" className="fill-amber-200/90" />
      <circle cx="32" cy="6" r="2.4" className="fill-amber-200/90" />
      <circle cx="48" cy="13" r="2.4" className="fill-amber-200/90" />
    </svg>
  );
}

// Gold gradient pill to match the screenshot
function AmountPill({ children, className = "" }) {
  return (
    <span
      className={[
        "inline-block rounded-full px-2 py-1 text-[12px] font-semibold w-35 h-50",
        "bg-gradient-to-b from-[#f1da9b] to-[#dcb550] text-[#8d680a]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_10px_rgba(245,158,11,0.25)]",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Ribbon({ rank }) {
  const map = {
    1: { text: "NO1", cls: "bg-amber-300 text-zinc-900" },
    2: { text: "NO2", cls: "bg-blue-300 text-zinc-900" },
    3: { text: "NO3", cls: "bg-rose-300 text-zinc-900" },
  };
  const { text, cls } = map[rank] || map[1];
  return (
    <span
      className={[
        "px-2 py-0.5 text-[11px] font-bold tracking-wide rounded",
        "shadow-sm",
        cls,
      ].join(" ")}
    >
      {text}
    </span>
  );
}

function PodiumCard({ rank, name, amount, tall = false }) {
  // All blocks are gold; ribbon/crown colors differ by rank
  const crownColor =
    rank === 1
      ? "fill-amber-400"
      : rank === 2
      ? "fill-indigo-300"
      : "fill-orange-300";
  return (
    <div
      className={[
        "relative flex flex-col items-center rounded-md",
        // gold block with subtle depth
        "bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 text-zinc-900",
        "shadow-[0_8px_20px_rgba(245,158,11,0.25)]",
        tall ? "h-44 pt-10" : "h-36 pt-8",
        "px-2",
      ].join(" ")}
    >
      {/* Avatar + crown */}
      <div className="absolute -top-7">
        <div className="relative">
          <img
            // src={AVATAR_SRC || "/placeholder.svg"}
            alt="User avatar"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-md"
          />
          <Crown className="-top-3 -right-2 absolute" color={crownColor} />
        </div>
      </div>

      {/* Place ribbon */}
      <div className="absolute top-2">
        <Ribbon rank={rank} />
      </div>

      {/* Name */}
      <div className="mt-auto text-center text-sm font-semibold">{name}</div>

      {/* Amount */}
      <div className="mt-2 mb-3">
        <AmountPill>{amount}</AmountPill>
      </div>
    </div>
  );
}

function RowItem({ index, name, amount }) {
  return (
    <li className="flex items-center justify-between rounded-lg bg-[#333332] px-3 py-1">
      <div className="flex items-center gap-3">
        <span className="w-6 text-center text-zinc-300 text-sm font-semibold">
          {index}
        </span>
        <img
          src={userlast}
          alt="User avatar"
          className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
        />
        <span className="text-[13px] text-zinc-200">{name}</span>
      </div>
      <AmountPill className="shrink-0">{amount}</AmountPill>
    </li>
  );
}

export default function EarningsChart() {
  // Top 3 arranged to match screenshot: NO2 (left), NO1 (center, taller), NO3 (right)
  const top3 = [
    { rank: 2, name: "Mem***UKX", amount: "₹19,404,000,000.00", tall: false },
    { rank: 1, name: "Mem***DIU", amount: "₹20,865,824,475.93", tall: true },
    { rank: 3, name: "Mem***OHL", amount: "₹1,422,833,728.96", tall: false },
  ];

  const others = [
    { index: 1, name: "Mem***6CR", amount: "₹1,017,027,420.36" },
    { index: 2, name: "Mem***5AZ", amount: "₹629,602,172.08" },
    { index: 3, name: "Mem***FP2", amount: "₹386,834,802.90" },
    { index: 4, name: "Mem***DGQ", amount: "₹201,035,240.00" },
    { index: 5, name: "Mem***HBZ", amount: "₹192,472,000.00" },
    { index: 6, name: "Mem***B9Z", amount: "₹167,102,740.00" },
    { index: 7, name: "Sha***waz", amount: "₹116,936,886.92" },
  ];

  return (
    <section className="w-full max-w-sm mx-auto p-2 bg-[#242424] text-white">
      {/* Title with gold accent line, matching screenshot */}
      <header className="mb-3 flex items-center gap-2">
        <span
          className="h-5 w-1 rounded-full bg-amber-400/80"
          aria-hidden="true"
        />
        <h2 className="text-[15px] font-semibold text-amber-300 text-pretty">
          {"Today's earnings chart"}
        </h2>
      </header>

      {/* Podium - rank 1 taller and centered */}
      <div className="mb-3 flex justify-center items-center">
        <img
          src={win}
          alt="Top 3 winners podium"
          className="w-full rounded-md "
        />
      </div>

      {/* Ranked list */}
      <ul className="space-y-2 mx-1 -mt-4">
        {others.map((row) => (
          <RowItem key={row.index} {...row} />
        ))}
      </ul>
    </section>
  );
}
