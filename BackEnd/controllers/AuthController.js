
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"


export const AuthController = {
    register: async (req, res) => {
        try {
            const { role, firstName, lastName, username, email, phone, address, password } = req.body
            console.log(username);
            const userByEmail = await UserModel.findOne({ email });
            const userByUsername = await UserModel.findOne({ username });

            if (userByEmail && userByUsername) {
                return res.status(500).send({
                    success: false,
                    message: "Both Username and Email Already Registered. Please Login."
                });
            } else if (userByUsername) {
                return res.status(500).send({
                    success: false,
                    message: "User Name Already Registered"
                });
            } else if (userByEmail) {
                return res.status(500).send({
                    success: false,
                    message: "Email Already Registered"
                });
            }
            //  hash password
            const saltRounds = 10;
            const hashPasw = await bcrypt.hash(password, saltRounds)
            //  create newUser
            const newUser = UserModel({
                role,
                firstName,
                lastName,
                username,
                email,
                phone,
                address,
                password: hashPasw
            })
            await newUser.save()
            res.status(201).send({
                success: true,
                messagge: "Successfully Registered",
                newUser
            })
        } catch (error) {
            // if (error.code === 11000) {
            //     return res.status(400).json({ success: false, message: "Username already exists!" });
            // }
            res.status(500).json({ success: false, message: "Server Error!", error });
        }
    },
    login: async (req, res) => {
        const { email, password, remember } = req.body;

        try {

            const loginUser = await UserModel.findOne({ email });
            // console.log(loginUser);
            if (!loginUser) {
                return res.status(404).send({
                    success: false,
                    message: "User Not Found"
                });
            }

            // Şifrə yoxlanması
            const checkPasw = await bcrypt.compare(password, loginUser.password);
            // console.log(checkPasw);
            if (!checkPasw) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid Credentials"
                });
            }
            // remember
            const expiresIn = remember ? "7d" : "30d"
            // token
            const token = jwt.sign({ id: loginUser._id, email: loginUser.email, role: loginUser.role }, process.env.JWT_SECRET, { expiresIn });
            console.log("token" + token);
            // Doğrulama linki 
            const verificationLink = `http://localhost:5173/verify/${token}`;
            let mailOptions = {
                from: process.env.NODEMAILER_USER_GMAIL,
                to: loginUser.email,
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
                res.status(200).send({ success: true, message: "Verification email sent", token: token });
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
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(400).json({ success: false, message: "Token is missing or invalid" });
            }
    
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            let verifyUser = await UserModel.findOne({ email: decoded.email });
    
            if (!verifyUser) {
                return res.status(404).json({ success: false, message: "User Not Found" });
            }
    
            if (verifyUser.isEmailVerified) {
                return res.status(200).json({ success: true, message: "Email already verified" });
            }
    
            verifyUser.isEmailVerified = true;
            await verifyUser.save();
    
            res.status(200).json({
                success: true,
                message: "Email successfully verified",
                user: verifyUser
            });
    
        } catch (error) {
            console.error("Verification failed:", error);
            res.status(500).json({ success: false, message: "Invalid or expired token", error });
        }
    }
    
    




}