import React from 'react'
import style from "./style.module.css"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { FaAngleRight, FaEnvelope, FaMap, FaPhone } from "react-icons/fa6";
import { FaMoneyBill, FaPaperPlane, FaUniversity, FaUser } from "react-icons/fa";
import {NavLink} from "react-router-dom"
function Dashboard() {

  const data = [
    { month: "January", income: 300, order: 10 },
    { month: "February", income: 30, order: 5 },
    { month: "March", income: 5, order: 2 },
    { month: "April", income: 2, order: 1 },
    { month: "May", income: 5, order: 1 },
    { month: "June", income: 1, order: 100 },
    { month: "July", income: 10, order: 1 },
    { month: "August", income: 1, order: 1 },
    { month: "September", income: 1, order: 1 },
    { month: "October", income: 100, order: 78 },
    { month: "November", income: 1, order: 1 },
    { month: "December", income: 1, order: 1 },
  ];
  return (
    <div className="content2">
      <div className={style.dashboard}>
        <div className={style.total}>
          <div className={style.total_card}>
            <span className={style.icon}><FaPaperPlane /></span>
            <div className={style.dash_desc}>
              <h4>Total Orders</h4>
              <span>9</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaUser /></span>
            <div className={style.dash_desc}>
              <h4>Total Orders</h4>
              <span>9</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaUniversity /></span>
            <div className={style.dash_desc}>
              <h4>Total Orders</h4>
              <span>9</span>
            </div>
          </div>
          <div className={style.total_card}>
            <span className={style.icon}><FaMoneyBill /></span>
            <div className={style.dash_desc}>
              <h4>Total Orders</h4>
              <span>9</span>
            </div>
          </div>
        </div>
        <div className={style.chart_wrapper}>
          <h2>2025 Income & Order Summary</h2>
          <p>Show monthly wise income & order graph.</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <defs>
                {/* Income üçün mavi gradient */}
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0000FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0000FF" stopOpacity={0} />
                </linearGradient>

                {/* Order üçün qırmızı gradient */}
                <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="month" angle={-30} textAnchor="end" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />

              {/* ✅ Income üçün sahə (mavi) */}
              <Area type="monotone" dataKey="income" stroke="#0000FF" fillOpacity={1} fill="url(#colorIncome)" />

              {/* ✅ Order üçün sahə (qırmızı) */}
              <Area type="monotone" dataKey="order" stroke="#FF0000" fillOpacity={1} fill="url(#colorOrder)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={style.dashboard_cards}>
          <div className={style.recent_orders}>
            <div className={style.order_head}>
              <h3>Recent Orders <span>0</span></h3>
              <NavLink>View More <span><FaAngleRight /></span></NavLink>
            </div>
         <div className={style.table_wrapper}>
         <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            </table>
         </div>
          </div>
          <div className={style.profile}>
            <div className={style.profile_head}>
              <img src="https://demo.food-bank.xyz/themes/images/user-avatar.png" alt="avatar" />
              <h4>John Doe</h4>
              <span>Admin</span>
            </div>
            <ul>
              <li><span><FaUser/></span>admin</li>
              <li><span><FaEnvelope/></span>admin@example.com</li>
              <li><span><FaPhone/></span>115005550006</li>
              <li><span><FaMap/></span>haka, Bangladesh</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard