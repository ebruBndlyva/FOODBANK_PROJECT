import { AdminModel } from "../models/AdminModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
export const AdminController = {
    createAdmin: async (req, res) => {
        try {
            const { firstName, lastName, email, password, role } = req.body
            let admin = await AdminModel.findOne({ email })
            if (admin) {
                return res.status(500).send({
                    success: false,
                    message: "Email Already Registered"
                });
            }

            let hashPasw = await bcrypt.hash(password, 10)
            const newAdmin = AdminModel({
                firstName,
                lastName,
                email,
                password: hashPasw,
                role
            })
            await newAdmin.save()
            res.status(201).send({
                success: true,
                message: "New Admin Created"
            })
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error!", error });
        }
    },
    adminLogin: async (req, res) => {
        const { email, password } = req.body;

        try {

            const loginAdmin = await AdminModel.findOne({ email });
            // console.log(loginUser);
            if (!loginAdmin) {
                return res.status(404).send({
                    success: false,
                    message: "User Not Found"
                });
            }

            // Şifrə yoxlanması
            const checkPasw = await bcrypt.compare(password, loginAdmin.password);
            // console.log(checkPasw);
            if (!checkPasw) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid Credentials"
                });
            }
            if (loginAdmin.role !== "admin") {
                return res.status(403).send({ success: false, message: "Access denied! Not an admin." });
            }
            // token
            const token = jwt.sign({ id: loginAdmin._id, email: loginAdmin.email, role: loginAdmin.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
            console.log("token" + token);
            // Doğrulama linki 
            const verificationLink = `http://localhost:${process.env.PORT}/verify/${token}`;
            let mailOptions = {
                from: process.env.NODEMAILER_USER_GMAIL,
                to: loginAdmin.email,
                subject: "Please verify your email",
                html: `<h4>Click the following link to verify your email: <a href="${verificationLink}">Verify Email</a></h4>`
            };

            // Mail göndərme
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


            // Mail göndərme
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).send({ success: false, message: "Email sending failed", error });
                }
                console.log("Email sent successfully: " + info.response);
                res.status(200).send({ success: true, message: "Verification email sent" });
            });



        } catch (error) {
            console.error("Login error:", error); // Hata izləmə
            res.status(500).send({
                success: false,
                message: "Server Error, Please try again later."
            });
        }
    },
    verifyEmail: async (req, res) => {
        try {

            const token = req.headers.authorization.split(" ")[1];

            if (!token) {
                return res.status(400).json({ success: false, message: "No token provided" });
            }
            const { id, email } = jwt.verify(token, process.env.JWT_SECRET);


            let verifyUser = await AdminModel.findOne({ email });


            if (!verifyUser) {
                return res.status(404).send({
                    success: false,
                    message: "User Not Found"
                });
            }


            verifyUser.isEmailVerified = true;


            await verifyUser.save();


            res.status(200).send({
                success: true,
                message: "Email successfully verified",
                verifyUser
            });

        } catch (error) {
            console.error("Verification failed:", error);
            res.status(500).send({
                success: false,
                message: "Invalid or expired token",
                error
            });
        }
    }
}