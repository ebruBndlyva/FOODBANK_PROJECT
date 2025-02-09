import React, { useState } from 'react'
import style from "./style.module.css"
import { NavLink, useLocation } from "react-router-dom"
import { FaBars, FaGlobe, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
function AdminNavbar() {
  let [dropdown, setDropdown] = useState(false)
  const location = useLocation();


  const getPageName = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 1) {
      return pathParts[pathParts.length - 1].replace(/-/g, " ");
    }
    return " ";
  };
  return (
    <div className={style.adminNavbar}>
      <div className="content2">
        <div className={style.navbar_wrapper}>
          <div className={style.navbar_bars}><FaBars /></div>
          <div className={style.navbar_right}>
            <ul>
              <li>
                <NavLink>
                  <span><FaGlobe /></span>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <img src="https://demo.food-bank.xyz/themes/images/user-avatar.png" alt="user" />
                  <span>Hi, John Doe</span>
                  <span onClick={() => setDropdown(!dropdown)}><MdArrowDropDown /></span>
                </NavLink>
                <div className={style.dropdown_menu} style={dropdown ? { display: "block" } : { display: "none" }}>
                  <NavLink>
                    <span><FaRegUser /></span>
                    Profile
                  </NavLink>
                  <NavLink>
                    <span><FaSignOutAlt /></span>
                    Logout
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
          <div className={style.navbar_nav}>
            <h1>{getPageName() == " " ? "Dashboard" : getPageName()}</h1>
            <div className={style.nav_links}>
              <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
              <span> / {getPageName()}</span>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminNavbar