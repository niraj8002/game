import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";
import rocket from '../../img/rocket.ae680ffe.png'
import { message } from "antd";
import axiosInstance from "../../axiosInstance";



const Dice = (props) => {
    const user = useContext(UserContext);
    let navigate = useNavigate();
    const [sec1, setSec1] = useState(null);
    const [sec2, setSec2] = useState(null);
    const [min, setMin] = useState(null);
    const [game, setGame] = useState(null);
    const [Period, setPeriod] = useState(0);
    const [Multiplier, setMultiplier] = useState(1.90);
    const [GameResult, setGameResult] = useState();
    const [batAmount, setBet] = useState(10);
    const [active, setActive] = useState('');
    const [walletData, setWallet] = useState(0)


    useEffect(() => {
        const interval = setInterval(() => {
            pageLoad();
            //RiderLocation();
        }, 1000);
        pageLoad2();
        return () => clearInterval(interval);

    }, []);
    const pageLoad = () => {
        Countdown();
       getWallet();
    }


    const getWallet = () => {
        axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
            if (res.data.data === null) {
                getWallet();
            }
            else {
                let amount = res.data.data.depositeAmount + res.data.data.winningAmount;
                console.log("saugdshksfdsfdjkashfjas",Math.floor(amount))
                setWallet(Math.floor(amount));
            }
        });
    }
    const pageLoad2 = () => {
        getPeriod()
        getGame()
        getGameResult();

    }
    var sec5 = 523654
    const Countdown = () => {
        var countDownDate = Date.parse(new Date) / 1e3;
        //var now = new Date().getTime();
        var distance = 30 - countDownDate % 30;

        var i = distance / 60,
            n = distance % 60;
        //o = n / 10,
        // s = n % 10;
        var minutes = Math.floor(i);
        setMin(minutes);
        var seconds = ('0' + Math.floor(n)).slice(-2);
        var sec1 = (seconds % 100 - seconds % 10) / 10;
        setSec1(sec1);
        var sec2 = seconds % 10;
        setSec2(sec2);


        if (seconds === "29") {
            getGame();
            getPeriod();
            getGameResult();

        }
        if (seconds > 10) {
            setIsOpen(isOpen);
        }
        else {
            if (seconds < 10) {
                onModalClose()
                setIsOpen(!isOpen);
            }
        }

    }
    //

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const getPeriod = () => {

        axiosInstance.post('/period/dice').then((res) => {
            setPeriod(res.data.data[0].period)
        })
    }
    const getGame = () => {
        axiosInstance.post(`/dice/runing/${user.userId}`).then((res) => {
            setGame(res.data.data)
        })
    }
    const getGameResult = () => {
        axiosInstance.get(`/diceResult`).then((res) => {
            setGameResult(res.data.data)
        })
    }
    const onBack = (e) => {
        navigate(`${e}`)
    }


    const onBat = (e) => {
        if (e == -1) {
            if (batAmount > 10) {
                setBet(batAmount - 10)
            }
        }
        if (e == -5) {
            if (batAmount > 50) {
                setBet(batAmount - 50)
            }
        }
        if (e == 1) {

            setBet(batAmount + 10)

        }
        if (e == 5) {
            setBet(batAmount + 50)
        }
        if (e == 100) {
            setBet(100)
        }
        if (e == 10) {
            setBet(10)
        }
        if (e == 1000) {
            setBet(1000)
        }
        if (e == 10000) {
            setBet(10000)
        }
    }
    const onModalClose = () => {
        var element = document.getElementById('mclose')
        //class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"
    }
    const onModalClose1 = () => {
        document.getElementById('mclose').className = 'mclose'

    }
    const onConfirmBat = (e) => {


        if (walletData >= batAmount) {
            var data;
            onWalletUpdate(batAmount)
                data = {
                    gameDate: new Date(),
                    user: user.userId,
                    period: Period,
                    status: "pending",
                    amount: batAmount,
                    multiplier: Multiplier,
                    number: value,
                    result: "pending",
                    winningAmt:batAmount*Multiplier

                }
                axiosInstance.post('/dice', data).then((res) => {
                    getGame()
                })
            }
           

        else {
            navigate('/Recharge')
        }
    }

    const [value, setValue] = useState(50); // Initial value set to 50
