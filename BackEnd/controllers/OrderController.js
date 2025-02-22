import { OrderModel } from "../models/OrderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { userId, restaurantId, address, phone, paymentMethod, items, subtotal, deliveryCharge, discount, total } = req.body;

            if (paymentMethod === 'stripe') {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: total * 100,
                    currency: 'usd',
                    payment_method_types: ['card'],
                    description: `Order from FoodBank`,
                });

                const newOrder = new OrderModel({
                    user: userId,
                    restaurant: restaurantId,
                    address,
                    phone,
                    paymentMethod,
                    items,
                    subtotal,
                    deliveryCharge,
                    discount,
                    total,
                    paymentStatus: 'unpaid',
                    status: 'pending',
                    orderDate: new Date(),
                    paymentIntentId: paymentIntent.id, // Stripe ödənişi üçün unikal ID
                });

                await newOrder.save();

                res.status(201).send({
                    message: 'Order placed successfully! Please complete the payment.',
                    order: newOrder,
                    clientSecret: paymentIntent.client_secret 
                });
            } else {
                const newOrder = new OrderModel({
                    user: userId,
                    restaurant: restaurantId,
                    address,
                    phone,
                    paymentMethod,
                    items,
                    subtotal,
                    deliveryCharge,
                    discount,
                    total,
                    paymentStatus: 'unpaid',
                    status: 'pending',
                    orderDate: new Date(),
                });

                await newOrder.save();
                res.status(201).send({
                    message: 'Order placed successfully! Awaiting payment.',
                    order: newOrder
                });
            }
        } catch (error) {
            res.status(500).send({ message: 'Server Error', error: error.message });
        }
    },

    confirmPayment: async (req, res) => {
        try {
            const { paymentIntentId } = req.body;

            // Stripe-dan ödənişin statusunu yoxlayırıq
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status === 'succeeded') {
                // Sifarişin statusunu yeniləyirik
                await OrderModel.findOneAndUpdate(
                    { paymentIntentId },
                    { paymentStatus: 'paid', status: 'confirmed' },
                    { new: true }
                );

                return res.status(200).send({ message: "Payment successful, order confirmed!" });
            } else {
                return res.status(400).send({ message: "Payment not completed" });
            }
        } catch (error) {
            res.status(500).send({ message: "Error confirming payment", error: error.message });
        }
    }
};
