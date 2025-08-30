import React, { useContext, useEffect, useState,useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "antd/lib/layout/layout";
import { Button } from "react-bootstrap";
import { message } from "antd";
import manue from '../../img/menu.png'
import imglogo from "../../img/newfastwin.png"
import axiosInstance from "../../axiosInstance";

import wollet from "../../img/wallet.png";
import profile from "../../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg";
import { compress } from 'image-conversion';

const Recharge = (props) => {
  const [wallet ,setWallet] = useState(null)

  const textRef = useRef(null);
const [amount , setAmount] = useState(0)
const [upi , setUPI] = useState()
const [qrcode , setQR] = useState()
const [upiId , setUPIId] = useState()
const [utr , setUtr] = useState()
const [image3, setImage3] = useState(null);
const [isModelOpen, setIsModalOpen] = useState(false);

const [utrShow , setUtrShow] = useState(true)
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
  getUpi()
  getWallet()
  }
  var count = 1;
  const getWallet = () => {
    axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
        let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
        setWallet(Math.floor(amount));
    });
  }
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const onFastParity = (path) => {
    navigate(`/${path}`)
  }
  const getUpi = () => {
    axiosInstance.post("/upi/active").then((response) => {
      setUPIId(response.data.data[0]._id);
      setUPI(response.data.data[0].name);
      setQR(response.data.data[0].qr);
    });
  };
  const convertBlobToFile = (blob, fileName) => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };
  const handleInputChange1 = async(event) => {
    const image11 = event.target.files[0];
    const imagename = event.target.name;
if(image11.size/1024 >30 ){
  const compressedImage = await compress(image11, {
    quality: 0.1,
});
    const file11 = convertBlobToFile(compressedImage, 'imagename');
const newImage = {[imagename]:file11}
 const reader = new FileReader();
    reader.onload = () => setImage3(reader.result);
    reader.readAsDataURL(newImage[imagename]);
}
else{
  const image = { [event.target.name]: event.target.files[0] };
  const reader = new FileReader();
  reader.onload = () => setImage3(reader.result);
  reader.readAsDataURL(image[event.target.name]);
}

  };
  const handleCopyClick = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand('copy');
      alert('Text copied to clipboard!');
    }
  };

  const onPay = () => {
    axiosInstance.get('/orderId').then((res)=>{
      console.log("res.data",res.data)

      const userId = res.data.data[0].orderId +1
      const data ={
        orderId:res.data.data[0].orderId +1
      } 
      axiosInstance.put(`/orderId/${res.data.data[0]._id}`,data).then((res)=>{
        onRecharge(userId)
      })
    
    
    })
       };
       const onRecharge = (e) => {
        const data = {
          userId:user.memberId,
          member:user.userId,
          amount:amount,
          status:"requested",
          orderId:e,
          transactionDate:new Date()
        };
        console.log(data)
         if(data.userId!==undefined  && data.member!==undefined&& data.amount!==undefined&& data.status!==undefined && data.orderId!==undefined&& data.orderId!==''&& data.status!==''&& data.amount!==''&& data.member!==''&& data.userId!==''){
          axiosInstance.post("/payment", data).then((res) => {
            if (res.data && res.data.responseCode === -1) {
              message.error("Record Already Exists");
            } else if (res.data && res.data.responseCode === 1) {
              message.success("Record saved successfully");
              onPayCheck(res.data.data)
            } else message.error("Something wrong. Please try again...!");
          });
       }
       else{
        message.error("Please fill out all required fields. And submit again...!");
       }
       
      };
      const onPayCheck = async(e) => {
         const data = {
          customer_mobile: user.mobile,
          user_token: "12a6aa5daf26fda8cc431c01361de5a2",
          amount: e.amount,
          order_id: e.orderId,
          redirect_url: "https://winningadda.com",
          remark1: "testremark",
          remark2: "testremark2"
         }
        // console.log("onpayCheck",data)

       await axiosInstance.post('/roomeCode/payment',data).then((res)=>{
            console.log("payCheckurl",res.data)
            window.open(res.data.result.payment_url, '_blank');
           // window.open=`${res.data.result.payment_url}`
        })
           };
const onGuide = () =>{
         setIsModalOpen(true);

}
  return (
<div className="japurLudoNav realludokingsize " style={{height:'100vh'}}>
<div class="fixed">
        {/* <div class="bg-danger py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
        <div
          class="w-100 bg-white shadow-sm text-white py-0 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
        >
          <div className='d-flex  align-items-center'>
            {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
            </path>
          </svg></button> */}
            <div className='ram01'>
              <a className={`toggle ${isSidebarVisible ? 'toggle' : ''}`} onClick={handleToggleClick}>
                <img className='menuimg01' src={manue} alt="menuicon" />
              </a>
            </div>
            <a class="text-decoration-none text-white fw-semibold fs-4" href="/"><span
              class="text-white">
              <img src={imglogo} alt="logo"
                height="10" className=' mainlogo' />
            </span></a></div>
          <div class="row">
            <div class="p-0 col"><button type="button"
              class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" fill="currentColor"
                class="me-2">
                <path
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z">
                </path>
                <path
                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z">
                </path>
              </svg><span class="flex-nowrap flex-shrink-0 ">Install App</span></button></div>
            <div class="col"><a class="text-decoration-none text-white " href="/">
              <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="green"
                class="me-2">
                <path
                  d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z">
                </path>
                <path
                  d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z">
                </path>
              </svg><strong>0</strong></div>
            </a></div>
          </div>
        </div>
      </div>
      <div class="fixed 02">
        {/* <div class="bgclr py-2 text-white w-100 text-center">Commission: 5% ◉ Referral: 2% For All Games</div> */}
        <div
          class="w-100 bg-white shadow-sm text-white py-2 pe-2 ps-2 d-flex d-sm-flex align-items-center align-items-sm-center justify-content-between justify-content-sm-between"
        >
          <div className='d-flex  align-items-center'>
            {/* <button type="button" class="bg-white border-0 btn btn-light"><svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z">
            </path>
          </svg></button> */}

            <img className='menuimg01' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" src={manue} alt="menuicon" />



            <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div className="bg-dark offcanvas-header">
                <div className="text-white fw-bold offcanvas-title">
                  <h5 className="text-white mb-0">    <img src={imglogo} alt="logo"
                    height="30" className=' mainlogo' /> </h5>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="d-flex flex-column align-items-stretch justify-content-start p-0 offcanvas-body">
                <div className="d-flex align-items-center justify-content-between p-4">
                  <div className="fs-1 fw-bold text-start d-flex align-items-center justify-content-start">
                    <div className="hstack gap-2">
                      <div className="m-0 me-1 text-dark d-flex align-items-center justify-content-start">
                        <p className="m-0">Hey,</p>
                        <p className="m-0">User..</p>
                        {/* <p
                      className="text-truncate m-0 me-2"
                      style={{maxWidth: '125px'}}>
                      &nbsp;
                    </p> */}
                        <div><a href="/"><div class="rounded-circle">
                          <img width="40" height="40" src={profile} alt="avatar" />
                        </div></a></div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-stretch justify-content-start">
                  <a
                    className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                    href="/" data-bs-dismiss="offcanvas" aria-label="Close">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="hstack gap-3">
                        {/* {/ <img src="/static/media/play.2f22f88bac8acca85f6a.webp" height="36px" alt="play" /> /} */}
                        <p className="p-0 m-0 text-capitalize">play</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="m-0 p-0 d-flex align-items-center justify-content-center">
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a>
                  <a
                    className="text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                    href="#/Wallet" data-bs-dismiss="offcanvas" aria-label="Close"
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="hstack gap-3">
                        {/* {/ <img src="/static/media/play.2f22f88bac8acca85f6a.webp" height="36px" alt="play" /> /} */}
                        <p className="p-0 m-0 text-capitalize">Wallet</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="m-0 p-0 d-flex align-items-center justify-content-center">
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a>
                  <a data-bs-dismiss="offcanvas" aria-label="Close"
                    className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                    href="#/History"
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="hstack gap-3">
                        {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
                        <p className="p-0 m-0 text-capitalize">History</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="m-0 p-0 d-flex align-items-center justify-content-center">
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a>
                  <a data-bs-dismiss="offcanvas" aria-label="Close"
                    className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                    href="#/Profile"
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="hstack gap-3">
                        {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
                        <p className="p-0 m-0 text-capitalize">Profile</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="m-0 p-0 d-flex align-items-center justify-content-center">
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a>
                  <a data-bs-dismiss="offcanvas" aria-label="Close"
                    className="text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                    href="#/Refere"
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="hstack gap-3">
                        {/* {/ <img src="/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp" height="36px" alt="support icon" /> /} */}
                        <p className="p-0 m-0 text-capitalize">Refere & Earn</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="m-0 p-0 d-flex align-items-center justify-content-center">
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a>

                  <a data-bs-dismiss="offcanvas" aria-label="Close"
                    className="text-start text-decoration-none bg-whitebg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between"
                    href="/terms"
                  >
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="hstack gap-3 rajuji">
                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="36"
                      height="36"
                      fill="currentColor">
                      <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"></path>
                      <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"></path>
                    </svg> */}
                        <p className="p-0 m-0 text-capitalize">legal terms</p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="m-0 p-0 d-flex align-items-center justify-content-center">
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <a class="text-decoration-none text-white fw-semibold fs-4" href="/"><span
              class="text-white">
              <img src={imglogo} alt="logo"
                height="25" style={{ paddingLeft: '5px' }} className=' mainlogo' />
            </span></a></div>
          <div class="row">
            <div class="p-0 d-flex raju15"><button type="button"
              class="h-100 flex-shrink-0 flex-grow-1 flex-nowrap  d-flex align-items-center btn btn-outline-primary btn-sm">

              <span class="flex-nowrap flex-shrink-0 ">Install App</span>
            </button></div>
            <div class="col"><a class="text-decoration-none text-white " href="/">
              <div class="py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2">
                <img className='wllet' src={wollet} alt="" srcset="" />
               {wallet !== null && <strong>{wallet}</strong>}
               {wallet === null && <strong>0</strong>}
               
               </div>
            </a></div>
          </div>
        </div>
      </div>
  <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
  <div class="offcanvas-title h5"id="offcanvasBottomLabel">How To Play Games &amp; Earn?</div>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body small">
   Your Video
    </div>
  </div>
      <div className="p-3">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-start">
            <a href="#/Wallet">
              <button className="btn btn-primary border" onClick={()=>setUtrShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="me-2">
                  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
                </svg>
                <span className="text-capitalize">Back</span>
              </button>
            </a>
          </div>
          <button type="button" className="d-flex align-items-center btn btn-outline-primary btn-md" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="me-1">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
            <span className="text-capitalize">guide</span>
          </button>
        </div>
        <div className="mb-3  shadow card">
 

                <div className="form-group">
              <div className="d-flex flex-column justify-content-center align-items-center">
             


             
                <div id="whichPG" className="p-0 mt-4 pe-3 ps-3 w-100">
                  {/* <div className="form-check form-check-inline">
                    <input type="radio" name="whichPG" id="cashfree" className="form-check-input" value="cashfree" />
                    <label htmlFor="cashfree" className="form-check-label">
                      <h5 className="text-capitalize">UPI</h5>
                    </label>
                  </div> */}
                  {/* <div className="form-check form-check-inline">
                    <input type="radio" name="whichPG" id="phonepe" className="form-check-input" value="phonepe" checked />
                    <label htmlFor="phonepe" className="form-check-label">
                      <h5 className="text-capitalize">UPI-2</h5>
                    </label>
                  </div> */}
               {utrShow && <label htmlFor="amount" className="form-label w-100 text-start">Enter Amount</label>}
               {!utrShow && <label htmlFor="amount" className="form-label w-100 text-center text-decoration-underline m-0">Payable Amount: ₹ {amount}</label>}

                     {utrShow && <div className="input-group mb-4">
                  <span className="input-group-text bg-light text-dark">₹</span>
                  <input type="number" placeholder="Amount" id="amount" min="1" max="20000" className="form-control" onChange={(e) =>{setAmount(e.target.value)}}  />
                
                </div>}
                
                </div>
              { utrShow && <button className="btn btn-primary mb-4" onClick={()=>onPay()}>Pay</button>}

            
                </div>
                </div>
          {!utrShow &&            <div className="p-3 " >
      
        <div className="">
    
          <div className="">
          <div class="">
        
        <div class="">
            <div class="">
        
                    <div class="row row-cols-xl-6 row-cols-lg-5 text-center  row-cols-md-5 row-cols-sm-5 row-cols-4 gy-2">

             
                     <div className="w-100 text-center  d-flex justify-content-center">
                     <div class="  text-center" style={{width:'48%'}}>
                          <div className="mx-auto" style={{border:"2px solid #000"}}>
                          <img src={qrcode} alt="logo" style={{width:'100%',padding:"10px"}} class="rounded-3 mx-auto d-table"/>
                          </div>
                       
                        </div>
                        
                     </div>
                     <div class="w-100" style={{textTransform:'capitalize',fontWeight:'bold'}}>
                          scan and deposite now

                          &#128070;
                        </div>
                        <div className="text-center w-100 text-danger " style={{fontWeight:'bold',fontSize:'20px'}}>or</div>


                        <div class="col-xl-12 col-lg-12 col-md-12 col-12">

                         
                        
                              <div>

                                <div className="card-body pt-0">
            <div className="form-group">
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <label htmlFor="amount" className="form-label w-100 text-start">Enter Amount</label>
                {utrShow && <div className="input-group mb-4">
                  <span className="input-group-text bg-light text-dark">₹</span>
                  <input type="number" placeholder="Amount" id="amount" min="1" max="20000" className="form-control" onChange={(e) =>{setAmount(e.target.value)}}  />
                
                </div>} */}
              { !utrShow && <div className="input-group mb-4 me-2 mes-2">
                  <input  className="form-control " style={{ fontSize:"25px",fontWeight:"bold"}} ref={textRef} value={upi}/>
                  <button onClick={handleCopyClick} className="Btnnewadd">   <span class="textnewadd">Copy</span>
  <span class="svgIconnewadd">
    <svg fill="white" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg>
  </span></button>
                </div>
}

             
                <div id="whichPG" className="d-flex justify-content-evenly align-items-center mb-2 w-100">
                  {/* <div className="form-check form-check-inline">
                    <input type="radio" name="whichPG" id="cashfree" className="form-check-input" value="cashfree" />
                    <label htmlFor="cashfree" className="form-check-label">
                      <h5 className="text-capitalize">UPI</h5>
                    </label>
                  </div> */}
                  {/* <div className="form-check form-check-inline">
                    <input type="radio" name="whichPG" id="phonepe" className="form-check-input" value="phonepe" checked />
                    <label htmlFor="phonepe" className="form-check-label">
                      <h5 className="text-capitalize">UPI-2</h5>
                    </label>
                  </div> */}
                </div>
                <div>
              { utrShow && <button className="btn btn-primary" onClick={()=>onPay()}>Pay</button>}
                 
                </div>
                
                <div className="d-flex flex-column justify-content-center align-items-center">
               
                <div className="input-group">
               

{/*                  
                 {!utrShow && 
                 
                 
                 
                 <input type="number" placeholder="Amount" id="amount" min="1" max="20000" className="form-control" value={amount}  />} */}
                </div>

                {!utrShow && <img></img>}
           
             
               { !utrShow &&<label htmlFor="amount" className="form-label w-100 text-start">Plese Enter Transaction ID</label>}
               { !utrShow &&<div className="input-group mb-4">
                  <input  className="form-control"  onChange={(e) =>{setUtr(e.target.value)}} />
           
              </div>}
              { !utrShow &&<div className="input-group mb-4 w-100">
                { !utrShow &&<label htmlFor="amount" className="form-label w-100 text-start">Plese Upload Payment Screen Shot</label>}
                  <input type="file" id="image3" className="w-100" name="image3" accept="image/*" onChange={handleInputChange1} required ></input>
           
              </div>}
            
                <div>
     
               

                 {!utrShow && <button className="btn btn-primary"  onClick={()=>onRecharge()}> Submit </button>}
                </div>
              </div>
              </div>
            </div>
          </div>
                              </div>
                            
                            <hr class="my-1"/>

                        </div>
                      

        </div>
        <div className="d-flex justify-content-center align-items-center">
    <div className="hstack gap-2">
      <img src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/gpay.svg" alt="gpay logo" width="48" />
      <img src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/paytm.svg" alt="paytm logo" width="48" />
      <img src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/phonepe.svg" alt="phonepe logo" width="48" />
      <img src="https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/upi.svg" alt="upi logo" width="48" />
    </div>
  </div>
  <div role="alert" className="fade d-flex align-items-center justify-content-between alert alert-warning show" style={{ fontSize: '0.7rem', textAlign: 'unset' }}>
            <span>
              <b>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="red">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
                &nbsp;&nbsp;यदि आप किसी भी पेमेंट का बैंक से Complain डालते है तो आपके खाते को Block कर दिया जायेगा ! इसलिए किसी और से अपने Ludo ID में पैसे न डलवाये ! और यदि आप खुद जान भूझकर बैंक से रिफंड लेने के लिए Complain डालते है तो आपकी Ludo ID पूर्णतः बंद कर दी जाएगी !
              </b>
            </span>
          </div>
                
         
                </div>
                
            </div>
            
            <div>

</div>
        </div>
          </div>
        </div>
  
      </div> }

     
        </div>
        
    
      </div>
      <div className="mb-3  shadow card">
        <div class="games-section-title m-2 mb-0">
          <b color="red" style={{color:"red"}}>पेमेंट ऐड करते समय प्रत्येक बार नया स्केनर जनरेट होता है, स्क्रीन शॉट पर पेमेंट डालने की प्रोसेस 3 मिनेट में पूरी करे, self स्कैन पर एक बार मे 2000 तक ही ऐड होगा, दूसरे मोबाइल से एक बार मे 10 हजार तक हो जाएगा, पैमेंट ऐड करने में समस्या हो या अधिक पेमेंट ऐड करने के लिए नीचे दिख रहे व्हाट्सएप सप्पोर्ट से नम्बर लेके भी ऐड कर सकते हैं..</b>
        </div>

      

        
        <div class="row" id="footer">
              <div class="col-12 nav-bar adsob" id="adsob">
                <div class="row">
                  <div class="col-3 pa-0">
                    <div class="navItem sel" id="moxht2b4u" onClick={() => onFastParity("")}>
                      <div class="xtc"><span class="icon home sel" id="home"></span></div>
                      <div class="xtc">Home</div>
                    </div>
                  </div>
                  <div class="col-3 pa-0">
                    <div class="navItem" id="raeiyf2m0" onClick={() => onFastParity("Refere")}>
                      <div class="xtc"><span class="icon group" id="group"></span></div>
                      <div class="xtc">Invite</div>
                    </div>
                  </div>
                  <div class="col-3 pa-0">
                    <div class="navItem" id="sfrm6bvy" onClick={() => onFastParity("recharge")}>
                      <div class="xtc"><span class="icon wallet" id="wallet"></span></div>
                      <div class="xtc">Recharge</div>
                    </div>
                  </div>
                  <div class="col-3 pa-0">
                    <div class="navItem" id="mcpnvd2my" onClick={() => onFastParity("Profile")}>
                      <div class="xtc"><span class="icon my" id="my"></span></div>
                      <div class="xtc">My</div>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Recharge;