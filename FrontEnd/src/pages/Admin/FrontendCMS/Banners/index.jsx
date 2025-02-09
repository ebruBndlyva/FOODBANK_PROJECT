import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';
import { IoEyeOutline } from "react-icons/io5";
import { Space } from 'antd';
import {FaTh, } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router';

function AppBanners() {

  const Columns = [
    { title: <FaTh/>, dataIndex: "icon", key: "icon",
      render:()=>(
        <Space>
          <FaTh/>
        </Space>
      )
     },
    { title: "Image", dataIndex: "image", key: "image",
      render:(_,reduce)=>(
        <Space>
          <img src={reduce.image} alt="banner" width={"80px"} height={"40px"} />
        </Space>
      )
     },
    { title: "Restaurant", dataIndex: "restaurant", key: "restaurant" },
    {
      title: "Status", dataIndex: "status", key: "status",
      render: () => (
        <Space>
          <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
          <button style={{ backgroundColor: "#fc544b" }}><AiFillDelete /></button>
        </Space>
      )
    },
  ];

  const Data = [
    {  image: "https://demo.food-bank.xyz/storage/154/banner1.jpg", restaurant: "Sultan’s Dine", status: "active"},
    {  image: "https://demo.food-bank.xyz/storage/154/banner1.jpg", restaurant: "Sultan", status: "active" },
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "80px", borderRadius: "5px", padding: "0 20px" }}>

        <div style={{ marginTop: "20px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
          <div className={style2.actions_btns}>
            <NavLink>Add Bank</NavLink>
          </div>
        
          <CustomTable columns={Columns} data={Data} />
        </div>

      </div>
    </div>
  );
}

export default AppBanners;














