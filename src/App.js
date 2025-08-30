import React, { useState, useEffect } from "react";
// import "./App.css";
import "./index.css";
import { Route, BrowserRouter, Routes, HashRouter } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import { useJwt, decodeToken } from "react-jwt";
import { UserContext } from "./globalContext";

import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";

import RoleScreen from "./Screens/Role/RoleScreen";

import UserRoleScreen from "./Screens/Role/UserRoleScreen";

import Notifiction from "./Screens/Notification/notification";

import Support from "./Screens/Support/Support";

import UserWallet from "./Screens/Ludo/wallet";
import History from "./Screens/Ludo/History";
import Profile from "./Screens/Ludo/profile";
import Refere from "./Screens/Ludo/Refere";
import Recharge from "./Screens/Ludo/recharge";
import Withdraw from "./Screens/Ludo/withdraw";

import RechargeAdmin from "./Screens/LudoAdmin/Recharge";
import WithdrawAdmin from "./Screens/LudoAdmin/Withdraw";

import Guide from "./Screens/Ludo/guide";
import Terms from "./Screens/Ludo/terms";
import Fastparity from "./Screens/Ludo/FastParity";
import Parity from "./Screens/Ludo/Parity";
import Dice from "./Screens/Ludo/dice";
import JetX from "./Screens/Ludo/jet";
import Order from "./Screens/Ludo/order";
import Record from "./Screens/Ludo/Record";
import Header from "./Screens/header";
import BottomNavbar from "./Screens/BottomNavbar";
import ChatWidget from "./Screens/chatwith";
import WheelWidget from "./Screens/wheel";
import ActivityGame from "./Screens/Activity";

require("./Screens/login.css");

function App() {
  const [waitstate, setWaitstate] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  // const { authToken, isExpired } = useJwt(JSON.parse(localStorage.getItem("authtoken")));

  useEffect(() => {
    if (
      localStorage.getItem("authtoken") !== null &&
      localStorage.getItem("authtoken") !== undefined
    ) {
      const myDecodedToken = decodeToken(
        JSON.parse(localStorage.getItem("authtoken"))
      );
      if (myDecodedToken.role === undefined) {
        myDecodedToken.role = "test";
        setAuthToken(myDecodedToken);
      } else {
        setAuthToken(myDecodedToken);
      }

      setWaitstate(false);
      localStorage.setItem(
        "username",
        JSON.parse(localStorage.getItem("authtoken")).name
      );
    } else {
      setWaitstate(false);
      setAuthToken(null);
      // window.location.href = "/";
      //navigate("/LoginScreen", { replace: true });
    }
  }, []);
  const validation = () => {
    const myDecodedToken = decodeToken(
      JSON.parse(localStorage.getItem("authtoken"))
    );
    setAuthToken(myDecodedToken);
  };

  return (
    <HashRouter>
      <div className="App">
        {!waitstate && (
          <UserContext.Provider
            value={
              authToken !== null
                ? {
                    userId: authToken._id === undefined ? 1 : authToken._id,
                    userName: authToken.name === undefined ? 1 : authToken.name,
                    memberId: authToken.id === undefined ? 1 : authToken.id,
                    role:
                      authToken.role === undefined ? 1 : authToken.role.name,
                    mobile:
                      authToken.mobile === undefined ? 1 : authToken.mobile,
                    memberReferCode:
                      authToken.memberReferCode === undefined
                        ? 1
                        : authToken.memberReferCode,
                    roleId:
                      authToken.role === undefined ? 1 : authToken.role._id,
                    registerDate:
                      authToken.registerDate === undefined
                        ? 1
                        : authToken.registerDate,
                    config: {
                      dateFormat: "DD-MMM-YYYY",
                      datetimeFormat: "DD-MMM-YYYY HH:mm",
                      datetimeFormatWithoutYear: "DD-MMM HH:mm",
                      datetimeSecondFormat: "DD-MMM-YYYY HH:mm:ss",
                      datetimeSecondFormatAMPM: "DD-MMM-YYYY hh:mm:ss A",
                      timeFormat: "hh:mm:ss A",
                    },
                  }
                : {
                    userId: null,
                    config: {
                      dateFormat: "DD-MMM-YYYY",
                      datetimeFormat: "DD-MMM-YYYY HH:mm",
                      datetimeFormatWithoutYear: "DD-MMM HH:mm",
                      datetimeSecondFormat: "DD-MMM-YYYY HH:mm:ss",
                      datetimeSecondFormatAMPM: "DD-MMM-YYYY hh:mm:ss A",
                      timeFormat: "hh:mm:ss A",
                    },
                  }
            }
          >
            <Layout className="layout">
              {/* {(authToken== undefined) && (authToken== null) &&
        <Nav2 />} */}
              {/* {(authToken && authToken.id !== undefined) && (authToken && authToken.id !== null) &&
        <Nav authToken={authToken} />} */}
              <ConfigProvider locale={enUS}>
                <Header />
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="LoginScreen" element={<LoginScreen />} />
                  <Route
                    path="SignupScreen"
                    element={<SignupScreen authToken={authToken} />}
                  />

                  {/* <Route path="Dummy" element={<PrintList/>}/> */}
                  <Route path="HomeScreen" element={<HomeScreen />} />

                  <Route path="RoleScreen" element={<RoleScreen />} />
                  <Route path="Wallet" element={<UserWallet />} />
                  <Route path="History" element={<History />} />
                  <Route path="Profile" element={<Profile />} />
                  <Route path="Refere" element={<Refere />} />
                  <Route path="fastparity" element={<Fastparity />} />
                  {/* <Route path="parity" element={<parity />} /> */}
                  <Route path="parity" element={<Parity />} />
                  <Route path="dice" element={<Dice />} />
                  <Route path="jet" element={<JetX />} />
                  <Route path="order" element={<Order />} />
                  <Route path="Record" element={<Record />} />

                  <Route path="Recharge" element={<Recharge />} />
                  <Route path="Withdraw" element={<Withdraw />} />
                  <Route path="Guide" element={<Guide />} />
                  <Route path="terms" element={<Terms />} />
                  {/* <Admin Route> */}

                  <Route path="ARecharge" element={<RechargeAdmin />} />
                  <Route path="AWithdraw" element={<WithdrawAdmin />} />

                  {/* <Admin Route> */}
                  <Route path="Support" element={<Support />} />
                  <Route path="UserRole" element={<UserRoleScreen />} />
                  <Route path="Activity" element={<ActivityGame />} />

                  <Route path="Notification" element={<Notifiction />} />
                </Routes>
                <BottomNavbar />
                <WheelWidget />
                <ChatWidget />
              </ConfigProvider>
            </Layout>
          </UserContext.Provider>
        )}
      </div>
    </HashRouter>
  );
}

export default App;
