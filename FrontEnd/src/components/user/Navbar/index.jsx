import React, { useState } from 'react';
import style from "./style.module.css";
import { NavLink, useNavigate } from "react-router-dom"; // Düzgün import
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosExit } from "react-icons/io";
import { PiUserCirclePlusFill, PiCoffee } from "react-icons/pi";
import { CiLock, CiSettings, CiShoppingCart } from "react-icons/ci";
import { useGetUserInfoQuery } from '../../../Redux/services/UserCreateApi';
import { jwtDecode } from "jwt-decode"; // Default export düzgün import edildi
import { useGetBasketsQuery } from '../../../Redux/services/BasketCreateApi';

function Navbar() {
    const [dropdowns, setDropdowns] = useState({ language: false, auth: false, userInfo: false });

    const token = localStorage.getItem("token");
    const userId = token ? jwtDecode(token).id : undefined;
    const navigate = useNavigate()
   
   
    

    
    // API request ancaq userId varsa getsin
    const { data, isLoading, refetch } = useGetUserInfoQuery(userId, {
        skip: !userId,
    });

   async function UserLogout() {
        localStorage.removeItem("token");
       await refetch(); 
    }

    const handleToggle = (key) => {
        setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const dropdownStyle = (isOpen) => ({
        display: isOpen ? "flex" : "none"
    });

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
                        <div className={style.basket_cart} onClick={() => navigate("/basket")}>
                            <span><FaShoppingBag /></span>
                            <span className={style.num}>0</span>
                        </div>

                        <div className={style.language_select}>
                            <button onClick={() => handleToggle("language")}>
                                GB&nbsp;<span>English</span>
                                <RiArrowDropDownLine style={{ fontSize: "20px" }} />
                            </button>
                            <ul style={dropdownStyle(dropdowns.language)}>
                                {["GB English", "AZ Azerbaidjan", "DE German"].map((lang, i) => (
                                    <li key={i}>
                                        <NavLink>{lang}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {data ? (
                            <div className={style.user_info}>
                                <button onClick={() => handleToggle("userInfo")}>
                                    <img src="https://demo.food-bank.xyz/themes/images/user-avatar.png" alt="user_img" width={"20px"} height={"20px"} />
                                    <span>Hi, {data.firstName} {data.lastName.slice(0, 5)}</span>
                                    <RiArrowDropDownLine style={{ fontSize: "20px" }} />
                                </button>
                                <ul style={dropdownStyle(dropdowns.userInfo)}>
                                    <li><NavLink><CiSettings /> Account</NavLink></li>
                                    <li><NavLink><CiShoppingCart /> My Orders</NavLink></li>
                                    <li><NavLink><PiCoffee /> Reservation</NavLink></li>
                                    <li><NavLink onClick={UserLogout}><CiLock /> Logout</NavLink></li>
                                </ul>
                            </div>
                        ) : (
                            <div className={style.auth_group}>
                                <NavLink to={"/auth/login"}><IoIosExit /> Sign In</NavLink>
                                <NavLink to={"/auth/register"}><PiUserCirclePlusFill /> Register</NavLink>
                            </div>
                        )}

                        <div className={style.auth_group_list} onClick={() => handleToggle("auth")}>
                            <span><FaUser /></span>
                            <ul style={dropdownStyle(dropdowns.auth)}>
                                <li><NavLink to={"/auth/login"}><IoIosExit /> Sign In</NavLink></li>
                                <li><NavLink to={"/auth/register"}><PiUserCirclePlusFill /> Register</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
