import { OrderController } from "../controllers/OrderController.js";

import express from "express"

export const orderRouter = express.Router()


orderRouter.post("/",OrderController.createOrder)
orderRouter.post("/confirm-payment", OrderController.confirmPayment);