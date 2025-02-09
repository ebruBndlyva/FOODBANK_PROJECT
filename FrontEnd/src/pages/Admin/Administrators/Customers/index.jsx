import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';

import { Space } from 'antd';
import {  } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router';
import { IoEyeOutline } from 'react-icons/io5';

function Customers() {

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Image", dataIndex: "image", key: "image",
      render: (_,reduce) => (
        <Space>
         <img src={reduce.image} alt="user" width={"30px"} height={"30px"} />
          
        </Space>)
     },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: () => (
        <Space>
           <button style={{ backgroundColor: "#17ACEF" }}><IoEyeOutline /></button>
          <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
          
        </Space>
      )
    },
  ];

  const Data = [
    { id: 1, title: "Customer Smith", amount: "444", date: "30 Apr 2024" },
    { id: 2, title: "Customer Smith", amount: "444", date: "30 Apr 2024"},
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "80px", borderRadius: "5px", padding: "0 20px" }}>
        <div style={{  backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
          <div className={style2.filter}>
            <Filter />
          </div>
          <CustomTable columns={Columns} data={Data} />
        </div>

      </div>
    </div>
  );
}

export default Customers;











