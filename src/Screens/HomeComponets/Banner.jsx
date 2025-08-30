import React from "react";
import bnner1 from "../../assets/banner.png";
const Banner = () => {
  return (
    <div className=" relative overflow-hidden mx-2 rounded-md bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative p- flex items-center justify-between">
        <img src={bnner1} alt="banner" className="w-full  object-cover" />
      </div>
    </div>
  );
};

export default Banner;
