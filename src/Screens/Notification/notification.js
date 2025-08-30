import React, {useContext, useEffect, useState,useRef} from "react";
import { Table, Modal, message, Row, Space, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined ,SearchOutlined} from "@ant-design/icons";
import { PageTitle } from "../../PageTitle";
import axiosInstance from "../../axiosInstance";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../globalContext";
import Highlighter from "react-highlight-words";


const Notifiction = () => {
  const user = useContext(UserContext);
  

  function addMonths(date1, months) {
    date1.setMonth(date1.getMonth() + months);
  
    return date1;
  }
  const date = new Date(user.registerDate);

  const result2 = addMonths(date, 2);

const diffTime = Math.abs(result2 - new Date());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
   
  return (
 <div>
   <div className=" text-center main-heading">
          
          <h1> Notification</h1>
        </div>
    <div class="section is-medium">
  <div class="container">
    <div class="col-md-12">
      <div class="column">
        <div class="box">
          <header class="header header01">
          <svg className="mainsvgm" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
            <h2 className="messege01">{diffDays} days left in your trial period  </h2>
            <div><Button className="Alert my">Alert</Button></div>
          </header>
      
        </div>
  
      </div>
    </div>

  

  </div>
</div>


    
 </div>
  );
};

export default Notifiction;
