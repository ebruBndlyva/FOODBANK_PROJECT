import React from 'react'
import style from "../../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { Space } from 'antd';
function Rezervations() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Table", dataIndex: "table", key: "table" },
    { title: "Reservation Date", dataIndex: "date", key: "date" },
    {title:"Status", dataIndex: "status", key: "status"
      ,render:(_,record)=>(
        <Space>
          <select style={{padding:"5px"}}>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="canceled">Canceled</option>
            <option value="rejected">Rejected</option>
          </select>
        </Space>
      )
    },

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

    { id: 1,name:	"Customer Smith", phone: "880532132132", table: "table1", date: "	30 Apr 2024", status: "Open", },
    { id: 2,name:	"Customer Smith", phone: "880532132132", table: "table3", date: "	30 Apr 2024", status: "Closed", },


  ];
  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.actions_btns}>
          <NavLink>Add Time Reservations</NavLink>
        </div>
        <div className={style.filter}>
          <Filter />
        </div>
        <CustomTable columns={Columns} data={Data} />
      </div>
    </div>
  )
}

export default Rezervations