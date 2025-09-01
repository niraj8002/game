import React, { useEffect, useMemo, useState } from "react";
import {
  Volume2,
  ArrowLeft,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import bookf from "../assets/bookf.png";
import a from "../assets/t.webp";
import b from "../assets/n.webp";
import c from "../assets/s.webp";
import d from "../assets/f.webp";
import e from "../assets/ss.webp";
import f from "../assets/sss.webp";
import g from "../assets/f.webp";
import o from "../assets/o.webp";
import tw from "../assets/tw.webp";
import two from "../assets/two.webp";
import one from "../assets/one.webp";
import four from "../assets/four.webp";
import ettt from "../assets/ettt.webp";
import niii from "../assets/niii.webp";
import bettingBanner from "../assets/bettingBanner.webp";
import actiBanner from "../assets/activityBanner.webp";
import AnnouncementBar from "./HomeComponets/AnnouncementBar";
import ColorModal from "./HomeComponets/gameBettingModal";
import { FcRefresh } from "react-icons/fc";
import CountdownModal from "./HomeComponets/CountdownModal";

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
      ? "text-red-600 outline outline-1 outline-red-600 ml-1"
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
  const images = {
    0: o,
    1: one,
    2: two,
    3: a,
    4: four,
    5: g,
    6: f,
    7: e,
    8: ettt,
    9: niii,
  };

  return (
    <div
      onClick={onClick}
      className={`w-14 h-14 flex items-center justify-center rounded-full cursor-pointer transition 
         `}
    >
      <img
        src={images[n]}
        alt={`num-${n}`}
        className="w-12 h-12 object-contain"
      />
    </div>
  );
};

const Dot = ({ img }) => {
  return <img src={img} className="w-6" />;
};

