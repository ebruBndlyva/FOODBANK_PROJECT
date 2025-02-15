import React from 'react'
import style from "../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function Language() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Language Name", dataIndex: "name", key: "name" },
    { title: "Flag", dataIndex: "flag", key: "flag" },

    { title: "Language Code", dataIndex: "code", key: "code" },

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

    { id: 1, name: "John", code: "12345", status: "Open", },

  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.actions_btns} style={{justifyContent:"flex-start",gap:"10px"}}>
          <NavLink>Add Language</NavLink>
          <NavLink style={{backgroundColor:"#EE1D48"}}>Translate</NavLink>
        </div>
        <div className={style.filter}>
          <div className={style.input_group}>
            <select style={{width:"30%"}}>
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

export default Language






