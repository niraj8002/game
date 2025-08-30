import React from "react";
import { Bell, Download, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#333332] text-white px-4 py-1 flex items-center justify-between ">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-[#d9ac4f] font-bold text-xl tracking-wider mt-3">
          BDG WIN
        </h1>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Mail className="w-6 h-6 text-[#d9ac4f]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
        <Download className="w-6 h-6 text-[#d9ac4f]" />
      </div>
    </header>
  );
};

export default Header;
