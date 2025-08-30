import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
  IconButton,
} from "antd";
import axiosInstance from "../axiosInstance";
import axios from "axios";

require("./otp.css");

function ForgotPasswordModel(props) {
  const [otp, setOtp] = useState("");
  const [password, setpassword] = useState("");
  const [mobile, setEmail] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [MOtp, setMOtp] = useState(false);
  const [Otp, setotp] = useState(1);
  const [Subb, setSubb] = useState(1);
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
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

  const onOtp = async() => {
    if(mobile !==undefined && mobile!=='' && mobile.length ===10  ){
      
      const url = `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-CD9F51B96DB84F4&flowType=SMS&mobileNumber=${mobile}`;
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
         setotp("okk")
       
     
   } else if (response.data.responseCode ==506) {
    message.error("after one minute you can send otp again ...!");
   } else message.error("Something wrong. Please try again...!");
      } catch (error) {
        console.error('Error:', error);
      }
     
   
  }
else {
  message.error("please enter valid mobile number...!")
}
  };

  const resendOTP = async() => {
    setMinutes(1);
    setSeconds(30);
    if(mobile !==undefined && mobile!=='' && mobile.length ===10  ){
      
      const url = `https://cpaas.messagecentral.com/verification/v3/send?countryCode=91&customerId=C-CD9F51B96DB84F4&flowType=SMS&mobileNumber=${mobile}`;
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
         setotp("okk")
       
     
   } else if (response.data.responseCode ==506) {
    message.error("after one minute you can send otp again ...!");
   } else message.error("Something wrong. Please try again...!");
      } catch (error) {
        console.error('Error:', error);
      }
     
   
  }
else {
  message.error("please enter valid mobile number...!")
}
  };
  var existMatch = "";
  const onCheakOtp = async () => {
    if (otp.length === 4) {
 const data ={
    mobileNumber: mobile,
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
                // message.success("Otp successfully");
                setSubb("okk");
               
           
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

//   if (otp === existMatch.otp) {
//     setMOtp(true);
//     message.success("Otp verify successfully");
//     setSubb("okk");
//     // props.setMOtp(true)
//     // props.setIsModalOpen(false)
//     // props.setOtp("0kk")
//   } else {
//     setMOtp(false);
//     message.error("Plese enter vailid otp");
//   }
// } else {
//   message.error("Enter six digit otp");
// }













  const onUpdatePassword = async () => {
    const data = {
      password: password,
    };

    if (!!password) {
      await axiosInstance.get("/member").then((response) => {
        existMatch = response.data.data.find((x) => x.mobile === mobile);
      });
      if (mobile === existMatch.mobile) {
        await axiosInstance
          .put(`/member/${existMatch._id}`, data)
          .then((res) => {
            if (res.data && res.data.responseCode === -1) {
              message.error("Record Already Exists");
            } else if (res.data && res.data.responseCode === 1) {
              message.success("Record updeted successfully");
              props.setIsModalOpen(false);
            } else message.error("Something wrong. Please try again...!");
          });

        // props.setOtp("0kk")
      } else {
        setMOtp(false);
        message.error("Plese Enter Vailid Otp");
      }
    } else {
      message.error("Enter four Digit Otp");
    }
  };
  return (
      
      <div className="realludokingsize"> <Modal
      title="Forgot password"
      open={props.isVisible}
      onCancel={props.onCancel}
      width={"500px"}
    >
      <div>
        <div>
          {Subb === 1 && (
            <div>
              {Subb === 1 && <h4>Verify OTP</h4>}
              {Subb === "okk" && <h4>Verify OTP</h4>}

              {Subb === 1 && (
                <div style={{ marginBottom: "20px" }}>
                  <Form>
                    <Form.Item
                      colon={false}
                      label="Mobile No."
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          type: "mobile",
                          message: "Please input valid mobile!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Mobile"
                        onChange={(e) => setEmail(e.target.value)}
                        value={mobile}
                      />
                    </Form.Item>
                  </Form>
                </div>
              )}
              <div style={{ textAlign:"right", marginBottom: "10px" }}>
                {!!mobile && mobile && Otp === 1 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => onOtp()}
                    className="but033"
                  >
                    genrate Otp
                  </Button>
                )}
              </div>
              {Otp === "okk" && Subb === 1 && (
                <Input
                  placeholder="Enter 4 digit otp"
                  maxLength={4}
                  minLength={4}
                  value={otp}
                  onChange={({ target }) => {
                    setOtp(target.value);
                  }}
                />
              )}

              {Otp === "okk" && Subb === 1 && (
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
              )}

              {Subb === 1 && (
                <button className="submit-btn11" onClick={() => onCheakOtp()}>
                  SUBMIT
                </button>
              )}
            </div>
          )}
          {Subb === "okk" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <Input
                  placeholder="Enter Your Password"
                  type="password"
                  value={password}
                  onChange={({ target }) => {
                    setpassword(target.value);
                  }}
                />
              </div>
              <button
                className="submit-btn11"
                onClick={() => onUpdatePassword()}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal></div>
   
  );
}

export default ForgotPasswordModel;
