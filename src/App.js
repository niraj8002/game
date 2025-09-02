import React, { useState, useEffect } from "react";
import "./index.css";
import {
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  Navigate,
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
import Notification from "./Screens/Ludo/notification";
import Agency from "./Screens/Agency";
import QRPayment from "./Screens/qrScreen";
import NewActivity from "./Screens/NewActivity";

require("./Screens/login.css");

function App() {
  const [waitstate, setWaitstate] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {

    if (
      localStorage.getItem("authtoken") !== null &&
      localStorage.getItem("authtoken") !== undefined
    ) {

      const myDecodedToken = decodeToken(JSON.parse(localStorage.getItem("authtoken")));
      if (myDecodedToken.role === undefined) {
        myDecodedToken.role = "test"
        setAuthToken(myDecodedToken);
      }
      else {
        setAuthToken(myDecodedToken);
      }

      setWaitstate(false);
      localStorage.setItem("username", JSON.parse(localStorage.getItem("authtoken")).name)
    } else {
      setWaitstate(false);
      setAuthToken(null);
      // window.location.href = "/";
      //navigate("/LoginScreen", { replace: true });

    }
  }, []);
  const validation = () => {

    const myDecodedToken = decodeToken(JSON.parse(localStorage.getItem("authtoken")));
    setAuthToken(myDecodedToken);
  }

  return (
    <BrowserRouter>
      <MainApp waitstate={waitstate} authToken={authToken} />
    </BrowserRouter>
  );
}

// 🔹 Protected Route Wrapper
function ProtectedRoute({ authToken, children }) {
  if (!authToken) {
    return <Navigate to="/LoginScreen" replace />;
  }
  return children;
}

// 🔹 Redirect if already logged in
function AuthRedirect({ authToken, children }) {
  if (authToken) {
    return <Navigate to="/HomeScreen" replace />;
  }
  return children;
}

function MainApp({ waitstate, authToken }) {
  const location = useLocation();

  const hideNavbarRoutes = ["/LoginScreen", "/SignupScreen","/Notification"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const hideNavbarRoutes2 = ["/LoginScreen", "/SignupScreen","/Notification","/Agency"];
  const shouldShowNavbar2 = !hideNavbarRoutes2.includes(location.pathname);

  return (
    <div className="App">
      {!waitstate && (
        <UserContext.Provider value={authToken !== null ? {
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
             {shouldShowNavbar2 &&  <Header />}
              <Routes>
                {/* 🔹 Public Routes */}
                <Route
                  path="LoginScreen"
                  element={
                    <AuthRedirect authToken={authToken}>
                      <LoginScreen />
                    </AuthRedirect>
                  }
                />
                <Route
                  path="SignupScreen"
                  element={<SignupScreen authToken={authToken} />}
                />

                {/* 🔹 Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <HomeScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="HomeScreen"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <HomeScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="RoleScreen"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <RoleScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Wallet"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <UserWallet />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="History"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <History />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Profile"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Withdraw"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <PaymentApp />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Refere"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Refere />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="newActivity"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <NewActivity />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="qrPayment"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <QRPayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Agency"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Agency />
                    </ProtectedRoute>
                  }
                />
               
                <Route
                  path="order"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Order />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Record"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Record />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Recharge"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Recharge />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Withdraw"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Withdraw />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Guide"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Guide />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="terms"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Terms />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="ARecharge"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <RechargeAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="AWithdraw"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <WithdrawAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Support"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Support />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="UserRole"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <UserRoleScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Activity"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <ActivityGame />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Notification"
                  element={
                    <ProtectedRoute authToken={authToken}>
                      <Notification/>
                    </ProtectedRoute>
                  }
                />
                
              </Routes>

              {/* ✅ Navbar only if not on login/signup */}
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
