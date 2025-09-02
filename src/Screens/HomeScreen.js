import React, { useRef, useState, useContext,useEffect } from "react";
import Banner from "./HomeComponets/Banner";
import AnnouncementBar from "./HomeComponets/AnnouncementBar";
import GameGrid from "./HomeComponets/GameGrid";
import SlotsSection from "./HomeComponets/SlotsSection";
import WinningInformation from "./HomeComponets/WinningInformation";
import EarningsChart from "./HomeComponets/earingchat";
import { UserContext } from "../globalContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import DepositBonusPopup from "./DepositePopup";
const HomeScreen = () => {
    const user = useContext(UserContext);
  let navigate = useNavigate();
  // 🔹 slots section ke liye ref
  const slotsRef = useRef(null);

  const [activeSlotView, setActiveSlotView] = useState("default");

const [showPopup, setShowPopup] = useState(false);

  // Show popup automatically after entering the home screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500); // delay 0.5s for smoothness

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {

    let mounted = true;
    if (mounted) {


      // if (user.userId === null) {
      //   localStorage.clear();
      //   navigate('/LoginScreen', { replace: true });
      // }


    }
    pageLoad();
    return () => (mounted = false);
  }, []);


  const pageLoad = () => {

  }
  const [wallet ,setWallet] = useState(null)
 var count = 1;
  // 🔹 function jo GameGrid se call hoga
  const getWallet = () => {
    axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
      if (res.data.data === null) {
        count = count + 1;
        if (count < 5) {
          getWallet();
        }
        if (count === 5) {
          const data1 = {
            member: user.userId,
            amount: 0,
            winningAmount: 0,
            RefralWinningAmount: 0,
            depositeAmount: 10,
            bonus: 100,
            winningFreezAmount: 0,
            totalWinningAmount: 0,
          }
          axiosInstance.post("/wallet", data1).then((res) => {
          });
        }
      }
      else{
        let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
        setWallet(Math.floor(amount));
      }
    });
  }

  const handleGameClick = (id) => {
    if (slotsRef.current) {
      slotsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    

// 🔹 Agar 1st index select hua → alag component dikhaye
    if (id === 2) {
      setActiveSlotView("special");
    } else {
      setActiveSlotView("default");
    }
  };

  return (
    <div className="min-h-screen bg-[#333332] text-white pb-20">
      {/* Banner Section */}
      <Banner />

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Game Cards Grid → pass callback */}
      <GameGrid onGameClick={handleGameClick} />

      {/* Slots Section → ref attach karo */}
      <div ref={slotsRef}>
        <SlotsSection activeSlotView={activeSlotView} />
      </div>

      <WinningInformation />
      <EarningsChart />
            {showPopup && <DepositBonusPopup onClose={() => setShowPopup(false)} />}

    </div>
  );
};

export default HomeScreen;
