
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
const Terms = (props) => {
  const user = useContext(UserContext);
  let navigate = useNavigate();
  const [wallet ,setWallet] = useState(null)
  useEffect(() => {

    let mounted = true;
    if (mounted) {

      if (user.userId === null) {
        localStorage.clear();
        navigate('/LoginScreen', { replace: true });
      }


    }
    pageLoad();
    return () => (mounted = false);
  }, []);
  const pageLoad = () => {
    getWallet()
  }
  var count = 1;
  const getWallet = () => {
    axiosInstance.get(`/wallet/${user.userId}`).then((res) => {
        let amount = res.data.data.depositeAmount +res.data.data.winningAmount;
        setWallet(Math.floor(amount));
    });
  }

  const onGuide = () => {
    navigate('/Guide')
  }
  const onFastParity = (path) => {
    navigate(`/${path}`)
  }
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

return(
  <div className="realludokingsize">
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
      <div className="card-body">
       <div class="accordion" id="accordionExample">
       <div class="accordion-item">
    <h2 class="accordion-header" id="headingsix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
      Terms & Conditions
      </button>
    </h2>
    <div id="collapsesix" class="accordion-collapse collapse" aria-labelledby="headingsix" data-bs-parent="#accordionExample">
    <div className="accordion-body">
      <p>
        <span style={{ color: 'rgb(33, 37, 41)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '16px' }}>
          These <strong>terms and conditions</strong> of use (“Terms”) along with privacy policy (“Privacy Policy”) forms a legally binding agreement (“Agreement”) between You and us (
          <span style={{ color: 'rgb(209, 72, 65)', backgroundColor: 'rgb(255, 255, 255)' }}>RealLudoKingcom</span>
          <span style={{ color: 'rgb(33, 37, 41)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '16px' }}>.</span>
        </span>
      </p>
      <p style={{ textAlign: 'left' }}>
        <span style={{ color: 'rgb(33, 37, 41)', backgroundColor: 'rgb(255, 255, 255)', fontSize: '16px' }}>
          Hence, We insist that You read these Terms and Privacy Policy and let Us know if You have any questions regarding the same. We will try Our best to answer Your queries.
        </span>
      </p>
      A. USERS’ APPROVAL

1. Users approve of and accept over Agreement by:

(a) reading all terms and condition

(b) reading all rules of this app

2. Users may accept this Agreement only if:

(a) Such User is a natural person, is of the legal age (18 years or older), eligibility and mental capacity to form a binding contract with us.

(b) Such User is a not a resident of Tamil Nadu, Andhra Pradesh, Telangana, Assam, Orissa, Sikkim, Nagaland.

(c) Such User is a juristic person, is lawfully existing, and has all the authorizations, permits, and allowances to enter into this Agreement and form a binding contract.

(d) Such User is not legally barred or restricted from using the App.

3. You understand that We want You to not use the App if You do not understand, approve of or accept all the terms specified in this Agreement. Hence, You are requested to read these Terms and Privacy Policy carefully and understand the Agreement before You accept it and agree to be bound by it.

4. The Agreement shall govern the relationship of each User with us. However, We may also execute separate written agreements with its Users. In case of conflict between terms of such separate written agreement and this Agreement, the terms of the separate written agreement shall prevail.

B. PROVISION OF THE APP

1. Section 12 of the Public Gambling Act, 1867 provides that games of mere skill are exempt from the application of the Act. The Supreme Court of India and various High Courts in India have opined that a game of mere skill is a game “in which, although the element of chance necessarily cannot be entirely eliminated, success depends principally upon the superior knowledge, training, attention, experience and adroitness of the player. A game of skill is one in which the element of skill predominates over the element of chance.” No penalty can be imposed upon a person for playing such games of skill.

2. Users must note that ‘Ludo’ game available for challenge in our platform is ‘Games of Skill’, under Indian law, and that we does not support, endorse or offer to Users ‘games of chance’ for money. While ‘Games of Skill’ do not have a comprehensive definition, they are those games where the impact of a player’s effort and skill on the outcome of a game is higher than the impact of luck and chance.

3. It may be noted that States are permitted, by the Indian Constitution, to enact laws regulating betting and gambling in their respective jurisdictions. In furtherance of these powers, various States have enacted anti- gambling legislations. Such legislations are largely in concert with the Public Gambling Act of 1867 (and include the exception of “games of skill”). Where a State legislation on gambling exists, it prevails over the Public Gambling Act of 1867. In this regard, the Assam Game and Betting Act, 1970 and Orissa (Prevention of) Gambling Act, 1955 and Telangana State Gaming (Amendment) Ordinance and High Court Judgment in Gujarat, 2017 prohibits games with money stakes and also does not create an exception for games of skill. Therefore, currently, residents of Assam, Odisha, Telangana and Gujarat are not permitted to play on our site.

4. The games rules are clearly defined on this platform and Users are encouraged to read, understand and follow these rules to be successful in these games.

5. The games on our platform are ‘Games of Skills’, such that the outcome / success in the games is directly dependent on the User’s effort, performance and skill. By choosing how to play, the actions of Users shall have direct impact on the game.

6. Every game will have some elements of chance, but in the form of challenges / obstacles that a User would be able to overcome using his/her skills and knowledge of the game. Elements of luck are present in every game to add thrill and excitement, but no two attempts at a game are identical so Users must use their skills in order to be successful

7. Since the games available on our platform can be won through Users’ skills and such skills may be enhanced with practice and experience, the performance of a User may improve with time and practice.

8. Certain games may have pre-determined outcomes (Ludo), and these outcomes are achievable by Users using their skills.

C. GAME RULES

1. Player who sets a challenge will share a room id/room code with his/her opponent.

2. On winning both players have to update there results in following manner:

(a) if you have won, select ‘I Won’ option and upload winning screenshot of the game.

(b) if you have lost, select ‘I Lost’ option.

(c) if match is not started and both parties doesn't want to play, select ‘Cancel’ option.

3. User must have to record every game, and if any player is hacking or cheating a game, contact support.

4. If game is not started, if you haven't played a single move yourself, please show the recording of game to support. Game will be cancelled only if you have recording.

5. If you don't have any proof against player cheating and error in game, you will be considered as lost.

6. If you have not moved a single pawn or no pawn is open at home, your game will be cancelled.

7. If your opponent leaves match purposely in starting or initial game, and opponent doesn't have any valid proof for cancellation, you will be awarded win.

D. DEPOSIT / WITHDRAWAL

1. Players can deposit their balance in Buy Chips section.

Important:- If we detect any type of suspecious transaction/activity in your account, in such cases we have rights to Block your account temporarily. Kindly contact Admins in such cases and provided the needed details to Un-block your account.

2. Player can take withdrawal by setting a Sell Request on your app.

3. Deposit and withdrawal requests are completed by support at any time.

4. Any wrong payment detail given by you, will not be considered in refund.

5. Once a withdrawal is done, you don't have any authority to raise any query.

6. If withdrawal request go on pending, user must have to wait for 1-5 days.

E. PENALITY FOR WRONG UPDATES

1. If you put the wrong update on any match, you will be charged penality of:

(a) if your game is below 1000, penalty will be 10%.

(b) if your game is above 1000 and below 5000, penality will be 50 flat.

(c) if your game is above 5000 and below 15000, penality will be 100 flat.

2. If you don't update result after losing, you will be charged penality of 25 flat.

3. Players can have only single account in case multiple accounts found, We have authority to ban those account permanently & add penalty

F. COMMISSION CHARGES

1. Net 3% commission (after referral money deduction) will be charged on challenge amount.
    </div>
    </div>
  </div>
 
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Cancellation & Refund Policy
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <div className="accordion-body">
      <p><strong>Refund Policy</strong></p>
      <p>
        Thanks for being connected with
        <span style={{ color: 'rgb(226,80,65)' }}><strong> Realludoking</strong></span>.
        If you are not entirely satisfied with your subscription, we are here to help.
      </p>
      <p><strong>Refunds Process</strong></p>
      <p>
        Once we receive your Refund request, we will inspect it and notify you on the status of your refund.
      </p>
      <p>
        If your refund request is approved, we will initiate a refund to your credit card (or original method of payment) within 7 working days.
        You will receive the credit within a certain amount of days, depending on your card issuer's policies.
      </p>
      <p>
        In case of unforeseen technical glitch,
        <span style={{ color: 'rgb(226,80,65)' }}> Realludoking</span>
        would refund subscription upon reviewing the complaint. Final decision lies with the company.
      </p>
    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Privacy Policy
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      Introduction

This document explains how Realludoking (https://Realludoking.com) collects, processes, stores and/or shares any personal data and/or information from users (jointly referred to as “Information”). By accessing and/or using the Services you consent the collection, transfer, manipulation, storage, disclosure and other uses of your information as described in this Privacy Policy. If you have any concerns about providing data, or having it used in any manner permitted in this Privacy Policy, you should not use the Services. As set out in the terms and conditions relating the Services (the “Terms”), you must be at least at legal age (minimum age of 18 years) to access and/or use the Services, or if legally possible, to access with your legal guardian consent, due authorization and agreement with these Privacy Policy.

The Information collected:

Realludoking and/or third parties, including but not limited to business partners, advertising networks, analytics or search information providers, may collect and process the following data about you: information that you provide when you fill in forms when accessing and/or using the Services, or when you create an account within the Services; details of your use of the Services and the resources that you access; the correspondence between you and Realludoking and any interactions, or with other users on the Service, the channels and/or any social media related; from third parties who hold data about you and who agree to share this data with us; and information collected via cookies and other similar technologies and/or other mechanisms, as explained further below.

Personal Data: While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

* Email address

* First name and last name

* Phone Number

* Address, State, Province, ZIP/Postal code, City

I. Cookies: Realludoking uses cookies and other similar technologies in the Services. These technologies operate either by placing a small file which stores some information on your computer or mobile device; and/or by accessing information on your device. Realludoking uses cookies and similar technologies to recognize you and your device, for example by identifying your IP address; to allow the Services to interact with a third party social network or platform where you have chosen to allow such interaction; to allow payment processes when you submit payment instructions; to enable Realludoking and third parties to provide you with more customized services; and to collect data such as your device’s model, operating system and screen size, other applications installed on your device, and information about how you use the Services. By accessing and/or using the Services you consent the use of cookies and similar technologies in accordance with this Privacy Policy. You can disable cookies through your web or mobile device browser settings but some features of the Services may not function properly. Alternatively, if you do not wish such data collection as described in this section, you should stop using the Services.

II. Ads: Advertisers on mobile devices sometimes use advertising identifiers to enable and optimize their advertising, to deliver tailor ads related to your interests (Interest-Based Advertising or IBA). These identifiers are non-permanent, non-personal, device identifiers. Realludoking and/or third parties may use your device’s advertising identifier and other information associated with it, to deliver ads that relate to your interests and to improve and measure the effectiveness of ad campaigns.

III. Location Information: You may choose to publish your location in your Realludoking profile. You may also tell your location when you enable your device to send such location information. Realludoking and/or third parties may use and store information about your location to provide special features, to deliver ads that relate your interests and/or to improve and customize the Services.

IV. Links: Realludoking may keep track of how you interact with links across the Services, including email notifications, third-party services, and client applications, by redirecting clicks or through other means.

V. Log Data: Servers automatically record information created by your use of the Services. This data may include information such as your IP address, browser type, operating system, the referring web page, pages visited, location, your mobile carrier, device and application IDs, search terms, and cookie information. Log data is received when you interact with the Services. This data is used to provide the Services and to measure, customize, and improve them.

VI. Payment information: If you make a purchase in the Services, Realludoking may collect the billing and financial information necessary to process the charges; and/or do so on behalf of the relevant payment service providers. Purchases of third party services are subject to the policies applicable to such provider.

VII. Third-party services: Realludoking uses a variety of third-party services to help its provision of the Services, such as hosting and other services. These third-party service providers may collect information sent by your browser as part of a web page request, such as cookies or your IP address, location and devices’ unique identifiers. Also, third-party ad partners may share information to measure ad quality and tailor ads, for example to display ads about things you may have already shown interest in.

VIII. Customer Support Correspondence: When you ask for assistance from Realludoking customer support, the contact information you provide will be collected, as well as information about your game play or activity on the Service, your user ID number, and the correspondence and any information contained within. If available through the Services, you may provide Realludoking with profile information to make public, such as a short biography, location, website, cell phone, a picture, information to customize your account, etc. Such contact information may be used to send you information about the Services or related information. You may use your account settings to unsubscribe from notifications from Realludoking and/or from other users and find users you know. You may also unsubscribe by following the instructions contained within the notification or the instructions on the Service. Also Realludoking may use your contact information to help others find your account, including through third-party services and client applications. Providing any additional information described in this section is entirely optional.

Use of Information

When you create or configure an account in the Services, you provide some personal information, such as your name, username, password, email address and any other information as required time to time. Some of this information, for example, your name and/or username, may be listed publicly on the Services, including on your profile page and in search results. You agree that Realludoking and/or third parties on its behalf and/or its partners may use the Information for the purposes of contacting you as part of customer support; to send you updates or information about the Services; managing your account and relationship with the Service and improving your experience when you use it, improving the Services, research, surveying, and engaging with you, for example by sending you communications for these purposes; marketing and promotion of the Services or products; to personalize and optimize the Services, promotional content and/or advertising; to create reports, analysis or similar services for the purposes of research or business intelligence.

Information sharing and disclosure

Realludoking will only share your data with third parties according to the Privacy Policy, as reasonably necessary in order to provide the Services, for example, by providing Information to suppliers that Realludoking may use to fulfill the Services; where it is necessary to carry out your instructions, for example, to process a payment instruction your Information has to be provided to the payment processors; where your data is on an anonymous and aggregated basis, meaning you could not be personally identified from it; for the delivery of Interest-Based Advertising in the manner set out on this Privacy Policy; when you submit information as part of a competition or otherwise interact with any channel or social media, the information you submitted may be published; as it`s reasonably believed is permitted by law or regulation; in order to comply with any legal obligation, or in order to enforce or apply the Terms, this Privacy Policy and/or any other agreement with you; or to protect the rights and/or property of Realludoking or third-party´s rights and/or property. Realludoking may share or disclose your non-private information, such as public user profile information, public messages, e-mail, etc., or share or disclose your information in an anonymous or aggregated basis in a manner that does not allow your personal identification.

Interaction with social networks and/or platforms

You may allow the Services to interact with any third party social network and/or platforms, such as Facebook, twitter, whatsApp and any other networks/platforms which will provide data about you to Realludoking. Since any other applications or websites different than the Services are owned by a third party, you must ensure that you read their terms of service and the applicable privacy policies. You understand that when you allow the Services to interact with any third party social network and/or platform, Realludoking may share data about you with your contacts and other users of the Services and vice versa. This Data may include your name, profile picture, activity status, and information related to your use of the Services. You can change this by adjusting your settings with that third party provider.

Realludoking has certain links embedded to third party services including but not limited to YouTube. Your interaction with such third party platform/s are governed by their policies, and we urge you to review their policies before you proceed with availing such services via the offerings of Realludoking. The YouTute terms are available at https://www.youtube.com/t/terms and the Google Privacy Policy is available at https://policies.google.com/privacy?hl=en-US. Also, to control your interaction with Google account or their services allows you to control your rights and activities, and may be accessed at https://myaccount.google.com/permissions?pli=1.

Term

Realludoking may retain the Information for as long as is necessary to fulfill the purposes for which it was collected or as needed to provide the Services, even after you have discontinued or deleted any account, or after the end of the provision of the Services, if retention of such Information is reasonably necessary to comply with legal obligations, meet regulatory requirements, resolve disputes between users, prevent fraud, or any other use.

Protection of Information

Realludoking maintains appropriate technical and physical safeguards to protect Information against accidental or unlawful destruction or loss, alteration, unauthorized disclosures or access, and any other unlawful forms of processing of the data in its possession. However, Realludoking does not guarantee that Information will not be accessed, disclosed, altered or destroyed by breach of any of the abovementioned safeguards. Information may be transferred to and/or stored at worldwide destinations. Realludoking takes all steps reasonably necessary to ensure that Information is treated securely and in accordance with this Privacy Policy. In the event that Realludoking is involved in a bankruptcy, merger, acquisition, reorganization or sale of assets, your information may be sold or transferred as part of that transaction. The undertakings in this Privacy Policy shall apply to the Information as transferred to the new entity.

In the Services you may find links to third party websites. You understand that when you click on these links any data which you provide afterwards is subject to that third party's privacy policy and not to Realludoking’s. Consequently, Realludoking takes no responsibility for the content, safety or security of any third party website. The Services are not directed to persons under legal age. Realludoking does not knowingly collect any Information from children under legal age. If you become aware that a child under legal age has provided with personal information, steps will be taken to remove such information and terminate such account. If you become aware that any child has provided personal information without the essential legal guardian consent, please contact: support@Realludoking.com. Irrespective of which country you reside in or supply information from, you authorize Realludoking to store and/or use the Information according to this Privacy Policy in any country where Realludoking may operate.

Not with standing anything to the contrary in this Policy, Realludoking may preserve or disclose your information to the extent reasonably necessary to comply with a law, regulation or legal request; to protect the safety of any person; to address fraud, security or technical issues; or to protect Realludoking's rights or property. However, nothing in this Privacy Policy is intended to limit any legal defenses or objections that you may have to a third party’s, including a government’s request to disclose your information. We wants to make sure that your Information is accurate and up to date. You may ask to modify, correct or remove information with the tools and account settings of the Service, or otherwise by contacting Realludoking at support@Introduction

This document explains how Realludoking (https://Realludoking.com) collects, processes, stores and/or shares any personal data and/or information from users (jointly referred to as “Information”). By accessing and/or using the Services you consent the collection, transfer, manipulation, storage, disclosure and other uses of your information as described in this Privacy Policy. If you have any concerns about providing data, or having it used in any manner permitted in this Privacy Policy, you should not use the Services. As set out in the terms and conditions relating the Services (the “Terms”), you must be at least at legal age (minimum age of 18 years) to access and/or use the Services, or if legally possible, to access with your legal guardian consent, due authorization and agreement with these Privacy Policy.

The Information collected:

Realludoking and/or third parties, including but not limited to business partners, advertising networks, analytics or search information providers, may collect and process the following data about you: information that you provide when you fill in forms when accessing and/or using the Services, or when you create an account within the Services; details of your use of the Services and the resources that you access; the correspondence between you and Realludoking and any interactions, or with other users on the Service, the channels and/or any social media related; from third parties who hold data about you and who agree to share this data with us; and information collected via cookies and other similar technologies and/or other mechanisms, as explained further below.

Personal Data: While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

* Email address

* First name and last name

* Phone Number

* Address, State, Province, ZIP/Postal code, City

I. Cookies: Realludoking uses cookies and other similar technologies in the Services. These technologies operate either by placing a small file which stores some information on your computer or mobile device; and/or by accessing information on your device. Realludoking uses cookies and similar technologies to recognize you and your device, for example by identifying your IP address; to allow the Services to interact with a third party social network or platform where you have chosen to allow such interaction; to allow payment processes when you submit payment instructions; to enable Realludoking and third parties to provide you with more customized services; and to collect data such as your device’s model, operating system and screen size, other applications installed on your device, and information about how you use the Services. By accessing and/or using the Services you consent the use of cookies and similar technologies in accordance with this Privacy Policy. You can disable cookies through your web or mobile device browser settings but some features of the Services may not function properly. Alternatively, if you do not wish such data collection as described in this section, you should stop using the Services.

II. Ads: Advertisers on mobile devices sometimes use advertising identifiers to enable and optimize their advertising, to deliver tailor ads related to your interests (Interest-Based Advertising or IBA). These identifiers are non-permanent, non-personal, device identifiers. Realludoking and/or third parties may use your device’s advertising identifier and other information associated with it, to deliver ads that relate to your interests and to improve and measure the effectiveness of ad campaigns.

III. Location Information: You may choose to publish your location in your Realludoking profile. You may also tell your location when you enable your device to send such location information. Realludoking and/or third parties may use and store information about your location to provide special features, to deliver ads that relate your interests and/or to improve and customize the Services.

IV. Links: Realludoking may keep track of how you interact with links across the Services, including email notifications, third-party services, and client applications, by redirecting clicks or through other means.

V. Log Data: Servers automatically record information created by your use of the Services. This data may include information such as your IP address, browser type, operating system, the referring web page, pages visited, location, your mobile carrier, device and application IDs, search terms, and cookie information. Log data is received when you interact with the Services. This data is used to provide the Services and to measure, customize, and improve them.

VI. Payment information: If you make a purchase in the Services, Realludoking may collect the billing and financial information necessary to process the charges; and/or do so on behalf of the relevant payment service providers. Purchases of third party services are subject to the policies applicable to such provider.

VII. Third-party services: Realludoking uses a variety of third-party services to help its provision of the Services, such as hosting and other services. These third-party service providers may collect information sent by your browser as part of a web page request, such as cookies or your IP address, location and devices’ unique identifiers. Also, third-party ad partners may share information to measure ad quality and tailor ads, for example to display ads about things you may have already shown interest in.

VIII. Customer Support Correspondence: When you ask for assistance from Realludoking customer support, the contact information you provide will be collected, as well as information about your game play or activity on the Service, your user ID number, and the correspondence and any information contained within. If available through the Services, you may provide Realludoking with profile information to make public, such as a short biography, location, website, cell phone, a picture, information to customize your account, etc. Such contact information may be used to send you information about the Services or related information. You may use your account settings to unsubscribe from notifications from Realludoking and/or from other users and find users you know. You may also unsubscribe by following the instructions contained within the notification or the instructions on the Service. Also Realludoking may use your contact information to help others find your account, including through third-party services and client applications. Providing any additional information described in this section is entirely optional.

Use of Information

When you create or configure an account in the Services, you provide some personal information, such as your name, username, password, email address and any other information as required time to time. Some of this information, for example, your name and/or username, may be listed publicly on the Services, including on your profile page and in search results. You agree that Realludoking and/or third parties on its behalf and/or its partners may use the Information for the purposes of contacting you as part of customer support; to send you updates or information about the Services; managing your account and relationship with the Service and improving your experience when you use it, improving the Services, research, surveying, and engaging with you, for example by sending you communications for these purposes; marketing and promotion of the Services or products; to personalize and optimize the Services, promotional content and/or advertising; to create reports, analysis or similar services for the purposes of research or business intelligence.

Information sharing and disclosure

Realludoking will only share your data with third parties according to the Privacy Policy, as reasonably necessary in order to provide the Services, for example, by providing Information to suppliers that Realludoking may use to fulfill the Services; where it is necessary to carry out your instructions, for example, to process a payment instruction your Information has to be provided to the payment processors; where your data is on an anonymous and aggregated basis, meaning you could not be personally identified from it; for the delivery of Interest-Based Advertising in the manner set out on this Privacy Policy; when you submit information as part of a competition or otherwise interact with any channel or social media, the information you submitted may be published; as it`s reasonably believed is permitted by law or regulation; in order to comply with any legal obligation, or in order to enforce or apply the Terms, this Privacy Policy and/or any other agreement with you; or to protect the rights and/or property of Realludoking or third-party´s rights and/or property. Realludoking may share or disclose your non-private information, such as public user profile information, public messages, e-mail, etc., or share or disclose your information in an anonymous or aggregated basis in a manner that does not allow your personal identification.

Interaction with social networks and/or platforms

You may allow the Services to interact with any third party social network and/or platforms, such as Facebook, twitter, whatsApp and any other networks/platforms which will provide data about you to Realludoking. Since any other applications or websites different than the Services are owned by a third party, you must ensure that you read their terms of service and the applicable privacy policies. You understand that when you allow the Services to interact with any third party social network and/or platform, Realludoking may share data about you with your contacts and other users of the Services and vice versa. This Data may include your name, profile picture, activity status, and information related to your use of the Services. You can change this by adjusting your settings with that third party provider.

Realludoking has certain links embedded to third party services including but not limited to YouTube. Your interaction with such third party platform/s are governed by their policies, and we urge you to review their policies before you proceed with availing such services via the offerings of Realludoking. The YouTute terms are available at https://www.youtube.com/t/terms and the Google Privacy Policy is available at https://policies.google.com/privacy?hl=en-US. Also, to control your interaction with Google account or their services allows you to control your rights and activities, and may be accessed at https://myaccount.google.com/permissions?pli=1.

Term

Realludoking may retain the Information for as long as is necessary to fulfill the purposes for which it was collected or as needed to provide the Services, even after you have discontinued or deleted any account, or after the end of the provision of the Services, if retention of such Information is reasonably necessary to comply with legal obligations, meet regulatory requirements, resolve disputes between users, prevent fraud, or any other use.

Protection of Information

Realludoking maintains appropriate technical and physical safeguards to protect Information against accidental or unlawful destruction or loss, alteration, unauthorized disclosures or access, and any other unlawful forms of processing of the data in its possession. However, Realludoking does not guarantee that Information will not be accessed, disclosed, altered or destroyed by breach of any of the abovementioned safeguards. Information may be transferred to and/or stored at worldwide destinations. Realludoking takes all steps reasonably necessary to ensure that Information is treated securely and in accordance with this Privacy Policy. In the event that Realludoking is involved in a bankruptcy, merger, acquisition, reorganization or sale of assets, your information may be sold or transferred as part of that transaction. The undertakings in this Privacy Policy shall apply to the Information as transferred to the new entity.

In the Services you may find links to third party websites. You understand that when you click on these links any data which you provide afterwards is subject to that third party's privacy policy and not to Realludoking’s. Consequently, Realludoking takes no responsibility for the content, safety or security of any third party website. The Services are not directed to persons under legal age. Realludoking does not knowingly collect any Information from children under legal age. If you become aware that a child under legal age has provided with personal information, steps will be taken to remove such information and terminate such account. If you become aware that any child has provided personal information without the essential legal guardian consent, please contact: support@Realludoking.com. Irrespective of which country you reside in or supply information from, you authorize Realludoking to store and/or use the Information according to this Privacy Policy in any country where Realludoking may operate.

Not with standing anything to the contrary in this Policy, Realludoking may preserve or disclose your information to the extent reasonably necessary to comply with a law, regulation or legal request; to protect the safety of any person; to address fraud, security or technical issues; or to protect Realludoking's rights or property. However, nothing in this Privacy Policy is intended to limit any legal defenses or objections that you may have to a third party’s, including a government’s request to disclose your information. We wants to make sure that your Information is accurate and up to date. You may ask to modify, correct or remove information with the tools and account settings of the Service, or otherwise by contacting Realludoking at support@Realludoking.com.

If any court or other competent authority finds any of this Privacy Policy to be invalid or unenforceable, the other terms of this Privacy Policy will not be affected. This Privacy Policy is governed by and interpreted in accordance with the laws of Nagaland State Government as well as Republic of India. Any dispute arising in connection with this Privacy Policy will be subject to the exclusive jurisdiction of the courts located in the city of Jaipur/Rajasthan – India. You consent the jurisdiction and venue in such courts and waive any objection as to inconvenient forum Realludoking may revise or amend this Privacy Policy from time to time..com.

If any court or other competent authority finds any of this Privacy Policy to be invalid or unenforceable, the other terms of this Privacy Policy will not be affected. This Privacy Policy is governed by and interpreted in accordance with the laws of Nagaland State Government as well as Republic of India. Any dispute arising in connection with this Privacy Policy will be subject to the exclusive jurisdiction of the courts located in the city of Jaipur/Rajasthan – India. You consent the jurisdiction and venue in such courts and waive any objection as to inconvenient forum Realludoking may revise or amend this Privacy Policy from time to time.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingfive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
      About Us
      </button>
    </h2>
    <div id="collapsefour" class="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
    <div className="accordion-body">
      <p><strong>Realludoking</strong> ("or We") is a real-money online gaming product owned and operated by Allinone Hax.</p>
      <p>We are an HTML5 game-publishing company and our mission is to make accessing games fast and easy by removing the friction of app-installs.</p>
      <p>
        Realludoking is a skill-based real-money gaming platform accessible only for our users in India. It is accessible on
        <span style={{ color: 'rgb(209,72,65)' }}> https://RealLudoKingcom</span>. On Realludoking, users can compete for real cash in Tournaments and Battles. They can encash their winnings via popular options such as Paytm Wallet, UPI, or Phonepe.
      </p>
      <p><span style={{ fontSize: '18px' }}><strong>Our Games</strong></span></p>
      <p>
        We have a wide variety of high-quality, premium HTML5 games, online games. Our games are especially compressed and optimized to work on low-end devices, uncommon browsers, and patchy internet speeds.
      </p>
      <p>
        We have games across several popular categories: Arcade, Action, Adventure, Sports & Racing, Strategy, Puzzle & Logic. We also have a strong portfolio of multiplayer games such as Ludo, Chess, 8 Ball Pool, Carrom, Ludo Tournament Tic Tac Toe, Archery, Quiz, Chinese Checkers, and more! Some of our popular titles are: Escape Run, Bubble Wipeout, Tower Twist, Cricket Gunda, Ludo With Friends. If you have any suggestions around new games that we should add or if you are a game developer yourself and want to work with us, don't hesitate to contact us on
        <span style={{ color: 'rgb(209,72,65)' }}> support@RealLudoKingcom</span>
      </p>
    </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingfive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefour">
      Contact Us
      </button>
    </h2>
    <div id="collapsefive" class="accordion-collapse collapse" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
    <div className="accordion-body">
      <p>+</p>
      <p>support@RealLudoKingcom</p>
      <p>www.RealLudoKingcom</p>
      <a href="https://RealLudoKingcom/#/support">
        <p>Contact us</p>
      </a>
    </div>
    </div>
  </div>
  
</div>
    </div>
  </div>
)




}
export default Terms ;