import React from "react";
import GameCard from "./GameCard";
import game1 from "../../assets/game1.png";
import game2 from "../../assets/game2.png";
import game3 from "../../assets/game3.png";
import game4 from "../../assets/game4.png";
import game5 from "../../assets/game5.png";
import game6 from "../../assets/game6.png";
import game7 from "../../assets/game7.png";
import game8 from "../../assets/game8.png";
import {
  Zap,
  Car,
  Trophy,
  Gamepad2,
  Coins,
  Palette,
  Fish,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const GameGrid = () => {
  const games = [
    { title: "Popular", icon: game1, herf: "/Activity" },
    { title: "Lottery", icon: game2, herf: "/Activity" },
    { title: "Slots", icon: game3, herf: "/Activity" },
  ];
  const games2 = [
    {
      title: "Sports",
      icon: game4,
      iconColor: "text-blue-600",
      herf: "/Activity",
    },
    {
      title: "Casino",
      icon: game5,
      iconColor: "text-green-600",
      herf: "/Activity",
    },
    {
      title: "Rummy",
      icon: game6,
      iconColor: "text-pink-600",
      herf: "/Activity",
    },
  ];
  const games3 = [
    {
      title: "Fishing",
      icon: game7,
      iconColor: "text-cyan-600",
      herf: "/Activity",
    },
    {
      title: "Original",
      icon: game8,
      iconColor: "text-orange-600",
      herf: "/Activity",
    },
  ];

  return (
    <div className="mx-2 mt-3">
      <div className="grid grid-cols-3 gap-3">
        {games.map((game, index, herf) => (
          <GameCard
            key={index}
            title={game.title}
            icon={game.icon}
            herf={game.herf}
          />
        ))}
      </div>
      <div className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer p-2 mt-3">
        <div className="grid grid-cols-3 divide-x divide-yellow-300">
          {games2.map((item, idx) => (
            <Link
              to={item.herf}
              key={idx}
              className="flex flex-col items-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w- h-16 object-contain mb-2"
              />
              <span className="text-black font-semibold text-sm">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {games3.map((item, idx) => {
          return (
            <>
              <Link
                to={item.herf}
                className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] rounded-xl p-4 flex flex-col items-center justify-center h-24 shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative"
              >
                <div className="absulate top-0">
                  <img
                    src={item.icon}
                    alt="game"
                    className="h-16 object-contain mb-2"
                  />
                </div>
                <span className="text-black font-semibold text-sm text-start">
                  {item.title}
                </span>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;
