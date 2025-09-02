import React from "react";
import { Bell, Download, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import usa from "../assets/usa.webp";
import { MdOutlineArrowBackIosNew } from "react-icons/md"; // You can replace this with an arrow icon if needed

const Header = () => {
   let navigate = useNavigate()
  const location = useLocation();
  const currentPath = location.pathname;
  const HideNavbar = ["/Profile", "/Wallet"].includes(currentPath);
  const HideBackBtn = ["/"].includes(currentPath);
  const HideNav = ["/LoginScreen", "/SignupScreen"].includes(currentPath);

  return (
    !HideNavbar && (
      <header className="bg-[#333332] text-white px-4 py-1 flex items-center justify-between">
        {/* Left arrow button */}
        {!HideBackBtn && (
          <button
            className="flex items-center text-gray-500"
            onClick={() => window.history.back()}
          >
            <MdOutlineArrowBackIosNew className="w-3 h-3 cursor-pointer" />
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="logo" className="h-11" />
        </div>

        {/* Right side icons */}
        {HideNav ? (
          <div className="flex items-center gap-2">
            <img src={usa} alt="use" className="w-6 h-6" />
            <span className="text-[#d9ac4f]">EN</span>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="relative" onClick={()=>{navigate("/Notification")}} >
              <Mail className="w-6 h-6 text-[#d9ac4f]" />

              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <Download className="w-6 h-6 text-[#d9ac4f]" />
          </div>
        )}
      </header>
    )
  );
};

export default Header;
