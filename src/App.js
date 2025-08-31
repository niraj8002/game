import React, { useState, useEffect } from "react";
import "./index.css";
import {
  Route,
  BrowserRouter,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import { decodeToken } from "react-jwt";
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
import PaymentApp from "./Screens/HomeComponets/withdrawsection";

require("./Screens/login.css");

function App() {
  const [waitstate, setWaitstate] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      const myDecodedToken = decodeToken(
        JSON.parse(localStorage.getItem("authtoken"))
      );
      if (myDecodedToken.role === undefined) {
        myDecodedToken.role = "test";
      }
      setAuthToken(myDecodedToken);
      setWaitstate(false);
      localStorage.setItem(
        "username",
        JSON.parse(localStorage.getItem("authtoken")).name
      );
    } else {
      setWaitstate(false);
      setAuthToken(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <MainApp waitstate={waitstate} authToken={authToken} />
    </BrowserRouter>
  );
}

function MainApp({ waitstate, authToken }) {
  const location = useLocation();

  // 👇 Routes where BottomNavbar should NOT appear
  const hideNavbarRoutes = ["/LoginScreen", "/SignupScreen"];

  // Check current route
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!waitstate && (
        <UserContext.Provider
          value={
            authToken
              ? {
                  userId: authToken._id ?? 1,
                  userName: authToken.name ?? 1,
                  memberId: authToken.id ?? 1,
                  role: authToken.role?.name ?? 1,
                  mobile: authToken.mobile ?? 1,
                  memberReferCode: authToken.memberReferCode ?? 1,
                  roleId: authToken.role?._id ?? 1,
                  registerDate: authToken.registerDate ?? 1,
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
            <ConfigProvider locale={enUS}>
              <Header />
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="LoginScreen" element={<LoginScreen />} />
                <Route
                  path="SignupScreen"
                  element={<SignupScreen authToken={authToken} />}
                />
                <Route path="HomeScreen" element={<HomeScreen />} />
                <Route path="RoleScreen" element={<RoleScreen />} />
                <Route path="Wallet" element={<UserWallet />} />
                <Route path="History" element={<History />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Withdraw" element={<PaymentApp />} />
                <Route path="Refere" element={<Refere />} />
                <Route path="fastparity" element={<Fastparity />} />
                <Route path="parity" element={<Parity />} />
                <Route path="dice" element={<Dice />} />
                <Route path="jet" element={<JetX />} />
                <Route path="order" element={<Order />} />
                <Route path="Record" element={<Record />} />
                <Route path="Recharge" element={<Recharge />} />
                <Route path="Withdraw" element={<Withdraw />} />
                <Route path="Guide" element={<Guide />} />
                <Route path="terms" element={<Terms />} />
                <Route path="ARecharge" element={<RechargeAdmin />} />
                <Route path="AWithdraw" element={<WithdrawAdmin />} />
                <Route path="Support" element={<Support />} />
                <Route path="UserRole" element={<UserRoleScreen />} />
                <Route path="Activity" element={<ActivityGame />} />
                <Route path="Notification" element={<Notifiction />} />
              </Routes>

              {/* ✅ Show BottomNavbar only when not on login/signup */}
              {shouldShowNavbar && <BottomNavbar />}

              <WheelWidget />
              <ChatWidget />
            </ConfigProvider>
          </Layout>
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
