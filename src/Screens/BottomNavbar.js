import React, { useState } from "react";
import { Home, Activity, Gift, Wallet, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

const GOLD_TEXT = "text-yellow-600";
const GOLD_BG = "bg-amber-400";
const GOLD_BG_DARK = "bg-amber-500";
const CHARCOAL_BG = "bg-zinc-900";
const BORDER = "border-zinc-800";
const MUTED = "text-zinc-400";

export default function BottomNavbar() {
  const { pathname } = useLocation();
  const [path, setPath] = useState("/");

  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    {
      id: "activity",
      icon: BiSolidShoppingBagAlt,
      label: "Activity",
       href: "/newActivity",
    },
    {
      id: "promotion",
      icon: Gift,
      label: "Promotion",
      badge: true,
      href: "/Agency",
    },
    { id: "wallet", icon: Wallet, label: "Wallet", href: "/Wallet" },
    { id: "account", icon: User, label: "Account", href: "/Profile" },
  ];

  return (
    <nav
      className={`fixed -bottom-2 left-0 right-0 ${CHARCOAL_BG} border-t ${BORDER} z-50`}
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div className="relative flex items-center justify-around py-2 pb-[calc(env(safe-area-inset-bottom,0)+0.5rem)]">
        {navItems.map((item) => {
          const isActive = pathname == item.href;

          const isPromotion = item.id === "promotion";

          return (
            <div key={item.id} className="relative flex-1">
              {/* Add to Desktop pill above Promotion (always visible like in screenshot) */}
              {isPromotion && pathname == "/" && (
                <div className="absolute bottom-20 -top-30 left-1/2 -translate-x-1/2 z-20 ">
                  <button
                    type="button"
                    className={`flex items-center w-full gap-2 rounded-full ${GOLD_BG} text-zinc-900 px-4 py-2 shadow-lg border border-amber-300 text-[12px] bg-gradient-to-b from-[#e4cb57] to-[#da9b1dd7]`}
                    aria-label="Add to Desktop"
                  >
                    <span className="font-semibold tracking-wide flex justify-center items-center ">
                      BDG <span className="ml-2 truncate">Add to Desktop</span>
                    </span>
                  </button>
                </div>
              )}

              {/* Gold notch above Promotion */}
              {isPromotion && (
                <Link
                  to={"/LoginScreen"}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="w-12 h-12 rotate-45 rounded-md shadow-lg border-4 border-gray-400 bg-gradient-to-t from-[#dfc75d] to-[#f8b839] flex items-center justify-center">
                    <span className="-rotate-45 text-zinc-900 font-extrabold leading-none text-2xl">
                      V
                    </span>
                  </div>
                </Link>
              )}

              <Link
                to={item.href}
                className={`flex flex-col items-center py-2 px-3 relative ${
                  isActive ? GOLD_TEXT : MUTED
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  {item.badge && (
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"
                      aria-label="New items"
                    />
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
