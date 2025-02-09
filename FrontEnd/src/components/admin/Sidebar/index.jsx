import React, { useState } from 'react';
import style from './style.module.css';
import { NavLink } from 'react-router-dom';
import {
  MdComputer, MdOutlineTableRestaurant, MdRestaurant
} from 'react-icons/md';
import {
  FaCashRegister, FaChartBar, FaFlagCheckered, FaThLarge, FaCoins,
  FaWallet, FaUniversity, FaAddressCard, FaMoneyBill, FaChartPie,
  FaRegBell, FaCreditCard, FaGripHorizontal, FaBraille, FaGlobe, FaTh,
  FaCogs, FaCalendarAlt, FaTable, FaStar, FaCalendarCheck, FaUsers,
  FaUsersCog, FaUser, FaUserTie, FaTruckLoading, FaSync, FaCrosshairs,
  FaAngleRight, FaFileInvoice, FaFileInvoiceDollar, FaChartLine,
  FaMoneyCheck, FaMoneyCheckAlt, FaAddressBook, FaFilm, FaStickyNote
} from 'react-icons/fa';
import { RiCoupon4Fill } from 'react-icons/ri';
import { BsFillCartCheckFill } from 'react-icons/bs';

function SideBar() {
  const [openDropdown, setOpenDropdown] = useState({});

  function toggleDropdown(menu) {
    setOpenDropdown((prev) => {
      const newDropdown = { ...prev, [menu]: !prev[menu] };
      Object.keys(newDropdown).forEach((key) => {
        if (key !== menu) newDropdown[key] = false;
      });
      return newDropdown;
    });
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_brand}>
        <NavLink to={'/'}>
          <img src="https://demo.food-bank.xyz/images/seeder/settings/logo.png" alt="brandImg" />
        </NavLink>
      </div>
      <ul className={style.sidebar_menu}>
        <NavItem to="/admin/dashboard" icon={<MdComputer />} label="Dashboard" />
        <NavItem to="/admin/restaurants" icon={<MdOutlineTableRestaurant />} label="Restaurants" />

        <DropdownMenu
          label="Manage Restaurants"
          icon={<MdRestaurant />}
          isOpen={openDropdown.manageRestaurants}
          toggle={() => toggleDropdown('manageRestaurants')}
          items={[
            { to: '/admin/category', icon: <FaThLarge />, label: 'Categories' },
            { to: '/admin/menu-items', icon: <FaTh />, label: 'Menu Items' },
            { to: '/admin/cousine', icon: <FaGripHorizontal />, label: 'Cuisines' },
            { to: '/admin/time-slots', icon: <FaCalendarAlt />, label: 'Time Slots' },
            { to: '/admin/tables', icon: <FaTable />, label: 'Tables' },
            { to: '/admin/rating', icon: <FaStar />, label: 'Rating' }
          ]}
        />

        <DropdownMenu
          label="Sales"
          icon={<FaChartBar />}
          isOpen={openDropdown.sales}
          toggle={() => toggleDropdown('sales')}
          items={[
            { to: '/admin/reservation', icon: <FaCalendarCheck />, label: 'Reservations' },
            { to: '/admin/orders', icon: <BsFillCartCheckFill />, label: 'Orders' }
          ]}
        />

        <NavItem to="/admin/complaints" icon={<FaFlagCheckered />} label="Complaints" />
        <NavItem to="/admin/coupons" icon={<RiCoupon4Fill />} label="Coupons" />

        <DropdownMenu
          label="Finance"
          icon={<FaThLarge />}
          isOpen={openDropdown.finance}
          toggle={() => toggleDropdown('finance')}
          items={[
            { to: '/admin/transaction', icon: <FaWallet />, label: 'Transaction' },
            { to: '/admin/collection', icon: <FaCreditCard />, label: 'Collections' },
            { to: '/admin/request-withdraw', icon: <FaMoneyBill />, label: 'Request Withdraw' },
            { to: '/admin/withdraw', icon: <FaCashRegister />, label: 'Withdraw' },
            { to: '/admin/bank', icon: <FaUniversity />, label: 'Bank Details' },
            { to: '/admin/expenses', icon: <FaCoins />, label: 'Expenses' }
          ]}
        />
        <DropdownMenu
          label="Administrators"
          icon={<FaAddressCard />}
          isOpen={openDropdown.administrators}
          toggle={() => toggleDropdown('administrators')}
          items={[
            { to: "/admin/users", icon: <FaUsers />, label: "Users" },
            { to: "/admin/role", icon: <FaUsersCog />, label: "Role" },
            { to: "/admin/customers", icon: <FaUser />, label: "Customers" },
            { to: "/admin/restaurant-owners", icon: <FaUserTie />, label: "Restaurant Owners" },
            { to: "/admin/delivery-boys", icon: <FaTruckLoading />, label: "Delivery Boys" },
            { to: "/admin/update", icon: <FaSync />, label: "Update" },
            { to: "/admin/addons", icon: <FaCrosshairs />, label: "Addons" },
          ]}
        />
        <DropdownMenu
          label="Report"
          icon={<FaChartPie />}
          isOpen={openDropdown.report}
          toggle={() => toggleDropdown('report')}
          items={[
            { to: "/admin/restaurant-owner-sales-report", icon: <FaUsers />, label: "Restauran Owner Sales" },
            { to: "/admin/admin-commission-report", icon: <FaUsersCog />, label: "Admin Commission" },
            { to: "/admin/credit-balance-report", icon: <FaUser />, label: "Credit Balance" },
            { to: "/admin/delivery-order-balance-report", icon: <FaUserTie />, label: "Delivery Order Balance" },
            { to: "/admin/customer-report", icon: <FaTruckLoading />, label: "Customer Report" },
            { to: "/admin/withdraw-report", icon: <FaSync />, label: "Withdraw Report" },
            { to: "/admin/collection-report", icon: <FaCrosshairs />, label: "Collection Report" },
            { to: "/admin/reseervation-report", icon: <FaCrosshairs />, label: "Reservation Report" },
          ]}
        />
          <DropdownMenu
          label="Frontend"
          icon={<FaBraille />}
          isOpen={openDropdown.frontend}
          toggle={() => toggleDropdown('frontend')}
          items={[
            { to: "/admin/banner", icon: <FaFilm />, label: "App Banners" },
            { to: "/admin/page", icon: <FaStickyNote />, label: "Pages" },
          ]}
        />


        <NavItem to="/admin/push-notification" icon={<FaRegBell />} label="Push Notification" />
        <NavItem to="/admin/language" icon={<FaGlobe />} label="Language" />
        <NavItem to="/admin/settings" icon={<FaCogs />} label="Settings" />
      </ul>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <li>
      <NavLink to={to} style={({ isActive }) => ({ color: isActive ? "#ee1d48" : "#78828a" })}>
        <span>{icon}</span><span>{label}</span>
      </NavLink>
    </li>
  );
}

function DropdownMenu({ label, icon, isOpen, toggle, items }) {
  return (
    <li>
      <NavLink onClick={toggle}>
        <span>{icon}</span><span>{label}</span>
        <span className={isOpen ? style.rotate : ""}><FaAngleRight /></span>
      </NavLink>
      <ul className={isOpen ? style.show : style.hide}>
        {items.map(({ to, icon, label }, index) => (
          <NavItem key={index} to={to} icon={icon} label={label} />
        ))}
      </ul>
    </li>
  );
}

export default SideBar;
