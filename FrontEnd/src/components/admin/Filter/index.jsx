import React from 'react'
import style from "./style.module.css"
function Filter() {
    return (


        <div className={style.filter_bottom}>
            <div className={style.select}>
                Show
                <select>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
            </div>
            <div className={style.search}>
                Search : <input type="text" />
            </div>
        </div>

    )
}

export default Filter