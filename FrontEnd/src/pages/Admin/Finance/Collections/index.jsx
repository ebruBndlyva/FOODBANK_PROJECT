import React from 'react'
import style from "../../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function Collections() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    

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

    { id: 1, name: "Pizza House", date: "4", amount: "100" },
    { id: 2, name: "Burger King", date: "6", amount: "200" },


  ];
  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.actions_btns}>
          <NavLink>Add collection</NavLink>
        </div>
        <div className={style.filter}>
          <Filter />
        </div>
        <CustomTable columns={Columns} data={Data} />
      </div>
    </div>
  )
}

export default Collections