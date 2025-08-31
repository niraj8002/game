// import React, { useContext,useEffect,useState } from "react";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { UserContext } from "../../globalContext";
// import { useNavigate } from "react-router-dom";
// import { Footer } from "antd/lib/layout/layout";
// import imglogo from "../../img/newfastwin.png"
// import axiosInstance from "../../axiosInstance";
// import manue from '../../img/menu.png'

// import wollet from "../../img/wallet.png";
// import profile from "../../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg";
// import { Button } from "react-bootstrap";
// import { Avatar } from "@mui/material";
// const Profile = (props) => {
//   const [wallet ,setWallet] = useState(null)

//   const onFastParity = (path) => {
//     navigate(`/${path}`)
//   }

//   const user = useContext(UserContext);
//   let navigate = useNavigate();
//   useEffect(() => {

//     let mounted = true;
//     if (mounted) {

//       if (user.userId == null) {
//        window.location.reload(true);
//       }

//     }
//     pageLoad();
//     return () => (mounted = false);
//   }, []);
//   const pageLoad = () => {
//     // if(props.ppp===true){
//     //   window.location.reload(true);
//     //  props.ppp(false)
//     // }

//     getWallet()

//   }
//   const handleLogout = () => {
//     localStorage.clear();
//     // navigate(`${environment.url.AUTH_URL}`, { replace: true });
//     // navigate('/LoginScreen', { replace: true });
//     // window.location.href=`${environment.url.AUTH_URL}`;
//     window.location.href = `#/LoginScreen`;
//   }

//   const getWallet = () => {
//     axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
//         let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
//         setWallet(Math.floor(amount));
//     });
//   }

//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const handleToggleClick = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <div className="japurLudoNav realludokingsize">
//    <div class="fixed">
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
//    <div className="col-12 mx-auto g-0 iframe-sec p-3">
//       <div className="mb-3 shadow card">
//         <div className="bg-light text-dark text-capitalize card-header">profile</div>
//         <div className="card-body pb-0">
//           <div className="d-flex align-items-center justify-content-center">
//           <div style={{ height: 80, width: 80,}}><div class="bg-success rounded-circle position-relative shadow " style={{width:60, height:60,}}><img src={profile} alt="profile"/></div></div>
//           </div>
//           <div className="d-flex flex-column align-items-start justify-content-center mb-3">
//             <label className="form-label text-capitalize">username</label>
//             <div className="align-self-stretch d-flex align-items-center">
//               <input type="text" className="form-control " maxLength="10" disabled value={user.userName} />
//               {/* <button className="btn btn-primary text-capitalize btn-sm align-self-stretch" style={{ width: 75 }}>edit</button> */}
//             </div>
//           </div>
//           <div className="d-flex flex-column align-items-start justify-content-center mb-3">
//             <label className="form-label text-capitalize">mobile number</label>
//             <div className="align-self-stretch">
//               <input type="number" className="form-control" readOnly disabled value={user.mobile} />
//             </div>
//           </div>
//           <div className="card-body p-0">
//         <div className="card-body">
//       <div className="g-0 gx-2 mb-2 row">
//         {/* First column */}
//         <div className="col">
//           <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
//             <div className="text-capitalize text-start px-2 card-header" style={{ fontSize: '0.9rem' }}>
//               <div className="hstack gap-1 rajuda">
//               <svg xmlns="http://www.w3.org/2000/svg"  style={{marginRight:5,}} width="16" height="16" fill="currentColor" class="bi bi-joystick" viewBox="0 0 16 16">
//   <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2"/>
//   <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23"/>
// </svg>
//                 <span>games played</span>
//               </div>
//             </div>
//             <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">0.00</div>
//           </div>
//         </div>
//         {/* Second column */}
//         <div className="col">
//           <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
//             <div className="text-capitalize text-start px-2 card-header" style={{ fontSize: '0.9rem' }}>
//               <div className="hstack gap-1 rajuda">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" style={{marginRight:5,}} height="16" fill="currentColor">
//                   <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"></path>
//                   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
//                   <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
//                 </svg>
//                 <span>chips won</span>
//               </div>
//             </div>
//             <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">0.00</div>
//           </div>
//         </div>
//       </div>

//       <div className="g-0 gx-2 row">
//         {/* Third column */}
//         <div className="col">
//           <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
//             <div className="text-capitalize text-start px-2 card-header" style={{ fontSize: '0.9rem' }}>
//               <div className="hstack gap-1 rajuda">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" style={{marginRight:5,}} fill="currentColor">
//                   <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 2.5 0 0 0 0 5Z"></path>
//                 </svg>
//                 <span>referral earning</span>
//               </div>
//             </div>
//             <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">0.00</div>
//           </div>
//         </div>

