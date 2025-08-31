import React from "react";
import winn from "../../assets/wii.webp";
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}
// Simple INR formatter using Indian numbering system
export default function WinningRow({
  name,
  amountINR,
  avatarAlt = "Member avatar",
  avatarQuery = "avatar profile person",
}) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-2xl bg-[#2b2b2b] px-3 py-0 ring-1 ring-white/5">
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-1">
        <img
          src={winn}
          alt={avatarAlt}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-[11px] font-medium text-gray-400 tracking-wider">
          {name}
        </span>
      </div>

      {/* Right: Golden amount card */}
      {/* Right: Golden amount card */}
      <div
        className="flex items-center gap-3 rounded-xl text-amber-300 pl-0 py-2 mr-3"
        aria-label="Winning amount card"
      >
        <img
          src="https://ossimg.bdg123456.com/BDGWin/vendorlogo/vendorlogo_20240321183353rwkf.png"
          alt="Winners collage"
          className="h-10 w-18 rounded-lg object-cover"
        />
        <div className="flex flex-col leading-5">
          <span className="text-[10px] font-semibold text-amber-300">
            {"Receive "}
            {formatINR(amountINR)}
          </span>
          <span className="text-[9px] text-gray-400">Winning amount</span>
        </div>
      </div>
    </li>
  );
}
