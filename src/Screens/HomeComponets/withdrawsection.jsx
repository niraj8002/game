import React, { useState } from "react";
import { ChevronLeft, ArrowLeft, RefreshCcw } from "lucide-react";
import { FaWallet } from "react-icons/fa";
import cbg from "../../assets/cardbg.webp";
import { LuIndianRupee } from "react-icons/lu";

function PaymentApp() {
  const [selectedAmount, setSelectedAmount] = useState("200");
  const [customAmount, setCustomAmount] = useState("₹200.00-₹20,000.00");

  const paymentChannels = [
    { name: "UPS APPay", balance: "200 - 20K", bonus: "3% bonus" },
    { name: "7Pay-GPay", balance: "200 - 20K", bonus: "3% bonus" },
    { name: "Easy-GPay", balance: "200 - 5K", bonus: "3% bonus" },
    { name: "FAST-GPay", balance: "300 - 50K", bonus: "3% bonus" },
    { name: "Magic-APPay", balance: "300 - 50K", bonus: "3% bonus" },
    { name: "UM GPay", balance: "100 - 2K", bonus: "3% bonus" },
    { name: "YaYa AEPay", balance: "500 - 50K", bonus: "3% bonus" },
    { name: "Qree AEPay", balance: "100 - 50K", bonus: "3% bonus" },
    { name: "Fast AEPay", balance: "100 - 50K", bonus: "3% bonus" },
  ];

  const depositAmounts = ["200", "500", "1K", "5K", "10K", "20K"];

  return (
    <div className="min-h-screen bg-[#333332] text-white mb-5">
      {/* Header */}
      <div className="flex items-center justify-between py-2 px-4">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer text-gray-400"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center  justify-end gap-8 w-full ml-2">
          <span className="">Deposit</span>
          <span className="text-[12px]">Deposit history</span>
        </div>
        <div></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <div className="relative">
          <div
            className="rounded-2xl p-4 text-black shadow-md w-90 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${cbg})` }}
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80 flex items-center gap-2">
                  <FaWallet className="text-yellow-700" /> Balance
                </p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  ₹0.00 <RefreshCcw className="w-4 h-4" />
                </p>
              </div>
            </div>

            {/* Bottom Row */}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-4 gap-1">
          <div className="relative ">
            <div
              className="bg-gradient-to-l from-[#f7e18f] via-[#e6c15f] to-[#b8860b] 
 rounded-lg p-1 text-center flex  flex-col justify-center items-center text-yellow-700"
            >
              <img
                src="https://ossimg.bdg123456.com/BDGWin/payNameIcon/payNameIcon2_20240324160846gdbv.png"
                className="w-[60px] h-[40px] mt-1 "
              />
              <p className="text-[10px]">Wallet UPI app</p>
            </div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
              1
            </span>
          </div>
          <div className="relative">
            <div className="bg-[#515151] rounded-lg p-1 text-center flex  flex-col justify-center items-center">
              <img
                src="https://ossimg.bdg123456.com/BDGWin/payNameIcon/payNameIcon_20240324160932wef3.png"
                className="w-[40px] h-[40px] mt-1 "
              />
              <p className="text-[10px]">UPI-GPay</p>
            </div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
              1
            </span>
          </div>
          <div className="relative">
            <div className="bg-[#515151] rounded-lg p-1 text-center flex  flex-col justify-center items-center">
              <img
                src="https://ossimg.bdg123456.com/BDGWin/payNameIcon/payNameIcon_20241001160501fwkx.png"
                className="w-[40px] h-[40px] mt-1 "
              />
              <p className="text-[10px]">UPI PayTM</p>
            </div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
              1
            </span>
          </div>
          <div className="relative">
            <div className="bg-[#515151] rounded-lg p-1 text-center flex  flex-col justify-center items-center">
              <img
                src="https://ossimg.bdg123456.com/BDGWin/payNameIcon/payNameIcon_20240323192848q2ac.png"
                className="w-[40px] h-[40px] mt-1 "
              />
              <p className="text-[10px]">USTD</p>
            </div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
              1
            </span>
          </div>
          <div className="relative">
            <div className="bg-[#515151] rounded-lg p-1 text-center flex  flex-col justify-center items-center">
              <img
                src="https://ossimg.bdg123456.com/BDGWin/payNameIcon/payNameIcon_202411110010111pjf.png"
                className="w-[40px] h-[40px] mt-1 "
              />
              <p className="text-[10px]">USTD</p>
            </div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
              1
            </span>
          </div>
        </div>

        {/* Select Channel */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-yellow-400 font-semibold">
              Select channel
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {paymentChannels.map((channel, index) => (
              <div
                key={index}
                className={` rounded-lg p-3 ${
                  channel.name == "UPS APPay"
                    ? "bg-gradient-to-l from-[#f7e18f] via-[#e6c15f] to-[#b8860b] text-yellow-800"
                    : "bg-[#515151] text-yellow-400"
                }`}
              >
                <p className=" font-semibold text-sm mb-1">{channel.name}</p>
                <p className="text-gray-400 text-xs mb-1">
                  Balance {channel.balance}
                </p>
                <p className="text-gray-400 text-xs">{channel.bonus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit Amount */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl shadow-md">
          {/* Header */}
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-yellow-400 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-3V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4c-1.1 0-2 .9-2 2v11a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8c0-1.1-.9-2-2-2ZM9 4h6v2H9V4Zm11 15H4V8h16v11Z" />
            </svg>
            <span className="text-white font-semibold text-[15px]">
              Deposit amount
            </span>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {depositAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`rounded-md border px-3 py-2 font-medium transition w-full
        ${
          selectedAmount === amount
            ? "border-yellow-400 text-[#d9a140] bg-black/40"
            : "border-gray-800 text-[#d9a140] bg-transparent"
        }`}
              >
                <div className="flex justify-center items-center gap-1">
                  <LuIndianRupee className="text-sm" />
                  <span>{amount}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="relative flex items-center bg-[#1e1e1e]  rounded-full px-3 py-2">
            <LuIndianRupee className="mr-3 text-[#d9a140]" size={20} />
            <input
              put
              type="text"
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder=" ₹ 200.00 - ₹ 20,000.00"
              className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400 placeholder:text-[#d9a140] placeholder:text-[12px] text-[12px] rounded-full"
            />
            <button
              onClick={() => setCustomAmount("")}
              className="text-gray-500 hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Recharge Instructions */}
        <div>
          <div className="flex items-center mb-3">
            <div className="w-4 h-4 bg-[#d9a140] rounded mr-2"></div>
            <span className="text-yellow-100 font-semibold">
              Recharge instructions
            </span>
          </div>

          <div className="space-y-2 text-gray-300 text-sm">
            <div className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>
                If the transfer time is up, please fill out the deposit form
                again
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>
                The transfer amount must match the order you created, otherwise
                the money cannot be credited successfully
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>
                If you transfer the wrong amount, our company will not be
                responsible for the lost amount
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>
                Note: do not cancel the deposit order after the money has been
                transferred
              </span>
            </div>
          </div>
        </div>

        {/* Deposit History */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-[#d9a140] rounded mr-2"></div>
            <span className="text-yellow-100 font-semibold">
              Deposit history
            </span>
          </div>

          <div className=" rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
            </div>
            <p className="text-gray-400 mb-4">No data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentApp;
