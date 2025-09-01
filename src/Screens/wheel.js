import React from "react";
import wheel from "../assets/wheel.png";

const WheelWidget = () => {
  return (
    <div
      className="fixed bottom-40 right-4 cursor-pointer z-30"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden drop-shadow-lg">
        <img
          src={wheel}
          alt="Spin Wheel"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default WheelWidget;
