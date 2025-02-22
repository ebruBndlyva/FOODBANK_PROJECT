import { TableModel } from "../models/MenageRestModel.js";

export const TableController = {

    createTable: async (req, res) => {
        try {
            let newTable = TableModel(req.body)

            await newTable.save()
            res.status(201).send(newTable)
        }
        catch (error) {
            res.status(500).send({ message: "Error creating table", error: error.message });
        }
    },
    getTables: async (req, res) => {
        try {
            let tables = await TableModel.find()
            res.send(tables)
        } catch (error) {
            res.status(500).send({ message: "Error GetTables", error: error.message });
        }
    }

}