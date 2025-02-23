import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneInput } from 'react-international-phone';
import "react-international-phone/style.css";
import { usePostOrderMutation } from '../../../Redux/services/OrderCreateApi';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function CheckoutForm({ checkoutData }) {
    const [postOrder] = usePostOrderMutation();
    const stripe = useStripe();
    const elements = useElements();
    const formik = useFormik({
        initialValues: {
            phone: '',
            address: '',
            payment: 'cash on delivery'
        },
        validationSchema: Yup.object({
            phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be at least 10 digits'),
            address: Yup.string().required('Address is required'),
            payment: Yup.string().required('Payment method is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (values.payment === 'stripe') {
                    const cardElement = elements.getElement(CardElement);
                    const { error, paymentMethod } = await stripe.createPaymentMethod({
                        type: 'card',
                        card: cardElement,
                        billing_details: {
                            phone: values.phone,
                            address: {
                                line1: values.address,
                            },
                        },
                    });

                    if (error) {
                        console.error('Payment error:', error.message);
                        return;
                    }

                    const orderDetails = {
                        user:checkoutData.basketItems.basket.userId,
                        restaurant:checkoutData.basketItems.basket.restaurantId,
                        phone: values.phone,
                        address: values.address,
                        payment: values.payment,
                        items: checkoutData.basketItems.basket.items,
                        total: checkoutData.total,
                        paymentMethodId: paymentMethod.id,
                    };

                    await postOrder(orderDetails);
                    console.log(orderDetails);
                } else {
                    const orderDetails = {
                        phone: values.phone,
                        address: values.address,
                        payment: values.payment,
                        items: checkoutData.basketItems.basket.items,
                        total: checkoutData.total,
                    };

                    await postOrder(orderDetails);
                }
            } catch (err) {
                console.error("Order submission failed:", err);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="phone">
                <label htmlFor="phone">Phone <span>*</span></label>
                <PhoneInput
                    id="phone"
                    defaultCountry="ua"
                    value={formik.values.phone}
                    onChange={(value) => formik.setFieldValue("phone", value)}
                    onBlur={() => formik.setFieldTouched("phone", true)}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                ) : null}

                <label htmlFor="address">Address <span>*</span></label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                    <div className="error">{formik.errors.address}</div>
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
                </select>
                {formik.touched.payment && formik.errors.payment ? (
                    <div className="error">{formik.errors.payment}</div>
                ) : null}

                {formik.values.payment === 'stripe' && (
                    <div>
                        <CardElement />
                    </div>
                )}
            </div>

            <button className='checkout-submit' type="submit">PLACE ORDER</button>
        </form>
    );
}

export default CheckoutForm;
