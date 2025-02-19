import React from 'react';
import "./style.css";
import { FaArrowLeft, FaEdit, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneInput } from 'react-international-phone';
import "react-international-phone/style.css";
import Footer from "../../../components/user/Footer/index"

function Checkout() {
    const formik = useFormik({
        initialValues: {
            phone: '',
            payment: 'cash on delivery'
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required('Phone number is required')
                .min(10, 'Phone number must be at least 10 digits'),
            payment: Yup.string().required('Payment method is required'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    return (
    <>
        <div className='content'>
            <div className="checkout">
                <h2><span><FaArrowLeft /></span>Checkout</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="delivery-address">
                        <h3>Delivery Address <button type="button"><FaPlusCircle /> Add New Address</button></h3>

                        <div className="address">
                            <h4>Work <button type="button"><FaEdit /><FaMinusCircle /></button></h4>
                            <div className="form">
                                <input type="radio" name='address' id='address' />
                                <label htmlFor="address">
                                    <span>17 Rd No. 5, Dhaka 1216, Bangladesh</span>
                                    <span>Apartment: apartment 5/6</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="order">
                        <div className="order-head">
                            <h3>Order Summary</h3>
                            <p>Your order from Foodbank</p>
                        </div>
                        <div className="order-content">
                            <h5>
                                <span>3x</span>
                                Gourmet Garlic Infusion Burger
                                <span>$90</span>
                            </h5>
                            <span>Small</span>
                        </div>
                        <ul>
                            <li>Subtotal <span>$0</span></li>
                            <li>Delivery Charge <span>$0</span></li>
                            <li>Discount <span>$0</span></li>
                            <li>Total <span>$0</span></li>
                        </ul>
                    </div>

                    <div className="phone">
                        <label htmlFor="phone">Phone <span>*</span></label>
                        <PhoneInput
                            style={{ marginTop: "10px" }}
                            id="phone"
                            defaultCountry="ua"
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue("phone", value)}
                            onBlur={() => formik.setFieldTouched("phone", true)}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="error">{formik.errors.phone}</div>
                        ) : null}

                        <label htmlFor="payment">Payment Method</label>
                        <select
                            name="payment"
                            id="payment"
                            value={formik.values.payment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="cash on delivery">Cash on delivery</option>
                            <option value="stripe">Stripe</option>
                            <option value="paypal">Paypal</option>
                        </select>
                        {formik.touched.payment && formik.errors.payment ? (
                            <div className="error">{formik.errors.payment}</div>
                        ) : null}
                    </div>

                    <button className='checkout-submit' type="submit">PLACE ORDER</button>
                </form>

               
            </div>
        </div>
         <Footer />
    </>
    );
}

export default Checkout;
