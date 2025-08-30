// import React, { useContext, useEffect, useState } from "react";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { PageTitle } from "../PageTitle";
// import { UserContext } from "../globalContext";
// import { useNavigate } from "react-router-dom";
// import { Footer } from "antd/lib/layout/layout";
// import { Button } from "react-bootstrap";
// import axiosInstance from "../axiosInstance";

// import manue from '../img/menu.png'
// import imglogo from "../img/newfastwin.png"
// import wollet from "../img/wallet.png"
// import profile from "../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg"
// const HomeScreen = (props) => {
//   const user = useContext(UserContext);
//   let navigate = useNavigate();
//   const [wallet ,setWallet] = useState(null)
//   useEffect(() => {

//     let mounted = true;
//     if (mounted) {

//       if (user.userId === null) {
//         localStorage.clear();
//         navigate('/LoginScreen', { replace: true });
//       }

//     }
//     pageLoad();
//     return () => (mounted = false);
//   }, []);
//   const pageLoad = () => {
//     getWallet()
//     subscribeToNotifications([])
//   }

//   const subscribeToNotifications = async (ndata) => {
//     console.log("hiii2",ndata)

//     // try {
//     const registration = await navigator.serviceWorker.register('./service-worker.js');
//     // console.log("hiii3",registration)

//     const subscription = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: 'BKJAHhcyPfbIBuwzhLd3o7iFuLNQtZp6Bv-iMj9gPYsaTaL6tHUBFeaTj1_CMlMe1KngV_RuMhCobALy9VSP5GU'
//     });
//     // console.log("hiiindata",JSON.parse(ndata).endpoint)
//     // console.log("hiii3",subscription.endpoint)

//     //Send subscription object to backend

//     var cdata = 0

//     if (ndata.length == 0) {
//       const data = {
//         subscription: JSON.stringify(subscription),
//         member: user.userId
//       }
//       console.log("data", data)

//       // axiosInstance.post(`/subscription`, data).then((res) => {
//       //   console.log("resSubscription", res)
//       // })
//     }
//     else {

//       ndata.map((k) => {

//         if (JSON.parse(k.subscription).endpoint === subscription.endpoint) {
//           cdata = 1
//         }
//       })
//       if(cdata !== 1 ){
//          const data = {
//       subscription: JSON.stringify(subscription),
//       member:user.userId
//     }
//     console.log("data",data)

//     // axiosInstance.post(`/subscription` , data).then((res)=>{
//     // console.log("resSubscription",res)
//     // })
//   }
//    else{
//     console.log("allready regestird")
//    }

//     }

//   };

//   var count = 1;
//   const getWallet = () => {
//     axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
//       if (res.data.data === null) {
//         count = count + 1;
//         if (count < 5) {
//           getWallet();
//         }
//         if (count === 5) {
//           const data1 = {
//             member: user.userId,
//             amount: 0,
//             winningAmount: 0,
//             RefralWinningAmount: 0,
//             depositeAmount: 10,
//             bonus: 100,
//             winningFreezAmount: 0,
//             totalWinningAmount: 0,
//           }
//           axiosInstance.post("/wallet", data1).then((res) => {
//           });
//         }
//       }
//       else{
//         let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
//         setWallet(Math.floor(amount));
//       }
//     });
//   }
//   const onGuide = () => {
//     navigate('/Guide')
//   }
//   const onFastParity = (path) => {
//     navigate(`/${path}`)
//   }
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const handleToggleClick = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <>
//     <div className="japurLudoNav realludokingsize">
//       <div class="fixed">
//         {/* <div class="bg-danger py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
//         <div
//           class="w-100 bg-white shadow-sm text-white py-0 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
//         >
//           <div className='d-flex  align-items-center'>
//             {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}
//             <div className='ram01'>
//               <a className={`toggle ${isSidebarVisible ? 'toggle' : ''}`} onClick={handleToggleClick}>
//                 <img className='menuimg01' src={manue} alt="menuicon" />
//               </a>
//             </div>
//             <a class="text-decoration-none text-white fw-semibold fs-4" href="/"><span
//               class="text-white">
//               <img src={imglogo} alt="logo"
//                 height="10" className=' mainlogo' />
//             </span></a></div>
//           <div class="row">
//             <div class="p-0 col"><button type="button"
//               class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm"><svg
//                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" fill="currentColor"
//                 class="me-2">
//                 <path
//                   d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z">
//                 </path>
//                 <path
//                   d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z">
//                 </path>
//               </svg><span class="flex-nowrap flex-shrink-0 ">Install App</span></button></div>
//             <div class="col"><a class="text-decoration-none text-white " href="/">
//               <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2"><svg
//                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="green"
//                 class="me-2">
//                 <path
//                   d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z">
//                 </path>
//                 <path
//                   d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z">
//                 </path>
//               </svg><strong>0</strong></div>
//             </a></div>
//           </div>
//         </div>
//       </div>
//       <div class="fixed 02">
//         {/* <div class="bgclr py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
//         <div
//           class="w-100 bg-white shadow-sm text-white py-2 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
//         >
//           <div className='d-flex  align-items-center'>
//             {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}

