import React from 'react'
import style from "./style.module.css"
import { Link } from 'react-router'
import { FaFacebook, FaInstagram, FaMailBulk, FaPhone, FaTwitter, FaVoicemail, FaYoutube } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
function Footer() { 
    return (
        <div className={style.footer}>
            <div className="content">
                <div className={style.footer_wrapper}>
                    <div className={style.footer_nav}>
                        <div className={style.contact}>
                            <Link to={"/"}>
                                <img src="https://demo.food-bank.xyz/images/seeder/settings/logo.png" alt="foodbank" />
                            </Link>
                            <p>Follow Us on</p>
                            <div className={style.icons}>
                                <Link><FaFacebook /></Link>
                                <Link><FaInstagram /></Link>
                                <Link><FaTwitter /></Link>
                                <Link><FaYoutube /></Link>
                            </div>
                        </div>
                        <div className={style.foot}>
                            <h4>About</h4>
                            <Link to={"/terms"}>Terms & Conditions</Link>
                            <Link to={"/contact"}>Contact Us</Link>
                        </div>
                        <div className={style.foot}>
                            <h4>Services</h4>
                            <Link to={"/about"}>About Us</Link>
                            <Link to={"/privaciy"}>Privaciy</Link>
                        </div>
                        <div className={style.apps}>
                            <h4>Download Apps</h4>
                            <div style={{display:"flex",gap:"15px"}}>
                                <Link to={"https://play.google.com/store/apps/details?id=com.inilabs.foodbank"} target='blank'>
                                    <img src="https://demo.food-bank.xyz/frontend/images/play.png" alt="google_play" /></Link>
                                <Link to={"https://play.google.com/store/apps/details?id=com.inilabs.foodbank"} target='blank'>
                                    <img src="https://demo.food-bank.xyz/frontend/images/app.png" alt="app_store" />
                                </Link>
                            </div>
                            <span><IoMail/> info@food-bank.xyz
                            </span>
                            <span><FaPhone/> +9940773231992</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer