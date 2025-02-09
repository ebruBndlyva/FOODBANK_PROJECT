import React from 'react'
import style from "./style.module.css"
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
function RestaurantSection() {
    const rating = 3
    return (
        <div className="content">
            <div className={style.restaurant_wrapper}>
                <h2>Most Visited Restaurants</h2>
                <div className={style.restaurant_cards}>
                    <div className={style.restaurant_card}>
                        <div className={style.restaurant_img}>
                            <img src="https://demo.food-bank.xyz/storage/1/conversions/sultans-dine-image.jpg" alt="cuisine" />
                        </div>
                        <div className={style.restaurant_desc}>
                            <h4>Sultan's Dine</h4>
                            <p>   {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < rating ? "#FFD700" : "#ccc"}
                                    size={18}
                                />

                            ))}
                                <span>({rating})</span>
                            </p>
                            <p><IoLocationOutline /> 250 W 72nd St, New York, Uni...</p>
                            <span>Close Now</span>
                        </div>
                    </div>
                    <div className={style.restaurant_card}>
                        <div className={style.restaurant_img}>
                            <img src="https://demo.food-bank.xyz/storage/1/conversions/sultans-dine-image.jpg" alt="cuisine" />
                        </div>
                        <div className={style.restaurant_desc}>
                            <h4>Sultan's Dine</h4>
                            <p>   {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < rating ? "#FFD700" : "#ccc"}
                                    size={18}
                                />

                            ))}
                                <span>({rating})</span>
                            </p>
                            <p><IoLocationOutline /> 250 W 72nd St, New York, Uni...</p>
                            <span>Close Now</span>
                        </div>
                    </div>
                    <div className={style.restaurant_card}>
                        <div className={style.restaurant_img}>
                            <img src="https://demo.food-bank.xyz/storage/2/conversions/mr-beast-burger-image.jpg" alt="cuisine" />
                        </div>
                        <div className={style.restaurant_desc}>
                            <h4>Sultan's Dine</h4>
                            <p>   {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < rating ? "#FFD700" : "#ccc"}
                                    size={18}
                                />

                            ))}
                                <span>({rating})</span>
                            </p>
                            <p><IoLocationOutline /> 250 W 72nd St, New York, Uni...</p>
                            <span>Close Now</span>
                        </div>
                    </div>
                    <div className={style.restaurant_card}>
                        <div className={style.restaurant_img}>
                            <img src="https://demo.food-bank.xyz/storage/1/conversions/sultans-dine-image.jpg" alt="cuisine" />
                        </div>
                        <div className={style.restaurant_desc}>
                            <h4>Sultan's Dine</h4>
                            <p>   {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    color={index < rating ? "#FFD700" : "#ccc"}
                                    size={18}
                                />

                            ))}
                                <span>({rating})</span>
                            </p>
                            <p><IoLocationOutline /> 250 W 72nd St, New York, Uni...</p>
                            <span>Close Now</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RestaurantSection