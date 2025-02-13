import { CategoryModel, MenuItemModel } from "../models/MenageRestModel.js";

export const MenuItemController = {
    getMenues: async (req, res) => {
        try {
            const menuItems = await MenuItemModel.find();
            res.send(menuItems);
        } catch (error) {
            res.status(500).send({ message: 'Server error' });
        }
    },
    getMenuByRestaurant: async (req, res) => {
        try {
            const { id } = req.params; 
            const categories = await MenuItemModel.find({ restaurant: id });
            res.send(categories);
           
            // const menuItems = categories.map(category => category.menuItems).flat();

            // res.send(menuItems); 
        } catch (error) {
            res.status(500).send({ message: 'Server error' });
        }
    },
    createMenuItem: async (req, res) => {
        try {
            const newMenuItem = new MenuItemModel(req.body);
            await newMenuItem.save();
            res.send(newMenuItem);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}