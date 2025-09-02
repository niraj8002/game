
import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { FaMobileAlt, FaLock } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const SignupScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    countryCode: "+91",
    mobile: "",
    name: "user",
    email: "user@gmail.com",
    password: "",
    confirmPassword: "",
    inviteCode: "",
    agreeToPrivacy: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobile || !formData.password || !formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.agreeToPrivacy) {
      alert("You must agree to the Privacy Statement.");
      return;
    }

    try {
      const payload = {
        mobile: formData.mobile,
        password: formData.password,
        name: "user",
        email: "user@GrMail.com",
      };

      const res = await axiosInstance.post("/member", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.responseCode === 1) {
        alert("Registration successful! Please login.");
        navigate("/LoginScreen");
      } else {
        alert(res.data.responseMessage || "Registration failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-start mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">Register</h1>
          <p className="text-gray-400 text-sm">
            Please register with your phone number or email
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Phone Number */}
          <div className="space-y-1 mb-4">
            <label className="flex items-center gap-3 text-[#d9ac4f] text-md font-medium">
              <FaMobileAlt /> Phone number
            </label>
            <div className="flex">
              <div className="relative">
                <select
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange("countryCode", e.target.value)}
                  className="bg-gray-800 text-gray-300 px-3 py-3 rounded-l-lg focus:outline-none appearance-none pr-8"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+86">+86</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className="flex-1 bg-gray-800 text-gray-300 px-4 py-3 rounded-r-xl focus:outline-none placeholder-gray-500 placeholder:text-[13px]"
              />
            </div>
          </div>

          {/* Name */}
          {/* <div className="space-y-1 mb-4">
            <label className="text-[#d9ac4f] text-md font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500"
            />
          </div> */}

          {/* Email */}
          {/* <div className="space-y-1 mb-4">
            <label className="text-[#d9ac4f] text-md font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500"
            />
          </div> */}

          {/* Password */}
          <div className="space-y-1 mb-4">
            <label className="flex items-center gap-3 text-[#d9ac4f] text-md font-medium">
              <FaLock />
              Set password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Set password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none pr-12 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 mb-4">
            <label className="flex items-center gap-3 text-[#d9ac4f] text-md font-medium">
              <FaLock />
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none pr-12 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Invite Code (optional) */}
          <div className="space-y-1 mb-6">
            <label className="flex items-center gap-3 text-[#d9ac4f] text-md font-medium">
              <FcInvite />
              Invite code
            </label>
            <input
              type="text"
              placeholder="Enter invitation code (optional)"
              value={formData.inviteCode}
              onChange={(e) => handleInputChange("inviteCode", e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500"
            />
          </div>

          {/* Privacy Agreement */}
          <div className="flex items-start space-x-3 mb-6">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.agreeToPrivacy}
              onChange={(e) => handleInputChange("agreeToPrivacy", e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-[#d9ac4f] cursor-pointer"
            />
            <label htmlFor="privacy" className="text-gray-400 text-sm leading-relaxed">
              I have read and agree to the{" "}
              <a href="#" className="text-[#d9ac4f] underline">
                Privacy Statement
              </a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="text-[#4f3a05] w-full text-center py-2 rounded-2xl font-medium text-md bg-gradient-to-r from-[#dcc68b] to-[#bd9632] hover:bg-yellow-400"
          >
            Register
          </button>

          {/* Login Link */}
          <div className="text-center mt-4 border border-[#82600a] rounded-2xl py-2">
            <span className="text-gray-400 text-sm">Already have an account? </span>
            <Link to="/LoginScreen" className="text-sm font-medium text-[#d9ac4f] hover:text-yellow-400">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
