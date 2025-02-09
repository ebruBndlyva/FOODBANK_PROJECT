import React from 'react'
import style from "../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function Complaints() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Order Code", dataIndex: "code", key: "code" },

    { title: "Customer Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: (_, record) => (
        <Space>
          <button style={{ backgroundColor: "#3abaf4" }}><IoEyeOutline /></button>
          <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
          <button style={{ backgroundColor: "#fc544b" }}><AiFillDelete /></button>
        </Space>
      )
    },

  ];
  const Data = [

    { id: 1, name: "Pizza House",name:"John", code:"12345", status: "Open", },

  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
      
        <div className={style.filter}>
          <div className={style.input_group}>
            <select style={{width:"30%"}}>
              <option value="status">Select Status</option>
              <option value="refunded">Refunded</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
           
            <button>Refresh</button>
            <button>Search</button>
          </div>
          <Filter />
        </div>
        <CustomTable columns={Columns} data={Data} />
      </div>
    </div>
  )
}

export default Complaints