//         {/* Fourth column */}
//         <div className="col">
//         <div className="d-flex flex-column align-items-stretch justify-content-start h-100 w-100 card">
//           <div className="text-capitalize text-start px-2 card-header" style={{ fontSize: '0.9rem' }}>
//             <div className="hstack gap-1 rajuda">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" style={{marginRight:5,}} fill="currentColor">
//                 <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
//               </svg>
//               <span>Penalty</span>
//             </div>
//           </div>
//           <div className="fs-5 fw-semibold text-start py-1 px-2 card-body">0.00</div>
//         </div>
//       </div>

//     </div>

//         </div>
//       </div>

//         </div>
//         <div className="d-grid py-2 mb-1 card-body">
//         <button type="button" className="text-capitalize btn btn-outline-danger" onClick={handleLogout}>logout</button>
//       </div>
//       </div>

//     </div>
//     <div class="row" id="footer">
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
//  </div>
//      );
// };

// export default Profile;
"use client";

import {
  Bell,
  Gift,
  BarChart3,
  Globe,
  ChevronRight,
  RotateCcw,
  Power,
  Crown,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gamepad2,
  Wallet,
  HeadphonesIcon,
  MessageSquare,
  Megaphone,
  Settings,
  BookOpen,
  Info,
} from "lucide-react";
import user from "../../assets/user.png";
import { RiVipLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { HiWallet } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa";
import { RiBankCardFill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { IoDiamondOutline } from "react-icons/io5";
import img from "../../assets/notebook.png";
import img2 from "../../assets/top-up.png";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#dd9138] px-2 mb-1 py-0.5 text-[10px] font-medium text-white">
      {children}
    </span>
  );
}