var diceData = [0,0,0,0,23.75,19.00,15.83,13.57,11.88,10.56,9.50,8.64,7.92,7.31,6.79,6.33,5.94,5.59,5.28,5.00,4.75,4.52,4.32,4.13,3.94,3.80,3.65,3.52,3.39,3.28,3.17,3.06,2.97,2.88,2.79,2.71,2.64,2.57,2.50,2.44,2.38,2.32,2.26,2.21,2.16,2.11,2.07,2.02,1.98,1.94,1.90,1.86,1.83,1.79,1.76,1.73,1.70,1.67,1.64,1.61,1.58,1.56,1.53,1.51,1.48,1.46,1.44,1.42,1.40,1.38,1.36,1.34,1.32,1.30,1.28,1.27,1.25,1.23,1.22,1.20,1.19,1.17,1.16,1.14,1.13,1.12,1.10,1.09,1.08,1.07,1.06,1.04,1.03,1,1,1,1,1,1]
    const handleChange = (event) => {
        console.log("onChange",event.target.value)
      setValue(event.target.value);
      setMultiplier(diceData[event.target.value])
    };
  
    const onWalletUpdate = (amount) => {
        console.log("amount",amount)
        axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
                if(res.data.data.depositeAmount>=amount){
        console.log("res.data.data",res.data.data)

                    const data = {
                        depositeAmount:res.data.data.depositeAmount-amount
                    }
        console.log("data",data)

                    axiosInstance.put(`/wallet/${user.userId}` ,data).then((res) => {
                        getWallet();
                    });

                }
                else{
                    let amount1 = amount-res.data.data.depositeAmount
                    const data = {
                        winningAmount:res.data.data.winningAmount-amount1,
                        depositeAmount:0
                    }

                    axiosInstance.put(`/wallet/${user.userId}` ,data).then((res) => {
                        getWallet();
                    });


                }
              
        });

    }

  return (

<>
<div className="japurLudoNav realludokingsize">

<div className="homeScreenL">
 
<section class="container">
      <div class="row mcas">
          <div class="col-md-12">
              <div class="row" id="warea">
              <div class="col-12 nav-top">
                                    <div class="row">
                                        <div class="col-2 xtl" >

                                            <span class=" " style={{ fontSize: '40px', fontWeight: 'normal' }} onClick={() => onBack('/')}>&#x2039;</span>
                                        </div>
                                        <div class="col-8 tfw-5 tf-18 text-center">Dice</div>
                                        <div class="col-2 xtr mcpl" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomrule" aria-controls="offcanvasBottom">Rule</div>
                                    </div>
                                </div>
                                <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottomrule" aria-labelledby="offcanvasBottomLabel">
                                    <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                    <div class="offcanvas-body small">
                                        <div class="col-12 odbox  bslidein" >
                                            <div class="tf-20 mt-3 mb-3 text-center"><span class="grlm">Dice Rule</span></div>
                                            <div class="row mt-2 pb-2 tfcdb grh-60"><div class="col-12 xtl tf-16"><div class="justify">1 minutes 1 issue, 50 seconds to order, 10 seconds to show the lottery result. It opens all day. The total number of trade is 1440 issues.</div></div><div class="col-12 tfs-b tf-14 xtc"><div class="row mr-0 tlh-36 tfwr"><div class="col-3 grth grbd-l grbd-b grbd-t">Select</div><div class="col-6 grth grbd-l grbd-r grbd-b grbd-t">Result</div><div class="col-3 grth grbd-r grbd-b grbd-t">You</div><div class="col-3 xtc grbd-l grbd-b pt-3 pl-2"> &lt; N </div><div class="col-9 grbd-l grbd-r grbd-b"><div class="row"><div class="col-8 grbd-b"> &lt; n </div><div class="col-4 grbd-b grbd-l">Win</div><div class="col-8">≥ n</div><div class="col-4 grbd-l">Loose</div></div></div></div></div><div class="col-12 fixn"><div class="btn-con cls" data-bs-dismiss="offcanvas" aria-label="Close">I GOT IT</div></div></div>
                                        </div>
                                    </div>
                                </div>
                  <div class="col-12 gmxcfm">
                  <div class="row mt-2 tfwr pt-2">
                                        <div class="col-6 xtl">
                                            <div class="tf-16 mb-2 tfcdg">Period</div>
                                            <div class="tfcdb tf-24 tfw-5 period" id="cpd">{Period}</div>
                                        </div>
                                        <div class="col-6 xtr">
                                            <div class="tf-16 mb-2 tfcdg">Count Down</div>
                                            {sec1 !== null && sec2 !== null && min !== null && <div className="cd" id="demo" >
                                                <span class='cdspn'>0</span><span class='cdspn' id='fsm'>{Math.floor(min)} </span>:<span class='cdspn' id='fs0'> {sec1} </span><span class='cdspn' id='fs1'>{sec2} </span>
                                            </div>}
                                            <div id="cdx"></div>
                                        </div>
                                    </div>
                      <div class="row mb-2 dsbd"><div class="col-6 dsbr"><div class="tf-14 text-center">Less than</div><div class="tf-20 dsn text-center" id="dsnL" text-center>{value}</div></div><div class="col-6"><div class="tf-14 text-center">Multiplier</div><div class="tf-20 text-center" id="pxm">{Multiplier}</div></div></div>

                      <div class="row tf-10 mr-0 mt-4">
                          <div class="col-12 mt-2 pa-0"><input type="range" v-model="userdetails.slide" value={value} onChange={handleChange} class="slider dns"
                                  min="4" max="92"/>
                              <div class="slidPro" style={{width:`${value}%`}} id="slidPro" ></div>
                          </div>
                          <div class="col-12 xtc pa-0 pl-1 pr-1">
                              <div class="mt-2 dflx wtj0ep"><span>1</span> <span>|</span><span>25</span>
                                  <span>|</span><span>50</span> <span>|</span> <span>75</span>
                                  <span>|</span><span>99</span>
                              </div>
                              <div id="cdx"></div>
                          </div>
                      </div>

                      <div class="row mr-0 mt-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"><div class="col-12 pa-0"><div class={`jnum dn ${isOpen ? 'jnum dn disabled' : ''}`}  id="jndn"><div class="tfw-6 tf-16 text-center" onclick="jdnx()">Less than <span id="dsn">{value}</span></div></div></div></div>

                  </div>
                  <div class="col-12">
                  <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">

<div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
    <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

    <div class="row">
        <div class="col-12 pa-0 odbox bslidein">
            <div class="xsel green text-center" id="nxsel">Less Than {value}</div>
            <div class="row bfard">
                <div class="col-6 xtl tfcdb tf-20 tffss"><span class="tf-28" id="u_bal">{walletData}</span></div>
                <div class="col-6 pl-0 pr-1 xtr pt-1">
                    <div class="rc-wal" onclick="window.location.href='#/recharge'">Recharge</div>
                </div>
            </div>
            <div class="row mr-0 pa-10">
                <div class="col-12 xtl">Contract Money</div>
                <div class="col-12 tf-16 xtl" id="factorlist">
                    <div class="cont-amt green" id="100" onClick={() => onBat(10)}>10 </div>
                    <div class="cont-amt green" id="100" onClick={() => onBat(100)}>100 </div>
                    <div class="cont-amt green" id="1000" onClick={() => onBat(1000)}>1000 </div>
                    <div class="cont-amt green" id="10000" onClick={() => onBat(10000)}> 10000</div>
                </div>
            </div>
            <div class="row mr-0 pa-10">
                <div class="col-12 xtl">
                    <div class="silb mr-2">Number</div>
                    <div class="row">
                        <div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div>
                        <div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div>
                        <div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div>
                    </div>
                </div>
                <div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div>
            </div>
            <div class="row mr-0 mb-2" >
                <div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close" >
                    <div class="btn-con newod green" id="nod" onClick={() => onConfirmBat('Green')}>Confirm </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
                  </div>
                  <div class="col-12 betfbg" id="blackscreen"  style={{display:'none'}}></div>
                  <div class="col-12 mt-2">
                  <div class="row tffm h264">
                                        <div class="col-12 tfw-7 tabin active" id="rcdv">Record</div>
                                        <div class="col-12">
                                            <div class="row tf-16 mr-0" id="xrecd">
                                                <div class="col-8 mt-2 mb-2 pb-2 pl-0 xtl tf-18 tfcdb">Dice Record(s)</div>
                                                <div class="col-4 mt-2 mb-2 pb-2 pr-0 tf-14 xtr"><span class="mcpl tfcdg"
                                                    onclick="window.location.href='#/record?server=FastParity'">more &gt;</span>
                                                </div>
                                                <div class="col-12" >
                                                    <div class="row record">


                                                    <div class="rcd-pillar mb-2">
                                                                        <div class="GS" style={{backgroundColor:"#f57c00"}}>
                                                                            
                                                                            <div class="tpr">?</div>
                                                                        </div>
                                                                        <div class="rcd-per">{Period.toString().slice(-3)}</div>
                                                                    </div>

                                                        {GameResult && GameResult[0] && GameResult.map((data) => {
                                                            return (
                                                                <>
                                                                   <div class="rcd-pillar mb-2">
                                                                        <div class="GS">
                                                                           
                                                                            <div class="tpr">{data.result}</div>
                                                                        </div>
                                                                        <div class="rcd-per">{(data.period).slice(-3)}</div>
                                                                    </div>


                                                                </>
                                                            )




                                                        })}







                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mr-0" id="capr"></div>
                                        </div>
                                    </div>
                      <div class="row mr-0" id="lfprd"></div>
                      <ul class="nav nav-tabs pt-2 pe-0" id="myTab" role="tablist">
                                    <li class="w-50" role="presentation">
                                        <div class="tabin active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" role="tab" aria-controls="home" aria-selected="true">
                                            <div class="ms-3">Everyone's Order
                                            </div></div>
                                    </li>
                                    <li class="w-50" role="presentation">
                                        <div class="tabin" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" role="tab" aria-controls="profile" aria-selected="false">
                                            <div class=" ps-3">My Order</div>

                                        </div>
                                    </li>

                                </ul>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">  <div class="row mt-0">


                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-4 tf-14 pt-2 xtl">Period</div>
                                                <div class="col-3 tf-14 pt-2">User</div>
                                                <div class="col-2 tf-14 pt-2">Select</div>
                                                <div class="col-3 tf-14 pt-2 xtr">Point</div>
                                            </div>
                                            <div class="row">
                                                <marquee direction="down" id="everyone" scrollamount="3">
                                                    <div class="col-12" id="fseod">
                                                        <div class="row pt-2 pb-2 lih-32" style={{ height: '48px' }}>
                                                            <div class="col-4 xtl">34979</div>
                                                            <div class="col-3 cgray">***422</div>
                                                            <div class="col-2"><span class="RS">R</span></div>
                                                            <div class="col-3 xtr">20000</div>
                                                        </div>
                                                        <div class="row pt-2 pb-2 lih-32" style={{ height: '48px' }}>
                                                            <div class="col-4 xtl">34979</div>
                                                            <div class="col-3 cgray">***422</div>
                                                            <div class="col-2"><span class="RS">R</span></div>
                                                            <div class="col-3 xtr">20000</div>
                                                        </div>
                                                        <div class="row pt-2 pb-2 lih-32" style={{ height: '48px' }}>
                                                            <div class="col-4 xtl">34979</div>
                                                            <div class="col-3 cgray">***422</div>
                                                            <div class="col-2"><span class="VS">V</span></div>
                                                            <div class="col-3 xtr">20000</div>
                                                        </div>
                                                        <div class="row pt-2 pb-2 lih-32" style={{ height: '48px' }}>
                                                            <div class="col-4 xtl">34979</div>
                                                            <div class="col-3 cgray">***422</div>
                                                            <div class="col-2"><span class="GS">G</span></div>
                                                            <div class="col-3 xtr">20000</div>
                                                        </div>
                                                        <div class="row pt-2 pb-2 lih-32" style={{ height: '48px' }}>
                                                            <div class="col-4 xtl">34979</div>
                                                            <div class="col-3 cgray">***422</div>
                                                            <div class="col-2"><span class="RS">R</span></div>
                                                            <div class="col-3 xtr">20000</div>
                                                        </div>



                                                    </div>
                                                </marquee>
                                            </div>
                                        </div>

                                    </div></div>
                                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"> <div class="col-12" >
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
                                            {(game !== null) && <div class="row plr-10">
                                                {game && game.map((data) => {
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
                                        <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()">more &gt;</div></div></div>

                                    </div>


                                </div>
                      <div class="row mr-0 mordm"></div>
                  </div>
                  <div class="col-12 betfbg" id="bfbg" onclick="clsbfrm()"></div>
                  <div class="col-12" id="ucheck"></div>
                  <div class="col-12" id="suc-fail">
                      <div class="col-12 conod"  id="rlink" style={{display:'none'}} >
                          <div class="row podfs fadein" id="smgid">
                              <div class="getrcl(result.res)">65</div>
                              <div class="col-12" v-if="result.res === 'success'">
                                <img class="winxIMG" src="../assets/includes/images/win.png" width="320"/>
                              </div>
                              <div class="col-12 pt-2 pb-2"><span class="getcl(result.number)" >24</span></div>
                              <div class="col-12">
                                  <div class="row tfcdb tf-16 xtl">
                                      <div class="col-4 pb-1">Period</div>
                                      <div class="col-8 pb-1 xtr">35</div>
                                      <div class="col-4">Price</div>
                                      <div class="col-8 xtr">21</div>
                                  </div>
                              </div>
                              <div class="col-12">
                                  <div class="row tfcdb selwnlbx xtl">
                                      <div class="col-4 pl-1 pb-1">Select</div>
                                      <div class="col-8 pr-1 xtr pb-1"><span class="resclass(result.ans)" >24</span></div>
                                      <div class="col-4 pl-1 pb-1">Point</div>
                                      <div class="col-8 pr-1 xtr pb-1 tf-16">35</div>
                                      <div class="col-4 pl-1 pb-1">Amount</div>
                                      <div class="col-8 pr-1 xtr pl-0 pb-1 tf-24 tfwr" v-html="betamount(result.amount, result.ans, result.res)">
                                          
                                      </div>
                                  </div>
                              </div>
                              <div class="col-12 mb-3">
                                  <div class="btn-main act">CLOSE</div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-12 bbg" id="xrule" style={{display:'none'}}>
                      <div class="col-12 botfrm bslidein"style={{display:'block'}}>
                          <div class="tf-20 mt-3 mb-3"><span class="grlm">Dice Rule</span></div>
                          <div class="row mt-2 pb-2 tfcdb grh-60">
                              <div class="col-12 xtl tf-16">
                                  <div class="justify">1 minutes 1 issue, 50 seconds to order, 10 seconds to show the
                                      lottery result. It opens all day. The total number of trade is 1440 issues.
                                  </div>
                              </div>
                              <div class="col-12 tfs-b tf-14 xtc">
                                  <div class="row mr-0 tlh-36 tfwr">
                                      <div class="col-3 grth grbd-l grbd-b grbd-t">Select</div>
                                      <div class="col-6 grth grbd-l grbd-r grbd-b grbd-t">Result</div>
                                      <div class="col-3 grth grbd-r grbd-b grbd-t">You</div>
                                      <div class="col-3 xtc grbd-l grbd-b pt-3 pl-2"> &lt; N </div>
                                      <div class="col-9 grbd-l grbd-r grbd-b">
                                          <div class="row">
                                              <div class="col-8 grbd-b"> &lt; n </div>
                                              <div class="col-4 grbd-b grbd-l">Win</div>
                                              <div class="col-8">≥ n</div>
                                              <div class="col-4 grbd-l">Loose</div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-12 fixn">
                                  <div class="btn-con cls" >I GOT IT</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row" id="odrea"></div>
              <div class="row" id="footer"></div>
              <div class="row" id="opffp"></div>
              <div class="row" id="anof">

              </div>
              <div class="row" id="clink" style={{display:'none'}}>
                  <div class="col-12 conod LR" >
                      <div class="ssmg fadein">
                          <div class="tf-14 pb-2" id="message"> </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
        </div>
        </div>
</>


  
  )
}

export default Dice;