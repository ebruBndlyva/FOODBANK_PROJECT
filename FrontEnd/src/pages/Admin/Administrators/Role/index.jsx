import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';

import { Space } from 'antd';
import { FaPlus } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router';
import { IoEyeOutline } from 'react-icons/io5';

function Role() {

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: () => (
        <Space>
          <button style={{backgroundColor:"#47c363"}}><FaPlus/></button>
          <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
          
        </Space>
      )
    },
  ];

  const Data = [
    { id: 1, name: "Customer Smith" },
    { id: 2, name: "Customer Smith"},
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "80px", borderRadius: "5px", padding: "0 20px" }}>
        <div style={{  backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style2.actions_btns}>
          <NavLink>Add Role</NavLink>
        </div>
          <CustomTable columns={Columns} data={Data} />
        </div>

      </div>
    </div>
  );
}

export default Role;











