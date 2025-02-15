import { CategoryModel } from "../models/MenageRestModel.js";

export const CategoryContoller = {
    getAllCategories: async (req, res) => {
        try {
            const allCategories = await CategoryModel.find();
            res.send(allCategories);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    createCategory: async (req, res) => {
        try {
            const newCategory = new CategoryModel(req.body);
            await newCategory.save();
            res.send(newCategory);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}