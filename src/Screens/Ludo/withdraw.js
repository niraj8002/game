import React, { useContext, useEffect, useState } from "react";
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
const Withdraw = (props) => {


  const user = useContext(UserContext);
  let navigate = useNavigate();
  const [wallet ,setWallet] = useState(null)

const [upi , setUpi] = useState()
const [upiR , setUpiR] = useState()
const [payment , setPayment] = useState()
const [walletAmount , setWalletAmount] = useState()
const [wwalletAmount , setWWalletAmount] = useState()

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
    getPayment();
    getWallet()
  }
  const getPayment = () => {
    axiosInstance.get(`wallet/${user.userId}`).then((response) => {
      console.log("payment",response.data.data.amount)
      
    setWalletAmount(response.data.data.amount);
    setWWalletAmount(response.data.data.winningAmount)
    });
  };
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
  const onWithdraw = () => {
    if(payment>299){
      if(payment<wwalletAmount){
        const data = {
          userId:user.memberId,
          member:user.userId,
          amount:payment,
          upi:upi,
          status:"requested",
          transactionDate:new Date()
        };
      
         if(data.userId!==undefined  && data.member!==undefined&& data.amount!==undefined&& data.status!==undefined && data.upi!==undefined&& data.upi!==''&& data.status!==''&& data.amount!==''&& data.member!==''&& data.userId!==''){
          axiosInstance.post("/withdraw", data).then((res) => {
            if (res.data && res.data.responseCode === -1) {
              message.error("Record Already Exists");
            } else if (res.data && res.data.responseCode === 1) {
              const data = {
                amount : walletAmount-payment,
                winningAmount : wwalletAmount-payment
             }
            axiosInstance.put(`/wallet/${user.userId}` , data).then((response) => {
                console.log(response.data.data)
              });
              message.success("Record saved successfully");
              navigate(`/Wallet`, { replace: true });
            } else message.error("Something wrong. Please try again...!");
          });
       }
       else{
        message.error("Please fill out all required fields. And submit again...!");
       }
      }
      else{
        message.error(" Insuficiant Chips, Please re enter valid Chips. And submit again...!");
        navigate(`/Wallet`, { replace: true });
      }
    }
 else{
  alert(" You can withdraw only Rs 300 or amount above Rs 300....!");
 }
   
  };

  return (

    <div className="col-12 mx-auto g-0 iframe-sec p-3 realludokingsize">
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
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <a href="#/Wallet">
            <button className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="me-2">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"></path>
              </svg>
              <span className="text-capitalize">Back</span>
            </button>
          </a>
        </div>
        <div>
          <button type="button" className="d-flex align-items-center btn btn-outline-primary btn-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="me-1">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
            </svg>
            <span className="text-capitalize">guide</span>
          </button>
        </div>
      </div>

      <div className="mb-3 shadow card">
        <div className="bg-light text-dark card-header">Payment Mode</div>
        <div className="bg-secondary py-1">
          <span className="text-white" style={{ fontSize: '0.8rem' }}>Withdrawal Chips: 0.00</span>
        </div>
        <div className="card-body">
          <div className="d-flex flex-row align-items-center justify-content-between mb-1">
            <span style={{ fontSize: '0.8rem' }}>Minimum: 95</span>
            <span style={{ fontSize: '0.8rem' }}>Maximum: 1,00,000</span>
          </div>
        </div>
      </div>

      <div className="mb-3 shadow card">
        <div className="bg-light text-dark card-header">Payment Details</div>
        <div className="card-body">
         
            <div className="vstack gap-3">
              <div>
                <label className="text-capitalize text-start w-100 form-label" htmlFor="upiFormAccountNumber">UPI ID</label>
                <input placeholder="Your UPI ID" pattern="^[\w.+-]+\@[\w-]+(?!\w*\.[\w]+)$" type="text" id="upiFormAccountNumber" className="form-control form-control" onChange={(e)=>{setUpi(e.target.value)}} />
              </div>
              <div>
                <label className="text-capitalize text-start w-100 form-label" htmlFor="upiFormReEnterAccountNumber" >Re Enter UPI ID</label>
                <input placeholder="Re Enter Your UPI ID" pattern="^[\w.+-]+\@[\w-]+(?!\w*\.[\w]+)$" type="text" id="upiFormReEnterAccountNumber" className="form-control form-control" onChange={(e)=>{setUpiR(e.target.value)}} />
              </div>
              <div>
                <label className="text-capitalize text-start w-100 form-label" htmlFor="upiFormChips">Chips</label>
                <input placeholder="Chips" min="95" max="100000" type="number" id="upiFormChips" className="form-control form-control" onChange={(e)=>{setPayment(e.target.value)}} />
              </div>
              <p style={{ fontSize: '0.8rem'}}>By Continuing, you agree to our <a >Legal Terms</a> and you are 18 years or older.</p>
              <button  disabled="" className="btn btn-primary" onClick={()=>onWithdraw()}>Submit</button>
            </div>
          
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <ul className="list-group"></ul>
      </div>
    </div>
  );
};

export default Withdraw;