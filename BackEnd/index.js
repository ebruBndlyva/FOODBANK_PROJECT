import express from "express"
const app = express()
import cors from "cors"
import dotenv from "dotenv"
import "./config/config.js"
import { authRouter } from "./routers/AuthRouter.js"
import { adminRouter } from "./routers/AdminRouter.js"
import { userRouter } from "./routers/UserRouter.js"
dotenv.config()
app.use(express.json())
app.use(cors())
app.options('*', cors());
const port = process.env.PORT
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.listen(port, () => {
    console.log(`Project is listening on port ${port}!`);
})