function HeaderCard() {
  return (
    <header className=" bg-gradient-to-br from-[#f1d78f] to-[#c48716] px-4 pb-6 py-10 text-white  rounded-b-3xl h-[30vh]">
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/30">
          <img src={user} alt="Profile avatar" width={56} height={56} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <h1 className="text-balance text-base font-bold tracking-wide">
              MEMBERNNGBMHLL
            </h1>
            <span className="mx-1 text-white/60">•</span>
            <Badge>
              <RiVipLine size={20} />
            </Badge>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge>UID 12766671</Badge>
            <span className="text-[10px] text-white/85">
              Last login: 2025-08-28 19:06:47
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function BalanceCard() {
  return (
    <section className="-mt-20 mx-4 rounded-2xl  bg-[#333332] p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">Total balance</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-bold">₹0.00</p>
            <button
              className="rounded-md p-1 text-zinc-400 hover:bg-white/5"
              aria-label="Refresh balance"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          {/* <p className="text-xs text-zinc-400">wallet</p> */}
          <Link
            to="/Wallet"
            className="rounded-3xl px-[12px] py-[6px] text-[13px] font-medium text-white bg-[#d9ac4f] hover:bg-[#c38b2e]"
            aria-label="Refresh balance"
          >
            Enter wallet
          </Link>
        </div>
      </div>
      {/* Actions */}
      <div className="grid grid-cols-4 gap-3">
        <ActionTile
          icon={
            <Wallet
              className="h-7 w-7 text-rose-500"
              fill="currentColor" // 👈 yeh add karo
            />
          }
          label="ARWallet"
        />

        <ActionTile
          // color="bg-orange-500"
          icon={<HiWallet className="h-7 w-7 text-orange-500" />}
          label="Deposit"
        />
        <ActionTile
          // color="bg-sky-500"
          icon={<FaWallet className="h-7 w-7 text-sky-500" />}
          label="Withdraw"
        />
        <ActionTile
          // color="bg-emerald-500"
          icon={<IoDiamondOutline className="h-7 w-7 text-emerald-500" />}
          label="VIP"
        />
      </div>
    </section>
  );
}

function ActionTile({ color, icon, label }) {
  return (
    <div className="text-center">
      <div
        className={`mx-auto mb- flex h-8 w-8 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>
      <span className="text-[11px] text-zinc-300">{label}</span>
    </div>
  );
}

function ShortcutGrid() {
  return (
    <section className="grid grid-cols-2 gap-3 p-4">
      {/* <ShortcutCard
        color="bg-sky-500"
        icon={<Gamepad2 className="h-7 w-7 text-[#f1e6ce]" />}
        title="Game History"
        subtitle="My game history"
      /> */}
      <ShortcutCard
        // color="bg-emerald-500"
        icon={<img src={img} className="h-8 w-8 filter-blue" />}
        title="Game History"
        subtitle="My game history"
      />
      {/* <ShortcutCard
        color="bg-emerald-500"
        icon={<GrTransaction className="h-7 w-7 text-[#f1e6ce]" />}
        title="Transaction"
        subtitle="My Transaction history"
      /> */}
      <ShortcutCard
        // color="bg-emerald-500"
        icon={
          <img
            src={img} // apni image ka path (public folder me rakho)
            alt="notebook"
            className="h-8 w-8 green-sky"
          />
        }
        title="Transaction"
        subtitle="My Transaction history"
      />

      <ShortcutCard
        // color="bg-rose-500"
        icon={<HiWallet className="h-9 w-9 text-rose-500" />}
        title="Deposit"
        subtitle="My deposit history"
      />
      <ShortcutCard
        // color="bg-orange-500"
        icon={
          <img
            src={img2} // apni image ka path (public folder me rakho)
            alt="notebook"
            className="h-9 w-9 withdrow-key"
          />
        }
        title="Withdraw"
        subtitle="My withdraw history"
      />
    </section>
  );
}

function ShortcutCard({ color, icon, title, subtitle }) {
  return (
    <div className="flex items-center rounded-xl  bg-[#333332] p-2">
      <div
        className={`mr-3 flex h-10 w-12 items-center justify-center  ${color} rounded-xl`}
      >
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-medium text-white">{title}</div>
        <div className="text-[9px] text-zinc-400">{subtitle}</div>
      </div>
    </div>
  );
}

function Row({ icon, label, end, badge }) {
  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center">
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg ">
          {icon}
        </div>
        <span className="text-sm text-white">{label}</span>
      </div>
      <div className="flex items-center">
        {typeof badge === "number" && (
          <span className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-medium text-white">
            {badge}
          </span>
        )}
        {end}
        <ChevronRight className="ml-2 h-5 w-5 text-zinc-500" />
      </div>
    </div>
  );
}

function ListMenu() {
  return (
    <section className="px-4">
      <div className="border-b border-white/20">
        <Row
          icon={<Bell className="h-6 w-6 text-[#d9ac4f]" />}
          label="Notification"
          badge={1}
        />
      </div>
      <div className="border-b border-white/20">
        <Row icon={<Gift className="h-6 w-6 text-[#d9ac4f]" />} label="Gifts" />
      </div>
      <div className="border-b border-white/20">
        <Row
          icon={<BarChart3 className="h-6 w-6 text-[#d9ac4f]" />}
          label="Game statistics"
        />
      </div>
      <div className="border-b border-white/20">
        <Row
          icon={<Globe className="h-6 w-6 text-[#d9ac4f]" />}
          label="Language"
          end={<span className="text-xs text-zinc-400">English</span>}
        />
      </div>
    </section>
  );
}

function ServiceCenter() {
  const items = [
    {
      icon: <Settings className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Settings",
    },
    {
      icon: <MessageSquare className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Feedback",
    },
    {
      icon: <Megaphone className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Announcement",
    },
    {
      icon: <HeadphonesIcon className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Customer Service",
    },
    {
      icon: <BookOpen className="h-7 w-7 text-[#d9ac4f]" />,
      label: "Beginner's Guide",
    },
    { icon: <Info className="h-7 w-7 text-[#d9ac4f]" />, label: "About us" },
  ];

  return (
    <section className="px-4">
      <h3 className="py-3 text-xs text-zinc-500">Service center</h3>
      <div className="rounded-2xl p-">
        <div className="grid grid-cols-3 gap-2">
          {items.map((it) => (
            <button
              key={it.label}
              className="group flex h-20 flex-col items-center justify-center gap-2 rounded-xl p-3 "
            >
              <span className="flex h-10 w-16 items-center justify-center rounded-md ">
                {it.icon}
              </span>
              <span className="text-center text-[12px] font-medium text-gray-300 leading-tight tracking-tight">
                {it.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoutButton({ navigate }) {
  return (
    <div className="px-4 py-6 mb-5">
      <button
        className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-[#d9ac4f]/70 px-4 py-3 text-amber-400 hover:bg-amber-500/10"
        onClick={() => {
          localStorage.clear();
          navigate("/LoginScreen");
        }}
      >
        <Power className="h-4 w-4" />
        <span className="text-sm font-medium">Log out</span>
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-black font-sans text-white">
      <HeaderCard />
      <BalanceCard />
      <ShortcutGrid />
      <ListMenu />
      <ServiceCenter />
      <LogoutButton navigate={navigate} />
      <div className="h-8" />
    </main>
  );
}
