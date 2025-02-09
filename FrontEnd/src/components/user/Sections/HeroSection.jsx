import React from 'react'
import style from "./style.module.css"
import { NavLink } from 'react-router'
import { TbCurrentLocation } from "react-icons/tb";
function HeroSection() {
    return (
        <div className={style.hero}>
            <div className="content">
                <div className={style.hero_wrapper}>
                    <div className={style.hero_desc}>
                        <h1>Organic & Tasty Food for your Table.</h1>
                        <p>Explore top-rated attractions, activities and more</p>
                        <form>
                            
                                <input type="text" placeholder='Search' />
                                <NavLink><TbCurrentLocation /></NavLink>
                                <button type='Submit'>Search</button>
                            
                        </form>
                    </div>
                    <div className={style.hero_img}>
                        <img src="https://demo.food-bank.xyz/images/seeder/settings/hero.png" alt="food_img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection