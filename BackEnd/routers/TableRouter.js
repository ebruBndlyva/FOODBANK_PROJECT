import { TableController } from "../controllers/TableController.js";
import express from "express"

export const tableRouter = express.Router()


tableRouter.post("/", TableController.createTable)
tableRouter.get("/", TableController.getTables)