//             <img className='menuimg01' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" src={manue} alt="menuicon" />

//             <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
//               <div className="bg-dark offcanvas-header">
//                 <div className="text-white fw-bold offcanvas-title">
//                   <h5 className="text-white mb-0">    <img src={imglogo} alt="logo"
//                     height="30" className=' mainlogo' /> </h5>
//                 </div>
//                 <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
//                         <div><a href="/"><div class="rounded-circle">
//                           <img width="40" height="40" src={profile} alt="avatar" />
//                         </div></a></div>

//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-column align-items-stretch justify-content-start">
//                   <a
//                     className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="/" data-bs-dismiss="offcanvas" aria-label="Close">
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
//                       className="m-0 p-0 d-flex align-items-center justify-content-center">
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                     </svg>
//                   </a>
//                   <a
//                     className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                     href="#/Wallet" data-bs-dismiss="offcanvas" aria-label="Close"
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
//                       className="m-0 p-0 d-flex align-items-center justify-content-center">
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                     </svg>
//                   </a>
//                   <a data-bs-dismiss="offcanvas" aria-label="Close"
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
//                       className="m-0 p-0 d-flex align-items-center justify-content-center">
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                     </svg>
//                   </a>
//                   <a data-bs-dismiss="offcanvas" aria-label="Close"
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
//                       className="m-0 p-0 d-flex align-items-center justify-content-center">
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                     </svg>
//                   </a>
//                   <a data-bs-dismiss="offcanvas" aria-label="Close"
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
//                       className="m-0 p-0 d-flex align-items-center justify-content-center">
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                     </svg>
//                   </a>

//                   <a data-bs-dismiss="offcanvas" aria-label="Close"
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
//                       className="m-0 p-0 d-flex align-items-center justify-content-center">
//                       <path
//                         fillRule="evenodd"
//                         d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <a class="text-decoration-none text-white fw-semibold fs-4" href="/"><span
//               class="text-white">
//               <img src={imglogo} alt="logo"
//                 height="25" style={{ paddingLeft: '5px' }} className=' mainlogo' />
//             </span></a></div>
//           <div class="row">
//             <div class="p-0 d-flex raju15"><button type="button"
//               class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm">

//               <span class="flex-nowrap flex-shrink-0 ">Install App</span>
//             </button></div>
//             <div class="col"><a class="text-decoration-none text-white " href="/">
//               <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
//                 <img className='wllet' src={wollet} alt="" srcset="" />
//                {wallet !== null && <strong>{wallet}</strong>}
//                {wallet === null && <strong>0</strong>}

//                </div>
//             </a></div>
//           </div>
//         </div>
//       </div>
//       <section class="" >
//         <div class="d-flex">
//           <div class="col-md-12" style={{ background: '#fff' }}>
//             <div class="row" id="warea">
//               <div class="col-12">
//               <div class="row walifo">
//                   <div class="col-6 xtl" style={{ background: '#fff' }}>
//                     <div class="mt-1 mb-2 tf-16">Balance</div>
//                     <div class="mt-1 mb-2 tfcdb tfw-6 tffss tf-18 tfwr ddavc" style={{ background: '#fff' }}><span class="tf-20 tfw-7"
//                       id=""> ₹ : </span><span class="pr-2">
//                       <span className="ps-2 tf-18 ">     {wallet !== null && <strong>{wallet}</strong>}
//                       {wallet === null && <strong>0</strong>}</span>
//                         {/* <img class="gisv" id="lhsd" src="./img/loader.png" /> */}
//                       </span></div>
//                     {/* <div class="mt-1 tf-16 tfcdg" style={{ background: '#fff' }} >ID:<span id="u_id"></span></div> */}
//                   </div>
//                   <div class="col-6 pr-1 jcrdg">
//                     <div class="rc-wal" ><a href="#/Wallet" className="text-white fw-normal">Recharge</a></div>
//                     <div class="wd-bal" ><a href="#/Wallet" className="text-primary fw-normal">Withdraw</a></div>
//                   </div>
//                 </div>
//               </div>
//               <div class="col-12 mb-56">
//                 <div class="row tf-12 tfcdb tfw-7 1wtj0ep pbt-18">
//                   <div class="col-6 pdr5">
//                     <div class="taskR" style={{ background: '#fff' }} onclick="window.location.href='#/taskReward'">
//                       <img src="./img/gift.png" height="36" />
//                       <span
//                         class="pl-10" style={{ background: '#fff' }} >Task reward</span></div>
//                   </div>
//                   <div class="col-6 pdl5">
//                     <div class="CheckR" style={{ background: '#fff' }} onclick="window.location.href='#/CheckIn'">
//                       <img src="./img/book.png" height="36" />
//                       <span
//                         class="pl-10" style={{ background: '#fff' }} >Check in</span></div>
//                   </div>
//                   <div class="col-6 pdr5">
//                     <div class="icard" onClick={() => onFastParity("fastparity")} >
//                       <img src="../img/fast-paritynew.png" />
//                     </div>
//                   </div>
//                   <div class="col-6 pdl5" onClick={() => onFastParity("parity")}>
//                     <div class="icard">
//                       <img src="../img/paritynew.png" />
//                     </div>
//                   </div>
//                   <div class="col-6 pdr5"
//                   onClick={()=>onFastParity("dice")}
//                   >
//                     <div class="icard">
//                       <img src="../img/dicenew.png" />
//                     </div>
//                   </div>
//                   <div class="col-6 pdl5" onClick={()=>onFastParity("jet")}>
//                     <div class="icard">
//                       <img src="../img/aviotor.png" />

//                     </div>
//                   </div>
//                   {/* <div class="col-6 pdr5" onclick="window.location.href='#/wheel'">
//                 <div class="icard">
//                   <img src="./img/circle.png"/>
//                   </div>
//               </div> */}
//                   {/* <div class="col-6 pdr5"  onClick={()=>onFastParity("jet")}>
//                 <div class="icard">
//                   <img src="./img/jetx.2c3b7a7c.png"/>
//                   </div>
//               </div> */}
//                   {/* <div class="col-6 pdr5">
//                 <div class="comsoon">Coming Soon</div>
//                 <div class="icard">
//                   <img src="./img/download.png"/>
//                   </div>
//               </div> */}
//                   {/* <div class="col-6 pdl5" >
//                 <div class="comsoon">Coming Soon</div>
//                 <div class="icard">
//                   <img src="./img/ludo.32afb352.png"/>
//                   </div>
//               </div> */}

//                 </div>
//               </div>
//             </div>
//             <div class="row" id="odrea"></div>
//             <div class="row" id="footer">
//               <div class="col-12 nav-bar adsob" id="adsob">
//                 <div class="row">
//                   <div class="col-3 pa-0">
//                     <div class="navItem sel" id="moxht2b4u" onClick={() => onFastParity("")}>
//                       <div class="xtc"><span class="icon home sel" id="home"></span></div>
//                       <div class="xtc">Home</div>
//                     </div>
//                   </div>
//                   <div class="col-3 pa-0">
//                     <div class="navItem" id="raeiyf2m0" onClick={() => onFastParity("Refere")}>
//                       <div class="xtc"><span class="icon group" id="group"></span></div>
//                       <div class="xtc">Invite</div>
//                     </div>
//                   </div>
//                   <div class="col-3 pa-0">
//                     <div class="navItem" id="sfrm6bvy" onClick={() => onFastParity("recharge")}>
//                       <div class="xtc"><span class="icon wallet" id="wallet"></span></div>
//                       <div class="xtc">Recharge</div>
//                     </div>
//                   </div>
//                   <div class="col-3 pa-0">
//                     <div class="navItem" id="mcpnvd2my" onClick={() => onFastParity("Profile")}>
//                       <div class="xtc"><span class="icon my" id="my"></span></div>
//                       <div class="xtc">My</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="row" id="note">

//             </div>
//             {/* <div class="row" id="anof" style={{width:'100%'}}>
//           <div class="col-md-4 mx-auto conod"  id="clink" >
//             <div class="ssmg banner flex fadein" id="smgid">
//               <div class="xtc pt-2 pb-2">
//                 <img src="./img/banner.png"style={{width:'100%'}}/>
//                 </div>
//             </div>
//           </div>
//         </div> */}
//             <div class="row" id="dta_ref"></div>
//           </div>
//         </div>
//       </section>
//     </div>
//     </>

//   );
// };

// export default HomeScreen;
import React from "react";
import Banner from "./HomeComponets/Banner";
import AnnouncementBar from "./HomeComponets/AnnouncementBar";
import GameGrid from "./HomeComponets/GameGrid";
import SlotsSection from "./HomeComponets/SlotsSection";

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-[#333332] text-white pb-20">
      {/* Header */}

      {/* Banner Section */}
      <Banner />

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Game Cards Grid */}
      <GameGrid />

      {/* Slots Section */}
      <SlotsSection />

      {/* Bottom Navigation */}
    </div>
  );
};

export default HomeScreen;
