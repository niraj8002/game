import React from "react";

const CountdownModal = ({ seconds, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
      <div className="rounded-2xl p-6 w-full max-w-md ">
        {/* Main Content Grid - Only 2 columns */}
        <div className="grid grid-cols-2 gap-10 items-center justify-center">
          {/* Left Column - Single Number Box */}
          <div className="flex justify-end">
            <div className="bg-[#4d4d4c]  text-center w-20 py-10 px-5  rounded-xl flex items-center justify-center ">
              <div className="text-[#d9ac4f] text-6xl font-bold">0</div>
            </div>
          </div>

          {/* Right Column - Timer Box */}
          <div className="flex justify-start">
            <div className="text-[#d9ac4f] text-6xl font-bold bg-[#4d4d4c] w-20 py-10  px-5 rounded-xl flex items-center justify-center ">
              {seconds}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownModal;
