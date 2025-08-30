import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../globalContext";
import { useNavigate } from "react-router-dom";
import rocket from '../../img/rocket.ae680ffe.png'
import { message } from "antd";
import axiosInstance from "../../axiosInstance";



const Parity = (props) => {
    const user = useContext(UserContext);
    let navigate = useNavigate();
    const [sec1, setSec1] = useState(null);
    const [sec2, setSec2] = useState(null);
    const [min, setMin] = useState(null);
    const [game, setGame] = useState(null);
    const [Period, setPeriod] = useState(0);
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

                setWallet(amount);
            }
        });
    }
    const pageLoad2 = () => {
        getPeriod()
      
        getGameResult();

    }
    var sec5 = 523654
    const Countdown = () => {
        var countDownDate = Date.parse(new Date) / 1e3;
        //var now = new Date().getTime();
        var distance = 180 - countDownDate % 180;

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


        if (distance === "179") {
            getPeriod();
            getGameResult();

        }
        if (distance > 30) {
            setIsOpen(isOpen);
        }
        else {
            if (distance < 30) {
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

        axiosInstance.post('/period/parity').then((res) => {
            setPeriod(res.data.data[0].period)
            getGame(res.data.data[0].period)
        })
    }
    const getGame = (e) => {
        axiosInstance.post(`/parity/runing/${user.userId}`).then((res) => {
            var data=   res.data.data.filter(x => (x.period) === (e-1).toString())
            if(data.length > 0){
              alert(`you ${data[0].status} bet`)
            }
            setGame(res.data.data)
        })
    }
    const getGameResult = () => {
        axiosInstance.get(`/parityResult`).then((res) => {
            setGameResult(res.data.data)
            console.log(res.data.data)
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
    const onWalletUpdate = (amount) => {
        axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
                if(res.data.data.depositeAmount>=amount){
                    const data = {
                        depositeAmount:res.data.data.depositeAmount-amount
                    }
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
    const onConfirmBat = (e) => {


        if (walletData >= batAmount) {
            onWalletUpdate(batAmount)
            var data;
            if (typeof (e) === "string") {
                data = {
                    gameDate: new Date(),
                    user: user.userId,
                    period: Period,
                    status: "pending",
                    amount: batAmount,
                    color: e,
                    number: 'color',
                    result: "pending"

                }
                axiosInstance.post('/parity', data).then((res) => {
                    console.log("response",res)
                    getGame()
                })
            }
            if (typeof (e) === "number") {
                data = {
                    gameDate: new Date(),
                    user: user.userId,
                    period: Period,
                    status: "pending",
                    amount: batAmount,
                    color: "number",
                    number: e,
                    result: "pending"
                }
                axiosInstance.post('/parity', data).then((res) => {
                    getGame()
                })
            }

        }
        else {
            navigate('/Recharge')
        }
    }

    return (
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
                                        <div class="col-8 tfw-5 tf-18 text-center">Parity</div>
                                        <div class="col-2 xtr mcpl" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomrule" aria-controls="offcanvasBottom">Rule</div>
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
                                    <div class="row mr-0 mt-4 tf-16">
                                        <div class="col-4 pa-0">
                                            <div className={`join green enable ${isOpen ? 'join green disabled' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                                                <div class="tfw-6 d-flex align-items-stretch justify-content-center"><span class="rocket sm"><img src={rocket} alt="" /></span></div>
                                                <div class="tfw-5 d-flex align-items-stretch justify-content-center" >Join Green</div>
                                            </div>
                                            <div class="tflh-10 tf-14 tfcdg d-flex align-items-stretch justify-content-center pt-1">1:2</div>
                                        </div>
                                        <div class="col-4 pa-0">
                                            <div class={`join violet enable ${isOpen ? 'join violet disabled' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomvoilet" aria-controls="offcanvasBottom voilet">
                                                <div class="tfw-6 d-flex align-items-stretch justify-content-center"><span class="rocket sm"><img src={rocket} alt="" /></span></div>
                                                <div class="tfw-5 d-flex align-items-stretch justify-content-center" >Join Violet</div>
                                            </div>
                                            <div class="tflh-10 tf-14 tfcdg d-flex align-items-stretch justify-content-center pt-1">1:4.5</div>
                                        </div>
                                        <div class="col-4 pa-0">
                                            <div class={`join red enable ${isOpen ? 'join red disabled' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomred" aria-controls="offcanvasBottom voilet" >
                                                <div class="tfw-6 d-flex align-items-stretch justify-content-center">
                                                    <span class="rocket sm"><img src={rocket} alt="" /></span>
                                                </div>
                                                <div class="tfw-5 d-flex align-items-stretch justify-content-center" >Join Red</div>
                                            </div>
                                            <div class="tflh-10 tf-14 tfcdg d-flex align-items-stretch justify-content-center pt-1">1:2</div>
                                        </div>
                                        <div class="col-12 pt-2">
                                            <div class="row">
                                                <div class="col-12 adcon">
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom1" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn1" >1</div>
                                                    </div>


                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom2" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn2" >2</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom3" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn3">3</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom4" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn4">4</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom5" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn5">5</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom6" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn6">6</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom7" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn7">7</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom8" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn8" >8</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom9" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn9">9</div>
                                                    </div>
                                                    <div class={`wdt2 ${isOpen ? 'wdt2 bg-add02' : ''}`} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom10" aria-controls="offcanvasBottom">
                                                        <div class={`jnum fp disabled d-flex align-items-stretch justify-content-center ${isOpen ? 'jnum fp disabled bg-add d-flex align-items-stretch justify-content-center' : ''}`} id="jn0" >0</div>


                                                    </div>
                                                </div>
                                                <div class="col-12 tflh-10 tf-14 tfcdg d-flex align-items-stretch justify-content-center">1:9</div>
                                            </div>
                                            <div className="mclose" id="mclose">

                                                <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom1" aria-labelledby="offcanvasBottomLabel">
                                                    <div class="offcanvas-header">
                                                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
                                                    </div>
                                                    <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>
                                                    <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                        <div class="col-12 pa-0 odbox bslidein text-center">
                                                            <div class="xsel" id="nxsel">Select 1</div>
                                                            <div class="row bfard">
                                                                <div class="col-6 xtl tfcdb tf-20 tffss">
                                                                    ₹<span class="tf-28" id="u_bal">{walletData}</span>
                                                                </div>
                                                                <div class="col-6 pl-0 pr-1 xtr pt-1">
                                                                    <div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div>
                                                                </div>
                                                            </div>
                                                            <div class="row mr-0 pa-10">
                                                                <div class="col-12 xtl">Contract Money</div>
                                                                <div class="col-12 tf-16 xtl">
                                                                    <div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div>
                                                                    <div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div>
                                                                    <div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div>
                                                                    <div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div>
                                                                </div>
                                                            </div>
                                                            <div class="row mr-0 pa-10">
                                                                <div class="col-12 xtl">
                                                                    <div class="silb mr-2">Number</div>
                                                                    <div class="row">
                                                                        <div class="col-5 xtl pr-0">
                                                                            <span class="xpan" id="xm5" onClick={() => onBat(-5)}>
                                                                                -5
                                                                            </span>
                                                                            <span class="xpan" id="xm" onClick={() => onBat(-1)}>
                                                                                -1
                                                                            </span>
                                                                        </div>
                                                                        <div class="col-2 xtc">
                                                                            <span class="xnum" id="xn">{batAmount}</span>
                                                                        </div>
                                                                        <div class="col-5 xtr pl-0">
                                                                            <span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span>
                                                                            <span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 mt-2 tf-16 xtl">
                                                                    Total contract money is
                                                                    <span id="tca">{batAmount}</span>
                                                                </div>
                                                            </div>
                                                            <div class="row mr-0 mb-2">
                                                                <div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                    <div class="btn-con newod" id="nod" onClick={() => onConfirmBat(1)} >
                                                                        Confirm
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom2" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 2</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div>
                                                        <div class="col-12 tf-16 xtl" >
                                                            <div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div>
                                                            <div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div>
                                                            <div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(2)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom3" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 3</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(3)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom4" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 4</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(4)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom5" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 5</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(5)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom6" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 6</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(6)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom7" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 7</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(7)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom8" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 8</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(8)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom9" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 9</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(9)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                            <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom10" aria-labelledby="offcanvasBottomLabel">
                                                <div class="offcanvas-header">
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                                <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                                    <div class="col-12 pa-0 odbox bslidein text-center"><div class="xsel" id="nxsel">Select 0</div><div class="row bfard"><div class="col-6 xtl tfcdb tf-20 tffss">₹<span class="tf-28" id="u_bal">{walletData}</span></div><div class="col-6 pl-0 pr-1 xtr pt-1"><div class="rc-wal" id="bfrc" onclick="recharge()">Recharge</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl">Contract Money</div><div class="col-12 tf-16 xtl"><div class="cont-amt selected" onClick={() => onBat(10)} id="ca1">10</div><div class="cont-amt" onClick={() => onBat(100)} id="ca2">100</div><div class="cont-amt" onClick={() => onBat(1000)} id="ca3">1000</div><div class="cont-amt" onClick={() => onBat(10000)} id="ca4">10000</div></div></div><div class="row mr-0 pa-10"><div class="col-12 xtl"><div class="silb mr-2">Number</div><div class="row"><div class="col-5 xtl pr-0"><span class="xpan" id="xm5" onClick={() => onBat(-5)}>-5</span><span class="xpan" id="xm" onClick={() => onBat(-1)}>-1</span></div><div class="col-2 xtc"><span class="xnum" id="xn">{batAmount}</span></div><div class="col-5 xtr pl-0"><span class="xpan" id="xp" onClick={() => onBat(1)}>+1</span><span class="xpan" id="xp5" onClick={() => onBat(5)}>+5</span></div></div></div><div class="col-12 mt-2 tf-16 xtl">Total contract money is <span id="tca">{batAmount}</span></div></div><div class="row mr-0 mb-2"><div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close"><div class="btn-con newod" id="nod" onClick={() => onConfirmBat(0)}>Confirm</div></div></div></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">

                                        <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                            <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                            <div class="row">
                                                <div class="col-12 pa-0 odbox bslidein">
                                                    <div class="xsel green text-center" id="nxsel">Join Green</div>
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

                                    <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottomvoilet" aria-labelledby="offcanvasBottomLabel">
                                        <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="offcanvasBottomLabel"></h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                            <div class="row">
                                                <div class="col-12 pa-0 odbox bslidein">
                                                    <div class="xsel violet text-center" id="nxsel">Join violet</div>
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
                                                    <div class="row mr-0 mb-2">
                                                        <div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <div class="btn-con newod violet" id="nod" onClick={() => onConfirmBat('Violet')}>Confirm </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class={`offcanvas offcanvas-bottom ${isOpen ? 'd-none' : 'offcanvas-body small'}`} tabindex="-1" id="offcanvasBottomred" aria-labelledby="offcanvasBottomLabel">
                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="offcanvasBottomLabel"></h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                        <div class={`offcanvas-body small ${isOpen ? 'd-none' : 'offcanvas-body small'}`}>
                                            <div class="row">
                                                <div class="col-12 pa-0 odbox bslidein">
                                                    <div class="xsel red text-center" id="nxsel">Join Red</div>
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
                                                    <div class="row mr-0 mb-2">
                                                        <div class="col-12 xtr" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            <div class="btn-con newod red" id="nod" onClick={() => onConfirmBat('Red')}>Confirm </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12" id="blackscreen" style={{ display: 'block' }}></div>
                                <div class="col-12 mt-2">
                                    <div class="row tffm h264">
                                        <div class="col-12 tfw-7 tabin active" id="rcdv">Record</div>
                                        <div class="col-12">
                                            <div class="row tf-16 mr-0" id="xrecd">
                                                <div class="col-8 mt-2 mb-2 pb-2 pl-0 xtl tf-18 tfcdb">Parity Record(s)</div>
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
                                                                   {(data.result == 5) && <div class="rcd-pillar mb-2">
                                                                        <div class="RS">
                                                                            <div class="vil"></div>
                                                                            <div class="tpr">{data.result}</div>
                                                                        </div>
                                                                        <div class="rcd-per">{(data.period).slice(-3)}</div>
                                                                    </div>}

                                                                    {(data.result == 0) &&  <div class="rcd-pillar mb-2">
                                                                        <div class="GS">
                                                                            <div class="vil"></div>
                                                                            <div class="tpr">{data.result}</div>
                                                                        </div>
                                                                        <div class="rcd-per">{(data.period).slice(-3)}</div>
                                                                    </div>}

                                                                    {((data.result == 1) || (data.result == 3) ||(data.result == 7) || (data.result == 9)) &&  <div class="rcd-pillar mb-2">
                                                                        <div class="GS">
                                                                            
                                                                            <div class="tpr">{data.result}</div>
                                                                        </div>
                                                                        <div class="rcd-per">{(data.period).slice(-3)}</div>
                                                                    </div>}

                                                                    {((data.result == 2) || (data.result == 4) ||(data.result == 6) || (data.result == 8)) &&   <div class="rcd-pillar mb-2">
                                                                        <div class="RS">
                                                                           
                                                                            <div class="tpr">{data.result}</div>
                                                                        </div>
                                                                        <div class="rcd-per">{(data.period).slice(-3)}</div>
                                                                    </div>}








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



                                    <div class="row mr-0 mordm"></div>
                                </div>
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
                                        <div class="row text-center"><div class="col-12 "><div class="m-order mt-2 bg-white" onclick="fsodx20()">more &gt;</div></div></div>

                                    </div>


                                </div>
                                <div class="col-12" id="suc-fail">
                                    <div class="col-12 conod" id="rlink" style={{ display: 'none' }}>
                                        <div class="row podfs fadein" id="smgid">
                                            <div class="getrcl(result.res)">65</div>
                                            <div class="col-12" v-if="result.res === 'success'">
                                                {/* <img class="winxIMG" src="../assets/includes/images/win.png" width="320"/> */}
                                            </div>
                                            <div class="col-12 pt-2 pb-2"><span class="getcl(result.number)" >655</span></div>
                                            <div class="col-12">
                                                <div class="row tfcdb tf-16 xtl">
                                                    <div class="col-4 pb-1">Period</div>
                                                    <div class="col-8 pb-1 xtr">65</div>
                                                    <div class="col-4">Price</div>
                                                    <div class="col-8 xtr">95</div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="row tfcdb selwnlbx xtl">
                                                    <div class="col-4 pl-1 pb-1">Select</div>
                                                    <div class="col-8 pr-1 xtr pb-1"><span class="resclass(result.ans)" >98</span></div>
                                                    <div class="col-4 pl-1 pb-1">Point</div>
                                                    <div class="col-8 pr-1 xtr pb-1 tf-16">98</div>
                                                    <div class="col-4 pl-1 pb-1">Amount</div>
                                                    <div class="col-8 pr-1 xtr pl-0 pb-1 tf-24 tfwr" v-html="betamount(result.amount, result.ans, result.res, result.color2)">

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <div class="btn-main act">CLOSE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 betfbg" id="bfbg" onclick="clsbfrm()"></div>
                                <div class="col-12" id="ucheck"></div>

                                <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottomrule" aria-labelledby="offcanvasBottomLabel">
                                    <div className="modal-backdrop show addmy" data-bs-dismiss="offcanvas" aria-label="Close"></div>

                                    <div class="offcanvas-body small">
                                        <div class="col-12 odbox  bslidein" >
                                            <div class="tf-20 mt-3 mb-3 text-center"><span class="grlm">FastParity Rule</span></div>
                                            <div class="row mt-2 pb-2 tfcdb grh-60">
                                                <div class="col-12 xtl tf-16">
                                                    <div class="justify">30 seconds 1 issue,24 seconds to order,6 seconds to show the lottery result. It opens all day. The total number of trade is 2880 issues. </div>
                                                    <div class="justify pt-2">If you spend 100 rupees to trade,after deducting 2 rupees service fee,your contract amount is 98 rupees:</div>
                                                </div>
                                                <div class="col-12 tfs-b tf-14 pt-2 justify">
                                                    <ul class="pl-4">
                                                        <li class="pt-1">JOIN GREEN:if the result shows 1,3,7,9,you will get (98*2) 196 rupees;If the result shows 5,you will get (98*1.5) 147 rupees.</li>
                                                        <li class="pt-1">JOIN RED:if the result shows 2,4,6,8,you will get (98*2) 196 rupees;If the result shows 0,you will get (98*1.5) 147 rupees.</li>
                                                        <li class="pt-1">JOIN VIOLET:if the result shows 0 or 5,you will get (98*4.5) 441 rupees.</li>
                                                    </ul>
                                                </div>
                                                <div class="col-12 tfs-b tf-14 xtc">
                                                    <div class="row mr-0 tlh-36 tfwr">
                                                        <div class="col-3 grth grbd-l grbd-b grbd-t">Select</div>
                                                        <div class="col-6 grth grbd-l grbd-r grbd-b grbd-t">Result</div>
                                                        <div class="col-3 grth grbd-r grbd-b grbd-t">Multiplier</div>
                                                        <div class="col-3 xtc grbd-l grbd-b pt-3 pl-2">
                                                            <g>Join Green</g>
                                                        </div>
                                                        <div class="col-9 grbd-l grbd-r grbd-b">
                                                            <div class="row">
                                                                <div class="col-8 grbd-b">1,3,7,9</div>
                                                                <div class="col-4 grbd-b grbd-l">2</div>
                                                                <div class="col-8">5</div>
                                                                <div class="col-4 grbd-l">1.5</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-3 xtc grbd-l grbd-b pt-3 pl-2">
                                                            <r>Join Red</r>
                                                        </div>
                                                        <div class="col-9 grbd-l grbd-r grbd-b">
                                                            <div class="row">
                                                                <div class="col-8 grbd-b">2,4,6,8</div>
                                                                <div class="col-4 grbd-b grbd-l">2</div>
                                                                <div class="col-8">0</div>
                                                                <div class="col-4 grbd-l">1.5</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-3 xtc grbd-l grbd-b pl-2">
                                                            <v>Join Violet</v>
                                                        </div>
                                                        <div class="col-6 grbd-r grbd-l grbd-b">0,5</div>
                                                        <div class="col-3 grbd-r grbd-b">4.5</div>
                                                        <div class="col-3 xtc grbd-l grbd-b pl-2">Number</div>
                                                        <div class="col-6 grbd-r grbd-l grbd-b">n</div>
                                                        <div class="col-3 grbd-r grbd-b">9</div>
                                                    </div>
                                                </div>
                                                <div class="col-12 pt-5 fixn w-100">
                                                    <div class="btn-con cls " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomrule" aria-controls="offcanvasBottom">I GOT IT</div>
                                                </div>
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
                            <div class="row" id="clink" style={{ display: 'none' }}>
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

    );
};

export default Parity;





