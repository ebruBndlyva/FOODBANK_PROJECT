import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/user/Navbar'
function Layout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout