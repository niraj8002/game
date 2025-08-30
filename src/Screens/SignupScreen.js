// import { Form, Row, Input, Button, message, Select, InputNumber } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import React, { useState, useEffect, useContext } from "react";
// import axiosInstance from "../axiosInstance";
// import { UserContext } from "../globalContext";
// import { useNavigate } from "react-router-dom";
// import Otpvalidation from "./OtpValidation.model";
// import { Radio } from "antd";
// import {NavLink} from 'react-router-dom';
// import {Layout, Menu, Dropdown} from 'antd';
// import SubMenu from 'antd/lib/menu/SubMenu';
// // import {environment} from './Environment';
// // import logo from '../src/images/logo.jpg';
// import Icon from '@ant-design/icons';
// import Hamburger from 'hamburger-react';
// // import {useState} from 'react';
// // import manue from '../static/media/menu.png'
// // import imglogo from "../static/media/Realludokinglogo.png"
// // import wollet from "../static/media/wallet.png"

// import ForgotPasswordModel from "./ForgotPassword.model";
// // import { Container } from "react-bootstrap";
// // import { Nav2 } from "../Nav2";

// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBInput,
//   MDBIcon,
//   MDBCheckbox
// }
// from 'mdb-react-ui-kit';
// import { Container } from "react-bootstrap";
// import axios from "axios";

// const plainOptions = ['Milk Distribution', 'Milk collection'];

// const { Option } = Select;

// const SignupScreen = (props) => {
//   let navigate = useNavigate();
//   const [RoleList, setRoleList] = useState();
//   const [Role, setRole] = useState();
//   const [fullname, setFullname] = useState();
//   const [email, setEmail] = useState();
//   const [mobile, setMobile] = useState();
//   const [memberReferCode, setMemberReferCode] = useState();
//   const [referCode, setReferCode] = useState();
//   const [password, setPassword] = useState();
//   const [Rpassword, setPasswordV] = useState();
//   const [address, setAddress] = useState();
//   const [companyname, setcompanyname] = useState();
//   const [defaultRole, setDefaultRole] = useState('');
//   const [defaultrole, setDefaultrole] = useState('');
//   const [companyId, setCompanyId] = useState('');
//   const [Otp, setOtp] = useState(1);
//   const [MOtp, setMOtp] = useState(false);
//   const [isModelOpen, setIsModalOpen] = useState(false);
//   const [emailverified, setEmailVerified] = useState(false);
//   const [verificationId, setVerificationId] = useState('');
//   const [value2, setValue2] = useState('Apple');

//   const user = useContext(UserContext);
//   useEffect(() => {
//     let mounted = true;
//     if (mounted) pageLoad();
//     return () => (mounted = false);
//   }, []);

//   const pageLoad = () => {

//       Reload()

//   }
//   const Reload = () => {
//     if (props.authToken != null) {
//       localStorage.clear();
//       window.location.reload(true);
//     }

//   }
//   var existMatch = ''
//   const onCheakOtp = async (e) => {
//     if (e.target.value.length === 6) {
//       await axiosInstance.get("/email").then((response) => {
//         existMatch = response.data.data.find(x => x.email === email);
//       });
//       if (e.target.value === existMatch.otp) {
//         setMOtp(true)
//         message.success("Otp successfully");
//       }
//       else {
//         setMOtp(false)
//         message.error("Wrong");

//       }
//     }
//   };

//   const onSignin = (e) => {
//     navigate(`/`, { replace: true });

//   };
//   const onOtp = async() => {
//     if(mobile !==undefined && mobile!=='' && mobile.length ===10  ){

//       const url = `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-CD9F51B96DB84F4&flowType=SMS&mobileNumber=${mobile}`;
//       const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUNEOUY1MUI5NkRCODRGNCIsImlhdCI6MTc0ODUxMjY2MywiZXhwIjoxOTA2MTkyNjYzfQ.xlWgT3ISRDQLnmoSdFKyjf0jGWHKKz-U1rZ4nOPtK35CBfu1bKF3R3Axx9blTjOj-f5tUFM9_29xHctdRCcX_g";

