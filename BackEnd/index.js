import express from "express"
const app = express()
import cors from "cors"
import dotenv from "dotenv"
import "./config/config.js"
import { authRouter } from "./routers/AuthRouter.js"
import { adminRouter } from "./routers/AdminRouter.js"
import { userRouter } from "./routers/UserRouter.js"
import { restaurantRouter } from "./routers/RestaurantRouter.js"
import { categoryRouter } from "./routers/CategoryRouter.js"
import { menuRouter } from "./routers/MenuRouter.js"
import { cuisineRouter } from "./routers/CousineRouter.js"
dotenv.config()
app.use(express.json())
app.use(cors())
app.options('*', cors());
const port = process.env.PORT
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/restaurant",restaurantRouter)
app.use("/api/category",categoryRouter)
app.use("/api/menu",menuRouter)
app.use("/api/cuisine",cuisineRouter)
app.listen(port, () => {
    console.log(`Project is listening on port ${port}!`);
})