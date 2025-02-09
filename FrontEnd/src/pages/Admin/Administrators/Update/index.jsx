import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';
import { Space } from 'antd';
import { } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';

function Update() {

  const Columns = [
    { title: "System Details", dataIndex: "details", key: "details" },
  ];

  const Data = [
    { details: "Version 2.6" },
    { details: "Laravel Version 10.48.23" },
    { details: "Nodejs version v20.11.0" },
    {details:"License code c3f95dj1-e4f6-84e2-2560-k574z57068z5518"}
  ];

  return (
    <div className="content2">
      <div style={{ marginTop: "80px", borderRadius: "5px", padding: "0 20px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "10px 20px", }}>
        <div style={{backgroundColor:"#47c363",padding:"10px",color:"white",fontSize:"14px",fontFamily:"sans-serif"}}>You have latest version of this app.</div>
          
          <CustomTable columns={Columns} data={Data} />
        </div>

      </div>
    </div>
  );
}

export default Update;












