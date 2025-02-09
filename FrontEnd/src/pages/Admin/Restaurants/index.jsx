import React from 'react'
import CustomTable from '../../../components/admin/CustomTable'
import { Space } from 'antd';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import Filter from '../../../components/admin/Filter';
import style from "../../../components/admin/Filter/style.module.css"
import {NavLink} from "react-router-dom"
function Restaurants() {
  const restaurantColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "User", dataIndex: "user", key: "user" },
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

  const restaurantData = [
    { id: 1, name: "Pizza House", user: "Baku", status: "Open" },
    { id: 2, name: "Burger King", user: "Ganja", status: "Closed" },
    { id: 2, name: "Burger King", user: "Ganja", status: "Closed" },
    { id: 2, name: "Burger King", user: "Ganja", status: "Closed" },

  ];
  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.actions_btns}>
          <NavLink>Add Restaurant</NavLink>
          <NavLink>Import Restaurant</NavLink>
        </div>
        <div className={style.filter}>
          <div className={style.input_group}>
            <select>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select>
              <option value="default">Selected Applied</option>
              <option value="50">By Restaurant Owner</option>
              <option value="100">By Admin</option>
            </select>
            <button>Refresh</button>
            <button>Search</button>
          </div>
          <Filter />
        </div>
        <CustomTable columns={restaurantColumns} data={restaurantData} />
      </div>
    </div>
  )
}

export default Restaurants