const ActivityGame = () => {
  // UI State
  const [activeColor, setActiveColor] = useState("green");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [sizePick, setSizePick] = useState("big");

  const [tab, setTab] = useState("history");
  const [activeGame, setActiveGame] = useState("WinGo 30sec");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // Timer state - starts at 13 seconds to match screenshot
  const [seconds, setSeconds] = useState(20);
  const [isLastFiveSeconds, setIsLastFiveSeconds] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) {
          // Show modal in last 10 seconds
          if (s <= 5 && !showCountdownModal) {
            setShowCountdownModal(true);
          }

          // Last 5 seconds effect
          if (s <= 5 && !isLastFiveSeconds) {
            setIsLastFiveSeconds(true);
          }

          return s - 1;
        } else {
          setIsLastFiveSeconds(false);
          setShowCountdownModal(false);
          return 30;
        }
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isLastFiveSeconds, showCountdownModal]);
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
      <div
        className="mx-4 mt-2 rounded-2xl py-2 px-2 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${bettingBanner})` }}
      >
        {/* Overlay optional */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-2xl font-bold text-white">₹0.00</div>
            <FcRefresh className="cursor-pointer transition-transform duration-500 hover:rotate-180 text-gray-400" />
          </div>

          <div className="flex items-center justify-center gap-1 mt-1">
            <Wallet className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-zinc-300">Wallet balance</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 mt-4">
          <button className="bg-red-500 text-white py-1 rounded-full font-semibold">
            Withdraw
          </button>
          <button className="bg-green-500 text-white py-1 rounded-full font-semibold">
            Deposit
          </button>
        </div>
      </div>

      {/* Sound and Detail */}
      <div className="px-2">
        <AnnouncementBar />
      </div>

      <div className="flex items-center justify-center  py- mt-4 bg-[#4d4d4c] mx-4 rounded-xl">
        {["WinGo 30sec", "WinGo 1 Min", "WinGo 3 Min", "WinGo 5 Min"].map(
          (game) => (
            <div
              key={game}
              className={`flex flex-col items-center justify-center w-24 h-20 rounded-xl  shadow-md cursor-pointer
        ${
          activeGame === game
            ? "bg-gradient-to-b from-[#e0be72] to-[#d1a84e] rounded-xl"
            : "bg-[#4d4d4c]"
        }`}
              onClick={() => setActiveGame(game)}
            >
              <svg
                className={`w-10 h-10 mb-1 ${
                  activeGame === game ? "text-yellow-800" : "text-[#ababaa]"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1a11 11 0 100 22 11 11 0 000-22zm0 20a9 9 0 110-18 9 9 0 010 18zm.5-13h-1v5.2l4.3 2.5.5-.8-3.8-2.2V8z" />
              </svg>
              <span className="text-[10px] font-medium text-black flex items-center truncate">
                {game}
              </span>
            </div>
          )
        )}
      </div>

      {/* Main Game Area */}
      <div className="mx-4 mt-4 rounded-2xl px-2 bg-cover bg-center">
        <div
          className="rounded-2xl px-1 py-2 mb-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${actiBanner})` }}
        >
          {/* How to play and Timer */}
          <div className="flex items-center justify-between mb-4 p-">
            <div>
              <button className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] text-zinc-900 px-3 py-1.5 rounded-xl text-[10px] font-semibold flex items-center gap-2 border border-1 border-gray-900 mt-1">
                <img src={bookf} alt="book " className="w-3 h-3" />
                How to play
              </button>
              <spnn className="text-yellow-700 font-medium text-[10px] ml-2 tracking-wider">
                {activeGame}
              </spnn>
            </div>
            <div className="text-right mr-1">
              <div className="text-xs text-gray-900 mb-1">Time remaining</div>
              <CountdownModal seconds={seconds} isOpen={showCountdownModal} />
              <div className="flex items-center gap-1">
                {[mm[0], mm[1], ":", ss[0], ss[1]].map((d, i) => (
                  <span
                    key={i}
                    className={cx(
                      "grid h-7 min-w-5 place-items-center rounded-md text-sm font-bold transition-colors duration-500",
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
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Dot img={a} />
              <Dot img={b} />
              <Dot img={c} />
              <Dot img={d} />
              <Dot img={b} />
            </div>
            <span className="text-[10px] text-zinc-800   py-1 rounded">
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
            onClick={() => {
              setSelectedColor("green");
              setModalOpen(true);
            }}
          />
          <PillButton
            label="Violet"
            color="violet"
            active={activeColor === "violet"}
            onClick={() => {
              setSelectedColor("violet");
              setModalOpen(true);
            }}
          />
          <PillButton
            label="Red"
            color="red"
            active={activeColor === "red"}
            onClick={() => {
              setSelectedColor("red");
              setModalOpen(true);
            }}
          />
        </div>
        <ColorModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          color={selectedColor}
        />
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
              "h-12 text-sm font-bold bg-[#5088d3]",
              sizePick === "small"
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                : " text-zinc-300"
            )}
          >
            Small
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-2 items-center justify-center">
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
                  <div
                    className={cx(
                      "text-center text-lg font-bold",
                      row.color === "green"
                        ? "text-emerald-500"
                        : row.color === "violet"
                        ? "text-violet-500"
                        : row.color === "red"
                        ? "text-red-500"
                        : "text-white"
                    )}
                  >
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
          <div className="w-full rounded-xl bg-[#1f1f1f] text-gray-200 overflow-hidden">
            {/* ---- Statistic Box ---- */}
            <div className="p-1 overflow-x-auto">
              <div className="bg-[#2b2b2b] rounded-md overflow-hidden min-w-[700px]">
                <div className="grid grid-cols-[160px_repeat(10,40px)] text-xs font-semibold border-b border-gray-700">
                  <div className="px-2 py-2">Statistic</div>
                  <div className="col-span-10 px-2 py-2 text-right">
                    (last 100 Periods)
                  </div>
                </div>

                {/* Winning Numbers */}
                <div className="grid grid-cols-[160px_repeat(10,40px)] text-xs border-b border-gray-700">
                  <div className="px-2 py-2">Winning Numbers</div>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full border border-red-500 text-red-400">
                        {i}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Missing */}
                <div className="grid grid-cols-[160px_repeat(10,40px)] text-xs border-b border-gray-700">
                  <div className="px-2 py-2">Missing</div>
                  {[46, 10, 15, 4, 8, 2, 1, 24, 12, 0].map((v, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {v}
                    </div>
                  ))}
                </div>

                {/* Avg missing */}
                <div className="grid grid-cols-[160px_repeat(10,40px)] text-xs border-b border-gray-700">
                  <div className="px-2 py-2">Avg missing</div>
                  {[10, 10, 5, 6, 10, 7, 6, 8, 11, 9].map((v, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {v}
                    </div>
                  ))}
                </div>

                {/* Frequency */}
                <div className="grid grid-cols-[160px_repeat(10,40px)] text-xs border-b border-gray-700">
                  <div className="px-2 py-2">Frequency</div>
                  {[8, 8, 14, 13, 8, 11, 12, 10, 7, 9].map((v, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {v}
                    </div>
                  ))}
                </div>

                {/* Max consecutive */}
                <div className="grid grid-cols-[160px_repeat(10,40px)] text-xs">
                  <div className="px-2 py-2">Max consecutive</div>
                  {[2, 2, 3, 2, 2, 1, 1, 1, 1, 2].map((v, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Table ---- */}
            <div className="relative overflow-x-auto">
              <div className="relative min-w-[900px]">
                {/* Red connector lines */}
                <svg className="absolute top-0 left-[160px] h-full w-[740px] pointer-events-none">
                  {[
                    { win: 1 },
                    { win: 6 },
                    { win: 2 },
                    { win: 3 },
                    { win: 2 },
                    { win: 9 },
                    { win: 4 },
                    { win: 6 },
                    { win: 1 },
                    { win: 9 },
                  ].map((row, i, arr) =>
                    i < arr.length - 1 ? (
                      <line
                        key={i}
                        x1={row.win * 40 + 20}
                        y1={i * 48 + 24}
                        x2={arr[i + 1].win * 40 + 20}
                        y2={(i + 1) * 48 + 24}
                        stroke="red"
                        strokeWidth="2"
                      />
                    ) : null
                  )}
                </svg>

                {/* Rows */}
                {[
                  { id: "20250831100051896", win: 1, icon: "S" },
                  { id: "20250831100051895", win: 6, icon: "B" },
                  { id: "20250831100051894", win: 2, icon: "S" },
                  { id: "20250831100051893", win: 3, icon: "S" },
                  { id: "20250831100051892", win: 2, icon: "S" },
                  { id: "20250831100051891", win: 9, icon: "B" },
                  { id: "20250831100051890", win: 4, icon: "S" },
                  { id: "20250831100051889", win: 6, icon: "B" },
                  { id: "20250831100051888", win: 1, icon: "S" },
                  { id: "20250831100051887", win: 9, icon: "B" },
                ].map((row, ri) => (
                  <div
                    key={ri}
                    className="grid grid-cols-[160px_repeat(10,40px)_40px] text-xs border-b border-gray-700"
                  >
                    <div className="px-2 py-3">{row.id}</div>
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-center ${
                          i === row.win
                            ? "bg-green-500 text-white rounded-full w-6 h-6 mx-auto"
                            : "text-gray-400"
                        }`}
                      >
                        {i}
                      </div>
                    ))}
                    <div
                      className={`px-2 py-3 font-bold text-center ${
                        row.icon === "S" ? "text-blue-400" : "text-yellow-400"
                      }`}
                    >
                      {row.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Pagination ---- */}
            <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-gray-700 text-sm">
              <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">
                ◀
              </button>
              <span>1/50</span>
              <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">
                ▶
              </button>
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
