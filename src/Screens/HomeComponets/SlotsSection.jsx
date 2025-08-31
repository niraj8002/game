import React from "react";
import slot1 from "../../assets/slot1.png";
import slot2 from "../../assets/slot2.png";
import slot3 from "../../assets/slot3.png";
import slot4 from "../../assets/slot4.png";
import slot5 from "../../assets/slot5.png";
import slot6 from "../../assets/slot6.png";
import LotteryApp from "./LotteryAppUi";

// Optional: a special component for "special" view
const SpecialSlots = () => (
  <div className="text-center p-6 bg-purple-800 rounded-lg">
    <h2 className="text-yellow-400 font-bold text-xl mb-4">🎰 Special Slots!</h2>
    <p>Enjoy the exclusive JDB game collection!</p>
  </div>
);

const SlotsSection = ({ activeSlotView }) => {
  const slots = [
    { id: 1, img: slot1, name: "JDB GAME" },
    { id: 2, img: slot2, name: "CQ9 GAME" },
    { id: 3, img: slot3, name: "WM GAME" },
    { id: 4, img: slot4, name: "PG GAME" },
    { id: 5, img: slot5, name: "JILI GAME" },
    { id: 6, img: slot6, name: "PRAGMATIC" },
  ];


  console.log(activeSlotView ,"activeSlotView")

  // ✅ Conditional rendering
  if (activeSlotView === "special") {
    
    return <LotteryApp />;
  }

  return (
    <div className="mx-2 mt-6">
      <h3 className="text-yellow-400 font-bold text-lg mb-4">| Slots</h3>
      <div className="grid grid-cols-3 gap-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-b from-yellow-200/40 to-yellow-400/30"
          >
            <img
              src={slot.img}
              alt={slot.name}
              className="w-full h-30 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotsSection;
