import { Col, Form, Row, Button, Input, message, Table, Modal,Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined, AlignCenterOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
import { PageTitle } from "../../PageTitle";
import moment from "moment";

const { Option } = Select;
const WithdrawAdmin = () => {
    let defaultDate = new Date();
  const user=useContext(UserContext)
  const [PaymentData, setPaymentData] = useState([]);
  const [readSnfObj, setReadSnfObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionDate, setTransactionDate] = useState(defaultDate);


  useEffect(() => {
    let mounted = true;
    if (mounted) pageLoad();
    return () => (mounted = false);
  }, []);
  
  const pageLoad = () => {
    getPayment();
    onSetDate();
    
  }


  const onSetDate = () => {
    setTransactionDate(new Date());
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
        title: "Name",
        render: (row) => {
            return row.member ? (
              <div>
    
              { row&& <b>{row.member.name}</b>}<br/>
            
                </div>
            ) : (
              <div> </div>
            );
          },
      },
      {
        title: "UPI ID",
        dataIndex: "upi",
      key: "upi",
      },
     
      {
        title: "Transaction Date",
        dataIndex: "transactionDate",
      key: "transactionDate",
        // render: (row) => {
        //     return(
        //       <>
        //       {row && <div>{moment(row.transactionDate).format("DD-MM-yyyy")}</div>}
        //       </>
        //     );
        //   },
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
    <>
    <Button style={{ color: "green", marginLeft: 12 }}
    onClick={() => {
      confirmPayment(row);}} >
        Aprove
    </Button>
    <Button 
    style={{ color: "red", marginLeft: 12 }}
    onClick={() => {
      removePayment(row);}}>
        Reject
    </Button>
    
            {/* <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                removePayment(row);
              }}
            /> */}
            </>
        );
      },
    },
  ];
 

  const getPayment = () => {
    axiosInstance.get(`/withdraw`).then((response) => {
      console.log("payment",response.data.data)
      setPaymentData(response.data.data);
    });
  };

 
  const removePayment = (obj) => {
    var addAmount = obj.amount ;
    var walletAmount ;
    axiosInstance.get(`withdraw/${obj.member._id}`).then((response) => {
        walletAmount = response.data.data.amount
      });
    Modal.confirm({
      title: "Do you want to reject this payment?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
      if(obj.status==="requested") { axiosInstance.put(`/withdraw/${obj._id}` ,{status:"failed"}).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            const data = {
              amount : walletAmount+addAmount
           }
          axiosInstance.put(`wallet/${obj.member._id}` , data).then((response) => {
              console.log(response.data.data)
            });
            message.success("Record reject successfully");
            getPayment();
          } else message.error("Something wrong. Please try again...!");
        });}
      },
      onCancel() {},
    });
  };
  const confirmPayment = (obj) => {
    console.log(obj.status)
   
    Modal.confirm({
      title: "Do you want to confirm this payment?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        
       if (obj.status==="requested"){ axiosInstance.put(`/withdraw/${obj._id}` ,{status:"success"}).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            
            message.success("Record reject successfully");
            getPayment();
          } else message.error("Something wrong. Please try again...!");
        });}
      },
      onCancel() {},
    });
  };
  
  return (
   <div>
       <div>
      <div className="text-center main-heading">
      
        <h1>Payment Screen</h1>
        </div>
      </div>
     <div className="master-snf-screen container">
      <div>
        <Table columns={columns} dataSource={PaymentData} />
      
      </div>
      
    </div>
   </div>
  );
};

export default WithdrawAdmin;
