import React from "react";

import { useEffect, useMemo, useState } from "react";

// Utility to join class names
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabButton = ({ label, active, onClick, highlight }) => {
  const base =
    highlight === "gold"
      ? "bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-900"
      : "bg-zinc-700 text-zinc-100";
  return (
    <button
      onClick={onClick}
      className={cx(
        "h-10 rounded-lg text-sm font-medium w-full",
        base,
        active ? "ring-2 ring-white/60" : ""
      )}
    >
      {label}
    </button>
  );
};

const ActivityGame = () => {
  // UI State
  // UI State
  const [activeColor, setActiveColor] = useState("green");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [sizePick, setSizePick] = useState("big");
  const [tab, setTab] = useState("history");

  // Simple countdown (mm:ss) similar to screenshot 00:24
  const [seconds, setSeconds] = useState(84);
  useEffect(() => {
    const id = setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 300)),
      1000
    );
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const periodId = useMemo(() => {
    // Mock period id similar to screenshot format
    const now = new Date();
    const pad = (n, len = 2) => String(n).padStart(len, "0");
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}${pad(now.getHours())}${pad(now.getMinutes())}${pad(
      now.getSeconds()
    )}00134`;
  }, [seconds]); // update as time flows so it looks alive

  // Data
  const numbers = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);
  const colorForNumber = (n) => {
    // approximate color coding to mimic screenshot variation
    const map = {
      0: "red",
      1: "green",
      2: "mint", // fallback route, styled as greenish
      3: "green",
      4: "red",
      5: "violet",
      6: "red",
      7: "green",
      8: "mint",
      9: "red",
    };
    return map[n] || "red";
  };

  const toggleNumber = (n) =>
    setSelectedNumbers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );

  // Dummy content
  const historyRows = [
    { period: "20250826100030133", number: 0, size: "Small", color: "violet" },
    { period: "20250826100030132", number: 9, size: "Big", color: "red" },
    { period: "20250826100030131", number: 5, size: "Big", color: "violet" },
    { period: "20250826100030130", number: 5, size: "Big", color: "red" },
    { period: "20250826100030129", number: 1, size: "Small", color: "green" },
  ];

  const myHistory = [
    {
      time: "10:02",
      bet: "Big x10",
      pick: "7,8,9",
      amount: 20,
      result: "Win +$38",
    },
    {
      time: "09:57",
      bet: "Small x5",
      pick: "0,1,2",
      amount: 10,
      result: "Lose -$10",
    },
    {
      time: "09:53",
      bet: "Color Green",
      pick: "Green",
      amount: 12,
      result: "Win +$10",
    },
  ];

  // Helpers for visual chips, balls, etc.
  const GoldCard = ({ children, className }) => (
    <div
      className={cx(
        "rounded-xl px-3 py-2",
        "bg-gradient-to-b from-amber-300 to-amber-500 text-zinc-900 shadow-[inset_0_1px_rgba(255,255,255,.8),0_6px_12px_rgba(0,0,0,.35)]",
        className
      )}
    >
      {children}
    </div>
  );

  const PillButton = ({ label, active, onClick, color }) => {
    const base =
      color === "green"
        ? "bg-emerald-600"
        : color === "violet"
        ? "bg-violet-500"
        : "bg-red-500";
    return (
      <button
        onClick={onClick}
        className={cx(
          "h-9 flex-1 rounded-lg text-sm font-medium text-white",
          base,
          active ? "ring-2 ring-white/60" : "opacity-95"
        )}
      >
        {label}
      </button>
    );
  };

  const Chip = ({ label, active, intent = "muted", onClick }) => {
    const style =
      intent === "random"
        ? "bg-rose-600 text-white"
        : intent === "green"
        ? "bg-emerald-700 text-white"
        : "bg-zinc-700 text-zinc-200";
    return (
      <button
        onClick={onClick}
        className={cx(
          "h-8 rounded-lg px-3 text-xs font-semibold",
          style,
          active ? "ring-2 ring-white/60 " : ""
        )}
      >
        {label}
      </button>
    );
  };

  const NumberBall = ({ n, selected, onClick }) => {
    // choose ring color by number category
    const tone =
      colorForNumber(n) === "green"
        ? "from-emerald-400 to-emerald-600 ring-emerald-500"
        : colorForNumber(n) === "violet"
        ? "from-violet-400 to-violet-600 ring-violet-500"
        : "from-rose-400 to-rose-600 ring-rose-500";
    return (
      <button
        onClick={onClick}
        className={cx(
          "relative aspect-square w-full rounded-full",
          "bg-gradient-to-br from-white to-zinc-200",
          "shadow-[inset_0_8px_12px_rgba(255,255,255,.9),inset_0_-8px_16px_rgba(0,0,0,.15),0_4px_10px_rgba(0,0,0,.45)]",
          "ring-4",
          tone,
          selected ? "scale-95" : ""
        )}
      >
        <span
          className={cx(
            "absolute inset-0 grid place-items-center text-2xl font-extrabold",
            colorForNumber(n) === "green"
              ? "text-emerald-700"
              : colorForNumber(n) === "violet"
              ? "text-violet-700"
              : "text-rose-700"
          )}
        >
          {n}
        </span>
        <span className="pointer-events-none absolute left-1/2 top-1 h-2 w-8 -translate-x-1/2 rounded-full bg-white/70 blur-[2px]" />
      </button>
    );
  };

  return (
    <main className="min-h-screen w-full bg-zinc-900 text-zinc-100 font-sans ">
      <div className="mx-auto w-full max-w- px-3 py-4">
        {/* Header: Help + Timer */}
        <div className="grid grid-cols-2 gap-2">
          <GoldCard className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-600/70">
              <span className="h-1.5 w-3 rounded bg-zinc-900" />
            </span>
            <span className="text-sm font-semibold">How to play</span>
          </GoldCard>
          <GoldCard className="flex items-center justify-between flex-col">
            <span className="text-xs font-semibold">Time remaining</span>
            <div className="flex items-center gap-1 ">
              {[...mm, ":", ...ss].map((d, i) => (
                <span
                  key={i}
                  className={cx(
                    "grid h-6 min-w-5 place-items-center rounded-md bg-zinc-900/70 px-2 text-xs font-bold text-amber-200 ",
                    d === ":" ? "bg-transparent px-0 text-zinc-900" : ""
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </GoldCard>
        </div>

        {/* Game name and period */}
        <div className="mt-3 rounded-xl bg-zinc-800 p-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GoldCard className="px-2 py-1 text-xs font-bold">
                WinGo 5 Min
              </GoldCard>
              <div className="flex items-center gap-1">
                <Dot color="emerald" />
                <Dot color="violet" />
                <Dot color="rose" />
                <Dot color="emerald" />
                <Dot color="rose" />
              </div>
            </div>
            <span className="rounded-md bg-zinc-900/40 px-2 py-1 text-[10px] text-zinc-300">
              {periodId}
            </span>
          </div>

          {/* Color buttons */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <PillButton
              label="Green"
              color="green"
              active={activeColor === "green"}
              onClick={() => setActiveColor("green")}
            />
            <PillButton
              label="Violet"
              color="violet"
              active={activeColor === "violet"}
              onClick={() => setActiveColor("violet")}
            />
            <PillButton
              label="Red"
              color="red"
              active={activeColor === "red"}
              onClick={() => setActiveColor("red")}
            />
          </div>

          {/* Number balls 0..9 */}
          <div className="mt-3 grid grid-cols-5 gap-7">
            {numbers.map((n) => (
              <NumberBall
                key={n}
                n={n}
                selected={selectedNumbers.includes(n)}
                onClick={() => toggleNumber(n)}
              />
            ))}
          </div>

          {/* Multipliers */}
          <div className="mt-3 flex items-center gap-2 overflow-scroll p-1">
            <Chip label="Random" intent="random" />
            {[1, 5, 10, 20, 50, 100].map((m) => (
              <Chip
                key={m}
                label={`x${m}`}
                onClick={() => setMultiplier(m)}
                intent={m === 1 ? "green" : "muted"}
                active={multiplier === m}
              />
            ))}
          </div>

          {/* Big / Small segmented */}
          <div className="mt-3 grid grid-cols-2 gap-0 rounded-full bg-zinc-700 p-1">
            <button
              onClick={() => setSizePick("big")}
              className={cx(
                "h-10 rounded-full text-sm font-bold",
                sizePick === "big"
                  ? "bg-amber-500 text-zinc-900"
                  : "text-zinc-200"
              )}
            >
              Big
            </button>
            <button
              onClick={() => setSizePick("small")}
              className={cx(
                "h-10 rounded-full text-sm font-bold",
                sizePick === "small"
                  ? "bg-blue-500 text-white"
                  : "text-zinc-200"
              )}
            >
              Small
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3 gap-2 rounded-xl bg-zinc-800 p-2 flex justify-around">
          <TabButton
            label="Game history"
            active={tab === "history"}
            onClick={() => setTab("history")}
            highlight="gold"
          />
          <TabButton
            label="Chart"
            active={tab === "chart"}
            onClick={() => setTab("chart")}
          />
          <TabButton
            label="My history"
            active={tab === "my"}
            onClick={() => setTab("my")}
          />
        </div>

        {/* Tab content */}
        <div className="mt-2 mb-5 rounded-xl bg-zinc-800 p-2">
          {tab === "history" && (
            <div className="Rflow-hidden rounded-lg bg-zinc-900/30">
              <div className="grid grid-cols-4 gap-2 border-b border-zinc-700/60 px-3 py-2 text-[11px] text-zinc-300">
                <div>Period</div>
                <div className="text-center">Number</div>
                <div className="text-center">Big Small</div>
                <div className="text-center">Color</div>
              </div>
              <ul>
                {historyRows.map((r, idx) => (
                  <li
                    key={r.period + idx}
                    className={cx(
                      "grid grid-cols-4 items-center gap-2 px-3 py-2 text-sm",
                      idx % 2 ? "bg-zinc-900/20" : ""
                    )}
                  >
                    <div className="truncate text-[11px] text-zinc-300">
                      {r.period}
                    </div>
                    <div className="text-center text-base font-extrabold">
                      {r.number}
                    </div>
                    <div className="text-center text-[12px]">{r.size}</div>
                    <div className="flex items-center justify-center">
                      <span
                        className={cx(
                          "h-3 w-3 rounded-full",
                          r.color === "green"
                            ? "bg-emerald-500"
                            : r.color === "violet"
                            ? "bg-violet-500"
                            : "bg-rose-500"
                        )}
                        aria-label={`color ${r.color}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "chart" && (
            <div className="rounded-lg bg-zinc-900/30 p-3">
              <div className="text-xs text-zinc-300">Recent numbers</div>
              <div className="mt-2 grid grid-cols-10 gap-1">
                {[0, 5, 1, 9, 5, 5, 1, 2, 7, 3].map((v, i) => (
                  <div key={i} className="flex h-20 items-end justify-center">
                    <div
                      className={cx(
                        "w-5 rounded-t",
                        v >= 6
                          ? "bg-amber-500"
                          : v <= 3
                          ? "bg-blue-500"
                          : "bg-emerald-500"
                      )}
                      style={{ height: `${(v + 1) * 8}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "my" && (
            <div className="space-y-2 rounded-lg bg-zinc-900/30 p-2">
              {myHistory.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md bg-zinc-800 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-400">{h.time}</div>
                    <div className="text-sm font-semibold">{h.bet}</div>
                    <div className="truncate text-xs text-zinc-300">
                      Pick: {h.pick}
                    </div>
                  </div>
                  <div
                    className={cx(
                      "text-sm font-bold",
                      h.result.includes("Win")
                        ? "text-emerald-400"
                        : "text-rose-400"
                    )}
                  >
                    {h.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default ActivityGame;
function Dot({ color }) {
  return (
    <span
      className={cx(
        "h-3 w-3 rounded-full",
        color === "emerald"
          ? "bg-emerald-500"
          : color === "violet"
          ? "bg-violet-500"
          : "bg-rose-500"
      )}
    />
  );
}
