import React from 'react'
import style from "./style.module.css"
import { GrLocation } from "react-icons/gr";
import { GiHotMeal } from "react-icons/gi";
import { RiBowlLine } from "react-icons/ri";
function OrderSection() {
    return (
        <div className='content'>
            <div className={style.order_wrapper}>
                <div className={style.order_head}>
                    <span>How to Order</span>
                    <h2>It’s as easy as this</h2>
                </div>
                <div className={style.order_cards}>
                    <div className={style.order_card}>
                        <span><GrLocation /></span>
                        <h3>Provide your location</h3>
                        <p>Fill out your address & search </p>

                    </div>
                    <div className={style.order_card}>
                        <span><RiBowlLine /></span>
                        <h3>Choose your restaurant & food </h3>
                        <p>Browse through many restaurant and cuisine</p>
                    </div>
                    <div className={style.order_card}>
                        <span><GiHotMeal /></span>
                        <h3>Pay & get your food </h3>
                        <p>Pay using various payment methods</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSection