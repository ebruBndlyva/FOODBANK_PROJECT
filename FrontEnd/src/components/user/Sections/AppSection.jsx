import React from 'react'
import style from "./style.module.css"
import { NavLink } from 'react-router'
function AppSection() {
    return (
        <div className={style.app}>
            <div className="content">
                <div className={style.app_wrapper}>
                    <div className={style.app_desc}>
                        <h1>Download the app</h1>
                        <p>Click, sit back, and enjoy.</p>
                        <div className={style.app_btns}>
                            <NavLink to={"https://play.google.com/store/apps/details?id=com.inilabs.foodbank"} target='blank'>
                                <img src="https://demo.food-bank.xyz/frontend/images/play.png" alt="goggle_play" />
                            </NavLink>
                            <NavLink to={"https://play.google.com/store/apps/details?id=com.inilabs.foodbank"} target='blank'>
                                <img src="https://demo.food-bank.xyz/frontend/images/app.png" alt="App_store" />
                            </NavLink>
                        </div>

                    </div>
                    <div className={style.app_img}>
                        <img src="https://demo.food-bank.xyz/images/seeder/settings/mockup.png" alt="app_img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppSection