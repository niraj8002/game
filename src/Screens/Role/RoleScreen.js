import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
import { PageTitle } from "../../PageTitle";

const RoleScreen = () => {
  const user =useContext(UserContext)
  const [name, setName] = useState("");
  
  const [roleData, setRoleData] = useState([]);
  const [readRoleObj, setReadRoleObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getRole();
    return () => (mounted = false);
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
            onClick={() => {
              readRole(row);
            }}
            />
            <EditOutlined
              style={{ marginLeft: 12 }}
              // onClick={() => {
              //   modify(row);
              // }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                removeRole(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getRole = () => {
    axiosInstance.get(`/role`).then((response) => {
      setRoleData(response.data.data);
    });
  };

  const readRole = (obj) => {
    axiosInstance.get(`/role/${obj.id}`).then((response) => {
      setReadRoleObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const onSave = () => {
    const data = {
      name: name,
    };
    axiosInstance.post(`/role`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeRole = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/role/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };

  return (
   <div>
       <div>
      <div className="text-center main-heading">
      {/* <PageTitle title="Role Screen">
        </PageTitle> */}
        <h1>Role Screen</h1>
        </div>
      </div>
     <div className="master-role-screen container">
   
     
      <div>
        <Form name="basic">
        <div className="row mb-3 end">
            <div className="col-md-4 text">
              <label >Name</label>
            <Form.Item colon={false} className="raj0101">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="col-md-4 text">
            <Button className="btnmy" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
        </Form>
      </div>
      <div>
        <Table columns={columns} dataSource={roleData} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readRoleObj.id}</li>
          <li className="list-group-item"> Value : {readRoleObj.name}</li>
          <li className="list-group-item"> UserId : {readRoleObj.userId}</li>
         
        </ul>
      </Modal>
    </div>
   </div>
  );
};

export default RoleScreen;
