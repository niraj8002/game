import React, { useEffect, useMemo, useState } from "react";
import {
  Volume2,
  ArrowLeft,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import bookf from "../assets/bookf.png";
import watch from "../assets/watch.webp";
import a from "../assets/t.webp";
import b from "../assets/n.webp";
import c from "../assets/s.webp";
import d from "../assets/f.webp";
import "./TicketCard.css";
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
        "h-8 flex-1 m-1 rounded-bottom-end-circle text-sm font-bold text-white",
        base,
        active ? "ring-2 ring-gray-300 scale-105" : ""
      
      )}
      style={{borderBottomLeftRadius: "10px" ,borderTopRightRadius: "10px" }}
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

const numbers = [
  { value: 0, color: "violet" },
  { value: 1, color: "green" },
  { value: 2, color: "red" },
  { value: 3, color: "green" },
  { value: 4, color: "red" },
  { value: 5, color: "violet" },
  { value: 6, color: "red" },
  { value: 7, color: "green" },
  { value: 8, color: "red" },
  { value: 9, color: "green" },
];
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

const Dot = ({ img }) => {
  return <img src={img} className="w-7" />;
};
 var check1 = "WinGo 30sec"
 var selectColor = 'Number'
 var selectNumber = 'color'
const ActivityGame = () => {
  // UI State
  const [activeColor, setActiveColor] = useState("green");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [sizePick, setSizePick] = useState("big");

  const [tab, setTab] = useState("history");
  const [activeGame, setActiveGame] = useState("WinGo 30sec");
  const [activeGameData, setActiveGameData] = useState();

  // Timer state - starts at 13 seconds to match screenshot
  const [seconds, setSeconds] = useState(13);
 useEffect(() => {
        const interval = setInterval(() => {
            pageLoad();
            //RiderLocation();
    console.log("activeColor",selectColor)
    console.log("activeNumber",selectNumber)

        }, 1000);
        // pageLoad2();
        return () => clearInterval(interval);

    }, []);
    const pageLoad = () => {
        Countdown();
        // getWallet();
    }

const [sec1, setSec1] = useState([0]);
    const [sec2, setSec2] = useState([0]);
    const [min, setMin] = useState([0,1]);
   
  const Countdown = () => {
    // if(activeGameData !== undefined) {
    //   check1= activeGameData
    // }
    console.log("active",check1)
        var countDownDate = Date.parse(new Date) / 1e3;
        //var now = new Date().getTime();
        var distance = 30 - countDownDate % 30;
      if(check1 == "WinGo 1 Min") {
          distance = 60 - countDownDate % 60;
      }
       if(check1 == "WinGo 3 Min") {
          distance = 180 - countDownDate % 180;
      }
       if(check1 == "WinGo 5 Min") {
          distance = 300 - countDownDate % 300;
      }
        var i = distance / 60,
            n = distance % 60;
        //o = n / 10,
        // s = n % 10;
        var minutes = Math.floor(i);
        setMin([0,minutes]);
        var seconds = ('0' + Math.floor(n)).slice(-2);
        var sec11 = (seconds % 100 - seconds % 10) / 10;
        setSec1([sec11]);
        var sec22 = seconds % 10;
        setSec2([sec22]);


        if (seconds === "29") {
            // getPeriod();
            // getGameResult();

        }
        // if (seconds === "27") {
        //     getGame();

        // }
        if (seconds > 10) {
            // setIsOpen(isOpen);
        }
        else {
            if (seconds < 10) {
                // onModalClose()
                // setIsOpen(!isOpen);
            }
        }

    }


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
  //  const [activeGame, setActiveGame] = useState("WinGo 30sec");

  const games = ["WinGo 30sec", "WinGo 1 Min", "WinGo 3 Min", "WinGo 5 Min"];

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

      <div className="flex items-center justify-center gap-3  mt-4 bg-[#4d4d4c] mx-4 rounded-lg">
        {/* Active Button - WinGo 30 sec */}
        {games.map((game) => {
          const isActive = activeGame === game;
          return (
            <div
              key={game}
              onClick={() => {setActiveGame(game); console.log("game",game);check1=game }}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl cursor-pointer shadow-md transition-all duration-200 ${isActive
                  ? "bg-gradient-to-b from-[#FFD77C] to-[#E6A93A]" // active = gold
                  : "bg-gradient-to-b from-[#4c4c4b] to-[#4c4c4b]" // inactive = grey
                }`}
            >
              <img src={watch} alt="watch" className="w-10 h-10 mb-1" />
              <span
                className={`text-[12px] font-medium `}
                style={{
                  color: isActive ? "#8f5206" : "#a8a5a1",
                  cursor: "pointer"
                }}
                
                
              >
                {game}
              </span>
            </div>

          )
        })}
        {/* Inactive Button - 1 Min */}

      </div>

      {/* Main Game Area */}
      <div className="mx-4 mt-4 rounded-2xl bg-zinc-800 ">
    <div className="ticket-card">
      {/* Left Section */}
      <div className="ticket-left">
        {/* How to play button */}
        <button className="play-btn">
          <img src={bookf} alt="book" className="book-icon" />
          How to play
        </button>

        {/* Game Name */}
        <span className="game-name">{activeGame}</span>

        {/* Colored balls */}
        <div className="dots">
          <img src={a} alt="dot" className="dot" />
          <img src={b} alt="dot" className="dot" />
          <img src={c} alt="dot" className="dot" />
          <img src={d} alt="dot" className="dot" />
          <img src={b} alt="dot" className="dot" />
        </div>
      </div>

      {/* Right Section */}
      <div className="ticket-right">
        <span className="time-label">Time remaining</span>

        {/* Countdown */}
        <div className="countdown">
          {[min[0], min[1], ":", sec1[0], sec2[0]].map((d, i) => (
            <span
              key={i}
              className={d === ":" ? "colon" : "digit"}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Period ID */}
        <span className="period-id">{periodId}</span>
      </div>

      {/* Ticket Cutouts */}
      {/* <div className="cutout cutout-left"></div>
      <div className="cutout cutout-right"></div> */}
    </div>



        {/* Color Betting */}

        <div className="grid grid-cols-3 gap-2 mb-4">
          <PillButton
            label="Green"
            color="green"
            active={activeColor === "green"}
            onClick={() =>{ setActiveColor("green");selectColor = "green";selectNumber= 'color'}}
          />
          <PillButton
            label="Violet"
            color="violet"
            active={activeColor === "violet"}
            onClick={() => {setActiveColor("violet");selectColor = "violet";selectNumber= 'color'}}
          />
          <PillButton
            label="Red"
            color="red"
            active={activeColor === "red"}
            onClick={() => {setActiveColor("red");selectColor = "red";selectNumber= 'color'}}
          />
        </div>

        {/* Number Balls */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {numbers.map((n) => (
            <NumberBall
              key={n}
              n={n}
              selected={selectedNumbers.includes(n)}
              onClick={() => {toggleNumber(n); ;selectColor = "Number";selectNumber= n}}
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
                        className={`flex items-center justify-center ${i === row.win
                            ? "bg-green-500 text-white rounded-full w-6 h-6 mx-auto"
                            : "text-gray-400"
                          }`}
                      >
                        {i}
                      </div>
                    ))}
                    <div
                      className={`px-2 py-3 font-bold text-center ${row.icon === "S" ? "text-blue-400" : "text-yellow-400"
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
