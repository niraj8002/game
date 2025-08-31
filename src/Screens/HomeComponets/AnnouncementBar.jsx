import React from "react";
import { Volume2 } from "lucide-react";
import { FaFire } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AnnouncementBar = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-2 mt-2 p-1 flex items-center justify-between px-2 py-2">
      <div className="flex items-center space-x-3 flex-1">
        <Volume2 className="w-6 h-6 text-yellow-400 flex-shrink-0" />
        <p className="text-gray-300 text-[10px] leading-tight font-medium tracking-medium">
          Please Fill In The Correct Bank Card Information. The Platform Will
          Process Withdrawa...
        </p>
      </div>
      <button
        className="bg-gradient-to-b from-[#e0be72] to-[#d1a84e] hover:from-yellow-500 hover:to-yellow-600 
             text-black font-medium px-3 py-1 rounded-full text-[11px] ml-3 
             flex-shrink-0 cursor-pointer flex items-center gap-2 shadow-sm"
        onClick={() => navigate("/Profile")}
      >
        <FaFire className="text-xs" /> Detail
      </button>
    </div>
  );
};

export default AnnouncementBar;
