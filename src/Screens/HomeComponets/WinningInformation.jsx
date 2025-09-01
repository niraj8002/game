import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WinningRow from "./winnerCard"

const rowsData = [
  { name: "Raj***001", amountINR: 1140, gameImg: "https://bdgwinbet8.com/assets/png/11-925c456e.webp" },
  { name: "Sim***982", amountINR: 741, gameImg: "https://bdgwinbet8.com/assets/png/16-cf8e1441.webp" },
  { name: "Ami***763", amountINR: 5100, gameImg: "https://bdgwinbet8.com/assets/png/13-5676d43f.webp" },
  { name: "Dev***554", amountINR: 980, gameImg: "https://bdgwinbet8.com/assets/png/5-ab77b716.webp" },
  { name: "Kri***889", amountINR: 1250, gameImg: "https://bdgwinbet8.com/assets/png/11-925c456e.webp" },
];


export default function WinningInformation() {
  const [rows, setRows] = useState(rowsData)

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) => {
        const last = prev[prev.length - 1]
        const rest = prev.slice(0, prev.length - 1)
        return [last, ...rest] // new top, shift down
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full bg-[#1f1f1f] overflow-hidden">
      <div className="mx-auto max-w-full px-2 py-6">
        <header className="mb-4 flex items-center gap-2">
          <span className="h-5 w-1 rounded-sm bg-amber-400" aria-hidden="true" />
          <h2 className="text-pretty text-lg font-semibold text-amber-300">
            Winning information
          </h2>
        </header>

        {/* height -> jitne rows chahiye utna set karo (yaha 4 rows ke liye h-48) */}
        <ul className="flex flex-col gap-1 relative h-[240px] overflow-hidden">
          <AnimatePresence initial={false}>
            {rows.slice(0, 5).map((r, i) => ( // ek row extra render
              <motion.li
                key={r.name}
                layout
                initial={{ y: -50, opacity: 0 }}   // top se enter
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}       // neeche jake gayab
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <WinningRow
                  name={r.name}
                  gameImg={r.gameImg}
                  amountINR={r.amountINR}
                  avatarQuery={r.avatarQuery}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}
