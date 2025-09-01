import React, { useState } from "react";

const ColorModal = ({ open, onClose, color }) => {
  const [selectedBalance, setSelectedBalance] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [agreed, setAgreed] = useState(false);

  if (!open) return null;

  // Modal color styles
  const colorStyles = {
    green: "bg-gradient-to-r from-[#3faa70] to-[#47ba7c]",
    red: "bg-gradient-to-r from-[#fc5050] to-[#ff646c]",
    violet: "bg-gradient-to-r from-[#9b48db] to-[#b678e6]",
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const totalAmount = selectedBalance * quantity;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 ">
        {/* Modal Box */}
        <div className="w-full max-w-md rounded-t-3xl bg-[#242424] text-white overflow-hidden animate-slideUp">
          {/* Header - Green Section */}
          <div
            className={`${colorStyles[color]} px-10 py-2 text-center relative`}
          >
            <h3 className="text-white font-semibold text-lg mb-2">
              WinGo 30sec
            </h3>
            <div className="bg-white text-black py-1 px- rounded-lg font-semibold">
              Select {color?.charAt(0).toUpperCase() + color?.slice(1)}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Balance Section */}
            <div className="flex justify-between items-center mb-3">
              {/* Left side label */}
              <h4 className="text-white text-lg font-semibold">Balance</h4>

              {/* Right side buttons */}
              <div className="flex gap-2">
                {[1, 10, 100, 1000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedBalance(amt)}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                      selectedBalance === amt
                        ? `${colorStyles[color]} text-white`
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Section */}
            <div className="flex justify-between items-center mb-3">
              {/* Left side label */}
              <h4 className="text-white text-lg font-semibold">Quantity</h4>

              {/* Right side controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={`w-10 h-10 rounded-lg ${colorStyles[color]} text-[#8f5214] font-bold flex items-center justify-center`}
                >
                  -
                </button>

                <div className="w-16 h-10 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-center">
                  <span className="text-white font-semibold">{quantity}</span>
                </div>

                <button
                  onClick={() => handleQuantityChange(1)}
                  className={`w-10 h-10 rounded-lg ${colorStyles[color]} text-[#8f5214] font-bold flex items-center justify-center`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Multipliers Section */}
            <div className="grid grid-cols-6 gap-2 ml-5">
              {[1, 5, 10, 20, 50, 100].map((x) => (
                <button
                  key={x}
                  className="py-2 px-2 bg-gray-800 text-gray-300 rounded-lg font-semibold text-xs hover:bg-gray-700 transition-colors"
                >
                  X{x}
                </button>
              ))}
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      agreed
                        ? `${colorStyles[color]} border-green-500`
                        : "border-gray-500 bg-transparent"
                    }`}
                  >
                    {agreed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-300 text-sm ml-2">
                  I agree <span className="text-red-400">(Pre-sale rules)</span>
                </span>
              </label>
            </div>

            {/* Footer Buttons */}
          </div>
          <div className="flex pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 text-gray-300 py-3  font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              className={`flex-1 py-3 font-semibold text-white ${colorStyles[color]} hover:opacity-90 transition-opacity`}
            >
              Total amount ₹{totalAmount}.00
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorModal;
