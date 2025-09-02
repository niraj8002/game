// import React, { useContext, useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { UserContext } from "../../globalContext";
// import axiosInstance from "../../axiosInstance";
// import manue from "../../img/menu.png";
// import imglogo from "../../img/newfastwin.png";

// import wollet from "../../img/wallet.png";
// import profile from "../../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg";
// const Wallet = (props) => {
//   const [walletData, setWalletData] = useState(null);
//   const [wallet, setWallet] = useState(null);

//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const user = useContext(UserContext);
//   let navigate = useNavigate();
//   const onFastParity = (path) => {
//     navigate(`/${path}`);
//   };
//   useEffect(() => {
//     let mounted = true;
//     if (mounted) {
//       if (user.userId == null) {
//         window.location.reload(true);
//       }
//     }
//     pageLoad();
//     return () => (mounted = false);
//   }, []);
//   const pageLoad = () => {
//     getWallet();
//   };

//   const handleToggleClick = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   const getWallet = () => {
//     axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
//       setWalletData(res.data.data);
//       let amount = res.data.data.depositeAmount + res.data.data.winningAmount;
//       setWallet(Math.floor(amount));
//     });
//   };

//   return (
//     <div className="japurLudoNav realludokingsize">
//       <div class="fixed">
//         {/* <div class="bg-danger py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
//         <div class="w-100 bg-white shadow-sm text-white py-0 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between">
//           <div className="d-flex  align-items-center">
//             {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}
//             <div className="ram01">
//               <a
//                 className={`toggle ${isSidebarVisible ? "toggle" : ""}`}
//                 onClick={handleToggleClick}
//               >
//                 <img className="menuimg01" src={manue} alt="menuicon" />
//               </a>
//             </div>
//             <a
//               class="text-decoration-none text-white fw-semibold fs-4"
//               href="/"
//             >
//               <span class="text-white">
//                 <img
//                   src={imglogo}
//                   alt="logo"
//                   height="10"
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
//                 <span class="flex-nowrap flex-shrink-0 ">Install App</span>
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
//                     <img
//                       src={imglogo}
//                       alt="logo"
//                       height="30"
//                       className=" mainlogo"
//                     />{" "}
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
//                     href="#/Wallet"
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
//                     href="#/History"
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
//                     href="#/Profile"
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
//                     href="#/Refere"
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
//                     href="/terms"
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
//                   height="25"
//                   style={{ paddingLeft: "5px" }}
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
//                 <span class="flex-nowrap flex-shrink-0 ">Install App</span>
//               </button>
//             </div>
//             <div class="col">
//               <a class="text-decoration-none text-white " href="/">
//                 <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
//                   <img className="wllet" src={wollet} alt="" srcset="" />
//                   {wallet !== null && <strong>{wallet}</strong>}
//                   {wallet === null && <strong>0</strong>}
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="card-body">
//         <div className="mb-3  d-flex align-items-center justify-content-between">
//           <div className="d-flex align-items-center justify-content-start">
//             <a href="#/HomeScreen">
//               <button className="btn btn-primary border">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="me-2"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
//                   ></path>
//                 </svg>
//                 <span className="text-capitalize">Back</span>
//               </button>
//             </a>
//           </div>
//           <a
//             className="text-capitalize btn btn-outline-primary"
//             href="#/History"
//           >
//             wallet history
//           </a>
//         </div>
//         {/* <div
//         role="alert"
//         className="fade d-flex align-items-center justify-content-between alert alert-danger show">
//         <span>
//           <b>
//             KYC Pending
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 16 16"
//               width="20"
//               height="20"
//               fill="red">
//               <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
//             </svg>
//           </b>
//         </span>
//         <a href="#/kyc">
//           <button className="btn btn-danger btn-sm text-capitalize">
//             complete here
//           </button>
//         </a>
//       </div> */}
//         <div className="mb-3 shadow card">
//           <div className="bg-light text-dark text-capitalize card-header">
//             deposit chips
//           </div>
//           <div class="card-body">
//             <div>
//               <div>
//                 <div role="alert" class="fade alert alert-primary show">
//                   यह चिप्स Spin &amp; Win एवं Buy की गई चिप्स है इनसे सिर्फ़ गेम
//                   खेले जा सकते है ॥ Bank या UPI में निकाला नहीं जा सकता है
//                 </div>
//                 <div class="d-flex align-items-center justify-content-center px-2">
//                   <div class="d-flex flex-column align-items-center justify-content-center">
//                     <span class="text-capitalize fw-bold">chips</span>
//                     {walletData !== null && (
//                       <span class="fs-4">{walletData.depositeAmount}</span>
//                     )}
//                   </div>
//                 </div>
//                 <div class="d-flex flex-column align-items-stretch pt-4">
//                   <a class="text-decoration-none" href="#/Recharge">
//                     <div class="d-grid">
//                       <button class="btn btn-primary btn-lg text-capitalize mb-2">
//                         add
//                       </button>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="shadow card">
//           <div className="bg-light text-dark text-capitalize card-header">
//             winning chips
//           </div>
//           <div class="card-body">
//             <div>
//               <div>
//                 <div role="alert" class="fade alert alert-primary show">
//                   यह चिप्स गेम से जीती हुई एवं रेफरल से कमाई हुई है इन्हें Bank
//                   या UPI में निकाला जा सकता है ॥ इन चिप्स से गेम भी खेला जा सकता
//                   है |5% of the amount will be deducted from the amount
//                   withdrawn.
//                 </div>
//                 <div class="d-flex align-items-center justify-content-center px-2">
//                   <div class="d-flex flex-column align-items-center justify-content-center">
//                     <span class="text-capitalize fw-bold">chips</span>
//                     {walletData !== null && (
//                       <span class="fs-4">{walletData.winningAmount}</span>
//                     )}
//                   </div>
//                 </div>
//                 <div class="d-flex flex-column align-items-stretch pt-4 pb-3">
//                   <a class="text-decoration-none" href="#/Withdraw">
//                     <div class="d-grid">
//                       <button class="btn btn-primary btn-lg text-capitalize">
//                         withdraw
//                       </button>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <ul className="list-group"></ul>
//         </div>
//       </div>
//       <div class="row" id="footer">
//         <div class="col-12 nav-bar adsob" id="adsob">
//           <div class="row">
//             <div class="col-3 pa-0">
//               <div
//                 class="navItem sel"
//                 id="moxht2b4u"
//                 onClick={() => onFastParity("")}
//               >
//                 <div class="xtc">
//                   <span class="icon home sel" id="home"></span>
//                 </div>
//                 <div class="xtc">Home</div>
//               </div>
//             </div>
//             <div class="col-3 pa-0">
//               <div
//                 class="navItem"
//                 id="raeiyf2m0"
//                 onClick={() => onFastParity("Refere")}
//               >
//                 <div class="xtc">
//                   <span class="icon group" id="group"></span>
//                 </div>
//                 <div class="xtc">Invite</div>
//               </div>
//             </div>
//             <div class="col-3 pa-0">
//               <div
//                 class="navItem"
//                 id="sfrm6bvy"
//                 onClick={() => onFastParity("recharge")}
//               >
//                 <div class="xtc">
//                   <span class="icon wallet" id="wallet"></span>
//                 </div>
//                 <div class="xtc">Recharge</div>
//               </div>
//             </div>
//             <div class="col-3 pa-0">
//               <div
//                 class="navItem"
//                 id="mcpnvd2my"
//                 onClick={() => onFastParity("Profile")}
//               >
//                 <div class="xtc">
//                   <span class="icon my" id="my"></span>
//                 </div>
//                 <div class="xtc">My</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wallet;

