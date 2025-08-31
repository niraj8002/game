import React from "react";
import { useState } from "react";

function PaymentApp() {
  const [selectedChannel, setSelectedChannel] = useState("UPI-APPpay");
  const [selectedAmount, setSelectedAmount] = useState("");

  const channels = [
    { name: "UPI-APPpay", balance: "200 - 20K", bonus: "3% bonus" },
    { name: "Easy/Offpay", balance: "200 - 5K", bonus: "3% bonus" },
    { name: "Magic-APPpay", balance: "300 - 50K", bonus: "3% bonus" },
    { name: "YAYai-APPpay", balance: "500 - 50K", bonus: "3% bonus" },
    { name: "Evel-APPpay", balance: "100 - 50K", bonus: "3% bonus" },
  ];

  const amounts = ["200", "500", "1K", "5K", "10K", "20K"];

  const historyItems = [
    { method: "UPI-APPpay", status: "Dropout", date: "Today, 15:42 PM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
          <h1 className="text-2xl font-bold text-center">Select Channel</h1>
        </div>

        <div className="p-5">
          {/* Channel Selection */}
          <div className="space-y-4 mb-8">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedChannel === channel.name
                    ? "border-blue-500 border-l-4 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedChannel(channel.name)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {channel.name}
                  </h3>
                  {selectedChannel === channel.name && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">Balance: {channel.balance}</p>
                <div className="mt-2">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded">
                    {channel.bonus}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Deposit Amount */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Deposit amount
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  className={`py-3 rounded-lg border font-semibold transition-all ${
                    selectedAmount === amount
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-blue-500 border-gray-300 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-center font-semibold text-gray-700">
                £200.00 - £20,000.00
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6"></div>

          {/* Recharge Instructions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Recharge instructions
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                If the transfer time is up, please fill out the deposit form
                again.
              </li>
              <li>
                The transfer amount must match the order you created, otherwise
                the money cannot be credited successfully.
              </li>
              <li>
                If you transfer the wrong amount, our company will not be
                responsible for the lost amount.
              </li>
              <li>
                Note: do not cancel the deposit order after the money has been
                transferred.
              </li>
            </ul>
          </div>

          {/* Deposit History */}
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Deposit history
            </h2>
            {historyItems.map((item, index) => (
              <div
                key={index}
                className="bg-red-50 p-4 rounded-lg mb-3 border-l-4 border-red-500"
              >
                <p className="font-medium">
                  <span className="text-gray-700">Recharge Method:</span>{" "}
                  {item.method}
                </p>
                <p className="font-medium mt-1">
                  <span className="text-gray-700">Status:</span>
                  <span className="text-red-600 ml-1">{item.status}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentApp;
