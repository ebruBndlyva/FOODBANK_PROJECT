import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../components/admin/Sidebar'
import AdminNavbar from '../../components/admin/adminNavbar'
import style from "./style.module.css"
function AdminLayout() {
  return (
  <div className={style.admin_content}>
        <SideBar/>
       <div className={style.container}>
       <AdminNavbar/>
       <Outlet/>
       </div>
    </div>
  )
}

export default AdminLayout