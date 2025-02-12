import React from 'react'
import { Table } from 'antd';
import style from "./style.module.css"
function CustomTable({ columns, data }) {
  const dataWithKey = data.map(item => ({ ...item, key: item._id }));
  return (
    <div className={style.custom_table}> <Table columns={columns} dataSource={dataWithKey}  /></div>
 
  )
}

export default CustomTable