//       try {
//         const response = await axios.post(url, {}, {
//           headers: {
//             'authToken': authToken
//           }
//         });
//         console.log(response.data.data);
//         if (response.data.responseCode ==200 ) {
//           setVerificationId(response.data.data.verificationId)
//           message.success("Otp Sent successfully");
//          setIsModalOpen(true);
//         setMOtp(false)

//    } else if (response.data.responseCode ==506) {
//     message.error("after one minute you can send otp again ...!");
//    } else message.error("Something wrong. Please try again...!");
//       } catch (error) {
//         console.error('Error:', error);
//       }

//   }
// else {
//   message.error("please enter valid mobile number...!")
// }
//   };
//   const onCancel = () => {
//     setIsModalOpen(false);
//   };
//   const onAdd = () => {
//     setIsModalOpen(false);
//   };

//   const onSignup = () => {
//     if (MOtp === true) {
//       const data = {
//         email: email,
//         name: fullname,
//         mobile: mobile,
//         password: password,
//         referCode: referCode,
//         registerDate:new Date()
//       };
//        if(data.name!==undefined&& data.password!==undefined&& data.email!==undefined&& data.name!==''&& data.password!==''&& data.email!==''){
//         axiosInstance.post("/member", data).then((res) => {
//           if (res.data && res.data.responseCode === -1) {
//             message.error("Record Already Exists");
//           } else if (res.data && res.data.responseCode === 1) {
//             message.success("Record saved successfully");
//             navigate(`/LoginScreen`, { replace: true });
//           } else message.error("Something wrong. Please try again...!");
//         });
//      }
//      else{
//       message.error("Please fill out all required fields. And submit again...!");
//      }
//     }
//     else {
//       message.error("Plese Varify Your Otp");
//     }
//   };
//   const onEmailChange = (input) => {
//     setEmail(input.target.value)
//     var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-].+(?:\.[a-zA-Z0-9-]+)*$/;

//     if (input.target.value.match(validRegex)) {

//       //alert("Valid email address!");

//       // document.form1.text1.focus();

//       setEmailVerified(true);

//     }
//     else {

//       // alert("Invalid email address!");

//       document.form1.text1.focus();

//       setEmailVerified(false);

//     }

//   }

//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);

//   const handleToggleClick = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//   <div className="realludokingsize">
//       <div>
//       <div class="fixed">
//     <div class="bg-danger py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div>
//     <div
//       class="w-100 bg-white shadow-sm text-white pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
//       >
//       <div className='d-flex  align-items-center'>
//         {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}
//               <div className='ram01'>
//          <a className={`toggle ${isSidebarVisible ? 'toggle' : ''}`} onClick={handleToggleClick}>
//           {/* <img className='menuimg01' src={manue} alt="menuicon" /> */}
//           </a>
//          </div>
//           <a class="text-decoration-none text-white fw-semibold fs-4" href="/"><span
//             class="text-white">
//               {/* <img src={imglogo} alt="logo"
//               height="40" className=' mainlogo'/> */}
//               </span></a></div>
//       <div class="row">
//         <div class="p-0 col"><button type="button"
//             class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm"><svg
//               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" fill="currentColor"
//               class="me-2">
//               <path
//                 d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z">
//               </path>
//               <path
//                 d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z">
//               </path>
//             </svg>
//             <a href='https://play.google.com/store/apps/details?id=com.realludoking&pcampaignid=web_share'>
//             <span class="flex-nowrap flex-shrink-0 ">Install App</span>

//             </a>
//             </button></div>
//         <div class="col"><a class="text-decoration-none text-white " href="/">
//             <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2"><svg
//                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="green"
//                 class="me-2">
//                 <path
//                   d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z">
//                 </path>
//                 <path
//                   d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z">
//                 </path>
//               </svg><strong>0</strong></div>
//           </a></div>
//       </div>
//     </div>
//   </div>
//   <div class="fixed 02">
//     <div class="bgclr py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div>
//     <div
//       class="w-100 bg-white shadow-sm text-white py-2 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
//       >
//       <div className='d-flex  align-items-center'>
//         {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
//             <path fill-rule="evenodd"
//               d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
//             </path>
//           </svg></button> */}

//          {/* <img className='menuimg01' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" src={manue} alt="menuicon" /> */}

