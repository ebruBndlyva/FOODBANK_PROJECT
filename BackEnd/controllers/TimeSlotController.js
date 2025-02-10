import { TimeSlotModel } from "../models/TimeSlotModel.js"


export const TimeSlotController = {
    getTime: async (req, res) => {
        let times = await TimeSlotModel .find()
        res.send(times)
    },
    getTimeById: async (req, res) => {
        let { id } = req.params
       let time = await TimeSlotModel .findById(id)
        res.save(time)
    },
    deleteTime: async (req, res) => {
        let { id } = req.params
        await TimeSlotModel .findByIdAndDelete(id)
        res.save({
            message: "deleted"
        })
    },
    createTime: async (req, res) => {
        let newTime = TimeSlotModel (req.body)
        await newTime.save()
        res.send({
            message: "created",
            data: newTime
        })
    },
    updateTime: async (req, res) => {
        let { id } = req.params
        let updatCuisine = req.body
        let updateCuisine = await TimeSlotModel .findByIdAndUpdate({ _id: id }, updatCuisine, { new: true })
        res.send({
            message: "updated",
            data: updateCuisine
        })
    }
}