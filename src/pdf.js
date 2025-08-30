import React, {  } from "react";
import { Table, Layout, Button } from "antd";
import { border, color } from "@mui/system";

const Pdf = (props) => { 
  const data ={
    data:props.summery
  };
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street"
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street"
    }
  ];
  const printInvoice = () => {
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }
  return (
    <div>
      
      <div id="divcontents">
      <div style={{border:"1px solid black"}} >
      <table>
        <thead>
          <tr>
            <td>NAME</td>
            <td>AGE</td>
            <td>ADDRESS</td>
          </tr>
        </thead>
        <tbody>
          {
          dataSource.map((d) => {
            return(
            <tr >
              
              <td>{d.name}</td>
              <td>{d.name}</td>
              <td> {d.fat}</td>
            </tr>
          )})
          }
        </tbody>
      </table>
        </div>
      </div>
      <Button onClick={printInvoice}>Click for Print</Button>
    </div>
  );

}


export default Pdf;
