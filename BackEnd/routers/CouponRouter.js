import express from "express"

import { CouponController } from "../controllers/CouponController.js"

export const couponRouter = express.Router()

couponRouter.post("/",CouponController.addCoupon)
couponRouter.get("/",CouponController.getCoponByCode)
couponRouter.post("/apply",CouponController.applyCoupon)