import { icons } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ title, icon ,herf}) => {
  return (
    <Link to={herf} className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] rounded-xl p-2 flex flex-col items-center justify-center h-26 shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative">
      <div className="absulate top-0">
        <img src={icon} alt="game " />
      </div>
      <span className="text-black font-semibold text-sm text-start">
        {title}
      </span>
    </Link>
  );
};

export default GameCard;
