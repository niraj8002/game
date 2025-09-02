import { useState } from "react";

export default function DepositBonusPopup({ onClose }) {
  const bonusOptions = [
    { deposit: 200000, bonus: 10000 },
    { deposit: 100000, bonus: 5000 },
    { deposit: 30000, bonus: 2000 },
    { deposit: 10000, bonus: 600 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-3" style={{marginBottom:'120px'}}>
      {/* Wrapper to allow close button below popup */}
      <div className="relative w-full max-w-sm mb-1">
        {/* Popup Box */}
        <div className="bg-gray-200 rounded-2xl shadow-xl">
          {/* Header */}
          <div className=" text-center p-1 rounded-t-2xl" style={{backgroundColor:'#4d4d4c'}}>
            <h2 className="text-white text-lg font-bold">
              Extra first deposit bonus
            </h2>
            <p className="text-white text-xs mt-1">
              Each account can only receive rewards once
            </p>
          </div>

          {/* Bonus List */}
          <div className="max-h-[55vh] overflow-y-auto p-4 space-y-4" style={{backgroundColor:'#333332'}} >
            {bonusOptions.map((item, idx) => (
              <div
                key={idx}
                className="  p-2 shadow-sm  "    
                style={{backgroundColor:'#4d4d4c',borderRadius:'20px'}}
              >
                <div className="flex justify-between items-center ">
                  <p className="text-sm font-semibold text-white">
                    First deposit{" "}
                    <span className="text-yellow-600">
                      {item.deposit.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-yellow-600 font-bold">
                    + ₹{item.bonus.toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-300 text-xs mb-3">
                  Deposit {item.deposit.toLocaleString()} for the first time and
                  you will receive {item.bonus.toLocaleString()} bonus
                </p>

                 <div className="flex justify-between items-center ">
                  <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden mb-3">
                  <div className="bg-black h-3 w-0"></div>
                </div>

                {/* Deposit button */}
                
                <button className="border-yellow-800 text-yellow-600 w-full py-1 rounded-md font-semibold hover:bg-yellow-600 transition" style={{width:'100px', border:"2px solid #dd9138", marginLeft:"40px"}}>
                  Deposit
                </button>
                </div>
                {/* Progress bar */}
               
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-200 border-t border-gray-300 rounded-b-2xl" style={{backgroundColor:'#4d4d4c'}}>
            <label className="flex items-center text-gray-600 text-xs space-x-2">
              <input
                type="radio"
                name="reminder"
                className="accent-orange-500"
              />
              <span className="text-gray-300">No more reminders today</span>
            </label>
            <button className="bg-yellow-600 px-6 py-1 rounded-full text-black font-semibold hover:bg-yellow-500">
              Activity
            </button>
          </div>
        </div>

        {/* Close Button (always centered below popup) */}
        <button
          onClick={onClose}
          className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md text-black font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
