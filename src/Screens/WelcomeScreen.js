import React, { useEffect } from 'react'
import {Button} from 'antd';
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
 let navigate = useNavigate(); 
    const Signin=(e)=>{
          navigate('/', { replace: true });
    }
    const Signup=(e)=>{
      navigate('SignupScreen', { replace: true });
    }
    useEffect(()=>{
      webopen()
    })
    const webopen = () =>{
      window.location.href="/welcome.html?#"
    }
  return (
    <div >
     <button onClick={() => webopen()}></button>
    </div>
  )
}

export default WelcomeScreen