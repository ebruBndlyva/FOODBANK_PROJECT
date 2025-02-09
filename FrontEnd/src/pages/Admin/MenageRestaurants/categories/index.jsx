import React from 'react'
import style from "../../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function Categories() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Image", dataIndex: "image", key: "image",
      render: (_, record) => (
        <Space>
          <img src={record.image} alt="category" width="50" height="50" style={{borderRadius:"50%"}} />
        </Space>
      )
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Created By", dataIndex: "created", key: "created" },
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

    { id: 1, name: "Pizza House", user: "Baku",created:"John Doe", status: "Open", image: "https://demo.food-bank.xyz/storage/73/category.png" },
    { id: 2, name: "Burger King", user: "Ganja",created:"John Doe", status: "Closed", image: "https://demo.food-bank.xyz/storage/73/category.png" },
    { id: 1, name: "Pizza House", user: "Baku",created:"John Doe", status: "Open", image: "https://demo.food-bank.xyz/storage/73/category.png" },
    { id: 2, name: "Burger King", user: "Ganja",created:"John Doe",status: "Closed", image: "https://demo.food-bank.xyz/storage/73/category.png" },
    { id: 1, name: "Pizza House", user: "Baku",created:"John Doe", status: "Open", image: "https://demo.food-bank.xyz/storage/73/category.png" },
    { id: 2, name: "Burger King", user: "Ganja",created:"John Doe", status: "Closed", image: "https://demo.food-bank.xyz/storage/73/category.png" },

  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.actions_btns}>
          <NavLink>Add category</NavLink>
        </div>
        <div className={style.filter}>
          <div className={style.input_group}>
            <select>
              <option value="status">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select>
              <option value="request">Selected Request</option>
              <option value="50">Non Requested</option>
              <option value="100">Requested</option>
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

export default Categories