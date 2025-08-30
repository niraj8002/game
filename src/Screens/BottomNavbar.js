import React from "react";
import { Home, Activity, Gift, Wallet, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const location = useLocation(); // current path
  const currentPath = location.pathname;

  const navItems = [
    { id: "home", icon: Home, label: "Home", to: "/" },
    { id: "activity", icon: Activity, label: "Activity", to: "/Activity" },
    {
      id: "promotion",
      icon: Gift,
      label: "Promotion",
      badge: true,
      to: "/loginScreen",
    },
    { id: "wallet", icon: Wallet, label: "Wallet", to: "/Wallet" },
    { id: "account", icon: User, label: "Account", to: "/Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.to;
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`flex flex-col items-center py-2 px-3 relative ${
                isActive ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
