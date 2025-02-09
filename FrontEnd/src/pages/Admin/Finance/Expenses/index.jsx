import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';

import { Space } from 'antd';
import { FaCheck, FaDollarSign, FaPaperPlane, FaPlusSquare, FaStarHalfAlt, } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router';

function Expenses() {

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: () => (
        <Space>
          <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
          <button style={{ backgroundColor: "#fc544b" }}><AiFillDelete /></button>
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
        <div className={style2.actions_btns}>
          <NavLink>Add Expenses</NavLink>
        </div>
          <div className={style2.filter}>
            <Filter />
          </div>
          <CustomTable columns={Columns} data={Data} />
        </div>

      </div>
    </div>
  );
}

export default Expenses;







