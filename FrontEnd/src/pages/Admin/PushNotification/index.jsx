import React from 'react'
import style from "../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function PushNotification
() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: (_, record) => (
        <Space>
          <button style={{ backgroundColor: "#fc544b" }}><AiFillDelete /></button>
        </Space>
      )
    },

  ];
  const Data = [

    { id: 1, title: "Pizza House",description:"John", type:"12345", status: "Open", },

  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
       <div className={style.actions_btns}>
                <NavLink>Add Push Notification</NavLink>
              </div>
        <div className={style.filter}>
         
          <Filter />
        </div>
        <CustomTable columns={Columns} data={Data} />
      </div>
    </div>
  )
}

export default PushNotification








