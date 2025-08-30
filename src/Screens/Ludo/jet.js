import react, { useContext, useEffect, useRef, useState } from 'react'
import bgscake from './../../img/bg-rotate-old.daf80387.svg'
import star from './../../img/star.a82d20d3 (1).svg'
import star1 from './../../img/star1.6a5624ab.svg'
import plan from "./../../img/plan.gif"
import wallet from "./../../img/wallet.png"
import planeFrame1 from '../../img/plan01.png';
import planeFrame2 from '../../img/plan02.png';
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';
import axiosInstance from '../../axiosInstance'
import { UserContext } from '../../globalContext'
import bgsound from "./../../img/bg-av.mp3"
import bgsoundplan from "./../../img/plan-bg.mp3"
import moment from 'moment'
const socket = io('https://server.winningadda.com/');

const Jet = () => {
        const canvasRef = useRef(null);
        const [balance, setBalance] = useState(1000);
        const [betAmount, setBetAmount] = useState(0);
        const [crashed, setCrashed] = useState(false);
        const [profitsTaken, setProfitsTaken] = useState(false);
        const [curvePoints, setCurvePoints] = useState([{ x: 0, y: 400 }]);
        const [gameLoop, setGameLoop] = useState(null);
        const [multiplier, setMultiplier] = useState(1);
        const [crashAt, setCrashAt] = useState(null);
        const [frameIndex, setFrameIndex] = useState(0); // Frame index for animation
    
        const canvasWidth = 800;
        const canvasHeight = 400;
        const planeFrames = [planeFrame1, planeFrame2];
    
        const planeImages = planeFrames.map((src) => {
            const img = new Image();
            img.src = src;
            return img;
        });
    


        const audioRef = useRef(null);
        // Play audio on button click
        const handlePlay = () => {
                // Play the audio using the ref
                if (audioRef.current) {
                        audioRef.current.play();
                }
        };
        const [message, setMessage] = useState('');
        const [chat, setChat] = useState([]);
        var ChackRuning = 1


        useEffect(() => {


                // Receive messages from server
                socket.on('message', (msg) => {

                        // // console.log("message",msg)
                        if (msg == "rwait") {
                                setLoder4('none')
                                setLoder3('none')
                                setLoder1('')
                                setActBtn1(1)
                                setActBtn2(1)
                        }
                        if (msg.res == "batStart") {
                                newplnStart =1 
                                setPlnSpeed(1)
                                setCrashed(true);
                                setPlnImg("plane-static")
                                setPlanClassCrash('d-none')
                                getPeriodCount = 1
                                setActBtn1(2)
                                setActBtn2(2)
                                setLoder4('none')
                                setLoder1('')
                                setLoder1('none')
                                setLoder3('')
                                setMulty(`${msg.countDown}`)
                                if (!chackOut1) {
                                        setActBtn1(2)
                                }
                                if (!chackOut2) {
                                        setActBtn2(2)
                                }
                        }
                        if (msg == "start") {
                               
                                getGame()
                                setActBtn1(3)
                                setLoder3('none')
                                setLoder1('none')
                        }
                        if (msg.plan == "start") {
                                setPlnResult(msg.result)
                                setPlnImg("plane-static d-none")
                                setPlanClassCrash('')
                                startGame();
                                onFlyPlane(msg.result)
                                setLoder3('')
                                setActBtn1(3)
                                setActBtn2(3)
                                if (Math.floor(msg.number) == Math.floor(msg.result)) {
                                        handlePlay();
                                }
                                setMulty(`${msg.number}X`)

                                if (batData1 !== null) {
                                        const data = (msg.number * batData1).toString().slice(0, 6)
                                        // console.log("batData1", data)
                                        setMultyData1(data)

                                }
                                if (batData2 !== null) {
                                        const data = (msg.number * batData2).toString().slice(0, 6)
                                        // console.log("datadata", data)

                                        setMultyData2(data)

                                }

                        }
                        if (msg.plan == "stop") {
                               
                              
                                setCrashAt(multiplier.toFixed(2));
                                
                                getGameCount = 1
                                getGame()
                                getPeriod()
                                setMultyData1(1)
                                setMultyData2(1)
                                getGameCount = 1
                                setPlanClass(`active00001`)
                                flyCount = 1
                                setActBtn1(1)
                                setActBtn2(1)
                                getPeriod();
                                setLoder4('')
                                setMulty(`${msg.result}X`)

                        }
                        // setMulty(msg)
                        //     setChat((prevChat) => [...prevChat, msg]);
                });

                // Cleanup when component unmounts
                return () => {

                        socket.off('message');
                };
        }, []);


        var flyCount = 1
        const onFlyPlane = (e) => {
                flyCount = flyCount + 1
                // console.log("resut data type", e)
                if (flyCount === 2) {
                        setIsSidebarVisible2(true)
                        setPlanClass(`active0${Math.floor(e)}`)
                }
        };
        const sendMessage = () => {
                if (message) {
                        // Send message to the server
                        socket.emit('message', message);
                        setMessage(''); // Clear input field
                }
        };





        const user = useContext(UserContext);


        let navigate = useNavigate();

        const [Period, setPeriod] = useState(0);
        const [isSidebarVisible, setIsSidebarVisible] = useState(false);
        const [isSidebarVisible2, setIsSidebarVisible2] = useState(false);
        const [planClass, setPlanClass] = useState('active06');
        const [planClassCrash, setPlanClassCrash] = useState('');
        const [batValue1, setBatValue1] = useState(10);
        const [batValue2, setBatValue2] = useState(10);
        // const [batData1, setBatData1] = useState(null);
        // const [batData2, setBatData2] = useState(null);
        const [batData11, setBatData11] = useState(null);
        const [batData22, setBatData22] = useState(null);
        const [multy, setMulty] = useState(1);
        const [plnResult, setPlnResult] = useState(1);
        const [multyData1, setMultyData1] = useState(1);
        const [multyData2, setMultyData2] = useState(1);
        const [chackOut1, setChackOut1] = useState(false);
        const [chackOut2, setChackOut2] = useState(false);
        const [loader1, setLoder1] = useState("none");
        const [loader2, setLoder2] = useState("none");
        const [loader3, setLoder3] = useState("none");
        const [loader4, setLoder4] = useState("none");
        const [actBtn1, setActBtn1] = useState(1);
        const [actBtn2, setActBtn2] = useState(1);
        const [walletData, setWallet] = useState(0)
        const [GameResult, setGameResult] = useState();
        const [GameHistory, setGameHistory] = useState();
        const [plnImg, setPlnImg] = useState("plane-static");
        const [plnSpeed, setPlnSpeed] = useState(0.5);
        const [plnAnimation, setPlnAnimation] = useState(1.55);
        
        const handleToggleClick = () => {
                setIsSidebarVisible(!isSidebarVisible);
        };
        const onBack = (e) => {
                navigate(`${e}`)
        }

        useEffect(() => {
                pageLoad()

        }, []);
        const pageLoad = () => {
                getPeriod();
                getWallet()
                getGame();
                getGameResult();
        }


        const getGameResult = () => {
                axiosInstance.get(`/avioterResult`).then((res) => {
                        setGameResult(res.data.data)
                        // console.log("gameResultData", res.data.data)
                })
        }

        var getPeriodCount = 1
        const getPeriod = () => {
                getPeriodCount = getGameCount + 1
                if (getPeriodCount == 2) {
                        getGameResult();
                        getGameHistory();
                        axiosInstance.post('/period/avitor').then((res) => {
                                // console.log("Period", res.data.data[0].period)
                                setPeriod(res.data.data[0].period)
                        })
                }
        }
        const getWallet = () => {
                axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
                        if (res.data.data === null) {
                                getWallet();
                        }
                        else {
                                let amount = res.data.data.depositeAmount + res.data.data.winningAmount;
                                // console.log("amount", amount)
                                setWallet(Math.floor(amount));
                        }
                });
        }
        var getGameCount = 1
        var batData1;
        var batData2;
        const getGame = async () => {
                getGameCount = getGameCount + 1


                await axiosInstance.post(`/avitor/runing2/${user.userId}`).then((res) => {

                        if (res.data.data.length > 0) {
                                // console.log("daradata", (res.data.data[0]))
                                if (res.data.data.length == 1) {
                                        if (res.data.data[0].batPosition == 1) {
                                                setChackOut1(true)
                                                // console.log("daradatasdffsdfsd", res.data.data[0].amount);
                                                batData1 = (res.data.data[0].amount);
                                                batData2 = null
                                                setBatData11((res.data.data[0]))
                                        }
                                        if (res.data.data[0].batPosition == 2) {
                                                setChackOut2(true)
                                                // console.log("daradata", res.data.data[0].amount);
                                                batData2 = ((res.data.data[0].amount))
                                                setBatData22((res.data.data[0]))
                                                batData1 = null
                                        }

                                }
                                if (res.data.data.length == 2) {
                                        if (res.data.data[0].batPosition == 1) {
                                                setChackOut1(true)
                                                // console.log("daradata", res.data.data[0].amount);
                                                batData1 = ((res.data.data[0].amount))
                                                setBatData11((res.data.data[0]))
                                        }
                                        if (res.data.data[0].batPosition == 2) {
                                                setChackOut2(true)
                                                // console.log("daradata", res.data.data[0].amount);
                                                batData2 = ((res.data.data[0].amount))
                                                setBatData22((res.data.data[0]))
                                        }
                                        if (res.data.data[1].batPosition == 1) {
                                                setChackOut1(true)
                                                batData1 = ((res.data.data[1].amount))
                                                setBatData11((res.data.data[1]))
                                        }

                                        if (res.data.data[1].batPosition == 2) {
                                                setChackOut2(true)
                                                batData2 = ((res.data.data[1].amount))
                                                setBatData22((res.data.data[1]))
                                        }
                                }

                        }
                        else {
                                setChackOut2(false)
                                setChackOut1(false)
                                batData1 = null
                                batData2 = null
                        }
                        //     setGame(res.data.data)
                })

        }
        const getGameHistory = async () => {
                await axiosInstance.post(`/avitor/runing/${user.userId}`).then((res) => {
                        // console.log("gameHistory",res.data.data)
                        setGameHistory(res.data.data)
                })

        }
        const handleToggleClick2 = () => {
                var aaaa = document.getElementById('planImage')
                // console.log("akdaslkdjaskl", aaaa.style[0])
                setIsSidebarVisible2(!isSidebarVisible2);
        };
        const onBatInc1 = (e) => {
                if (e == '-') {
                        if (batValue1 > 10) {
                                setBatValue1(batValue1 - 10)
                        }
                }
                if (e == '+') {
                        setBatValue1(batValue1 + 10)
                }
                if (e == 100 || e == 200 || e == 500 || e == 1000) {
                        setBatValue1(e)
                }
        };
        const onBatInc2 = (e) => {
                if (e == '-') {
                        if (batValue2 > 10) {
                                setBatValue2(batValue2 - 10)
                        }
                }
                if (e == '+') {
                        setBatValue2(batValue2 + 10)
                }
                if (e == 100 || e == 200 || e == 500 || e == 1000) {
                        setBatValue2(e)
                }
        };

        const onCloseBat = (e) => {
                // console.log("bat21111", batData11)
                // console.log("bat21111", batData1)
                if (e == 1) {
                        if (batData1 !== null) {
                                const data = {
                                        period: Period,
                                        status: "won",
                                        winAmount: multyData1,
                                        result: multy,
                                        user: user.userId,

                                }
                                // console.log("data")
                                axiosInstance.put(`/avitor/${batData11._id}`, data).then((res) => {
                                        alert(`congratulation for winning ${multyData1} Chips`)
                                        setChackOut1(false)
                                        getGame()
                                        getWallet()
                                })
                        }
                }
                else if (e == 2) {
                        if (batData2 !== null) {
                                const data = {
                                        period: Period,
                                        user: user.userId,
                                        status: "won",
                                        winAmount: multyData2,
                                        result: multy,

                                }
                                axiosInstance.put(`/avitor/${batData22._id}`, data).then((res) => {
                                        alert(`congratulation for winning ${multyData2} Chips`)
                                        setChackOut2(false)
                                        getGame()
                                        getWallet()
                                })
                        }
                }
        };

        const onBat = (e) => {

                if (e == 1) {
                        if (batValue1 <= walletData) {
                                onWalletUpdate(batValue1)
                                const data = {
                                        gameDate: new Date(),
                                        user: user.userId,
                                        period: Period,
                                        status: "pending",
                                        amount: batValue1,
                                        result: "pending",
                                        batPosition: 1
                                }
                                axiosInstance.post('/avitor', data).then((res) => {
                                        alert(`congratulation for join game of ${batValue1} Chips`)
                                        getGame()
                                })
                        }
                        else {

                        }
                }
                else if (e == 2) {
                        if (batValue2 <= walletData) {
                                onWalletUpdate(batValue2)
                                const data = {
                                        gameDate: new Date(),
                                        user: user.userId,
                                        period: Period,
                                        status: "pending",
                                        amount: batValue2,
                                        result: "pending",
                                        batPosition: 2
                                }
                                axiosInstance.post('/avitor', data).then((res) => {
                                        alert(`congratulation for join game of ${batValue2} Chips`)
                                        getGame()
                                })
                        }
                        else {

                        }

                };
        };
    const increaseSpeed = () => {
        setPlnSpeed((prevSpeed) => Math.max(prevSpeed - 2, 2)); // Minimum interval for even faster speed
    };

        useEffect(() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
        
                const updateCurve = () => {
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                        ctx.moveTo(0, canvasHeight);
                        curvePoints.forEach((point) => {
                            ctx.lineTo(point.x, point.y);
                        });
                        ctx.lineTo(curvePoints[curvePoints.length - 1].x, canvasHeight);
                        ctx.closePath();
                        ctx.fill();
            
                        ctx.beginPath();
                        ctx.strokeStyle = 'blue';
                        ctx.lineWidth = 0;
                        curvePoints.forEach((point, index) => {
                            if (index === 0) {
                                ctx.moveTo(point.x, point.y);
                            } else {
                                ctx.lineTo(point.x, point.y);
                            }
                        });
                        ctx.stroke();
            
                        const lastPoint = curvePoints[curvePoints.length - 1];
                        const planeX = lastPoint.x + 50;
                        const planeY = lastPoint.y - 20;
                        const gifWidth = 100;
                        const gifHeight = 47;
            
                        // Draw the current frame of the plane
                        if (!crashed) {
                            ctx.drawImage(
                                planeImages[frameIndex],
                                planeX - gifWidth / 2,
                                planeY - gifHeight / 2,
                                gifWidth,
                                gifHeight
                            );
                        } else {
                            ctx.fillText('💥', planeX, planeY); // Crash emoji
                        }
                    };
            
                    const updateCurvePoints = () => {
                        if (crashed) return;
                        
                        const lastPoint = curvePoints[curvePoints.length - 1];
                     
                        const newX = lastPoint.x + 4;
                       
                        socket.on('message', (msg) => {

                                if (msg.plan == "start") {
                                        if(parseInt(msg.number)<2){
                                                
                                                setPlnSpeed(5)
                                                // increaseSpeed()
                                        }
                                        if(parseInt(msg.number)<5 && parseInt(msg.number)>2){
                                                setPlnSpeed(80)
                                        }
                                        if(parseInt(msg.number)>5 && parseInt(msg.number)<10){
                                                setPlnSpeed(80)
                                        }
                                        if(parseInt(msg.number)>10){
                                                setPlnSpeed(100)
                                        }
                                }
                                if (msg.plan == "stop") {
                                        // increaseSpeed()
                                                setPlnSpeed(0.5)
                                      
                                }
                            
                            
                            
                                // if(Math.floor(plnResult) < 1){
                                
                                //         setPlnSpeed(1)
                                        
                                //  }
                                //  if(Math.floor(newX/100) > 1 && Math.floor(newX/100) < 2){
                                   
                            
                                //     setPlnSpeed(20)
                                //     setPlnAnimation(1.65)
                                //  }
                                //  if(Math.floor(newX/100) > 2 && Math.floor(newX/100) < 7){
                                 
                            
                                //     setPlnSpeed(40)
                                //     setPlnAnimation(1.65)
                                    
                                //  }
                                //  if(Math.floor(newX/100) > 7){
                                 
                            
                                //     setPlnSpeed(0.5)
                                //     setPlnAnimation(1.65)
                                    
                                //  }
                            
                            
                            
                            
                            })
                        const newY = canvasHeight - Math.pow(newX, plnAnimation) / 100;
                     

                        

                        // setMultiplier(newX / 100);
                        setCurvePoints((prevPoints) => [...prevPoints, { x: newX, y: newY }]);
                        updateCurve();
                    };
            
                    if (gameLoop) {
                       
                        const interval = setInterval(updateCurvePoints, plnSpeed);
                        return () => clearInterval(interval);
                    }
                }, [curvePoints, crashed, gameLoop, frameIndex]);
            
        
            useEffect(() => {
                const animationInterval = setInterval(() => {
                    setFrameIndex((prevIndex) => (prevIndex + 1) % planeFrames.length);
                }, 100); // Change frame every 200ms
        
                return () => clearInterval(animationInterval);
            }, []);
        var newplnStart;
            const startGame = () => {
                newplnStart = newplnStart +1
             if(newplnStart == 2){
                setCurvePoints([{ x: 0, y: canvasHeight }]);
                setCrashed(false);
                setProfitsTaken(false);
                setCrashAt(null);
                setMultiplier(1);
        
                const crashTime = Math.random() * (15- 10) + 1;
                const crashTimer = setTimeout(() => {
                   
                    clearInterval(gameLoop);
                },  crashTime * 1000);
        
                setGameLoop(crashTimer);
             }
            };
        
            const handleBet = () => {
                if (balance >= betAmount && betAmount > 0) {
                    setBalance((prevBalance) => prevBalance - betAmount);
                    
                } else {
                    alert("Insufficient balance or invalid bet amount.");
                }
            };
        
            const takeProfits = () => {
                if (!crashed && !profitsTaken) {
                    setProfitsTaken(true);
                    const profit = betAmount * multiplier - betAmount;
                    setBalance((prevBalance) => prevBalance + betAmount * multiplier);
                    console.log(`Took profits, multiplier: ${multiplier.toFixed(2)}x, profit: ${profit.toFixed(2)}$`);
                } else if (profitsTaken) {
                    console.log('Profits already taken.');
                }
            };

        const onWalletUpdate = (amount) => {
                // console.log("amount", amount)
                axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
                        if (res.data.data.depositeAmount >= amount) {
                                // console.log("res.data.data", res.data.data)

                                const data = {
                                        depositeAmount: res.data.data.depositeAmount - amount
                                }
                                // console.log("data", data)

                                axiosInstance.put(`/wallet/${user.userId}`, data).then((res) => {
                                        getWallet();
                                });

                        }
                        else {
                                let amount1 = amount - res.data.data.depositeAmount
                                const data = {
                                        winningAmount: res.data.data.winningAmount - amount1,
                                        depositeAmount: 0
                                }

                                axiosInstance.put(`/wallet/${user.userId}`, data).then((res) => {
                                        getWallet();
                                });


                        }

                });

        };
        
        return (
                <div className='aviotar' style={{ zIndex: '20000' }}>

                        <div className='mainblack' style={{ height: '100vh' }}>
                                <div>
                                        <audio ref={audioRef} src={bgsoundplan}></audio>

                                </div>
                                <div class="col-12 nav-top">
                                        <div class="row">
                                                <div class="col-2 xtl" >

                                                        <span class=" " style={{ fontSize: '40px', fontWeight: 'normal' }} onClick={() => onBack('/')}>&#x2039;</span>
                                                </div>
                                                <div class="col-8 tfw-5 tf-18 text-center">Aviotar</div>
                                                <div class="col-2 xtr mcpl" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomrule" aria-controls="offcanvasBottom">Rule</div>
                                        </div>
                                </div>

                                <div class="load-txt" v-if="!connected" style={{ display: `${loader2}` }}>
                                        <div class="loading-game-1">
                                                <div class="center-loading text-white text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
                                                                <g fill="#E50539" fill-rule="nonzero">
                                                                        <path
                                                                                d="M67.785 67.77a10.882 10.882 0 0 0 2.995-5.502l18.37-6.36c.47-.163.876-.471 1.16-.88l29.263-42.18a2.343 2.343 0 0 0-.268-2.993L110.153.704a2.344 2.344 0 0 0-3.314 0L95.73 11.813C71.965-5.861 38.683-3.514 17.58 17.588a60.26 60.26 0 0 0-8.829 11.21 2.343 2.343 0 0 0 4.001 2.441 55.575 55.575 0 0 1 8.142-10.336C40.184 1.613 70.512-.68 92.378 15.165l-5.72 5.72c-8.742-5.967-19.302-8.837-29.947-8.1a47.31 47.31 0 0 0-30.183 13.751 47.722 47.722 0 0 0-5.92 7.207 2.344 2.344 0 0 0 3.897 2.605 42.996 42.996 0 0 1 5.337-6.497c14.233-14.234 36.774-16.445 53.436-5.586l-6.818 6.818a33.418 33.418 0 0 0-19.773-4.186A33.338 33.338 0 0 0 36.47 36.48a2.344 2.344 0 0 0 3.314 3.314c8.787-8.786 22.336-10.795 33.215-5.248L58.38 49.163a10.969 10.969 0 0 0-6.164 3.084 10.882 10.882 0 0 0-2.996 5.504l-18.37 6.36c-.47.163-.876.47-1.159.879L.427 107.17a2.343 2.343 0 0 0 .268 2.992l9.152 9.151a2.337 2.337 0 0 0 1.657.687c.6 0 1.2-.23 1.657-.687l11.109-11.109A59.835 59.835 0 0 0 59.99 120a59.873 59.873 0 0 0 42.43-17.571 60.476 60.476 0 0 0 7.162-8.63 2.343 2.343 0 1 0-3.87-2.643 55.793 55.793 0 0 1-6.606 7.959c-19.321 19.32-49.61 21.598-71.487 5.74l5.722-5.723a47.325 47.325 0 0 0 30.058 8.092A47.318 47.318 0 0 0 93.472 93.48a47.82 47.82 0 0 0 5.15-6.09 2.343 2.343 0 0 0-3.82-2.715 43.106 43.106 0 0 1-4.644 5.49c-14.21 14.211-36.783 16.436-53.436 5.587l6.82-6.82a33.416 33.416 0 0 0 19.825 4.182A33.343 33.343 0 0 0 83.53 83.54a2.344 2.344 0 0 0-3.314-3.315c-8.777 8.778-22.34 10.792-33.215 5.25L61.62 70.855a10.97 10.97 0 0 0 6.165-3.084zm40.711-62.095l6.11 6.11-27.712 39.944-16.207 5.61a10.892 10.892 0 0 0-2.903-5.092 10.953 10.953 0 0 0-3.512-2.348l44.224-44.224zM11.504 114.342l-6.11-6.11 27.712-39.944 16.207-5.61a10.892 10.892 0 0 0 2.903 5.092 10.953 10.953 0 0 0 3.512 2.348l-44.224 44.224zm44.018-49.894a6.223 6.223 0 0 1-1.85-4.44l.003-.094c.036-.19.047-.383.035-.579a6.22 6.22 0 0 1 1.812-3.766A6.33 6.33 0 0 1 60 53.726a6.33 6.33 0 0 1 4.478 1.843 6.223 6.223 0 0 1 1.85 4.44l-.003.094a2.325 2.325 0 0 0-.035.579 6.22 6.22 0 0 1-1.812 3.766c-2.47 2.458-6.487 2.457-8.956 0z">
                                                                        </path>
                                                                        <path
                                                                                d="M113.341 82.064a2.344 2.344 0 0 0-3.115 1.131l-.026.057a2.343 2.343 0 1 0 4.26 1.955l.013-.028a2.344 2.344 0 0 0-1.132-3.115zM7.65 35.765a2.343 2.343 0 0 0-3.072 1.241l-.021.05a2.338 2.338 0 0 0 2.165 3.228c.922 0 1.8-.55 2.173-1.454.5-1.19-.056-2.56-1.245-3.065z">
                                                                        </path>
                                                                </g>
                                                        </svg>
                                                        <div class="secondary-font f-40 mt-2 waiting-text"> Waiting For Conection</div>
                                                        <div class="line-loader mt-2">
                                                                <div class="fill-line"></div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>


                                <header>

                                        <div class="header-bottom ">
                                                <div class="header-left">

                                                </div>
                                                <div class="header-right d-flex align-items-center justify-content-end">

                                                        <div class="wallet-balance " style={{ width: '25%', float: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                <span className='d-flex justify-content-between align-items-center'>
                                                                        <div className='d-flex justify-content-start align-items-center'>
                                                                                <div style={{ width: "20%", padding: '2px', marginRight: '2px', marginLeft: '7px' }}>
                                                                                        <img className='mb-1' style={{ width: '80%' }} src={wallet} alt="" />
                                                                                </div>
                                                                                <p className='m-0'>{walletData}</p>
                                                                        </div>
                                                                </span>
                                                                {/* <audio ref="audioPlayer" src="soundUrl"  loop></audio> */}
                                                        </div>
                                                </div>
                                        </div>
                                </header>

                                <div class="custom-toaster">
                                        <div class="cashout-toaster1 ">
                                                <div class="cashout-stop">
                                                        <div style={{ fontWeight: "600", color: "#fff", }}>You have cashed out!</div>
                                                        <div class="stop-number" ></div>
                                                </div>
                                                <div class="got-block position-relative d-flex align-items-center justify-content-center">
                                                        <img src={star} class="star-right" />
                                                        <img src={star1} class="star-left" />
                                                        <div class="got-amout">
                                                                <div style={{ fontWeight: "600", }}>You got:</div>
                                                                <div class="out-amount" style={{ fontWeight: "600", }}></div>
                                                        </div>
                                                </div>
                                                <span class="material-symbols-outlined bold-icon">
                                                        close
                                                </span>
                                        </div>

                                        <div class="cashout-toaster2 ">
                                                <div class="cashout-stop">
                                                        <div style={{
                                                                fontWeight: '600',
                                                                color: 'white',
                                                        }}>You have cashed out!</div>
                                                        <div class="stop-number"></div>
                                                </div>
                                                <div class="got-block position-relative d-flex align-items-center justify-content-center">
                                                        <img src={star} class="star-right" />
                                                        <img src={star1} class="star-left" />
                                                        <div class="got-amout">
                                                                <div style={{ fontWeight: "600", }}>You got:</div>
                                                                <div class="out-amount" style={{ fontWeight: "600", }}></div>
                                                        </div>
                                                </div>
                                                <span class="material-symbols-outlined bold-icon">
                                                        close
                                                </span>
                                        </div>

                                        <div class="error-toaster1 justify-content-between custom-toaster-error">
                                                <div class="msg">You have cashed out!</div>
                                                <span class="material-symbols-outlined bold-icon me-2" style={{ color: "#000", }}>
                                                        close
                                                </span>
                                        </div>

                                        <div class="error-toaster2 justify-content-between custom-toaster-error">
                                                <div class="msg">Stage time out!</div>
                                                <span class="material-symbols-outlined bold-icon me-2" style={{ color: "#000", }}>
                                                        close
                                                </span>
                                        </div>
                                </div>

                                <div class="main-container">

                                        <div class="left-sidebar">
                                                <div class="tabs-navs">
                                                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                                                                <li class="nav-item active" id="all" role="presentation" >
                                                                        <button class="nav-link" id="pills-allbets-tab" data-bs-toggle="pill"
                                                                                data-bs-target="#pills-allbets" type="button" role="tab"
                                                                                aria-controls="pills-allbets" aria-selected="true">All Bets</button>
                                                                </li>
                                                                <li class="nav-item" id="my" role="presentation" >
                                                                        <button class="nav-link" id="pills-mybets-tab" data-bs-toggle="pill"
                                                                                data-bs-target="#pills-mybets" type="button" role="tab"
                                                                                aria-controls="pills-mybets" aria-selected="false">My Bets</button>
                                                                </li>
                                                                <span class="active-line"></span>
                                                        </ul>
                                                </div>
                                                <div class="contents-blocks">
                                                        <div class="tab-content" id="pills-tabContent">
                                                                <div class="tab-pane fade show active" id="pills-allbets" role="tabpanel"
                                                                        aria-labelledby="pills-allbets-tab">
                                                                        <div class="d-flex align-items-center justify-content-between">
                                                                                <div class="bets-count secondary-font f-14">TOTAL BETS : <span
                                                                                        class="text-success" id="total_bets">98</span>
                                                                                </div>
                                                                                <div class="custom-badge mx-auto hide" id="prev_win_multi">0.00x</div>
                                                                                <div class="">

                                                                                        {/* <button class="btn btn-transparent previous-history selected d-flex align-items-center hide"
                                                                                      id="previous_hand_btn" onclick="previous_hand(2);">
                                                                                      <span
                                                                                              class="material-symbols-outlined f-18 me-1 history-icos">
                                                                                              history
                                                                                      </span>
                                                                                      <span
                                                                                              class="material-symbols-outlined f-18 me-1 close-icos">
                                                                                              close
                                                                                      </span>
                                                                                      Previous hand
                                                                              </button> */}
                                                                                        <button class="btn btn-transparent previous-history d-flex align-items-center border" id="current_hand_btn" >
                                                                                                <svg height="12px" version="1.1" viewBox="0 0 20 21" width="12px" className=' p-0' style={{ fill: "#fff", filter: "invert(1)", marginRight: "3px" }} xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" opacity="0.9" transform="translate(-464.000000, -254.000000)"><g id="history" transform="translate(464.000000, 254.500000)"><path d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z" id="Shape" /></g></g></g></svg>

                                                                                                Previous hand </button>
                                                                                </div>
                                                                        </div>
                                                                        <div class="list-data-tbl mt-2">
                                                                                <div class="list-header">
                                                                                        <div class="column-1">
                                                                                                User
                                                                                        </div>
                                                                                        <div class="column-2">
                                                                                                Bet
                                                                                        </div>
                                                                                        <div class="column-3">
                                                                                                Mult.
                                                                                        </div>
                                                                                        <div class="column-4">
                                                                                                Cash out
                                                                                        </div>
                                                                                </div>
                                                                                <div class="list-body scroll-div list-body0 mCustomScrollbar _mCS_6"
                                                                                        id="all_bets">
                                                                                        <div id="mCSB_6"
                                                                                                class="mCustomScrollBox mCS-dark-3 mCSB_vertical mCSB_inside"
                                                                                                style={{ maxHeight: "423.333px" }} tabindex="0">
                                                                                                <div id="mCSB_6_container" class="mCSB_container"
                                                                                                        style={{ position: "relative", top: "0", left: "0", }} dir="ltr" >
                                                                                                        <div class="marquee-container">
                                                                                                                <div class="marquee">
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-47.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        22284 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4428 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        17389 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6276 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-31.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        20150 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1823 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-17.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21273 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6844 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-70.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        48495 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1500 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        45029 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3146 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        36988 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8870 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-59.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        31299 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8247 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21343 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5328 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-43.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        24944 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9535 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-54.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        34159 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4836 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        45311 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1141 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-13.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        24105 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4389 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-51.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        10240 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9587 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-27.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        16123 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3675 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        42146 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3279 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        35118 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5460 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-22.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        33538 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6014 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        32958 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4818 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        29258 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7895 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-16.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        47690 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8669 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        29237 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7641 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-51.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        15899 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4665 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        22094 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3093 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        23552 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9882 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-59.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        16647 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8787 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        29167 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2607 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        40048 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8949 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-27.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        12495 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8547 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        23695 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9072 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-20.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21958 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5143 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        40962 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9433 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        41450 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5639 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        39562 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5366 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-4.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        39949 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2284 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        11165 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3555 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        42298 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1339 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        30802 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5556 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-22.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        18393 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4119 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14425 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9375 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-59.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        48001 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1412 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        33010 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9620 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-67.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        29670 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2255 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        44361 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3820 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-21.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        48678 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7558 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-11.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        26413 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3738 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14831 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4294 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        45420 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7356 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-14.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        23905 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1882 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-29.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        19670 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7794 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        27491 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8967 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        20594 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6245 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        25564 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7758 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14552 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1657 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        34115 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1587 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-11.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        31713 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5477 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        25993 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8155 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-34.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        47721 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6593 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-43.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        44272 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4175 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        10162 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8310 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        37194 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3085 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        31023 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1993 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        34523 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9059 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        19407 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3516 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        12166 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7856 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-44.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        34483 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8841 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        29513 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5696 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-61.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        11768 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3050 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-41.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        24337 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8727 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-42.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        39157 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7467 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-31.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        47424 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8432 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-13.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        39823 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6430 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-42.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        22928 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4483 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-50.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        49650 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7990 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        45672 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5620 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-29.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        22683 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2087 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        12017 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2351 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-55.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        19425 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1896 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-34.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14639 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7866 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        13459 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3384 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-49.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        38075 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3299 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-17.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14791 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5236 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-20.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        25173 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2336 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        11556 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3032 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-50.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        42511 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9431 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        31962 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6334 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        35944 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7995 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-49.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        38910 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4968 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-15.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        10978 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8373 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-24.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        49877 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9613 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-42.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        49419 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6236 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-20.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        25894 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2740 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-60.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        44783 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8038 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-67.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        15709 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1393 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        32867 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2425 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-2.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        47174 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4026 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-21.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        38188 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1132 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-29.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        23194 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5610 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        38906 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2647 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-51.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        15134 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2140 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-48.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        18657 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1770 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        43624 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8403 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        46617 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9285 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-25.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14979 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6979 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        36804 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9155 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        <img src="../assets/includes/jet/av-31.png"
                                                                                                                                                class="avatar me-1 mCS_img_loaded" />
                                                                                                                                        40238 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        7603 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        25703 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1574 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        47615 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5630 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        36381 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2326 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-49.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        45084 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3564 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        46337 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9994 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21064 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8528 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-49.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14350 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        6523 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-44.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        30801 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9649 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        12798 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5129 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21683 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8331 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-22.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        47874 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8816 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        19459 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4669 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-17.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        10220 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9509 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-31.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        14421 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3828 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        41333 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1686 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        30278 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1552 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-11.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        19014 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8004 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        23401 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        3385 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21229 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4553 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        46502 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5017 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-62.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        39973 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8504 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        15430 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1474 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        42028 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2807 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        44543 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8206 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-11.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        38654 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1889 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        16055 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        9948 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        21349 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        1106 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        18243 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4963 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-36.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        39926 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5115 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        20218 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        5712 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        41802 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2120 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-37.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        42269 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4298 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-9.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        27652 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        2406 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        12099 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        4011 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        <div class="list-items   ">
                                                                                                                                <div class="column-1 users">
                                                                                                                                        {/* <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/> */}
                                                                                                                                        20629 </div>
                                                                                                                                <div class="column-2"> <button
                                                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                                        8010 </button>
                                                                                                                                </div>
                                                                                                                                <div class="column-3"> - </div>
                                                                                                                                <div class="column-4"> - </div>
                                                                                                                        </div>
                                                                                                                        {/* <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32081 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4856 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22083 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9589 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      13468 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1870 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-61.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      41895 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3579 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-20.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      45849 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2247 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-6.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32683 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8855 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47434 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7012 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      19756 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1111 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      31050 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3272 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-16.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48650 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1471 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44271 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9581 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-51.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11281 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3519 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47379 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4442 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47069 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2745 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-37.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      10279 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4126 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      29189 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9364 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-42.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42514 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3926 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44468 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4326 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36899 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3832 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-53.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16146 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7685 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36215 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8608 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-43.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49772 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1847 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      28242 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5551 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-59.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      20075 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8981 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-50.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22735 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5387 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48711 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1517 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      19953 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8949 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-5.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      27492 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2991 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-13.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17247 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3661 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46193 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2905 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      43632 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9431 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-5.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      10291 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6475 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18983 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2276 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25712 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7825 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-31.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26033 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2811 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25735 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7555 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-51.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21186 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9960 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      20258 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4758 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18792 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8011 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-29.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      13683 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3168 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-6.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47310 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3109 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-7.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18752 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4259 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-55.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      38939 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8763 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11501 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3338 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-66.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23077 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3772 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-54.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      10671 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2219 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      37338 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7539 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-62.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17211 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7303 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      12629 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5147 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      41993 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4200 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-27.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18042 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5032 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-60.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44605 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6041 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-55.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39725 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6220 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47120 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6925 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40360 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5156 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-4.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16867 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9090 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-9.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      14607 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9754 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      27153 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4627 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      37739 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2164 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-5.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      31448 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4917 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11655 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6692 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36139 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2752 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26036 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4169 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46633 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1062 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-43.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26331 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7658 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30451 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3855 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46750 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3329 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      24304 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8384 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-21.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      34851 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1631 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23616 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7133 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-55.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      19006 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3988 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44620 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5570 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42266 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5004 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46399 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5143 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-71.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16953 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8091 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32960 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6315 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22838 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9767 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21169 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7084 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      19936 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5752 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-27.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33511 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1322 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21209 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7535 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49442 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9817 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-37.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      27522 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4358 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-13.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23104 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1868 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16660 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7072 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-60.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22823 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7134 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-55.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33945 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5133 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      35593 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8337 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-70.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32163 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3885 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21104 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7663 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-36.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      45659 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3045 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-2.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36711 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1280 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-60.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32023 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2968 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      45368 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1033 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-62.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44274 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7403 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-44.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      45356 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9195 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-11.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26430 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4438 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      28968 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6134 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-24.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      29543 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3595 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-59.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16057 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9138 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25495 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6194 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-5.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      37966 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9999 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39523 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6231 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-53.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      37045 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3843 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18807 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5754 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40704 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7621 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47046 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2633 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18393 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3477 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18327 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3372 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40553 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7243 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39754 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9420 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-27.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21115 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8446 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-25.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      38433 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4501 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      35448 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7902 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-7.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48274 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9544 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-50.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      28888 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4058 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-7.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16682 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8540 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33807 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3602 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-16.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26980 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4133 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-37.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25964 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5912 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-70.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21684 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7485 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-14.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11566 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7333 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-20.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17341 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3319 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-44.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      27295 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8278 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23694 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3283 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-53.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32657 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7458 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      34379 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6324 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49135 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2257 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42558 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1389 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32781 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5782 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-62.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22279 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4533 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-68.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49888 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1668 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-63.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42078 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4319 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-17.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40630 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1771 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-29.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32645 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1310 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-33.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      13986 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1190 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40475 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2311 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48999 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8332 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23434 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7858 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-36.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      24866 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3789 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11245 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5063 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-22.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32822 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3141 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21332 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1851 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42284 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3388 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-14.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      31308 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8245 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17207 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6624 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18572 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5281 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22466 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2948 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-6.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      43617 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5490 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-24.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48781 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7729 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44002 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5005 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49402 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9610 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42948 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7731 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-12.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      10238 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1289 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      24189 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5940 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-61.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      28355 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3753 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-13.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47316 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2339 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-9.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25157 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7118 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      15931 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8825 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-47.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      41800 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6761 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16823 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5600 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30111 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3442 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23608 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9452 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-35.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      19468 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6881 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11845 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8448 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      29468 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7915 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-62.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16672 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7825 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-27.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46233 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3489 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47396 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5050 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47168 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5649 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      37092 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4658 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-2.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22029 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1242 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-17.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      31531 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3115 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44554 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9916 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-9.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      45859 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2381 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-48.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44073 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8214 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      27518 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8570 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      15044 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6471 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36889 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5853 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25004 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4622 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48272 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1728 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16003 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3092 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-19.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      31593 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1677 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-47.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47472 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5722 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-5.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33007 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3549 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36990 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2698 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17192 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8730 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26056 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4814 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-34.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42278 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4018 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33057 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1802 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-10.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33838 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3619 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-48.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42455 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6497 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21238 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3583 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      41332 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9889 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-7.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      23353 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2935 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-39.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40265 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7986 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-53.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16658 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6855 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-36.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      29231 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5995 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-71.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44395 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6001 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-68.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      22927 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5067 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48927 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6665 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-70.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44196 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3170 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-24.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16168 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1442 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16030 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4828 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-15.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33128 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7716 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-17.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39394 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8713 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-70.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      37956 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5707 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-44.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36597 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1319 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-20.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      24052 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4827 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      41856 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8334 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-62.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11304 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3037 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-65.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30651 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7628 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      13049 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6891 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-46.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      14930 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5783 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-30.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30044 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8025 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39479 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7434 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-53.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      34629 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7753 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-47.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33641 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3429 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-47.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47128 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8343 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-50.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      40004 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7061 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-31.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      14230 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3941 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-24.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48939 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3875 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32361 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4507 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-50.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      34214 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8758 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-2.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      35460 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8550 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-42.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39153 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9433 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17832 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3505 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-59.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48946 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4842 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16711 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2112 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      20924 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1474 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-11.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17209 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1600 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-43.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16733 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8333 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42973 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5161 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-24.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30657 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9276 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-31.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      24561 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3515 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-42.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26844 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3935 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-53.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      43605 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3029 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46499 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7005 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-16.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      15450 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3874 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-47.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      11603 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2131 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47149 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4049 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-28.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48670 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9066 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      44848 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3264 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      14694 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3350 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      25803 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9366 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26052 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7005 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-60.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      48295 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4946 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-45.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39762 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1232 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-15.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      46924 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9633 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-71.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      34899 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8084 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-9.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      12114 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9874 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      16898 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9597 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-22.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      32154 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6504 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-67.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33080 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4689 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-38.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47333 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4934 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-56.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18904 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4899 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-58.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      17988 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7825 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-72.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30066 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5521 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-40.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      29838 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2035 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-26.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      14295 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5795 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-36.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      47898 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1132 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-66.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26539 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5263 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-61.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      28716 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6616 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-1.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18360 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6990 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-61.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      42523 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2054 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-13.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      39577 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1638 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-33.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      35790 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9317 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-60.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30200 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              1721 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-52.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30728 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5901 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30066 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7790 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33271 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5119 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-69.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      20850 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5120 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-15.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26027 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2534 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-51.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      33096 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5975 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-23.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      21667 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5743 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-32.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49507 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2152 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-57.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      41094 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              7220 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-70.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      43302 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9609 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-6.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      14445 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              5436 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-37.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      49050 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4843 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-4.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      43107 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              8322 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      18564 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4308 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-43.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      38680 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              6272 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-8.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      45142 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              3459 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-64.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      36549 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              2147 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-3.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      30915 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              4603 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div>
                                                                                                      <div class="list-items   ">
                                                                                                              <div class="column-1 users">
                                                                                                                      <img src="../assets/includes/jet/av-18.png"
                                                                                                                              class="avatar me-1 mCS_img_loaded"/>
                                                                                                                      26390 </div>
                                                                                                              <div class="column-2"> <button
                                                                                                                              class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                                              9013 </button>
                                                                                                              </div>
                                                                                                              <div class="column-3"> - </div>
                                                                                                              <div class="column-4"> - </div>
                                                                                                      </div> */}
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div id="mCSB_6_scrollbar_vertical"
                                                                                                        class="mCSB_scrollTools mCSB_6_scrollbar mCS-dark-3 mCSB_scrollTools_vertical"
                                                                                                        style={{ display: "block", }}>
                                                                                                        <div class="mCSB_draggerContainer" >
                                                                                                                <div id="mCSB_6_dragger_vertical"
                                                                                                                        class="mCSB_dragger"
                                                                                                                        style={{ position: "absolute", minHeight: "30px", display: "block", height: "12px", maxHeight: "413.333px", top: "0px" }}>
                                                                                                                        <div class="mCSB_dragger_bar"
                                                                                                                                style={{ lineHeight: "30px", }}>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                                <div class="mCSB_draggerRail"></div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>

                                                                                <div class="list-body scroll-div list-body0 hide mCustomScrollbar _mCS_7 mCS_no_scrollbar"
                                                                                        id="prev_bets" >
                                                                                        <div id="mCSB_7"
                                                                                                class="mCustomScrollBox mCS-dark-3 mCSB_vertical mCSB_inside"

                                                                                                style={{ maxHeight: "none", }}
                                                                                                tabindex="0">
                                                                                                <div id="mCSB_7_container"
                                                                                                        class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"

                                                                                                        style={{ position: "relative", top: "0", left: "0", }}
                                                                                                        dir="ltr"> </div>
                                                                                                <div id="mCSB_7_scrollbar_vertical"
                                                                                                        class="mCSB_scrollTools mCSB_7_scrollbar mCS-dark-3 mCSB_scrollTools_vertical"
                                                                                                        style={{ display: "none", }}>
                                                                                                        <div class="mCSB_draggerContainer">
                                                                                                                <div id="mCSB_7_dragger_vertical"
                                                                                                                        class="mCSB_dragger"

                                                                                                                        style={{ position: "absolute", minHeight: "30px", top: "0px", }}>

                                                                                                                        <div class="mCSB_dragger_bar" style={{ lineHeight: "30px" }}>

                                                                                                                        </div>
                                                                                                                </div>
                                                                                                                <div class="mCSB_draggerRail"></div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-mybets" role="tabpanel"
                                                                        aria-labelledby="pills-mybets-tab">
                                                                        <div class="list-data-tbl mt-2">
                                                                                <div class="list-header">
                                                                                        <div class="column-1">
                                                                                                Date
                                                                                        </div>
                                                                                        <div class="column-2">
                                                                                                Bet
                                                                                        </div>
                                                                                        <div class="column-3">
                                                                                                Mult.
                                                                                        </div>
                                                                                        <div class="column-4">
                                                                                                Cash out
                                                                                        </div>
                                                                                        <div class="ps-2"></div>
                                                                                </div>
                                                                                <div class="list-body scroll-div list-body1 mCustomScrollbar _mCS_8 mCS_no_scrollbar"
                                                                                        id="my_bet_list">

{GameHistory && GameHistory[0] && GameHistory.map((data) => {
                                                                                        return (
                                                                                                <>
                                                                                                       
                                                                                                       <div class="list-items   " v-for="rows in betrec" key="rows.id" rowsrec="rows">
                                                                                                <div class="column-1">
                                                                                                {moment(data.gameDate).format("DD-MM-yyyy")}</div>
                                                                                                <div class="column-2"> <button
                                                                                                        class="btn btn-transparent previous-history d-flex align-items-center mx-auto">
                                                                                                        {data.amount} </button> </div>
                                                                                              { (data.result == 0 || data.winAmount == '1') && <div class="classbg(rows.winpoint)" >loss</div>}
                                                                                             {(data.result != '0' && data.winAmount !== '1') &&   <div class="classbg(rows.winpoint)" >{data.result}</div>}
                                                                                              {(data.result == '0' || data.result == '1') && <div class="column-4" style={{color:"red"}}> - {data.amount} </div>}
                                                                                                {(data.result != '0' && data.winAmount != '1') &&<div class="column-4"> ₹ {data.winAmount} </div>}
                                                                                        </div>

                                                                                                </>
                                                                                        )




                                                                                })}









                                                                                      
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>


                                        <div class="right-sidebar">
                                                <div class="game-play">
                                                        <div class="history-top">
                                                                <div class="stats">
                                                                        <div class="payouts-wrapper">
                                                                                {GameResult && GameResult[0] && GameResult.map((data) => {
                                                                                        return (
                                                                                                <>
                                                                                                        <div class="payouts-block">
                                                                                                                <div class="bg3 custom-badge" style={{ fontSize: '12px', lineHeight: '24px', height: '22px', padding: '0 10px', textAlign: 'center', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', width: 'fit-content', background: '#005d91', color: '#fff' }}>{data.result}x</div>


                                                                                                        </div>


                                                                                                </>
                                                                                        )




                                                                                })}
                                                                                {GameResult && GameResult[0] && GameResult.map((data) => {
                                                                                        return (
                                                                                                <>
                                                                                                        <div class="payouts-block">
                                                                                                                <div class="bg3 custom-badge" style={{ fontSize: '12px', lineHeight: '24px', height: '22px', padding: '0 10px', textAlign: 'center', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', width: 'fit-content', background: '#005d91', color: '#fff' }}>{data.result}x</div>


                                                                                                        </div>


                                                                                                </>
                                                                                        )




                                                                                })}
                                                                        </div>
                                                                        <div class="shadow">
                                                                        </div>
                                                                        <div class="button-block">
                                                                                <div class="dropdown-toggle button histry-toggle" >
                                                                                        <div onClick={handleToggleClick}>
                                                                                                <span class="material-symbols-outlined">
                                                                                                        <svg height="12px" version="1.1" viewBox="0 0 20 21" width="12px" className=' p-0' style={{ fill: "#fff", filter: "invert(1)", marginRight: "3px" }} xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink"><title /><desc /><defs /><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" opacity="0.9" transform="translate(-464.000000, -254.000000)"><g id="history" transform="translate(464.000000, 254.500000)"><path d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z" id="Shape" /></g></g></g></svg>
                                                                                                </span>

                                                                                        </div>
                                                                                </div>
                                                                                <div className={`history-dropdown ${isSidebarVisible ? 'd-block' : ''}`} >
                                                                                        <div class="pa-5 secondary-font text-white pb-0">ROUND HISTORY
                                                                                        </div>

                                                                                        <div class="d-flex flex-wrap pa-5 round-history-list">
                                                                                                {GameResult && GameResult[0] && GameResult.map((data) => {
                                                                                                        return (
                                                                                                                <>

                                                                                                                        <div class="bg3 custom-badge" style={{ fontSize: '12px', lineHeight: '24px', height: '22px', padding: '0 10px', textAlign: 'center', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', width: 'fit-content', background: '#005d91', color: '#fff' }}>{data.result}x</div>





                                                                                                                </>
                                                                                                        )




                                                                                                })}

                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>


                                                        <div class="stage-board position-relative "  style={{ zIndex: "1" }} >
                                                        <canvas className={planClassCrash} ref={canvasRef} width={canvasWidth} height={canvasHeight}  />
                                                                <div class="bottom-left-plane  w-100 ">
                                                                        <img className={`${plnImg}`} src={plan} style={{ position: 'absolute' }} id='planImage' />
                                                                </div>
                                                                <div class="counter-num text-center" id="auto_increment_number_div" >
                                                                        <div class="secondary-font f-40 flew_away_section" style={{ display: `${loader4}`, }}>FLEW
                                                                                AWAY!</div>
                                                                        <div id="auto_increment_number" style={{ display: `${loader3}`, }}>{multy}
                                                                        </div>
                                                                </div>

                                                                <div class="loading-game" style={{ display: `${loader1}` }}>
                                                                        <div class="center-loading text-white text-center game-centeral-loading" id="game-centeral-loading"
                                                                        >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"
                                                                                        viewBox="0 0 120 120">
                                                                                        <g fill="#E50539" fill-rule="nonzero">
                                                                                                <path
                                                                                                        d="M67.785 67.77a10.882 10.882 0 0 0 2.995-5.502l18.37-6.36c.47-.163.876-.471 1.16-.88l29.263-42.18a2.343 2.343 0 0 0-.268-2.993L110.153.704a2.344 2.344 0 0 0-3.314 0L95.73 11.813C71.965-5.861 38.683-3.514 17.58 17.588a60.26 60.26 0 0 0-8.829 11.21 2.343 2.343 0 0 0 4.001 2.441 55.575 55.575 0 0 1 8.142-10.336C40.184 1.613 70.512-.68 92.378 15.165l-5.72 5.72c-8.742-5.967-19.302-8.837-29.947-8.1a47.31 47.31 0 0 0-30.183 13.751 47.722 47.722 0 0 0-5.92 7.207 2.344 2.344 0 0 0 3.897 2.605 42.996 42.996 0 0 1 5.337-6.497c14.233-14.234 36.774-16.445 53.436-5.586l-6.818 6.818a33.418 33.418 0 0 0-19.773-4.186A33.338 33.338 0 0 0 36.47 36.48a2.344 2.344 0 0 0 3.314 3.314c8.787-8.786 22.336-10.795 33.215-5.248L58.38 49.163a10.969 10.969 0 0 0-6.164 3.084 10.882 10.882 0 0 0-2.996 5.504l-18.37 6.36c-.47.163-.876.47-1.159.879L.427 107.17a2.343 2.343 0 0 0 .268 2.992l9.152 9.151a2.337 2.337 0 0 0 1.657.687c.6 0 1.2-.23 1.657-.687l11.109-11.109A59.835 59.835 0 0 0 59.99 120a59.873 59.873 0 0 0 42.43-17.571 60.476 60.476 0 0 0 7.162-8.63 2.343 2.343 0 1 0-3.87-2.643 55.793 55.793 0 0 1-6.606 7.959c-19.321 19.32-49.61 21.598-71.487 5.74l5.722-5.723a47.325 47.325 0 0 0 30.058 8.092A47.318 47.318 0 0 0 93.472 93.48a47.82 47.82 0 0 0 5.15-6.09 2.343 2.343 0 0 0-3.82-2.715 43.106 43.106 0 0 1-4.644 5.49c-14.21 14.211-36.783 16.436-53.436 5.587l6.82-6.82a33.416 33.416 0 0 0 19.825 4.182A33.343 33.343 0 0 0 83.53 83.54a2.344 2.344 0 0 0-3.314-3.315c-8.777 8.778-22.34 10.792-33.215 5.25L61.62 70.855a10.97 10.97 0 0 0 6.165-3.084zm40.711-62.095l6.11 6.11-27.712 39.944-16.207 5.61a10.892 10.892 0 0 0-2.903-5.092 10.953 10.953 0 0 0-3.512-2.348l44.224-44.224zM11.504 114.342l-6.11-6.11 27.712-39.944 16.207-5.61a10.892 10.892 0 0 0 2.903 5.092 10.953 10.953 0 0 0 3.512 2.348l-44.224 44.224zm44.018-49.894a6.223 6.223 0 0 1-1.85-4.44l.003-.094c.036-.19.047-.383.035-.579a6.22 6.22 0 0 1 1.812-3.766A6.33 6.33 0 0 1 60 53.726a6.33 6.33 0 0 1 4.478 1.843 6.223 6.223 0 0 1 1.85 4.44l-.003.094a2.325 2.325 0 0 0-.035.579 6.22 6.22 0 0 1-1.812 3.766c-2.47 2.458-6.487 2.457-8.956 0z">
                                                                                                </path>
                                                                                                <path
                                                                                                        d="M113.341 82.064a2.344 2.344 0 0 0-3.115 1.131l-.026.057a2.343 2.343 0 1 0 4.26 1.955l.013-.028a2.344 2.344 0 0 0-1.132-3.115zM7.65 35.765a2.343 2.343 0 0 0-3.072 1.241l-.021.05a2.338 2.338 0 0 0 2.165 3.228c.922 0 1.8-.55 2.173-1.454.5-1.19-.056-2.56-1.245-3.065z">
                                                                                                </path>
                                                                                        </g>
                                                                                </svg>
                                                                                <div class="secondary-font f-40 mt-2 waiting-text" style={{ color: "#fff", }}> WAITING FOR FLY</div>
                                                                                <div class="line-loader mt-2">
                                                                                        <div class="fill-line"></div>
                                                                                </div>
                                                                        </div>
                                                                        {/* <div class="bottom-left-plane" id="bottomplane">
                                                                                <img class="plane-static" src={plan} />
                                                                        </div> */}
                                                                </div>
                                                                <img src={bgscake} class="rotateimage rotatebg"
                                                                        style={{
                                                                                width: '2260px',
                                                                                height: '2260px',
                                                                                top: '-1024px',
                                                                                left: '-1130px',
                                                                        }}
                                                                />
                                                                                                                        </div>
                                                        <div className='controls controls-wrap'>
                                                                <div class="bet-controls">
                                                                        <div class="bet-control double-bet" id="main_bet_section">
                                                                                <div class="controls">

                                                                                        <div class="navigation">
                                                                                                <input id="bet_type" type="hidden" value="0" />
                                                                                                <div class="navigation-switcher" style={{ width: "0px", }}>
                                                                                                        <div class="sliderj bet-btn">Bet</div>
                                                                                                        <span class="active-line"></span>

                                                                                                </div>
                                                                                        </div>
                                                                                        <div class="first-row auto-game-feature">
                                                                                                <div class="bet-block">
                                                                                                        <div class="spinner">
                                                                                                                <div class="input">
                                                                                                                        <input id="bet_amount"
                                                                                                                                type="text"
                                                                                                                                class="main_bet_amount" v-model="prebet" value={batValue1} />
                                                                                                                </div>
                                                                                                                <div class="qty-buttons">
                                                                                                                        <button class="minus "
                                                                                                                                id="main_minus_btn"
                                                                                                                                onClick={() => onBatInc1('-')}>
                                                                                                                                -
                                                                                                                        </button>
                                                                                                                        <button class="plus" id="main_plus_btn"
                                                                                                                                onClick={() => onBatInc1('+')}>
                                                                                                                                <span
                                                                                                                                        class="material-symbols-outlined">
                                                                                                                                        +
                                                                                                                                </span>
                                                                                                                        </button>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <div class="bets-opt-list">
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc1(100)}><span
                                                                                                                                class="amt">100</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc1(200)}><span
                                                                                                                                class="amt">200</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc1(500)}><span
                                                                                                                                class="amt">500</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc1(1000)}><span
                                                                                                                                class="amt">1000</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div class="buttons-block" id="bet_button" >
                                                                                                        {actBtn1 == 2 && !chackOut1 && <button class="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"

                                                                                                                id="main_bet_now" onClick={() => onBat(1)}
                                                                                                        ><label
                                                                                                                class="font-family-title label">BET</label></button>}
                                                                                                        {actBtn1 == 2 && chackOut1 && <button class="btn btn-primary bet font-family-title height-70 ng-star-inserted main_bet_btn"

                                                                                                                id="main_cancel_now"><label
                                                                                                                        class="font-family-title label">Wait</label></button>}
                                                                                                        {actBtn1 == 1 && <button class="btn btn-primary bet font-family-title height-70 ng-star-inserted main_bet_btn"

                                                                                                                id="main_cancel_now"><label
                                                                                                                        class="font-family-title label">Wait</label></button>}
                                                                                                        {actBtn1 == 3 && chackOut1 && <button class="btn btn-warning bet font-family-title ng-star-inserted"
                                                                                                                onClick={() => onCloseBat(1)}>
                                                                                                                <label class="font-family-title label">CASH-OUT
                                                                                                                </label>
                                                                                                                <div class="font-family-title label"
                                                                                                                        id="cash_out_amount">{multyData1}</div>
                                                                                                        </button>}
                                                                                                        {actBtn1 == 3 && !chackOut1 && <div class="btn-tooltip f-14 mb-1" id="waiting"
                                                                                                                style={{ display: 'block', }}><button className='btn btn-danger bet font-family-title ng-star-inserted'>
                                                                                                                        Waiting For Next <br /> Round
                                                                                                                </button></div>}
                                                                                                </div>
                                                                                                <div class="buttons-block" id="cancle_button"
                                                                                                        style={{ display: 'none', }}>
                                                                                                        <div class="btn-tooltip f-14 mb-1" id="waiting"
                                                                                                                style={{ display: 'none', }}>Waiting
                                                                                                                for next round</div>
                                                                                                        <button class="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"

                                                                                                                id="main_cancel_now"><label
                                                                                                                        class="font-family-title label">CANCEL</label></button>
                                                                                                </div>
                                                                                                <div class="buttons-block" id="cashout_button"
                                                                                                        style={{ display: 'none', }}>
                                                                                                        <input type="hidden" name="main_bet_id"
                                                                                                                id="main_bet_id" />
                                                                                                        <button class="btn btn-warning bet font-family-title ng-star-inserted"
                                                                                                        >
                                                                                                                <label class="font-family-title label">CASH-OUT</label>
                                                                                                                <div class="font-family-title label"
                                                                                                                        id="cash_out_amount">54</div>
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>

                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                <div class="bet-controls">
                                                                        <div class="bet-control double-bet" id="main_bet_section1">
                                                                                <div class="controls">

                                                                                        <div class="navigation">
                                                                                                <input id="bet_type" type="hidden" value="0" />
                                                                                                <div class="navigation-switcher" style={{ width: "0px", }}>
                                                                                                        <div class="sliderj bet-btn">Bet</div>
                                                                                                        <span class="active-line"></span>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div class="first-row auto-game-feature">
                                                                                                <div class="bet-block">
                                                                                                        <div class="spinner">
                                                                                                                <div class="input">
                                                                                                                        <input id="bet_amount1"
                                                                                                                                type="text"
                                                                                                                                class="main_bet_amount" v-model="prebet1" value={batValue2} />
                                                                                                                </div>
                                                                                                                <div class="qty-buttons">
                                                                                                                        <button class="minus "
                                                                                                                                id="main_minus_btn"
                                                                                                                                onClick={() => onBatInc2('-')} >
                                                                                                                                -

                                                                                                                        </button>
                                                                                                                        <button class="plus" id="main_plus_btn"
                                                                                                                                onClick={() => onBatInc2('+')} >
                                                                                                                                <span
                                                                                                                                        class="material-symbols-outlined">
                                                                                                                                        +
                                                                                                                                </span>
                                                                                                                        </button>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                        <div class="bets-opt-list">
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc2(100)}><span
                                                                                                                                class="amt">100</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc2(200)}><span
                                                                                                                                class="amt">200</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc2(500)}><span
                                                                                                                                class="amt">500</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                                <button class="btn btn-secondary btn-sm bet-opt main_amount_btn"
                                                                                                                        onClick={() => onBatInc2(1000)}><span
                                                                                                                                class="amt">1000</span><span
                                                                                                                                        class="currency"></span></button>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div class="buttons-block" id="bet_button1" >
                                                                                                        {actBtn1 == 2 && !chackOut2 && <button class="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"

                                                                                                                id="main_bet_now" onClick={() => onBat(2)}
                                                                                                        ><label
                                                                                                                class="font-family-title label">BET</label></button>}
                                                                                                        {actBtn1 == 2 && chackOut2 && <button class="btn btn-primary bet font-family-title height-70 ng-star-inserted main_bet_btn"

                                                                                                                id="main_cancel_now"><label
                                                                                                                        class="font-family-title label">Wait</label></button>}
                                                                                                        {actBtn2 == 1 && <button class="btn btn-primary bet font-family-title height-70 ng-star-inserted main_bet_btn"

                                                                                                                id="main_cancel_now"><label
                                                                                                                        class="font-family-title label">Wait</label></button>}
                                                                                                        {actBtn2 == 3 && chackOut2 && <button class="btn btn-warning bet font-family-title ng-star-inserted"
                                                                                                                onClick={() => onCloseBat(2)}>
                                                                                                                <label class="font-family-title label">CASH
                                                                                                                        OUT</label>
                                                                                                                <div class="font-family-title label"
                                                                                                                        id="cash_out_amount">{multyData2}</div>
                                                                                                        </button>}
                                                                                                        {actBtn2 == 3 && !chackOut2 && <div class="btn-tooltip f-14 mb-1" id="waiting"
                                                                                                                style={{ display: 'block', }}><button className='btn btn-danger bet font-family-title ng-star-inserted'>
                                                                                                                        Waiting For Next <br /> Round
                                                                                                                </button></div>}
                                                                                                </div>
                                                                                                <div class="buttons-block" id="cancle_button1"
                                                                                                        style={{ display: 'none', }}>
                                                                                                        <div class="btn-tooltip f-14 mb-1" id="waiting1"
                                                                                                                style={{ display: 'none', }}>Waiting
                                                                                                                for next round</div>
                                                                                                        <button class="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"

                                                                                                                id="main_cancel_now1"><label
                                                                                                                        class="font-family-title label">CANCEL</label></button>
                                                                                                </div>
                                                                                                <div class="buttons-block" id="cashout_button1"
                                                                                                        style={{ display: 'none', }}>
                                                                                                        <input type="hidden" name="main_bet_id"
                                                                                                                id="main_bet_id" />
                                                                                                        <button class="btn btn-warning bet font-family-title ng-star-inserted"
                                                                                                        >
                                                                                                                <label class="font-family-title label">CASH
                                                                                                                        OUT</label>
                                                                                                                <div class="font-family-title label"
                                                                                                                        id="cash_out_amount">65</div>
                                                                                                        </button>
                                                                                                </div>
                                                                                        </div>

                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                </div>

                                {/* <div>
            <p>Balance: {balance.toFixed(2)}$</p>
            <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                placeholder="Enter bet amount"
            />
            <button onClick={handleBet}>Submit Bet</button>
            <button onClick={takeProfits}>Take Profits</button>
          
            {crashed && <div>Multiplier at crash: {crashAt}</div>}
            <div>Current Multiplier: {multiplier.toFixed(2)}x</div>
        </div> */}
                        </div>
                        <audio autoPlay loop>
                                <source src={bgsound} type="audio/mpeg" />

                        </audio>
                        <audio ref={audioRef} src={bgsoundplan}></audio>

                </div>
        )
}

export default Jet;