import { CategoryModel, MenuItemModel } from "../models/MenageRestModel.js";

export const MenuItemController = {
    getMenues: async (req, res) => {
        try {
            const menuItems = await MenuItemModel.find().populate('category',"name");
            res.send(menuItems);
        } catch (error) {
            res.status(500).send({ message: 'Server error' });
        }
    },
    createMenuItem: async (req, res) => {
        try {
            const { category, name, status, image, description, unitPrice, discountPrice } = req.body;
            const categoryExsist = await CategoryModel.findById(category)
            if (!categoryExsist) {
                return res.status(400).send({ message: 'Invalid category ID' });
            }
            const newMenuItem = MenuItemModel({
                category,
                name,
                status,
                image,
                description,
                unitPrice,
                discountPrice
            })
            await newMenuItem.save();
            res.send(newMenuItem);


        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}