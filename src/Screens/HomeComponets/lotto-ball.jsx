import React from "react";
// Small lottery ball with gradient and number
export default function LottoBall({
  color = "red",
  number = "9",
  size = "w-11 h-11",
  className = "",
}) {
  const palette = {
    red: "from-rose-400 to-rose-600 ring-rose-300",
    green: "from-emerald-400 to-emerald-600 ring-emerald-300",
    purple: "from-violet-400 to-violet-600 ring-violet-300",
  };
  const gradient = palette[color] || palette.red;

  return (
    <div
      className={`relative ${size} rounded-full bg-gradient-to-br ${gradient} ring-2 ${className} flex items-center justify-center text-white font-extrabold`}
      aria-label={`lottery ball ${number}`}
    >
      {/* subtle inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-white/10" />
      <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] text-base leading-none">
        {number}
      </span>
    </div>
  );
}
