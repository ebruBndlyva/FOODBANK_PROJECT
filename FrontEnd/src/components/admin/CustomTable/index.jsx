import React from 'react'
import { Table } from 'antd';
import style from "./style.module.css"
function CustomTable({ columns, data }) {
  return (
    <div className={style.custom_table}> <Table columns={columns} dataSource={data} /></div>
 
  )
}

export default CustomTable