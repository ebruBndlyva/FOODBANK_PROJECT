import React from 'react'
import style from "../../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function TimeSlots() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Start Time", dataIndex: "start", key: "start" },
    { title: "End time", dataIndex: "end", key: "end" },
    { title: "Restaurant", dataIndex: "restaurant", key: "restaurant" },
    { title: "Status", dataIndex: "status", key: "status" },

    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: (_, record) => (
        <Space>
          <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
          <button style={{ backgroundColor: "#fc544b" }}><AiFillDelete /></button>
        </Space>
      )
    },

  ];
  const Data = [

    { id: 1, restaurant: "Mr Beast Burger", start: "03:00 PM", end: "04:00 PM", status: "Open", },
    { id: 2, restaurant: "Mr Beast Burger", start: "03:00 PM", end: "04:00 PM", status: "Closed", },


  ];
  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.actions_btns}>
          <NavLink>Add Time Slot</NavLink>
        </div>
        <div className={style.filter}>
          <div className={style.input_group}>
            <select style={{ width: "50%" }}>
              <option value="status">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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

export default TimeSlots