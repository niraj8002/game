import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ title, icon, herf, onClick }) => {
  return (
  <Link
  onClick={onClick}
  className="bg-gradient-to-br from-[#FBE29C] to-[#F6C444] 
             rounded-xl p-3 flex flex-col items-center justify-center 
             h-28 shadow-lg hover:shadow-xl transition-shadow 
             cursor-pointer"
>
  <img
    src={icon}
    alt={title}
    className="h-16 w-16 object-contain mb-2"
  />
  <span className="text-black font-semibold text-sm text-center">
    {title}
  </span>
</Link>

  );
};

export default GameCard;
