// import React, { useState, useContext, useEffect } from "react";
// import { Col, Form, Row, Input, Button, message, Modal, Image } from "antd";
// import {
//   EyeInvisibleOutlined,
//   EyeOutlined,
//   EyeTwoTone,
// } from "@ant-design/icons";
// import axiosInstance from "../axiosInstance";
// import { UserContext } from "../globalContext";
// import { useNavigate } from "react-router-dom";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBInput,
// } from "mdb-react-ui-kit";
// // import React, {useEffect} from 'react';
// import { NavLink } from "react-router-dom";
// import { Layout, Menu, Dropdown } from "antd";
// import SubMenu from "antd/lib/menu/SubMenu";
// // import {environment} from './Environment';
// // import logo from '../src/images/logo.jpg';
// import Icon from "@ant-design/icons";
// import Hamburger from "hamburger-react";
// // import {useState} from 'react';
// import manue from "../img/menu.png";
// import imglogo from "../img/rocket.ae680ffe.png";
// import wollet from "../img/wallet.png";
// import profile from "../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg";

// import ForgotPasswordModel from "./ForgotPassword.model";
// import { Container } from "react-bootstrap";
// import axios from "axios";
// import { Nav2 } from "../Nav2";

// const LoginScreen = () => {
//   let navigate = useNavigate();
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isModalOpen1, setIsModalOpen1] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [verificationId, setVerificationId] = useState("");
//   const [MOtp, setMOtp] = useState(false);

//   const user = useContext(UserContext);
//   useEffect(() => {
//     let mounted = true;
//     if (mounted) {
//       if (user.userId !== null) {
//         // navigate("/HomeScreen", { replace: true });
//         localStorage.clear();
//         window.location.reload();
//       }
//     }
//     return () => (mounted = false);
//   }, []);

//   const onCancel = () => {
//     setIsModalOpen(false);
//   };
//   const onAdd = () => {
//     setIsModalOpen(false);
//   };

//   const onSignin = () => {
//     axiosInstance
//       .post("/login", { mobile: mobile, password: password })
//       .then((res) => {
//         if (res.data) {
//           if (res.data.responseCode === 1) {
//             localStorage.setItem("authtoken", JSON.stringify(res.data.auth));
//             //navigate(`/HomeScreen`, { replace: true });
//             window.location.href = "/";
//           }
//           if (res.data.responseCode === -2) {
//             message.error("Your account is temporarily frozen");
//           }
//           if (res.data.responseCode === -1) {
//             message.error("please enter correct mobile number or password");
//           }
//         } else message.error("please enter correct mobile number or password");
//       })
//       .catch((err) => {
//         message.error("please enter correct mobile number or password");
//       });
//   };
//   const onSignup = () => {
//     navigate("/SignupScreen", { replace: true });
//     // window.location.href= `/SignupScreen`;
//   };

//   const onForgotPassword = async () => {
//     if (mobile !== undefined && mobile !== "" && mobile.length === 10) {
//       const url = `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-CD9F51B96DB84F4&flowType=SMS&mobileNumber=${mobile}`;
//       const authToken =
//         "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUNEOUY1MUI5NkRCODRGNCIsImlhdCI6MTc0ODUxMjY2MywiZXhwIjoxOTA2MTkyNjYzfQ.xlWgT3ISRDQLnmoSdFKyjf0jGWHKKz-U1rZ4nOPtK35CBfu1bKF3R3Axx9blTjOj-f5tUFM9_29xHctdRCcX_g";

