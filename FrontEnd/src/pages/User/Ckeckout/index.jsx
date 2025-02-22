import React from 'react';
import "./style.css";
import { FaArrowLeft } from 'react-icons/fa';
import Footer from "../../../components/user/Footer/index";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../components/user/CheckoutForm';

const stripePromise = loadStripe("pk_test_51QuvKj2UrdZf5EX3j4tbsqECSDZ19B5w8EdVAA0OaysrfdU861F2MPsdoM6WCtBKYVeTKnuUheVgTWVYYhVU5rqA00PpPWeQhk")


function Checkout() {
    const checkoutData = JSON.parse(localStorage.getItem("checkout"));

    return (
        <Elements stripe={stripePromise}>
            <div className='content'>
                <div className="checkout">
                    <h2><span><FaArrowLeft /></span>Checkout</h2>
                    <CheckoutForm checkoutData={checkoutData} /> {/* ✅ Burada istifadə edirik */}
                </div>
            </div>
            <Footer />
        </Elements>
    );
}

export default Checkout;
