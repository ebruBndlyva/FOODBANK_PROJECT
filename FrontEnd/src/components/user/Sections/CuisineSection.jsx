import React from 'react'
import style from "./style.module.css"
import { Link } from 'react-router'
function CuisineSection() {
    return (
        <div className="content">
            <div className={style.cuisine_wrapper}>
                <h2>Popular Cuisines</h2>
                <div className={style.cuisine_cards}>
                    <Link>
                    <img src="https://demo.food-bank.xyz/storage/74/conversions/bangladeshi-image.jpg" alt="cuisine" />
                    <h4>Bangladashi</h4>
                    </Link>
                    <Link>
                    <img src="https://demo.food-bank.xyz/storage/74/conversions/bangladeshi-image.jpg" alt="cuisine" />
                    <h4>Bangladashi</h4>
                    </Link>
                    <Link>
                    <img src="https://demo.food-bank.xyz/storage/81/conversions/chicken-image.jpg" alt="cuisine" />
                    <h4>Bangladashi</h4>
                    </Link>
                    <Link>
                    <img src="https://demo.food-bank.xyz/storage/74/conversions/bangladeshi-image.jpg" alt="cuisine" />
                    <h4>Bangladashi</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CuisineSection