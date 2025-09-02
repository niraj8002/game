import React, { useState } from "react";
import { Phone, Lock, Mail, ChevronDown, EyeOff, Eye } from "lucide-react";
import { FaMobileAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd"; 
import axios from "axios";
import { FaLock } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import axiosInstance from "../axiosInstance";

const LoginScreen = () => {
  const [tab, setTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔹 onSignin function
  const onSignin = async () => {
    try {
      const payload =
        tab === "phone"
          ? { mobile: phoneNumber, password: password }
          : { email: email, password: password };

      const res = await axiosInstance.post("/login", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data) {
        if (res.data.responseCode === 1) {
          // Save token or user info
          localStorage.setItem("authtoken", JSON.stringify(res.data.auth));

          // ✅ Redirect to HomeScreen
          window.location.href = "/";
        } else if (res.data.responseCode === -2) {
          message.error("Your account is temporarily frozen");
        } else if (res.data.responseCode === -1) {
          message.error("Please enter correct credentials");
        } else {
          message.error("Unexpected response, try again!");
        }
      } else {
        message.error("Invalid server response");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Please enter correct mobile number or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white flex flex-col p-4 font-sans">
      {/* Heading */}
      <div className="mb-3">
        <h2 className="text-xl font-bold text-gray-200">Log in</h2>
        <p className="text-gray-400 text-[10px] mt-1 leading-relaxed">
          Please log in with your phone number or email
          <br />
          If you forget your password, please contact customer service
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-600 px-2">
        <button
          onClick={() => setTab("phone")}
          className={`flex-1 flex-col py-3 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
            tab === "phone"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-gray-400 "
          }`}
        >
          <FaMobileAlt className="w-6 h-6" />
          <span>Phone number</span>
        </button>
        <button
          onClick={() => setTab("email")}
          className={`flex-1 flex-col py-3 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
            tab === "email"
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-gray-400"
          }`}
        >
          <Mail className="w-6 h-6" />
          <span>Email Login</span>
        </button>
      </div>

      {/* Form */}
      <div className="mt-6 space-y-5 px-2">
        {tab === "phone" ? (
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-gray-300">
              <Phone className="text-yellow-400 w-4 h-4" />
              Phone number
            </label>
            <div className="flex items-center bg-[#2a2a2a] rounded-xl px-3 py-3 ">
              <div className="flex items-center gap-1 text-gray-300 pr-2 border-r border-gray-600">
                <span className="text-sm">+91</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="enter the phone number"
                className="bg-transparent flex-1 ml-3 outline-none placeholder-gray-500 text-sm placeholder:text-[13px]"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-gray-300">
              <Mail className="text-yellow-400 w-4 h-4" />
              Mail
            </label>
            <div className="flex items-center bg-[#2a2a2a] rounded-xl px-3 py-3 ">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please input your email"
                className="bg-transparent flex-1 outline-none placeholder-gray-500 text-sm placeholder:text-[13px]"
              />
            </div>
          </div>
        )}

        {/* Password Input */}
        <div>
          <label className="flex items-center gap-2 text-sm mb-2 text-gray-300">
            <Lock className="text-yellow-400 w-4 h-4" />
            Password
          </label>
          <div className="flex items-center bg-[#2a2a2a] rounded-xl px-3 py-3 ">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent flex-1 outline-none placeholder-gray-500 text-sm placeholder:text-[13px]"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 ml-2"
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Password */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="checkbox"
              id="remember"
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
              className="sr-only"
            />
            <label
              htmlFor="remember"
              className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center cursor-pointer transition-colors ${
                rememberPassword
                  ? "border-yellow-400 bg-yellow-400"
                  : "border-gray-500 bg-transparent"
              }`}
            >
              {rememberPassword && (
                <svg
                  className="w-2 h-2 text-black"
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
            </label>
          </div>
          <label
            htmlFor="remember"
            className="text-sm text-gray-300 cursor-pointer"
          >
            Remember password
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-8 w-full">
          <button
            onClick={onSignin}
            className={`w-full py-2 rounded-2xl font-medium text-md transition-all ${
              (tab === "phone" && phoneNumber && password) ||
              (tab === "email" && email && password)
                ? "bg-[#d9ac4f] text-black hover:bg-yellow-500"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
            disabled={
              !(
                (tab === "phone" && phoneNumber && password) ||
                (tab === "email" && email && password)
              )
            }
          >
            Log in
          </button>

          <Link
            to={"/SignupScreen"}
            className="w-full text-center border border-yellow-400  py-2 rounded-2xl font-medium text-md  bg-gradient-to-r from-[#e6c567] to-[#b8860b]  text-black transition-colors tracking-wider"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2 mt-9">
        {/* Forget Password */}
        <div className="flex flex-col items-center space-x-2">
          <FaLock className="text-yellow-600 mb-3" size={25} />
          <span className="text-[#ffffff]  text-lg">Forget Password</span>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col items-center space-x-2">
          <RiCustomerService2Line className="text-yellow-600 mb-3" size={25} />
          <span className="text-[#ffffff] text-lg">Customer Service</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