import React, { useContext, useEffect, useState } from "react";
import {
  ArrowLeft,
  Wallet as WalletIcon,
  IndianRupee,
  Download,
  Upload,
  History,
  BadgeIndianRupee,
  Gift,
  Home,
  Activity,
  Wallet,
  User,
  Smile,
} from "lucide-react";
import { FaWallet } from "react-icons/fa6";
import { HiWallet } from "react-icons/hi2";
import { FaLessThan } from "react-icons/fa6";

import { FaMoneyCheck } from "react-icons/fa";
import { RiBankCardFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../globalContext";
import axiosInstance from "../../axiosInstance";

/**
 * Mobile Wallet Screen (React + TailwindCSS)
 * --------------------------------------------------
 * - Drop this component anywhere in your React app.
 * - Ensure TailwindCSS is configured.
 * - Uses lucide-react icons (npm i lucide-react)
 */

const UserWallet = () => {
    const [wallet ,setWallet] = useState(null)
  
    
  
    const user = useContext(UserContext);
    let navigate = useNavigate();
    useEffect(() => {
      
      let mounted = true;
      if (mounted) {
  
     
        if (user.userId == null) {
         window.location.reload(true);
        }
  
        
      }
      pageLoad();
      return () => (mounted = false);
    }, []);
  
    const pageLoad = () => {
      // if(props.ppp===true){
      //   window.location.reload(true);
      //  props.ppp(false)
      // }
       
      getWallet()
     
    }
  
      const getWallet = () => {
      axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
          let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
          setWallet(Math.floor(amount));
      });
    }
  return (
    <div className=" min-h-screen bg-[#0f0f10] text-white relative overflow-hidden">
      {/* Header */}

      <div className="relative px-4 pt-2 pb-2 bg-gradient-to-b from-[#1c1c1e] to-[#141416] shadow">
        <div className="mt-3 flex flex-col items-center ">
          <h1 className="mb-3 text-lg font-semibold text-gray-300 tracking-wider flex items-center justify-center">
            {/* Icon left */}
            {/* Text center */}
            Wallet
          </h1>
          <button onClick={() => window.history.back()}>
            <FaLessThan className="absolute left-4 top-9 transform -translate-y-1/2 text-gray-400" />
          </button>

          <div className=" flex flex-col items-center gap-1 text-3xl  tracking-tight">
            <div className="rounded-full bg-white/5 grid place-items-center -mb-0">
              <FaWallet size={30} className="opacity-90 mb-2 text-gray-300" />
            </div>
            <span className="text-gray-300">
              <span className="mr-1">₹</span>
              <span>{wallet}.00</span>
            </span>
          </div>
          <p className="text-xs mt-1 opacity-70">Total balance</p>
        </div>
      </div>

      {/* Wallet Card */}
      <div className=" -mt-5">
        <div className="rounded-2xl bg-[#17181a]  p-4 shadow-xl">
          {/* Rings row */}
          <div className="grid grid-cols-2 gap-4">
            <Ring label="Main wallet" amount={`${wallet}.00`} percent={0} />
            <Ring label="3rd party wallet" amount="₹0.00" percent={0} />
          </div>

          {/* Transfer button */}
          <button
            className="mt-5 w-full py-3 rounded-full text-sm font-semibold tracking-wide shadow-inner shadow-black/40 
                         bg-gradient-to-r from-[#f7d36a] via-[#e9bf56] to-[#d4a33b] text-black active:scale-[.99]"
          >
            Main wallet transfer
          </button>

          {/* Actions */}
          <div className="mt-5 grid grid-cols-4 gap-3">
            <Action
              icon={<FaWallet size={28} />}
              label="Deposit"
              tint="bg-gradient-to-t from-[#d4ae61] to-[#c99220] text-amber-300"
              to="/Withdraw"
            />
            <Action
              icon={<HiWallet size={28} />}
              label="Withdraw"
              tint="bg-gradient-to-t from-[#65b7c7] to-[#23a1ba] text-sky-200"
            />
            <Action
              icon={<FaMoneyCheck size={28} />}
              label="Deposit history"
              tint="bg-gradient-to-t from-[#c25b6a] to-[#d9233d] text-rose-300"
            />
            <Action
              icon={<RiBankCardFill size={28} />}
              label="Withdraw history"
              tint="bg-gradient-to-t from-[#23d990] to-[#63d4a7] text-emerald-200"
            />
          </div>
        </div>
      </div>

      {/* Mini cards row (placeholders like in screenshot) */}
      <div className="px-4 mt-4 h-[30vh]">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <MiniCard title="ARGame" value="0.00" />
          <MiniCard title="Promo Bonus" value="0.00" />
          <MiniCard title="Voucher" value="0.00" />
        </div>
      </div>
    </div>
  );
};
export default UserWallet;

