import React, { useState } from 'react'
import style from "./style.module.css"
import { NavLink } from "react-router"
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosExit } from "react-icons/io";
import { PiUserCirclePlusFill } from "react-icons/pi";
function Navbar() {

    let [language, setLanguage] = useState(false)
    let [auth, setAuth] = useState(false)
    function handleSelect() {
        if (language) {
            setLanguage(false)
            return
        }
        setLanguage(true)
    }
    function handleAuth() {
        if (auth) {
            setAuth(false)
            return
        }
        setAuth(true)
    }


    return (
        <div className={style.navbar}>
            <div className="content">
                <div className={style.navbar_wrapper}>
                    <div className={style.navbar_logo}>
                        <NavLink to={"/"}>
                            <img src="https://demo.food-bank.xyz/images/seeder/settings/logo.png" alt="logo" />
                        </NavLink>
                    </div>
                    <div className={style.navbar_group}>
                        <div className={style.basket_cart}>
                            <span><FaShoppingBag /></span>
                            <span className={style.num}>0</span>
                        </div>
                        <div className={style.language_select}>
                            <button onClick={() => handleSelect()}>
                                GB&nbsp;
                                <span>English</span>
                                <span style={{ fontSize: "20px" }} > <RiArrowDropDownLine /></span>
                            </button>
                            <ul style={language ? { display: "flex" } : { display: "none" }}>
                                <li>
                                    <NavLink>
                                        GB&nbsp;
                                        <span>English</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink>
                                        AZ&nbsp;
                                        <span>Azerbaidjan</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink>
                                        DE&nbsp;
                                        <span>German</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={style.auth_group}>
                            <NavLink to={"/auth/login"}>
                                <IoIosExit /> Sign In
                            </NavLink>
                            <NavLink to={"/auth/register"}>
                                <PiUserCirclePlusFill /> Register
                            </NavLink>
                           
                        </div>
                        <div className={style.auth_group_list} onClick={() => handleAuth()}>
                                <span><FaUser /></span>
                                <ul style={auth ? { display: "flex" } : { display: "none" }}>
                                    <li>
                                        <NavLink to={"/auth/login"}>
                                            <IoIosExit /> Sign In
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/auth/register"}>
                                            <PiUserCirclePlusFill /> Register
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar