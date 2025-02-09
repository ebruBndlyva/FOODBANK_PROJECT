import React, { useState } from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';
import { IoEyeOutline } from "react-icons/io5";
import { Space } from 'antd';
import { FaCheck, FaMoneyBill, FaPaperPlane, FaPlusSquare, FaRegListAlt, FaStarHalfAlt, FaUniversity, FaUser } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    style={{
      padding: "8px 12px",
      fontSize: "14px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      cursor: "pointer"
    }}
  >
    {value || "Select Date"}
  </button>
));

function Orders() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Order Type", dataIndex: "type", key: "type" },
    {
      title: "Status", dataIndex: "status", key: "status",
      render: () => (
        <Space>
          <select style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ddd" }}>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="canceled">Canceled</option>
            <option value="rejected">Rejected</option>
          </select>
        </Space>
      )
    },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Actions", dataIndex: "actions", key: "actions",
      render: () => (
        <Space>
          <button style={{ backgroundColor: "#3abaf4", borderRadius: "5px", border: "none", padding: "5px" }}>
            <IoEyeOutline />
          </button>
          <button style={{ backgroundColor: "#3BB557", borderRadius: "5px", border: "none", padding: "5px" }}>
            <FaRegListAlt />
          </button>
        </Space>
      )
    },
  ];

  const Data = [
    { id: 1, name: "Customer Smith", phone: "880532132132", table: "table1", date: "30 Apr 2024", status: "Open" },
    { id: 2, name: "Customer Smith", phone: "880532132132", table: "table3", date: "30 Apr 2024", status: "Closed" },
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "100px", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style.total}>
          <div className={style.total_card}>
            <span className={style.icon}><FaPlusSquare /></span>
            <div className={style.dash_desc}>
              <h4>Total Order</h4>
              <span>9</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaPaperPlane /></span>
            <div className={style.dash_desc}>
              <h4>Order Pending</h4>
              <span>9</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaStarHalfAlt /></span>
            <div className={style.dash_desc}>
              <h4>Order Process</h4>
              <span>9</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaCheck /></span>
            <div className={style.dash_desc}>
              <h4>Order Completed</h4>
              <span>9</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop:"20px", backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style2.filter}>
          <div className={style2.input_group}>
            <select style={{width:"20%", padding: "8px 10px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ddd" }}>
              <option value="pending">Pending</option>
              <option value="cancel">Cancel</option>
              <option value="accepted">Accepted</option>
              <option value="reject">Reject</option>
              <option value="Process">Process</option>
              <option value="On the way">On The Way</option>
              <option value="completed">Completed</option>
            </select>

            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              customInput={<CustomInput />}
            />

            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              minDate={startDate}
              customInput={<CustomInput />}
            />

            <button style={{ padding: "8px 10px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ddd" }}>Refresh</button>
            <button style={{ padding: "8px 10px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ddd" }} >Search</button>
          </div>
          <Filter />
        </div>
        <CustomTable columns={Columns} data={Data} />
      </div>
      
    </div>
    </div>
  );
}

export default Orders;
