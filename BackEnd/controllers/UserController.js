import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const UserController = {
    requestPasswordReset: async (req, res) => {
        const { email } = req.body;
        try {
            const oldUser = await UserModel.findOne({ email });
            if (!oldUser) {
                return res.status(404).send({ success: false, message: "User Not Found" });
            }

            const secret = process.env.JWT_SECRET + oldUser.password;
            const token = jwt.sign({ id: oldUser._id }, secret, { expiresIn: "30d" });
            const resetUrl = `http://localhost:5173/resetpassword/${token}`;

            let transporter = nodemailer.createTransport({
                host: process.env.NODEMAILER_HOST,
                port: Number(process.env.NODEMAILER_PORT),
                secure: Number(process.env.NODEMAILER_PORT) === 465,
                auth: {
                    user: process.env.NODEMAILER_USER_GMAIL,
                    pass: process.env.NODEMAILER_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: process.env.NODEMAILER_USER_GMAIL,
                to: oldUser.email,
                subject: "Password Reset Request",
                html: `<p>You have requested a password reset.</p>
                        <p>Click the link below to reset your password:</p>
                        <a href="${resetUrl}">${resetUrl}</a>
                        <p>If you did not request this, please ignore this email.</p>`
            });

            res.status(200).send({ success: true, message: "Verification email sent" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ success: false, message: "Something went wrong", error });
        }
    },

    resetPassword: async (req, res) => {
        const { token } = req.body;
        const { password } = req.body;
        try {
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.id) {
                return res.status(400).send({ success: false, message: "Invalid token" });
            }

            const user = await UserModel.findById(decoded.id);
            if (!user) {
                return res.status(404).send({ success: false, message: "User Not Found" });
            }

            const secret = process.env.JWT_SECRET + user.password;
            jwt.verify(token, secret);

            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                return res.status(400).send({ success: false, message: "New password cannot be the same as the old password" });
            }

            user.password = await bcrypt.hash(password, 10);
            await user.save();

            res.status(200).send({ success: true, message: "Password has been reset" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ success: false, message: "Something went wrong", error });
        }
    },
};
