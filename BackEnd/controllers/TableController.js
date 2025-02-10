import { TableModel } from "../models/TableModel.js"
export const CategoryController = {
    getTables: async (req, res) => {
        let tables = await TableModel.find()
        res.send(tables)
    },
    getTableById: async (req, res) => {
        let { id } = req.params
        let table = await TableModel.findById(id)
        res.save(table)
    },
    deleteTable: async (req, res) => {
        let { id } = req.params
        await TableModel.findByIdAndDelete(id)
        res.save({
            message: "deleted"
        })
    },
    createTable: async (req, res) => {
        let newTable = TableModel(req.body)
        await newTable.save()
        res.send({
            message: "created",
            data: newTable
        })
    },
    updateTable: async (req, res) => {
        let { id } = req.params
        let updateTable = req.body
        let updatedTable = await TableModel.findByIdAndUpdate({ _id: id }, updateTable, { new: true })
        res.send({
            message: "updated",
            data: updatedTable
        })
    }
}