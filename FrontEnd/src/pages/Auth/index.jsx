import React from 'react'
import { Outlet } from 'react-router'
import style from "./style.module.css"
import { NavLink } from "react-router-dom"
function Auth() {
  return (
    <div className={style.auth}>
      <div className="content">
        <div className={style.account}>
          <div className={style.form_link}>
            <NavLink to={"/auth/login"} style={({ isActive }) => isActive ? { color: "#EE1D48", borderBottom: "1px solid #EE1D48" } : { color: "#1f1f39" }}>Login</NavLink>
            <NavLink to={"/auth/register"} style={({ isActive }) => isActive ? { color: "#EE1D48", borderBottom: "1px solid #EE1D48" } : { color: "#1f1f39" }}>Register</NavLink>
          </div>
          <Outlet />
        </div>
      </div>

      <div className={style.auth_img}></div>
    </div>
  )
}

export default Auth