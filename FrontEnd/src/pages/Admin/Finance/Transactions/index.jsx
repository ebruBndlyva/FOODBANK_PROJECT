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

function Transaction() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);

  const Columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "From", dataIndex: "from", key: "from" },
    { title: "To", dataIndex: "to", key: "to" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
    {title: "Amount", dataIndex: "amount", key: "amount"},
  ];

  const Data = [
    { id: 1, from: "Customer Smith", to: "John Doe", type: "payment", date: "30 Apr 2024", amount: "$22.00" },
    { id: 2, from: "Customer Smith", to: "John Doe", type: "payment", date: "30 Apr 2024", amount: "$22.00" },
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "80px", borderRadius: "5px", padding: "0 20px" }}>
    
        <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
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

export default Transaction;