// <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
// <div className="bg-dark offcanvas-header">
//             <div className="text-white fw-bold offcanvas-title h5">
//               Real Ludo King
//             </div>
//             <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//           </div>
//           <div className="d-flex flex-column align-items-stretch justify-content-start p-0 offcanvas-body">
//             <div className="d-flex align-items-center justify-content-between p-4">
//               <div className="fs-1 fw-bold text-start d-flex align-items-center justify-content-start">
//                 <div className="hstack gap-2">
//                   <div className="m-0 me-1 text-dark d-flex align-items-center justify-content-start">
//                     <p className="m-0">Hey,</p>
//                     <p className="m-0">User..</p>
//                     {/* <p
//                       className="text-truncate m-0 me-2"
//                       style={{maxWidth: '125px'}}>
//                       &nbsp;
//                     </p> */}
//                     {/* <img src="./static/media/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg" alt=""  width="30" height="30"/> */}
//                     <div><a href="/"><div  class="rounded-circle"><img width="40" height="40" src="./static/media/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg" alt="avatar"/></div></a></div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="d-flex flex-column align-items-stretch justify-content-start">
//               <a
//                 className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                 href="/" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <div className="d-flex align-items-center justify-content-start">
//                   <div className="hstack gap-3">
//                     {/* {/ <img src="/static/media/play.2f22f88bac8acca85f6a.webp" height="36px" alt="play" /> /} */}
//                     <p className="p-0 m-0 text-capitalize">play</p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="m-0 p-0 d-flex align-items-center justify-content-center">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                 </svg>
//               </a>
//               <a
//                 className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                 href="/" data-bs-dismiss="offcanvas" aria-label="Close"
//               >
//                 <div className="d-flex align-items-center justify-content-start">
//                   <div className="hstack gap-3">
//                     {/* {/ <img src="/static/media/play.2f22f88bac8acca85f6a.webp" height="36px" alt="play" /> /} */}
//                     <p className="p-0 m-0 text-capitalize">Wallet</p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="m-0 p-0 d-flex align-items-center justify-content-center">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                 </svg>
//               </a>
//               <a data-bs-dismiss="offcanvas" aria-label="Close"
//                 className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                 href="/"
//                 >
//                 <div className="d-flex align-items-center justify-content-start">
//                   <div className="hstack gap-3">
//                     {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
//                     <p className="p-0 m-0 text-capitalize">History</p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="m-0 p-0 d-flex align-items-center justify-content-center">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                 </svg>
//               </a>
//               <a data-bs-dismiss="offcanvas" aria-label="Close"
//                 className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                 href="/"
//           >
//                 <div className="d-flex align-items-center justify-content-start">
//                   <div className="hstack gap-3">
//                     {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
//                     <p className="p-0 m-0 text-capitalize">Profile</p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="m-0 p-0 d-flex align-items-center justify-content-center">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                 </svg>
//               </a>
//               <a data-bs-dismiss="offcanvas" aria-label="Close"
//                 className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                 href="/"
//                 >
//                 <div className="d-flex align-items-center justify-content-start">
//                   <div className="hstack gap-3">
//                     {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
//                     <p className="p-0 m-0 text-capitalize">Refere & Earn</p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="m-0 p-0 d-flex align-items-center justify-content-center">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                 </svg>
//               </a>

//               <a data-bs-dismiss="offcanvas" aria-label="Close"
//                 className="text-start text-decoration-none bg-whitebg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
//                 href="/"
//         >
//                 <div className="d-flex align-items-center justify-content-start">
//                   <div className="hstack gap-3 rajuji">
//                     {/* <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 16 16"
//                       width="36"
//                       height="36"
//                       fill="currentColor">
//                       <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"></path>
//                       <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"></path>
//                     </svg> */}
//                     <p className="p-0 m-0 text-capitalize">legal terms</p>
//                   </div>
//                 </div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   width="1em"
//                   height="1em"
//                   fill="currentColor"
//                   className="m-0 p-0 d-flex align-items-center justify-content-center">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
//                 </svg>
//               </a>
//             </div>
//           </div>
// </div>

//           <a class="text-decoration-none text-white fw-semibold fs-4" href="/"><span
//             class="text-white">
//               {/* <img src={imglogo} alt="logo"
//               height="45" className=' mainlogo'/> */}
//               </span></a></div>
//       <div class="row">
//         <div class="p-0 d-flex raju15"><button type="button"
//             class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm">

//             <a href='https://play.google.com/store/apps/details?id=com.realludoking&pcampaignid=web_share'>
//             <span class="flex-nowrap flex-shrink-0 ">Install App</span>

//             </a>
//          </button></div>
//         <div class="col"><a class="text-decoration-none text-white " href="/">
//             <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
//           {/* <img className='wllet' src={wollet} alt="" srcset="" /> */}
//             <strong>0</strong></div>
//           </a></div>
//       </div>
//     </div>
//   </div>
// <div className='text-black'>
//   <div>
//     <div>

//     </div>
//   </div>
// </div>

// </div>

// <div class="col mx-auto g-0 iframe-sec p-3"><div class="card"><div class="bg-light text-dark card-header text-center">Sign-Up</div>
// <div className=" gradient-form ">

// <div>

//   <div className="card-body">

//   <div>

// <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 w-100 mx-auto">Sign up</p>

// <div className="d-flex flex-row align-items-center mb-4 ">

//   <MDBInput placeholder='Your Name' id='form1' onChange={(e)=>setFullname(e.target.value)} type='text'/>
// </div>

// <div className="d-flex  align-items-center mb-4">

//   <MDBInput placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)} id='form2' type='email'/>
// </div>
// <div className="d-flex flex-row align-items-center mb-4">

//   <MDBInput placeholder='Your Mobile Number' onChange={(e)=>setMobile(e.target.value)} id='form2' type='number'/>
//   {(MOtp === false) &&  <Button className=" raj033333 btn btn-primary" onClick={() => onOtp()}>
//                         Gen. Otp
//                       </Button>}
//                    {(MOtp === true) && <div style={{ width: "40%" }}>
//                       <Button className="btnmy4" >
//                       <svg className="veryfied" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg> Veryfied
//                       </Button>
//                     </div>}
// </div>
// <div
//                     style={{ alignItems: "flex-end", marginLeft: "65%", marginBottom: "-7%", }}
//                   >

//                     <Otpvalidation
//                       isVisible={isModelOpen}
//                       onCancel={onCancel}
//                       onAdd={onAdd}
//                       onCheakOtp={onCheakOtp}
//                       mobile={mobile}
//                       verificationId={verificationId}
//                       setMOtp={setMOtp}
//                       setIsModalOpen={setIsModalOpen}
//                       setOtp={setOtp}
//                     />

//                   </div>
// <div className="d-flex flex-row align-items-center mb-4">
//   <div fas icon="lock me-3" size='lg'/>

// </div>

// <div className="d-flex flex-row align-items-center mb-4">
//   <div fas icon="key me-3" size='lg'/>
//   <MDBInput placeholder='Referal Code' onChange={(e)=>setReferCode(e.target.value)} id='form4' type='text'/>
// </div>
// <div className="d-flex flex-row align-items-center mb-4">
//   <div fas icon="key me-3" size='lg'/>
//   <MDBInput placeholder='password' onChange={(e)=>setPassword(e.target.value)} id='form4' type='password'/>
// </div>

// {/* <div className='mb-4'>
//   <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
// </div> */}

// <div className="text-center">
// <button className='mb-4 btn btn-primary text-center' size='lg' onClick={() =>onSignup()}>Register</button>

// </div>
// </div>
//   </div>

// </div>

// </div>
//   </div></div>
//   </div>
//   );
// };

// export default SignupScreen;

import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { FaMobileAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";

const SignupScreen = () => {
  // const [formData, setFormData] =

  //   FormData >
  //   {
  //     countryCode: "+91",
  //     phoneNumber: "",
  //     password: "",
  //     confirmPassword: "",
  //     inviteCode: "",
  //     agreeToPrivacy: false,
  //   };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const handleInputChange = (FormData, value) => {
  //   setFormData((prev) => ({ ...prev }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Registration data:", formData);
  // };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-start mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">Register</h1>
          <p className="text-gray-400 text-sm">
            Please register for phone number or email
          </p>
        </div>

        <form className="space-y-5">
          {/* Register your phone */}
          <div>
            <div className="flex items-center justify-center">
              <h2 className="flex flex-col items-center justify-center text-[#d9ac4f] text-lg font-medium mb-2">
                <FaMobileAlt size={23} className="mb-3" />
                Register your phone
              </h2>
            </div>
            <hr className=" mb-5"/> 

            {/* Phone Number */}
            <div className="space-y-1 mb-4">
              <label className="flex items-center gap-3 text-[#d9ac4f] text-md font-medium">
                <FaMobileAlt /> Phone number
              </label>
              <div className="flex">
                <div className="relative">
                  <select
                    // value={formData.countryCode}
                    // onChange={(e) =>
                    //   handleInputChange("countryCode", e.target.value)
                    // }
                    className="bg-gray-800 relative  text-gray-300 px-3 py-3 rounded-l-lg focus:outline-none focus:border-[#d9ac4f] appearance-none pr-8"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+86">+86</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none pl-2" />
                   <div className="h-6 right-0  absolute bottom-4 border-r border-gray-500 flex"></div>
                </div>
                <input
                  type="tel"
                  placeholder="Please enter the phone number"
                  // value={formData.phoneNumber}
                  // onChange={(e) =>
                  //   handleInputChange("phoneNumber", e.target.value)
                  // }
                  className="flex-1 bg-gray-800 text-gray-300 px-4 py-3 rounded-r-xl focus:outline-none focus:border-[#d9ac4f] placeholder-gray-500 placeholder:text-[13px]"
                />
              </div>
            </div>

            {/* Set Password */}
            <div className="space-y-1 mb-4">
              <label className="flex item-center gap-3 text-[#d9ac4f] text-md font-medium  items-center">
                <FaLock />
                Set password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Set password"
                  // value={formData.password}
                  // onChange={(e) =>
                  //   handleInputChange("password", e.target.value)
                  // }
                  className="w-full bg-gray-800  text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#d9ac4f] placeholder-gray-500 pr-12 placeholder:text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1 mb-4">
              <label className="flex item-center gap-3 text-[#d9ac4f] text-md font-medium flex items-center">
                <FaLock />
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  // value={formData.confirmPassword}
                  // onChange={(e) =>
                  //   handleInputChange("confirmPassword", e.target.value)
                  // }
                  className="w-full bg-gray-800 0 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#d9ac4f] placeholder-gray-500 pr-12 placeholder:text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Invite Code */}
            <div className="space-y-1 mb-6">
              <label className="flex item-center gap-3 text-[#d9ac4f] text-md font-medium flex items-center">
                <FcInvite />
                Invite code
              </label>
              <input
                type="text"
                placeholder="Please enter the invitation code"
                // value={formData.inviteCode}
                // onChange={(e) =>
                //   handleInputChange("inviteCode", e.target.value)
                // }
                className="w-full bg-gray-800  text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#d9ac4f] placeholder-gray-500  placeholder:text-[13px]"
              />
            </div>
          </div>

          {/* Privacy Agreement */}
          <div className="flex items-start space-x-3 mb-6">
            <div className="flex-shrink-0 mt-0.5 rounded-full">
              <input
                type="checkbox"
                id="privacy"
                className="w-4 h-4 appearance-none rounded-full border border-gray-600 bg-gray-800 checked:bg-[#d9ac4f] checked:border-[#d9ac4f] cursor-pointer"
              />
            </div>
            <label
              htmlFor="privacy"
              className="text-gray-400 text-sm leading-relaxed"
            >
              I have read and agree.{" "}
              <a
                href="#"
                className="text-[#d9ac4f] underline hover:text-yellow-400 transition-colors"
              >
                Privacy Statement
              </a>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#d9ac4f] hover:bg-yellow-600 text-black font-semibold py-3 rounded-xl transition-colors duration-200 mb-4"
          >
            Register
          </button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-400 text-sm">I have an account. </span>
            <a
              href="/LoginScreen"
              className="text-white text-sm font-medium hover:text-[#d9ac4f] transition-colors"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
