import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { TableModel } from "../models/MenageRestModel.js";
import { ReservationModel } from "../models/ReservationModel.js";

// E-poçt göndərmə funksiyası
const sendConfirmationEmail = (userEmail, reservationDetails) => {
    let transporter = nodemailer.createTransport({
        direct: true,
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        auth: {
            user: process.env.NODEMAILER_USER_GMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        },
        secure: true
    });

    const tableName = reservationDetails.table; 

    const htmlContent = `
        <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Reservation Confirmation</h2>
            <p style="font-size: 18px;">Dear Customer,</p>
            <p>Your reservation has been successfully created. Below are your reservation details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;"><strong>Date:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;">${reservationDetails.date}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;"><strong>Time Slot:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;">${reservationDetails.timeSlot}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;"><strong>Table Name:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;">${tableName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;"><strong>Guest Count:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;">${reservationDetails.guest}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;"><strong>Phone Number:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 16px;">${reservationDetails.phone}</td>
                </tr>
            </table>
            <p style="font-size: 16px; margin-top: 20px;">We look forward to hosting you!</p>
            <p style="font-size: 16px;">Thank you for choosing our restaurant.</p>
        </body>
        </html>
    `;

    let mailOptions = {
        from: process.env.NODEMAILER_USER_GMAIL,
        to: userEmail,
        subject: 'Reservation Confirmation',
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export const ReservationController = {
    createReservation: async (req, res) => {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const userId = req.user.id;
            const { phone, table, date, guest, timeSlot, restaurant } = req.body;

            if (!mongoose.isValidObjectId(table)) {
                return res.status(400).json({ message: "Invalid table ID" });
            }

            const existingTable = await TableModel.findById(table);
            if (!existingTable) {
                return res.status(404).json({ message: "Table not found" });
            }

            // Yeni rezervasiya yaratmaq
            const newReservation = new ReservationModel({
                customer: userId,
                phone,
                table,
                guest,
                date,
                timeSlot,
                restaurant
            });

            const savedReservation = await newReservation.save();

            // E-poçtu göndəririk
            sendConfirmationEmail(req.user.email, savedReservation);

            res.status(201).json({
                message: "Successfully created new reservation",
                reservation: savedReservation,
            });
        } catch (error) {
            res.status(500).json({ message: "Error creating reservation", error: error.message });
        }
    },

    getReservations: async (req, res) => {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const userId = req.user.id;

            const reservations = await ReservationModel.find({ customer: userId })
                .populate("customer", "firstName")
                .populate("table", "name capacity");

            res.json({ reservations });
        } catch (error) {
            res.status(500).json({ message: "Reservations not found", error: error.message });
        }
    },
};