/** Circular ring with 0% like the screenshot */
function Ring({ percent = 0, label, amount }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Outer ring (using borders so 0% looks like hollow round) */}
      <div className="relative h-24 w-24 grid place-items-center">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-[6px] rounded-full border-4 border-white/5" />
        <span className="relative text-sm font-semibold opacity-80">
          {percent}%
        </span>
      </div>
      <div className="leading-none text-sm font-semibold">{amount}</div>
      <div className="text-[10px] uppercase tracking-wide opacity-60 text-center">
        {label}
      </div>
    </div>
  );
}

function Action({ icon, label, tint, to }) {
  return (
    <Link to={to} className="flex flex-col items-center gap-2 active:scale-95">
      <div className={`h-12 w-12 rounded-2xl mt-5  grid place-items-center ${tint}`}>
        {icon}
      </div>
      <span className="text-[11px] leading-tight text-center opacity-80 whitespace-pre-line">
        {label}
      </span>
    </Link>
  );
}

function MiniCard({ title, value }) {
  return (
    <div className="min-w-[120px] h-[10vh]  rounded-xl bg-[#17181a] border border-white/5 p-3">
      <div className="text-[10px] opacity-60">{title}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

/* Hide scrollbars on the horizontal mini-cards row */
const styles = `
.no-scrollbar::-webkit-scrollbar{display:none} 
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
`;

if (typeof document !== "undefined") {
  const el = document.createElement("style");
  el.innerHTML = styles;
  document.head.appendChild(el);
}
