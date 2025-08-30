import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Select, message, IconButton } from "antd";
import axiosInstance from "../axiosInstance";
import axios from "axios";

require("./otp.css");


function Otpvalidation(props) {
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [MOtp, setMOtp] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    useEffect(() => {
        setVerificationId(props.verificationId)
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const resendOTP = async() => {
        setMinutes(1);
        setSeconds(30);
        const url = `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-CD9F51B96DB84F4&flowType=SMS&mobileNumber=${props.mobile}`;
        const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUNEOUY1MUI5NkRCODRGNCIsImlhdCI6MTc0ODUxMjY2MywiZXhwIjoxOTA2MTkyNjYzfQ.xlWgT3ISRDQLnmoSdFKyjf0jGWHKKz-U1rZ4nOPtK35CBfu1bKF3R3Axx9blTjOj-f5tUFM9_29xHctdRCcX_g";
  
        try {
          const response = await axios.post(url, {}, {
            headers: {
              'authToken': authToken
            }
          });
          console.log(response.data.data);
          if (response.data.responseCode ==200 ) {
            setVerificationId(response.data.data.verificationId)
            message.success("Otp Sent successfully");
       
       
     } else if (response.data.responseCode ==506) {
      message.error("after one minute you can send otp again ...!");
     } else message.error("Something wrong. Please try again...!");
        } catch (error) {
          console.error('Error:', error);
        }
    };
    var existMatch = ''
    const onCheakOtp = async () => {
        if (otp.length === 4) {
     const data ={
        mobileNumber: props.mobile,
        verificationId: verificationId,
        customerId: 'C-CD9F51B96DB84F4',
        code: otp,
     }
     console.log(data)
            const options = {
                method: 'GET',
                url: 'https://cpaas.messagecentral.com/verification/v3/validateOtp',
                params: {
                  countryCode: '91',
                  mobileNumber: props.mobile,
                  verificationId: verificationId,
                  customerId: 'C-CD9F51B96DB84F4',
                  code: otp,
                },
                headers: {
                  authToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUNEOUY1MUI5NkRCODRGNCIsImlhdCI6MTc0ODUxMjY2MywiZXhwIjoxOTA2MTkyNjYzfQ.xlWgT3ISRDQLnmoSdFKyjf0jGWHKKz-U1rZ4nOPtK35CBfu1bKF3R3Axx9blTjOj-f5tUFM9_29xHctdRCcX_g',
                },
              };
        
              try {
                console.log("response");
        
                const response = await axios.request(options);
                console.log(response.data);
                if (response.data.responseCode ==200 ) {
                    setMOtp(true)
                    message.success("Otp successfully");
                    props.setMOtp(true)
                    props.setIsModalOpen(false)
                    props.setOtp("0kk")
               
             } else if (response.data.responseCode ==505) {
              message.error("please enter valid otp ...!");
             } else message.error("Something wrong. Please try again...!");
              } catch (error) {
                console.error('Error fetching data:', error);
              }
         
        }
        else {
            message.error("Enter four Digit Otp");
        }
    };

    return (
        <Modal
            title="OTP Verification"
            open={props.isVisible}
            onCancel={props.onCancel}
            width={"500px"}

        >
            <div>
                <div >
                    <h4>Verify OTP</h4>

                    <Input
                        placeholder="Enter 4 digite otp"
                        maxLength={6}
                        minLength={6}
                        value={otp}
                        onChange={({ target }) => {
                            setOtp(target.value);
                        }}
                    />

                    <div className="countdown-text11">
                        {seconds > 0 || minutes > 0 ? (
                            <p>
                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                        ) : (
                            <p>Didn't recieve code?</p>
                        )}

                        <button
                            disabled={seconds > 0 || minutes > 0}
                            style={{
                                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                            }}
                            onClick={resendOTP}
                        >
                            Resend OTP
                        </button>
                    </div>

                    <button className="submit-btn11" onClick={() => onCheakOtp()}>SUBMIT</button>
                </div>
            </div>
        </Modal>
    );
}

export default Otpvalidation;


