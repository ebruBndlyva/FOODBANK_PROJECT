import { MenuItemModel } from "../models/MenuItemModel.js"
export const MenuController = {
    getMenues: async (req, res) => {
        let menues = await MenuItemModel.find()
        res.send(menues)
    },
    getMenuById: async (req, res) => {
        let { id } = req.params
       let menu = await MenuItemModel.findById(id)
        res.save(menu)
    },
    deleteMenu: async (req, res) => {
        let { id } = req.params
        await MenuItemModel.findByIdAndDelete(id)
        res.save({
            message: "deleted"
        })
    },
    createMenu: async (req, res) => {
        let newMenu = MenuItemModel(req.body)
        await newMenu.save()
        res.send({
            message: "created",
            data: newMenu
        })
    },
    updateMenu: async (req, res) => {
        let { id } = req.params
        let updateMenu = req.body
        let updatedMenu = await MenuItemModel.findByIdAndUpdate({ _id: id }, updateMenu, { new: true })
        res.send({
            message: "updated",
            data: updatedMenu
        })
    }
}