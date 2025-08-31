import React, { useEffect, useMemo, useState } from "react";
import {
  Volume2,
  ArrowLeft,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import bookf from "../assets/bookf.png";
// Utility to join class names
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TabButton = ({ label, active, onClick, highlight }) => {
  const base =
    highlight === "gold"
      ? "bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-zinc-900"
      : "bg-zinc-700 text-zinc-300";

  return (
    <button
      onClick={onClick}
      className={cx(
        "h-10 rounded-lg text-sm font-medium px-4",
        base,
        active ? "shadow-lg" : ""
      )}
    >
      {label}
    </button>
  );
};

const GameButton = ({ label, active, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex flex-col items-center justify-center w-16 h-16 rounded-lg text-[10px] font-semibold",
        active
          ? "bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-zinc-900 shadow-lg"
          : "bg-[#4d4d4c] text-zinc-300"
      )}
    >
      <div>{icon}</div>
      <div>{label.split(" ")[0]}</div>
      <div>{label.split(" ")[1] || ""}</div>
      <div>{label.split(" ")[2] || ""}</div>
    </button>
  );
};

// Clock icon component
const ClockIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6"
  >
    <defs>
      <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#f6e27a", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#e0be72", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle
      cx="12"
      cy="12"
      r="10"
      fill={active ? "url(#gold-gradient)" : "#4d4d4c"}
    />
    <path
      d="M12 6a1 1 0 0 1 1 1v4.17l3.09 1.79a1 1 0 0 1-1 1.73l-3.5-2A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1z"
      fill={active ? "#6b4e1e" : "#a0a0a0"}
    />
  </svg>
);

const PillButton = ({ label, active, onClick, color }) => {
  const base =
    color === "green"
      ? "bg-emerald-500"
      : color === "violet"
      ? "bg-violet-500"
      : "bg-red-500";

  return (
    <button
      onClick={onClick}
      className={cx(
        "h-8 flex-1 rounded-lg text-sm font-bold text-white",
        base,
        active ? "ring-2 ring-gray-300 scale-105" : ""
      )}
    >
      {label}
    </button>
  );
};

const Chip = ({ label, active, intent = "muted", onClick }) => {
  const style =
    intent === "random"
      ? "bg-red-600 text-white"
      : intent === "green"
      ? "bg-emerald-600 text-white"
      : "bg-zinc-700 text-zinc-200";

  return (
    <button
      onClick={onClick}
      className={cx(
        "h-8 rounded-lg px-3 text-xs font-semibold whitespace-nowrap mt-1",
        style,
        active ? "ring-2 ring-white/60" : ""
      )}
    >
      {label}
    </button>
  );
};

const NumberBall = ({ n, selected, onClick }) => {
  const colorForNumber = (num) => {
    const map = {
      0: "red",
      1: "green",
      2: "red",
      3: "green",
      4: "red",
      5: "violet",
      6: "red",
      7: "green",
      8: "red",
      9: "green",
    };
    return map[num] || "red";
  };

  const color = colorForNumber(n);
  const ringColor =
    color === "green"
      ? "ring-emerald-500"
      : color === "violet"
      ? "ring-violet-500"
      : "ring-red-500";

  const ballGradient =
    color === "green"
      ? "from-emerald-300 to-emerald-400"
      : color === "violet"
      ? "from-violet-300 to-violet-400"
      : "from-red-300 to-red-400";

  return (
    <button
      onClick={onClick}
      className={cx(
        "relative aspect-square w-full rounded-full",
        "bg-gradient-to-b from-white to-gray-100",
        "shadow-[0_3px_8px_rgba(0,0,0,0.3)]",
        "ring-4",
        ringColor,
        selected ? "scale-95" : "hover:scale-105",
        "transition-transform duration-150"
      )}
    >
      <div
        className={cx(
          "absolute inset-1 rounded-full bg-gradient-to-b",
          ballGradient,
          "shadow-inner"
        )}
      >
        <span className="absolute inset-0 grid place-items-center text-xl font-black text-white drop-shadow-sm">
          {n}
        </span>
        <span className="pointer-events-none absolute left-1/2 top-1 h-2 w-6 -translate-x-1/2 rounded-full bg-white/60 blur-sm" />
      </div>
    </button>
  );
};

