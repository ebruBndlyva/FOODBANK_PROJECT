import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';
import { IoEyeOutline } from "react-icons/io5";
import { Space } from 'antd';
import { FaCheck, FaDollarSign, FaPaperPlane, FaPlusSquare, FaStarHalfAlt, } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router';

function BankDetails() {

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Bank Name", dataIndex: "name", key: "name" },
    { title: "Account Number", dataIndex: "number", key: "number" },
    { title: "Mobile Agent Name", dataIndex: "agent", key: "agent" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: () => (
        <Space>
           <button style={{ backgroundColor: "#ee1d48" }}><FiEdit /></button>
           <button style={{ backgroundColor: "#3abaf4" }}><IoEyeOutline /></button>
          <button style={{ backgroundColor: "#fc544b" }}><AiFillDelete /></button>
        </Space>
      )
    },
  ];

  const Data = [
    { id: 1, name: "Customer Smith", amount: "444", date: "30 Apr 2024", type: "pending" },
    { id: 2, name: "Customer Smith", amount: "444", date: "30 Apr 2024", type: "Closed" },
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", borderRadius: "5px", padding: "0 20px" }}>
       
        <div style={{ marginTop: "20px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style2.actions_btns}>
          <NavLink>Add Bank</NavLink>
        </div>
          <div className={style2.filter}>
              <div className={style2.input_group}>
                       <select style={{width:"50%"}}>
                         <option value="status">All</option>
                         <option value="active">The Salad God</option>
                         <option value="inactive">Starbucks</option>
                       </select>
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

export default BankDetails;











