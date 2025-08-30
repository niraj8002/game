

import React, { useContext, useEffect, useState } from "react";
import { Input, message, Table, Modal, Select } from "antd";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "antd/lib/layout/layout";
import { Button } from "react-bootstrap";
import manue from '../../img/menu.png'
import imglogo from "../../img/newfastwin.png"
import axiosInstance from "../../axiosInstance";

import wollet from "../../img/wallet.png";
import profile from "../../img/avatar-f-2.c30ca059e863004ac5f7e22dcb211721.svg";
import moment from "moment";
const History = (props) => {


  const user = useContext(UserContext);
  let navigate = useNavigate();
  const [wallet ,setWallet] = useState(null)

  const [PaymentData1, setPaymentData1] = useState([]);
  const [PaymentData2, setPaymentData2] = useState([]);
  const [ShowT, setShowT] = useState(1);
  const [ShowGT, setShowGT] = useState(5);

  const [parityData, setParityData] = useState([]);
  const [fastParityData, setFastParityData] = useState([]);
  const [diceData, setDiceData] = useState([]);
  const [aviotarData, setAviotarData] = useState([]);

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
    getWPayment();
    getRPayment();
    getWallet();
    getGame();
    getGame2();
    getGame3();
    getGameHistory();
  }
  const getGame = (e) => {
    axiosInstance.post(`/parity/runing/${user.userId}`).then((res) => {
        var data=   res.data.data.filter(x => (x.period) === (e-1).toString())
        if(data.length > 0){
          alert(`you ${data[0].status} bet`)
        }
        setParityData(res.data.data)
    })
}
const getGame2 = (e) => {
  axiosInstance.post(`/fastParity/runing/${user.userId}`).then((res) => {
   

    var data=   res.data.data.filter(x => (x.period) === (e-1).toString())
    if(data.length > 0){
      alert(`you ${data[0].status} bet`)
    }
      setFastParityData(res.data.data)
  })
}
const getGame3 = () => {
  axiosInstance.post(`/dice/runing/${user.userId}`).then((res) => {
      setDiceData(res.data.data)
  })
}
const getGameHistory = async () => {
  await axiosInstance.post(`/avitor/runing/${user.userId}`).then((res) => {
          // console.log("gameHistory",res.data.data)
          setAviotarData(res.data.data)
  })

}
  const getWallet = () => {
    axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
        let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
        setWallet(amount);
    });
  }
  const handleToggleClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const onFastParity = (path) => {
    navigate(`/${path}`)
  }
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const getRPayment = () => {
    axiosInstance.get(`/payment/user/${user.userId}`).then((response) => {
      console.log("payment", response.data.data)
      const sortedData = [...response.data.data].sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );
      setPaymentData2(sortedData);
    });
  };
  const getWPayment = () => {
    axiosInstance.get(`/withdraw`).then((response) => {
      const sortedData = [...response.data.data].sort(
        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
      );
      setPaymentData1(sortedData);
    });
  };
  const columns1 = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    // {
    //     title: "Name",
    //     render: (row) => {
    //         return row.member ? (
    //           <div>
    
    //           { row&& <b>{row.member.name}</b>}<br/>
            
    //             </div>
    //         ) : (
    //           <div> </div>
    //         );
    //       },
    //   },
      {
        title: "UPI ID",
        dataIndex: "upi",
      key: "upi",
      },
     
      {
        title: "Transaction Date",
        
        render: (row) => {
            return(
              <>
              {row && <div>{moment(row.transactionDate).format("DD-MM-yyyy")}</div>}
              </>
            );
          },
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Status",
        render: (row) => {
          if(row.status==="success"){
        
              return row.status ? (
                    
                <div style={{alignItems:"center",textAlign:"center"}}>
      
                { row&& <b style={{color:"green"}}>{row.status}</b>}<br/>
              
                  </div>
              ) : (
                <div> </div>
              );
            }
            if(row.status==="requested"){
        
              return row.status ? (
                    
                <div style={{alignItems:"center",textAlign:"center"}}>
      
                { row&& <b style={{color:"blue"}}>{row.status}</b>}<br/>
              
                  </div>
              ) : (
                <div> </div>
              );
            }
           
            else{
              row.status="failed";
              return row.status ? (
                    
                <div style={{alignItems:"center",textAlign:"center"}}>
      
                { row&& <b style={{color:"red"}}>{row.status}</b>}<br/>
              
                  </div>
              ) : (
                <div> </div>
              );
            }
          }
         
          }
   
  ];
  const columns2 = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    // {
    //     title: "Name",
    //     render: (row) => {
    //         return row.member ? (
    //           <div>
    
    //           { row&& <b>{row.member.name}</b>}<br/>
            
    //             </div>
    //         ) : (
    //           <div> </div>
    //         );
    //       },
    //   },
      // {
      //   title: "UPI ID",
      //   render: (row) => {
      //       return row.upiId ? (
      //         <div>
    
      //         { row&& <b>{row.upiId.name}</b>}<br/>
            
      //           </div>
      //       ) : (
      //         <div> </div>
      //       );
      //     },
      // },
     
      {
        title: "Transaction Date",
        
        render: (row) => {
          return(
            <div style={{alignItems:"center",textAlign:"center"}}>
            {row && <div >{moment(row.transactionDate).format("DD-MM-yyyy")}</div>}
            </div>
          );
        },
      },
      {
        title: "Amount",
        render: (row) => {
          return row.amount ? (
            <div style={{alignItems:"center",textAlign:"center"}}>
  
            { row&& <b style={{color:"green"}}>{row.amount}</b>}<br/>
          
              </div>
          ) : (
            <div> </div>
          );
        },
      },
     
      {
        title: "Status",
        render: (row) => {
          if(row.status==="success"){
        
              return row.status ? (
                    
                <div style={{alignItems:"center",textAlign:"center"}}>
      
                { row&& <b style={{color:"green"}}>{row.status}</b>}<br/>
              
                  </div>
              ) : (
                <div> </div>
              );
            }
            if(row.status==="requested"){
        
              return row.status ? (
                    
                <div style={{alignItems:"center",textAlign:"center"}}>
      
                { row&& <b style={{color:"blue"}}>{row.status}</b>}<br/>
              
                  </div>
              ) : (
                <div> </div>
              );
            }
           
            else{
              row.status="failed";
              return row.status ? (
                    
                <div style={{alignItems:"center",textAlign:"center"}}>
      
                { row&& <b style={{color:"red"}}>{row.status}</b>}<br/>
              
                  </div>
              ) : (
                <div> </div>
              );
            }
          }
         
          }
          
    
  ];
  const onHistory = (e) => {
    if (e === "Withdraw") {
      setShowT(2)
        setShowGT(5)

    }
    else {
      if (e === "Recharge") {
       
        setShowT(1)
        setShowGT(5)
      }
      else {
        setShowGT(1)
        setShowT(3)
      }
    }
  }
  const onGameHistoryC = (e) => {
    if (e === "fastParity") {
      setShowGT(1)
    }
    else {
      if (e === "parity") {
    console.log("data",ShowGT)
        setShowGT(2)

      }
      else{
        if (e === "dice") {
          setShowGT(3)
        }
        else {
          setShowGT(4)
        }
      }
   
    }
  }
   const onBack = (e) => {
        navigate(`${e}`)
    }

  return (

    <div className=" realludokingsize" >
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
      <div>
        <Container>
          <div className="d-flex align-items-center justify-content-evenly overflow-auto pt-3 px-0 mt-5 container">
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onHistory("Withdraw")}>Withdraw</Button>
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onHistory("Recharge")}>Recharge</Button>
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onHistory("Game")}>Game</Button>
          </div>
        
          <div className="master-snf-screen container mt-5">
            <div>
             
             <div>
             {ShowT === 1 && <Table columns={columns2} dataSource={PaymentData2} />}
             {ShowT === 2 && <Table columns={columns1} dataSource={PaymentData1} />}
             </div>

            </div>

          </div>
          {ShowT === 3 && <div>
            <Container>
          <div className="d-flex align-items-center justify-content-evenly overflow-auto pt-3 px-0 mt-0 container">
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onGameHistoryC("fastParity")}>Fast-Parity</Button>
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onGameHistoryC("parity")}>Parity</Button>
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onGameHistoryC("dice")}>Dice</Button>
            <Button className="text-capitalize me-2 py-2 px-4 border text-dark badge rounded-pill text-white bg-primary" style={{ cursor: 'pointer' }} onClick={() => onGameHistoryC("Aviotar")}>Aviotar</Button>
          </div>
        
          <div className="master-snf-screen container mt-5">
            <div>
            
            
             <div>
            
             </div>

            </div>

          </div>
          
        </Container>
            
            </div>}
        </Container>
      </div>
      {ShowGT === 1 && <div>
                
        <div class="col-12" >
                                         <div class="row plr-10 pb-2">
                                             <div class="col-12 pb-3 pt-2 tf-14 dflx">
                                                 <div class="wd-100 xtl">Period</div>
                                                 <div class="wd-36">Select</div>
                                                 <div class="wd-46">Point</div>
                                                 <div class="wd-36">Result</div>
                                                 <div class="wd-80 xtr">Amount</div>
                                             </div>
                                         </div>
                                         <div class="row"><div class="col-12" ></div><div class="col-12" >
                                             {(fastParityData !== null) && <div class="row plr-10">
                                                 {fastParityData && fastParityData.map((data) => {
                                                     return (
                                                         <div class="col-12 lih-32 pt-2 pb-2 dflx">
 
                                                             <div class="wd-100 xtl">{data.period}</div>
                                                             <div class="wd-36">
                                                                 {(data.number === "3" || data.number === "1" || data.number === "7" || data.number === "9") && <span class="GS">{data.number}</span>}
                                                                 {(data.number === "2" || data.number === "4" || data.number === "6" || data.number === "8") && <span class="RS">{data.number}</span>}
                                                                 {(data.number === "5" || data.number === "0") && <span class="VS">{data.number}</span>}
                                                                 {(data.number === "color" && data.color == "Red") && <span class="RS">R</span>}
                                                                 {(data.number == "color" && data.color == "Green") && <span class="GS">G</span>}
                                                                 {(data.number == "color" && data.color == "Violet") && <span class="VS">V</span>}
                                                             </div>
                                                             <div class="wd-46">{data.amount}</div>
 
                                                             {(data.result === "pending") && <div class="wd-36"><div class="S"><div class=""></div><div class="tpr" style={{ color: "red" }}>Wait..</div></div>
                                                             </div>}
                                                             {(data.result == "1" || data.result == "3" || data.result == "7" || data.result == "9") && <div class="wd-36"><div class="GS"><div class=""></div><div class="tpr" style={{ color: "white" }}>{data.result}</div></div>
                                                             </div>}
                                                             {(data.result == "2" || data.result == "4" || data.result == "6" || data.result == "8") && <div class="wd-36"><div class="RS"><div class=""></div><div class="tpr" >{data.result}</div></div>
                                                             </div>}
                                                             {(data.result == "5") && <div class="wd-36"><div class="RS"><div class="vil"></div><div class="tpr" >{data.result}</div></div>
                                                             </div>}
                                                             {(data.result == "0") && <div class="wd-36"><div class="GS"><div class="vil"></div><div class="tpr" >{data.result}</div></div>
                                                             </div>}
                                                             {(data.status == "pending") && <div class="wd-80 xtr" style={{ color: "black" }}><b>...</b></div>}
                                                             {(data.status == "lose") && <div class="wd-80 xtr" style={{ color: "red" }}><r>-{data.amount}</r></div>}
                                                             {(data.status == "won") && <div class="wd-80 xtr" style={{ color: "green" }}><g>+{(data.winAmount)}</g></div>}
                                                         </div>
                                                     )
 
                                                 })}
                                             </div>}
 
 
                                         </div></div>
                                         {/* <div class="row">
                                             <div class="col-12">
                                                 <div class="m-order"
                                                     onclick="window.location.href='#/orderrecord?server=FastParity'">more &gt;</div>
                                             </div>
                                         </div> */}
 
                                     </div>
                                     <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()">...</div></div></div>
                                     <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()">....</div></div></div>
 
                          
                 
                 </div>}


                 {ShowGT == 2 && <div>
                  <div class="col-12" >
                                         <div class="row plr-10 pb-2">
                                             <div class="col-12 pb-3 pt-2 tf-14 dflx">
                                                 <div class="wd-100 xtl">Period</div>
                                                 <div class="wd-36">Select</div>
                                                 <div class="wd-46">Point</div>
                                                 <div class="wd-36">Result</div>
                                                 <div class="wd-80 xtr">Amount</div>
                                             </div>
                                         </div>
                                         <div class="row"><div class="col-12" ></div><div class="col-12" >
                                             {(parityData !== null) && <div class="row plr-10">
                                                 {parityData && parityData.map((data) => {
                                                     return (
                                                         <div class="col-12 lih-32 pt-2 pb-2 dflx">
 
                                                             <div class="wd-100 xtl">{data.period}</div>
                                                             <div class="wd-36">
                                                                 {(data.number === "3" || data.number === "1" || data.number === "7" || data.number === "9") && <span class="GS">{data.number}</span>}
                                                                 {(data.number === "2" || data.number === "4" || data.number === "6" || data.number === "8") && <span class="RS">{data.number}</span>}
                                                                 {(data.number === "5" || data.number === "0") && <span class="VS">{data.number}</span>}
                                                                 {(data.number === "color" && data.color == "Red") && <span class="RS">R</span>}
                                                                 {(data.number == "color" && data.color == "Green") && <span class="GS">G</span>}
                                                                 {(data.number == "color" && data.color == "Violet") && <span class="VS">V</span>}
                                                             </div>
                                                             <div class="wd-46">{data.amount}</div>
 
                                                             {(data.result === "pending") && <div class="wd-36"><div class="S"><div class=""></div><div class="tpr" style={{ color: "red" }}>Wait..</div></div>
                                                             </div>}
                                                             {(data.result == "1" || data.result == "3" || data.result == "7" || data.result == "9") && <div class="wd-36"><div class="GS"><div class=""></div><div class="tpr" style={{ color: "white" }}>{data.result}</div></div>
                                                             </div>}
                                                             {(data.result == "2" || data.result == "4" || data.result == "6" || data.result == "8") && <div class="wd-36"><div class="RS"><div class=""></div><div class="tpr" >{data.result}</div></div>
                                                             </div>}
                                                             {(data.result == "5") && <div class="wd-36"><div class="RS"><div class="vil"></div><div class="tpr" >{data.result}</div></div>
                                                             </div>}
                                                             {(data.result == "0") && <div class="wd-36"><div class="GS"><div class="vil"></div><div class="tpr" >{data.result}</div></div>
                                                             </div>}
                                                             {(data.status == "pending") && <div class="wd-80 xtr" style={{ color: "black" }}><b>...</b></div>}
                                                             {(data.status == "lose") && <div class="wd-80 xtr" style={{ color: "red" }}><r>-{data.amount}</r></div>}
                                                             {(data.status == "won") && <div class="wd-80 xtr" style={{ color: "green" }}><g>+{(data.winAmount)}</g></div>}
                                                         </div>
                                                     )
 
                                                 })}
                                             </div>}
 
 
                                         </div></div>
                                         {/* <div class="row">
                                             <div class="col-12">
                                                 <div class="m-order"
                                                     onclick="window.location.href='#/orderrecord?server=FastParity'">more &gt;</div>
                                             </div>
                                         </div> */}
 
                                     </div>
                                     <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()">...</div></div></div>
                                     <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()">....</div></div></div>
 
                          
                  </div>}
                
                  {ShowGT === 3 && <div>
                 <div class="col-12" >
                                        <div class="row plr-10 pb-2">
                                            <div class="col-12 pb-3 pt-2 tf-14 dflx">
                                                <div class="wd-100 xtl">Period</div>
                                                <div class="wd-36">Select</div>
                                                <div class="wd-46">Point</div>
                                                <div class="wd-36">Result</div>
                                                <div class="wd-80 xtr">Amount</div>
                                            </div>
                                        </div>
                                        <div class="row"><div class="col-12" id="mywod"></div><div class="col-12" id="myod">
                                            {(diceData !== null) && <div class="row plr-10">
                                                {diceData && diceData.map((data) => {
                                                    return (
                                                        <div class="col-12 lih-32 pt-2 pb-2 dflx">

                                                            <div class="wd-100 xtl">{data.period}</div>
                                                            <div class="wd-36">
                                                                <span class="GS">{data.number}</span>
                                                            </div>
                                                            <div class="wd-46">{data.amount}</div>

                                                            {(data.result === "pending") && <div class="wd-36"><div class="S"><div class=""></div><div class="tpr" style={{ color: "red" }}>Wait..</div></div>
                                                            </div>}
                                                            {(data.result !== "pending") && <div class="wd-36"><div class="VS"><div class=""></div><div class="tpr" style={{ color: "white" }}>{data.result}</div></div>
                                                            </div>}
                                                            
                                                            {(data.status == "pending") && <div class="wd-80 xtr" style={{ color: "black" }}><b>...</b></div>}
                                                            {(data.status == "loss") && <div class="wd-80 xtr" style={{ color: "red" }}><r>-{data.amount}</r></div>}
                                                            {(data.status == "won") && <div class="wd-80 xtr" style={{ color: "green" }}><g>+{(data.winningAmt)}</g></div>}
                                                        </div>
                                                    )

                                                })}
                                            </div>}


                                        </div></div>
                                        {/* <div class="row">
                                            <div class="col-12">
                                                <div class="m-order"
                                                    onclick="window.location.href='#/orderrecord?server=FastParity'">more &gt;</div>
                                            </div>
                                        </div> */}

                                    </div>
                                    <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()"> ..</div></div></div>
                                    <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()"> ...</div></div></div>

                                    </div>
                  
               }
                  {ShowGT === 4 && <div>

                    <div class="col-12" >
                                        <div class="row plr-10 pb-2">
                                            <div class="col-12 pb-3 pt-2 tf-14 dflx">
                                                <div class="wd-100 xtl">Date</div>
                                                <div class="wd-36">Bet</div>
                                                <div class="wd-46">Mult.</div>
                                                <div class="wd-36">Cash out</div>
                                                {/* <div class="wd-80 xtr">Amount</div> */}
                                            </div>
                                        </div>
                                        <div class="row"><div class="col-12" id="mywod"></div><div class="col-12" id="myod">
                                            {(aviotarData !== null) && <div class="row plr-10">
                                                {aviotarData && aviotarData.map((data) => {
                                                    return (
                                                        <div class="col-12 lih-32 pt-2 pb-2 dflx">

                                                            <div class="wd-100 xtl">{moment(data.gameDate).format("DD-MM-yyyy")}</div>
                                                            <div class="wd-36">
                                                                <span class="GS">{data.amount}</span>
                                                            </div>
                                                            { (data.result == 0 || data.winAmount == '1') && <div class="wd-46" style={{color:"red"}}>loss</div>}
                                                            {(data.result != '0' && data.winAmount !== '1') &&   <div class="wd-46" >{data.result}</div>}
                                                            {(data.result == '0' || data.result == '1') && <div class="wd-36" style={{color:"red"}}> - {data.amount} </div>}
                                                            {(data.result != '0' && data.winAmount != '1') &&<div class="wd-36"> ₹ {data.winAmount} </div>}

                                                        </div>
                                                    )

                                                })}
                                            </div>}


                                        </div></div>
                                        {/* <div class="row">
                                            <div class="col-12">
                                                <div class="m-order"
                                                    onclick="window.location.href='#/orderrecord?server=FastParity'">more &gt;</div>
                                            </div>
                                        </div> */}

                                    </div>
                                    <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()"> ..</div></div></div>
                                    <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()"> ...</div></div></div>

















          
                  
                  </div>}
                



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

export default History;