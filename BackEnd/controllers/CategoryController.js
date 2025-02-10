import { CategoryModel } from "../models/CategoryModel.js"

export const CategoryController = {
    getCategories: async (req, res) => {
        let categories = await CategoryModel.find()
        res.send(categories)
    },
    getCategoryById: async (req, res) => {
        let { id } = req.params
       let category = await CategoryModel.findById(id)
        res.save(category)
    },
    deleteCategory: async (req, res) => {
        let { id } = req.params
        await CategoryModel.findByIdAndDelete(id)
        res.save({
            message: "deleted"
        })
    },
    createCategory: async (req, res) => {
        let newCategory = CategoryModel(req.body)
        await newCategory.save()
        res.send({
            message: "created",
            data: newCategory
        })
    },
    updateCategory: async (req, res) => {
        let { id } = req.params
        let updateCateq = req.body
        let updatedCategory = await CategoryModel.findByIdAndUpdate({ _id: id }, updateCateq, { new: true })
        res.send({
            message: "updated",
            data: updatedCategory
        })
    }
}