import React from 'react'
import style from "./style.module.css"
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useGetRestaurantsQuery } from '../../../Redux/services/RestaurantCreateApi';
import { useNavigate } from 'react-router-dom';
function RestaurantSection() {
    const { data, isLoading } = useGetRestaurantsQuery()
    const nowDate = new Date()
    let navigate = useNavigate()
    return (
        <div className="content">
            <div className={style.restaurant_wrapper}>
                <h2>Most Visited Restaurants</h2>
                {
                    isLoading ? (<h2>...Loading</h2>) : (
                        <div className={style.restaurant_cards}>
                            {
                                data.map(item => (
                                    <div className={style.restaurant_card} key={item._id} onClick={() => navigate(`/restaurant/${item._id}`)} >
                                        <div className={style.restaurant_img}>
                                            <img src={item.featuredImage} alt="cuisine" />
                                        </div>
                                        <div className={style.restaurant_desc}>
                                            <h4>{item.name}</h4>
                                            <p>   {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    color={index < item.rating ? "#FFD700" : "#ccc"}
                                                    size={18}
                                                />

                                            ))}
                                                <span>({item.reviews.length})</span>
                                            </p>
                                            <p><IoLocationOutline /> {item.restaurantAddress}</p>
                                            <span style={{ color: item.openingTime < nowDate && item.closingTime > nowDate ? "green" : "red" }}>
                                                {item.openingTime < nowDate && item.closingTime > nowDate ? "Open Now" : "Close Now"}

                                            </span>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RestaurantSection