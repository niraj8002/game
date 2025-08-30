import React, { useContext,useEffect,useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageTitle } from "../../PageTitle";
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "antd/lib/layout/layout";
import manue from '../../img/menu.png'
import imglogo from "../../img/newfastwin.png"
import axiosInstance from "../../axiosInstance";
import Refer from "../../img/Refer-Earn-.png"

import wollet from "../../img/wallet.png";
import profile from "../../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg";


import { Button } from "react-bootstrap";
const Refere = (props) => {
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

  const onFastParity = (path) => {
    navigate(`/${path}`)
  }
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
   <div  className="japurLudoNav realludokingsize"> 
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
  <div className="col-12 mx-auto g-0 iframe-sec p-3">
      <div>
        <div className="mb-3 card">
          <div className="bg-light text-dark card-header">Your Referral Earnings</div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column border-end flex-grow-1 align-items-center justify-content-center">
                <span className="text-capitalize fw-bold" style={{ fontSize: '0.8rem' }}>referred players</span>
                <span>₹0</span>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <span className="text-capitalize fw-bold" style={{ fontSize: '0.8rem' }}>Referral Earning</span>
                <span>₹0.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 card">
          <div className="bg-light text-dark card-header">Referral Code</div>
          <div className="card-body">
            <div>
              <div>
                <div>
                  <div className="text-center">
                    <img src={Refer}  alt="refer" className=" mx-auto kmt" />
                  </div>
                  <div>
                    <div>
                      <div>
                        <div className="input-group">
                          <input type="text" className="form-control p-2" disabled value={user.memberReferCode} />
                          <button className="btn btn-primary text-uppercase">copy</button>
                        </div>
                      </div>
                    </div>
                    <p className="text-uppercase fw-bold fs-3 p-0 m-0 my-3 text-center">or</p>
                    <div className="d-grid">
                      <a href={`whatsapp://send?text=Play game and earn Rs10000 daily.%0ACommission Charge - 5% Only%0AReferral - 2% On All Games%0A24x7 Live Chat Support%0AInstant Withdrawal Via UPI/Bank%0ARegister Now, My refer code is ${user.memberReferCode}.%0A👇👇%0Ahttps://winningadda.com/%23`}>
                        <button className="btn btn-success btn-md w-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="me-2">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                          </svg>
                          <span className="text-capitalize">share on whatsapp</span>
                        </button>
                      </a>
                    </div>
                    <div className="d-grid mt-2">
                      <button className="btn btn-secondary btn-md w-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" className="me-2">
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                        </svg>
                        <span className="text-capitalize">copy to clipboard</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 card">
          <div className="bg-light text-dark card-header">How It Works</div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">You can refer and <b>Earn 2%</b> of your referral winning, every time</li>
              <li className="list-group-item">Like if your player plays for <b>₹10000</b> and wins, You will get <b>₹200</b> as referral amount.</li>
            </ul>
          </div>
        </div>
      </div>
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
     );
};

export default Refere;