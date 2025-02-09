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

function RequestWithDraw() {

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
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
    { id: 1, name: "Customer Smith", amount: "444", date: "30 Apr 2024", status: "pending" },
    { id: 2, name: "Customer Smith", amount: "444", date: "30 Apr 2024", status: "Closed" },
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.total} style={{gridTemplateColumns:"repeat(3,1fr)"}}>
          <div className={style.total_card}>
            <span className={style.icon}><FaDollarSign /></span>
            <div className={style.dash_desc}>
              <h4>Total Balance</h4>
              <span>$0.00</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaDollarSign /></span>
            <div className={style.dash_desc}>
              <h4>Total Requested Amount</h4>
              <span>$50.00</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaDollarSign /></span>
            <div className={style.dash_desc}>
              <h4>Total Withdraw Amount</h4>
              <span>$40.00</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style2.actions_btns}>
          <NavLink>Add Request withdraw</NavLink>
        </div>
          <div className={style2.filter}>
            <div className={style2.input_group}>
              <select style={{width:"30%"}}>
                <option value="pending">Pending</option>
                <option value="accepted">Accept</option>
                <option value="decline">Decline</option>
                <option value="completed">Completed</option>
              </select>

              <button >Refresh</button>
              <button>Search</button>
            </div>
            <Filter />
          </div>
          <CustomTable columns={Columns} data={Data} />
        </div>

      </div>
    </div>
  );
}

export default RequestWithDraw;




