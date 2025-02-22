import { TableModel } from "../models/MenageRestModel.js";
import { ReservationModel } from "../models/ReservationModel.js";

export const ReservationController = {
    createReservation: async (req, res) => {
        try {
            const { phone, table, date, guest } = req.body;
            const userId = req.user.id;
            console.log(userId);
            const existingTable = await TableModel.findOne({ _id: table }); // Dəyişiklik
            if (!existingTable || !userId) {
                return res.status(400).send({ message: 'Invalid table or user' }); // Dəyişiklik
            }
            const newReservation = new ReservationModel({
                customer: userId,
                phone,
                table,
                guest,
                date,
            });
            await newReservation.save();
            res.status(201).send({
                message: "Successfully created new reservation",
                data: newReservation,
            });
            console.log(userId);
        } catch (error) {
            res.status(500).send({ message: "Error creating reservation", error: error.message });
        }
    },

    getReservations: async (req, res) => {
        try {
            const userId = req.user.id;
            const reservations = await ReservationModel.find({ customer: userId }) // Dəyişiklik
                .populate("customer", "firstName") // Dəyişiklik
                .populate("table", "name capacity")
                .exec();
            res.send(reservations);
        } catch (error) {
            res.status(500).send({ message: "Reservations not found", error: error.message });
        }
    },
};
