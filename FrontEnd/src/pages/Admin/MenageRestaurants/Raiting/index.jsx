import React from 'react'
import style from "../../../../components/admin/Filter/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import { NavLink } from 'react-router';
import Filter from '../../../../components/admin/Filter';
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Space } from 'antd';
function Raiting() {
  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Restaurant Name", dataIndex: "restaurant", key: "restaurant" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Review", dataIndex: "review", key: "review" },

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

    { id: 1, name: "Pizza House", rating: "4", restaurant: "	Mr Beast Burger", review: "Good food and good place. love...", },
    { id: 2, name: "Burger King", rating: "6", restaurant: "	Mr Beast Burger", review: "Good food and good place. love...", },


  ];
  return (
    <div className="content2">
      <div style={{ marginTop: "100px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
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

export default Raiting