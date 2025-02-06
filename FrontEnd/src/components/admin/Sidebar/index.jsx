import React, { useState } from 'react';
import style from './style.module.css';
import { NavLink } from 'react-router-dom';
import { MdComputer, MdOutlineTableRestaurant, MdRestaurant } from 'react-icons/md';
import { FaCashRegister, FaChartBar, FaFlagCheckered, FaThLarge, FaCoins, FaWallet, FaUniversity, FaAddressCard, FaMoneyBill, FaChartPie, FaRegBell, FaCreditCard, FaGripHorizontal, FaBraille, FaGlobe, FaTh, FaCogs, FaCalendarAlt, FaTable, FaStar, FaCalendarCheck, FaUsers, FaUsersCog, FaUser, FaUserTie, FaTruckLoading, FaSync, FaCrosshairs, FaAngleRight, FaFileInvoice, FaFileInvoiceDollar, FaChartLine, FaMoneyCheck, FaMoneyCheckAlt, FaAddressBook, FaFilm, FaStickyNote } from 'react-icons/fa';
import { RiCoupon4Fill } from 'react-icons/ri';
import { BsFillCartCheckFill } from 'react-icons/bs';

function SideBar() {
  const [openDropdown, setOpenDropdown] = useState({});
  
  function toggleDropdown(menu) {
    setOpenDropdown((prev) => {
    
      const newDropdown = { ...prev, [menu]: !prev[menu] };
      for (const key in newDropdown) {
        if (key !== menu) {
          newDropdown[key] = false;
        }
      }

      return newDropdown;
    });
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_brand}>
        <NavLink to={"/"}> <img src="https://demo.food-bank.xyz/images/seeder/settings/logo.png" alt="brandImg" /></NavLink>
      </div>
      <ul className={style.sidebar_menu}>
        <li><NavLink><span><MdComputer /></span><span>Dashboard</span></NavLink></li>
        <li><NavLink><span><MdOutlineTableRestaurant /></span><span>Restaurants</span></NavLink></li>
        <li>
          <NavLink onClick={() => toggleDropdown("manageRestaurants")}>
             <span><MdRestaurant /></span><span>Manage Restaurants</span>
              <span className={openDropdown["manageRestaurants"] ? style.rotate : ""} ><FaAngleRight /></span></NavLink>
          <ul className={openDropdown["manageRestaurants"] ? style.show : style.hide}>
            <li><NavLink><span><FaThLarge /></span><span>Categories</span></NavLink></li>
            <li><NavLink><span><FaTh /></span><span>Menu Items</span></NavLink></li>
            <li><NavLink><span><FaGripHorizontal /></span><span>Cuisines</span></NavLink></li>
            <li><NavLink><span><FaCalendarAlt /></span><span>Time Slots</span></NavLink></li>
            <li><NavLink><span><FaTable /></span><span>Tables</span></NavLink></li>
            <li><NavLink><span><FaStar /></span><span>Rating</span></NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink  onClick={() => toggleDropdown("sales")}>
             <span><FaChartBar /></span><span>Sales</span>
              <span className={openDropdown["sales"] ? style.rotate : ""}><FaAngleRight /></span></NavLink>
          <ul className={openDropdown["sales"] ? style.show : style.hide}>
            <li><NavLink><span><FaCalendarCheck /></span><span>Reservations</span></NavLink></li>
            <li><NavLink><span><BsFillCartCheckFill /></span><span>Orders</span></NavLink></li>
          </ul>
        </li>
        <li><NavLink><span><FaFlagCheckered /></span><span>Complaints</span></NavLink></li>
        <li><NavLink><span><RiCoupon4Fill /></span><span>Coupons</span></NavLink></li>
        <li>
          <NavLink onClick={() => toggleDropdown("finanace")}>
            <span><FaThLarge /></span><span>Finance</span>
             <span  className={openDropdown["finanace"] ? style.rotate : ""}><FaAngleRight /></span></NavLink>
          <ul  className={openDropdown["finanace"] ? style.show : style.hide}>
            <li><NavLink><span><FaWallet /></span><span>Transaction</span></NavLink></li>
            <li><NavLink><span><FaCreditCard /></span><span>Collections</span></NavLink></li>
            <li><NavLink><span><FaMoneyBill /></span><span>Request Withdraw</span></NavLink></li>
            <li><NavLink><span><FaCashRegister /></span><span>Withdraw</span></NavLink></li>
            <li><NavLink><span><FaUniversity /></span><span>Bank Details</span></NavLink></li>
            <li><NavLink><span><FaCoins /></span><span>Expenses</span></NavLink></li>
          </ul>
        </li>
        {/* Administrators */}
        <li>
          <NavLink onClick={() => toggleDropdown("administrators")}>
            <span><FaAddressCard /></span><span>Administrators</span> <span><FaAngleRight className={openDropdown["administrators"] ? style.rotate : ""}  /></span></NavLink>
          <ul  className={openDropdown["administrators"] ? style.show : style.hide}>
            <li><NavLink><span><FaUsers /></span><span>Users</span></NavLink></li>
            <li><NavLink><span><FaUsersCog /></span><span>Role</span></NavLink></li>
            <li><NavLink><span><FaUser /></span><span>Customers</span></NavLink></li>
            <li><NavLink><span><FaUserTie /></span><span>Restaurant Owners</span></NavLink></li>
            <li><NavLink><span><FaTruckLoading /></span><span>Delivery Boys</span></NavLink></li>
            <li><NavLink><span><FaSync /></span><span>Update</span></NavLink></li>
            <li><NavLink><span><FaCrosshairs /></span> <span>Addons</span></NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink  onClick={() => toggleDropdown("report")}>
            <span><FaChartPie /></span><span>Report</span> <span><FaAngleRight className={openDropdown["report"] ? style.rotate : ""} /></span></NavLink>
          <ul className={openDropdown["report"] ? style.show : style.hide}>
            <li><NavLink><span><FaFileInvoice /></span><span>Restauran Owner Sales</span></NavLink></li>
            <li><NavLink><span><FaFileInvoiceDollar /></span><span>Admin Commision</span></NavLink></li>
            <li><NavLink><span><FaWallet /></span><span>Credit Balance</span></NavLink></li>
            <li><NavLink><span><FaChartBar /></span><span>Delivery Order Balance</span></NavLink></li>
            <li><NavLink><span><FaChartLine /></span><span>Customer Report</span></NavLink></li>
            <li><NavLink><span><FaMoneyCheck /></span><span>Withdraw Report</span></NavLink></li>
            <li><NavLink><span><FaMoneyCheckAlt /></span> <span>Collection Report</span></NavLink></li>
            <li><NavLink><span><FaAddressBook /></span><span>Reservatiion Report</span></NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink  onClick={() => toggleDropdown("frontend")}>
            <span><FaBraille /></span><span>Frontend CMS</span> 
            <span className={openDropdown["frontend"] ? style.rotate : ""} ><FaAngleRight /></span></NavLink>
          <ul  className={openDropdown["frontend"] ? style.show : style.hide}>
            <li><NavLink><span><FaFilm /></span> <span>App Banners</span></NavLink></li>
            <li><NavLink><span><FaStickyNote /></span><span>Page</span></NavLink></li>
          </ul>
        </li>
        <li><NavLink><span><FaRegBell /></span><span>Push Notification</span></NavLink></li>
        <li><NavLink><span><FaGlobe /></span><span>Language</span></NavLink></li>
        <li><NavLink><span><FaCogs /></span><span>Settings</span></NavLink></li>
      </ul>
    </div>
  );
}

export default SideBar;