const Dot = ({ color }) => {
  return (
    <span
      className={cx(
        "h-2 w-2 rounded-full",
        color === "emerald"
          ? "bg-emerald-500"
          : color === "violet"
          ? "bg-violet-500"
          : "bg-rose-500"
      )}
    />
  );
};

const ActivityGame = () => {
  // UI State
  const [activeColor, setActiveColor] = useState("green");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [sizePick, setSizePick] = useState("big");
  const [tab, setTab] = useState("history");
  const [activeGame, setActiveGame] = useState("30sec");

  // Timer state - starts at 13 seconds to match screenshot
  const [seconds, setSeconds] = useState(13);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 30));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const periodId = useMemo(() => {
    return "20250831100050255";
  }, []);

  const numbers = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  const toggleNumber = (n) =>
    setSelectedNumbers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );

  // History data matching screenshot
  const historyRows = [
    { period: "20250831100050254", number: 9, size: "Big", color: "green" },
    { period: "20250831100050253", number: 5, size: "Big", color: "violet" },
    { period: "20250831100050252", number: 6, size: "Big", color: "red" },
    { period: "20250831100050251", number: 5, size: "Big", color: "violet" },
    { period: "20250831100050250", number: 4, size: "Small", color: "red" },
    { period: "20250831100050249", number: 3, size: "Small", color: "green" },
    { period: "20250831100050248", number: 6, size: "Big", color: "red" },
    { period: "20250831100050247", number: 5, size: "Big", color: "violet" },
    { period: "20250831100050246", number: 3, size: "Small", color: "green" },
    { period: "20250831100050245", number: 8, size: "Big", color: "red" },
  ];

  const myHistory = [
    {
      time: "10:02",
      bet: "Big x10",
      pick: "7,8,9",
      amount: 20,
      result: "Win +₹38",
    },
    {
      time: "09:57",
      bet: "Small x5",
      pick: "0,1,2",
      amount: 10,
      result: "Lose -₹10",
    },
    {
      time: "09:53",
      bet: "Color Green",
      pick: "Green",
      amount: 12,
      result: "Win +₹10",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      {/* Wallet Section */}
      <div className="mx-4 mt-4 rounded-2xl bg-zinc-700 p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">₹0.00</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Wallet className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-zinc-300">Wallet balance</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="bg-red-500 text-white py-1 rounded-full font-semibold">
            Withdraw
          </button>
          <button className="bg-green-500 text-white py-1 rounded-full font-semibold">
            Deposit
          </button>
        </div>
      </div>

      {/* Sound and Detail */}
      <div className="flex items-center justify-between px-4 mt-3">
        <Volume2 className="h-5 w-5 text-[#e0be72]  " />
        <button className="bg-gradient-to-b from-[#e0be72] to-[#d1a84e] hover:from-yellow-500 text-zinc-900 px-4 py-2 rounded-xl text-sm font-semibold">
          Detail
        </button>
      </div>

      {/* Game Selection */}
      <div className="flex items-center justify-center gap-1 px-2 mt-4 bg-[#4d4d4c] mx-4 rounded-lg">
        <GameButton
          icon={<ClockIcon active={activeGame === "30sec"} />}
          label="WinGo 30sec"
          active={activeGame === "30sec"}
          onClick={() => setActiveGame("30sec")}
        />
        <GameButton
          icon={<ClockIcon active={activeGame === "1min"} />}
          label="WinGo 1Min"
          active={activeGame === "1min"}
          onClick={() => setActiveGame("1min")}
        />
        <GameButton
          icon={<ClockIcon active={activeGame === "3min"} />}
          label="WinGo 3Min"
          active={activeGame === "3min"}
          onClick={() => setActiveGame("3min")}
        />
        <GameButton
          icon={<ClockIcon active={activeGame === "5min"} />}
          label="WinGo 5Min"
          active={activeGame === "5min"}
          onClick={() => setActiveGame("5min")}
        />
      </div>

      {/* Main Game Area */}
      <div className="mx-4 mt-4 rounded-2xl bg-zinc-800 px-2">
        <div className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] rounded-2xl px-3 py-2 mb-4">
          {/* How to play and Timer */}
          <div className="flex items-center justify-between mb-4 ">
            <button className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-zinc-900 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-1 border-gray-900 mt-1">
              <img src={bookf} alt="book " className="w-4 h-4" />
              How to play
            </button>
            <div className="text-right">
              <div className="text-xs text-gray-900">Time remaining</div>
              <div className="flex items-center gap-1">
                {[mm[0], mm[1], ":", ss[0], ss[1]].map((d, i) => (
                  <span
                    key={i}
                    className={cx(
                      "grid h-7 min-w-6 place-items-center rounded-md text-sm font-bold",
                      d === ":"
                        ? "bg-transparent px-0 text-white"
                        : "bg-zinc-900 text-amber-300 px-1"
                    )}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Period ID and Dots */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Dot color="emerald" />
              <Dot color="violet" />
              <Dot color="rose" />
              <Dot color="violet" />
              <Dot color="rose" />
            </div>
            <span className="text-xs text-zinc-800  px-2 py-1 rounded">
              {periodId}
            </span>
          </div>
        </div>

        {/* Color Betting */}

        <div className="grid grid-cols-3 gap-2 mb-4">
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

        {/* Number Balls */}
        <div className="grid grid-cols-5 gap-3 mb-4">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 ">
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

        {/* Big/Small Toggle */}
        <div className="grid grid-cols-2 gap-0 rounded-full overflow-hidden">
          <button
            onClick={() => setSizePick("big")}
            className={cx(
              "h-12 text-sm font-bold",
              sizePick === "big"
                ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                : "bg-zinc-600 text-zinc-300"
            )}
          >
            Big
          </button>
          <button
            onClick={() => setSizePick("small")}
            className={cx(
              "h-12 text-sm font-bold",
              sizePick === "small"
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                : "bg-zinc-600 text-zinc-300"
            )}
          >
            Small
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-2">
        <TabButton
          label="Game history"
          active={tab === "history"}
          onClick={() => setTab("history")}
          highlight={tab === "history" ? "gold" : undefined}
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

      {/* Tab Content */}
      <div className="mx-4 mt-2 mb-20">
        {tab === "history" && (
          <div className="rounded-xl bg-zinc-800 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-zinc-700/50 text-xs font-semibold text-zinc-300">
              <div>Period</div>
              <div className="text-center">Number</div>
              <div className="text-center">Big Small</div>
              <div className="text-center">Color</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-zinc-700/30">
              {historyRows.map((row, idx) => (
                <div
                  key={row.period}
                  className="grid grid-cols-4 gap-4 items-center px-4 py-3 text-sm"
                >
                  <div className="text-xs text-zinc-400 truncate">
                    {row.period}
                  </div>
                  <div className="text-center text-lg font-bold text-white">
                    {row.number}
                  </div>
                  <div className="text-center text-xs text-zinc-300">
                    {row.size}
                  </div>
                  <div className="flex justify-center">
                    <div className="flex gap-1">
                      <span
                        className={cx(
                          "h-3 w-3 rounded-full",
                          row.color === "green"
                            ? "bg-emerald-500"
                            : row.color === "violet"
                            ? "bg-violet-500"
                            : "bg-red-500"
                        )}
                      />
                      {row.color === "violet" && row.number === 5 && (
                        <span className="h-3 w-3 rounded-full bg-violet-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 py-3 bg-zinc-700/30">
              <button className="p-2 rounded-lg bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-zinc-900">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-zinc-300">1/50</span>
              <button className="p-2 rounded-lg bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-zinc-900">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {tab === "chart" && (
          <div className="rounded-xl bg-zinc-800 p-4">
            <div className="text-sm text-zinc-300 mb-3">
              Number frequency chart
            </div>
            <div className="grid grid-cols-10 gap-1">
              {[0, 5, 1, 9, 5, 5, 1, 2, 7, 3].map((v, i) => (
                <div key={i} className="flex h-24 items-end justify-center">
                  <div
                    className={cx(
                      "w-6 rounded-t-sm",
                      v >= 6
                        ? "bg-amber-500"
                        : v <= 3
                        ? "bg-blue-500"
                        : "bg-emerald-500"
                    )}
                    style={{ height: `${(v + 1) * 3}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "my" && (
          <div className="space-y-2">
            {myHistory.map((h, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-3"
              >
                <div>
                  <div className="text-xs text-zinc-400">{h.time}</div>
                  <div className="text-sm font-semibold text-white">
                    {h.bet}
                  </div>
                  <div className="text-xs text-zinc-300">Pick: {h.pick}</div>
                </div>
                <div
                  className={cx(
                    "text-sm font-bold",
                    h.result.includes("Win")
                      ? "text-emerald-400"
                      : "text-red-400"
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
  );
};

export default ActivityGame;
