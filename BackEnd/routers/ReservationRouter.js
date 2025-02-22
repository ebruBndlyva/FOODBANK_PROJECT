import { ReservationController } from "../controllers/ReservationController.js";
import express from "express"
import { AuthTokenMiddleWare } from "../middlewares/AuthTokenMiddleware.js";
export const reservRouter = express.Router()

reservRouter.post("/", AuthTokenMiddleWare, ReservationController.createReservation)
reservRouter.get("/", AuthTokenMiddleWare, ReservationController.getReservations)