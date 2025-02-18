import React from 'react'
import "./style.css"
import { FaArrowLeft, FaEdit, FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

function Checkout() {
    return (
        <div className='content'>
            <div className="checkout">
                <h2><span><FaArrowLeft /></span>Checkout</h2>
                <div className="delivery-addres">
                    <h3>Delivery Address <button><FaPlusCircle/> Add New Address</button></h3>

                    <div className="address">
                        <h4>Work <button><FaEdit/><FaMinusCircle/></button></h4>
                        <input type="radio" name='address' id='address' /> 
                        <label htmlFor="address">
                            <span>17 Rd No. 5, Dhaka 1216, Bangladesh</span>
                            <span>Apartment : apartment 5/6</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout