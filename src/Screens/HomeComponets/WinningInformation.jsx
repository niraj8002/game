import React from "react"
import WinningRow from "./winnerCard"

const rows = [
  { name: "Mem***DAE", amountINR: 1140, avatarQuery: "cool gray hair" },
  { name: "Mem***MGR", amountINR: 741, avatarQuery: "glasses beanie" },
  { name: "Mem***MFL", amountINR: 5100, avatarQuery: "woman brunette" },
  { name: "Mem***FCF", amountINR: 980, avatarQuery: "hat portrait" },
  { name: "Mem***TU0", amountINR: 980, avatarQuery: "woman blue hair" },
]

export default function WinningInformation() {
  return (
    <section className="w-full bg-[#1f1f1f]">
      <div className="mx-auto max-w-full px-2 py-6">
        <header className="mb-4 flex items-center gap-2">
          <span className="h-5 w-1 rounded-sm bg-amber-400" aria-hidden="true" />
          <h2 className="text-pretty text-lg font-semibold text-amber-300">Winning information</h2>
        </header>

        <ul className="flex flex-col gap-3">
          {rows.map((r) => (
            <WinningRow key={r.name} name={r.name} amountINR={r.amountINR} avatarQuery={r.avatarQuery} />
          ))}
        </ul>
      </div>
    </section>
  )
}