//       try {
//         const response = await axios.post(
//           url,
//           {},
//           {
//             headers: {
//               authToken: authToken,
//             },
//           }
//         );
//         console.log(response.data.data);
//         if (response.data.responseCode == 200) {
//           setVerificationId(response.data.data.verificationId);
//           message.success("Otp Sent successfully");
//           setIsModalOpen(true);
//           setMOtp(false);
//         } else if (response.data.responseCode == 506) {
//           message.error("after one minute you can send otp again ...!");
//         } else message.error("Something wrong. Please try again...!");
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     } else {
//       message.error("please enter valid mobile number...!");
//     }
//     setIsModalOpen(true);
//     // navigate('/SSignupScreen', { replace: true });
//   };

//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const handleToggleClick = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };
//   const onshowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="japurLudoNav realludokingsize">
//       <div class="fixed">
//         {/* <div class="bg-danger py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
//         <div class="w-100 bg-white shadow-sm text-white pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between">
//           <div className="d-flex  align-items-center">
//             {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}
//             <div className="ram01">
//               <img className="menuimg01" src={manue} alt="menuicon" />
//             </div>
//             <a
//               class="text-decoration-none text-white fw-semibold fs-4"
//               href="/"
//             >
//               <span class="text-white">
//                 <img
//                   src={imglogo}
//                   alt="logo"
//                   height="40"
//                   className=" mainlogo"
//                 />
//               </span>
//             </a>
//           </div>
//           <div class="row">
//             <div class="p-0 col">
//               <button
//                 type="button"
//                 class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="24"
//                   height="24"
//                   fill="currentColor"
//                   class="me-2"
//                 >
//                   <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
//                   <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
//                 </svg>
//                 <a href="https://play.google.com/store/apps/details?id=com.realludoking&pcampaignid=web_share">
//                   <span class="flex-nowrap flex-shrink-0 ">Install App</span>
//                 </a>
//               </button>
//             </div>
//             <div class="col">
//               <a class="text-decoration-none text-white " href="/">
//                 <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 16 16"
//                     width="1em"
//                     height="1em"
//                     fill="green"
//                     class="me-2"
//                   >
//                     <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"></path>
//                     <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"></path>
//                   </svg>
//                   <strong>0</strong>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="fixed 02">
//         {/* <div class="bgclr py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
//         <div class="w-100 bg-white shadow-sm text-white py-2 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between">
//           <div className="d-flex  align-items-center">
//             {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}

//             <img
//               className="menuimg01"
//               type="button"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasWithBothOptions"
//               aria-controls="offcanvasWithBothOptions"
//               src={manue}
//               alt="menuicon"
//             />

//             <div
//               class="offcanvas offcanvas-start"
//               data-bs-scroll="true"
//               tabindex="-1"
//               id="offcanvasWithBothOptions"
//               aria-labelledby="offcanvasWithBothOptionsLabel"
//             >
//               <div className="bg-dark offcanvas-header">
//                 <div className="text-white fw-bold offcanvas-title">
//                   <h5 className="text-white mb-0">
//                     {" "}
//                     New FastWin <span style={{ fontSize: "25px" }}>👑</span>
//                   </h5>
//                 </div>
//                 <button
//                   type="button"
//                   class="btn-close btn-close-white"
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="d-flex flex-column align-items-stretch justify-content-start p-0 offcanvas-body">
//                 <div className="d-flex align-items-center justify-content-between p-4">
//                   <div className="fs-1 fw-bold text-start d-flex align-items-center justify-content-start">
//                     <div className="hstack gap-2">
//                       <div className="m-0 me-1 text-dark d-flex align-items-center justify-content-start">
//                         <p className="m-0">Hey,</p>
//                         <p className="m-0">User..</p>
//                         {/* <p
//                       className="text-truncate m-0 me-2"
//                       style={{maxWidth: '125px'}}>
//                       &nbsp;
//                     </p> */}
//                         {/* <img src="./static/media/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg" alt=""  width="30" height="30"/> */}
//                         <div>
//                           <a href="/">
//                             <div class="rounded-circle">
//                               <img
//                                 width="40"
//                                 height="40"
//                                 src={profile}
//                                 alt="avatar"
//                               />
//                             </div>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-column align-items-stretch justify-content-start">
//                   <a
//                     className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/"
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                   >
//                     <div className="d-flex align-items-center justify-content-start">
//                       <div className="hstack gap-3">
//                         {/* {/ <img src="/static/media/play.2f22f88bac8acca85f6a.webp" height="36px" alt="play" /> /} */}
//                         <p className="p-0 m-0 text-capitalize">play</p>
//                       </div>
//                     </div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="1em"
//                       height="1em"
//                       fill="currentColor"
//                       className="m-0 p-0 d-flex align-items-center justify-content-center"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//                       ></path>
//                     </svg>
//                   </a>
//                   <a
//                     className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/"
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                   >
//                     <div className="d-flex align-items-center justify-content-start">
//                       <div className="hstack gap-3">
//                         {/* {/ <img src="/static/media/play.2f22f88bac8acca85f6a.webp" height="36px" alt="play" /> /} */}
//                         <p className="p-0 m-0 text-capitalize">Wallet</p>
//                       </div>
//                     </div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="1em"
//                       height="1em"
//                       fill="currentColor"
//                       className="m-0 p-0 d-flex align-items-center justify-content-center"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//                       ></path>
//                     </svg>
//                   </a>
//                   <a
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                     className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/"
//                   >
//                     <div className="d-flex align-items-center justify-content-start">
//                       <div className="hstack gap-3">
//                         {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
//                         <p className="p-0 m-0 text-capitalize">History</p>
//                       </div>
//                     </div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="1em"
//                       height="1em"
//                       fill="currentColor"
//                       className="m-0 p-0 d-flex align-items-center justify-content-center"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//                       ></path>
//                     </svg>
//                   </a>
//                   <a
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                     className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/"
//                   >
//                     <div className="d-flex align-items-center justify-content-start">
//                       <div className="hstack gap-3">
//                         {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
//                         <p className="p-0 m-0 text-capitalize">Profile</p>
//                       </div>
//                     </div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="1em"
//                       height="1em"
//                       fill="currentColor"
//                       className="m-0 p-0 d-flex align-items-center justify-content-center"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//                       ></path>
//                     </svg>
//                   </a>
//                   <a
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                     className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/"
//                   >
//                     <div className="d-flex align-items-center justify-content-start">
//                       <div className="hstack gap-3">
//                         {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
//                         <p className="p-0 m-0 text-capitalize">Refere & Earn</p>
//                       </div>
//                     </div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="1em"
//                       height="1em"
//                       fill="currentColor"
//                       className="m-0 p-0 d-flex align-items-center justify-content-center"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//                       ></path>
//                     </svg>
//                   </a>

//                   <a
//                     data-bs-dismiss="offcanvas"
//                     aria-label="Close"
//                     className="text-start text-decoration-none bg-whitebg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/"
//                   >
//                     <div className="d-flex align-items-center justify-content-start">
//                       <div className="hstack gap-3 rajuji">
//                         {/* <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="36"
//                       height="36"
//                       fill="currentColor">
//                       <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"></path>
//                       <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"></path>
//                     </svg> */}
//                         <p className="p-0 m-0 text-capitalize">legal terms</p>
//                       </div>
//                     </div>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="1em"
//                       height="1em"
//                       fill="currentColor"
//                       className="m-0 p-0 d-flex align-items-center justify-content-center"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
//                       ></path>
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <a
//               class="text-decoration-none text-white fw-semibold fs-4"
//               href="/"
//             >
//               <span class="text-white">
//                 <img
//                   src={imglogo}
//                   alt="logo"
//                   height="45"
//                   className=" mainlogo"
//                 />
//               </span>
//             </a>
//           </div>
//           <div class="row">
//             <div class="p-0 d-flex raju15">
//               <button
//                 type="button"
//                 class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm"
//               >
//                 <a href="https://play.google.com/store/apps/details?id=com.realludoking&pcampaignid=web_share">
//                   <span class="flex-nowrap flex-shrink-0 ">Install App</span>
//                 </a>
//               </button>
//             </div>
//             <div class="col">
//               <a class="text-decoration-none text-white " href="/">
//                 <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
//                   <img className="wllet" src={wollet} alt="" srcset="" />
//                   <strong>0</strong>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         class="col mx-auto g-0 iframe-sec p-3 bg-gary"
//         style={{ paddingBottom: "300px" }}
//       >
//         <div class="card" style={{ marginBottom: "100%" }}>
//           <div class="bg-light text-dark card-header">Login</div>
//           <div className=" gradient-form ">
//             <div>
//               <div className="card-body">
//                 <div className="d-flex flex-column ">
//                   <p>Please login to your account</p>

//                   <MDBInput
//                     wrapperClass="mb-4"
//                     maxLength={10}
//                     placeholder="Mobile Number"
//                     onChange={(e) => setMobile(e.target.value)}
//                     id="form1"
//                     type="number"
//                   />
//                   <MDBInput
//                     wrapperClass="mb-4"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     id="form2"
//                     type={showPassword ? "text" : "password"}
//                   >
//                     <EyeOutlined
//                       className="showPassword 02"
//                       onClick={() => onshowPassword()}
//                     />
//                   </MDBInput>

//                   <div className="text-center pt-1 mb-2 pb-1">
//                     <div>
//                       <button
//                         className="mb-4 w-100 gradient-custom-2 btn btn-primary"
//                         onClick={onSignin}
//                       >
//                         Sign in
//                       </button>
//                     </div>
//                     <span
//                       onClick={() => onForgotPassword()}
//                       style={{ color: "#18aeff", textDecoration: "underline" }}
//                     >
//                       {" "}
//                       Forgot password?
//                     </span>
//                   </div>

//                   <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
//                     <p className="mb-0">Don't have an account?</p>
//                     <div className="lcreate">
//                       <a href="#/SignupScreen ">Create account</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 {isModalOpen && (
//                   <ForgotPasswordModel
//                     isVisible={isModalOpen}
//                     onCancel={onCancel}
//                     onAdd={onAdd}
//                     mobile={mobile}
//                     verificationId={verificationId}
//                     setMOtp={setMOtp}
//                     setIsModalOpen={setIsModalOpen}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;

import React, { useState } from "react";
import { Phone, Lock, Mail, ChevronDown, EyeOff, Eye } from "lucide-react";
import { FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { message } from "antd"; // Antd message (same jaisa aap use kar rahe ho)
import axiosInstance from "../axiosInstance";
import axios from "axios";
import { FaLock } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";

const LoginScreen = () => {
  const [tab, setTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 onSignin function
  const onSignin = () => {
    const payload =
      tab === "phone"
        ? { mobile: phoneNumber, password: password }
        : { email: email, password: password };

    axiosInstance
      .post("/login", payload)
      .then((res) => {
        if (res.data) {
          if (res.data.responseCode === 1) {
            localStorage.setItem("authtoken", JSON.stringify(res.data.auth));
            window.location.href = "/"; // navigate to home
          }
          if (res.data.responseCode === -2) {
            message.error("Your account is temporarily frozen");
          }
          if (res.data.responseCode === -1) {
            message.error("Please enter correct credentials");
          }
        } else {
          message.error("Please enter correct credentials");
        }
      })
      .catch(() => {
        message.error("Please enter correct credentials");
      });
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
          className={`flex-1 flex-col py-3 flex items-center justify-center gap-2 font-medium text-sm transition-colors   ${
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
          <FaLock className="text-yellow-600 mb-3"  size={25}/>
          <span className="text-[#ffffff]  text-lg">Forget Password</span>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col items-center space-x-2">
          <RiCustomerService2Line className="text-yellow-600 mb-3"  size={25}/>

          <span className="text-[#ffffff] text-lg">Customer Service</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
