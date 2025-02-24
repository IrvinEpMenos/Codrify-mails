const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Puerto para SSL
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Tu correo Gmail
        pass: process.env.EMAIL_PASS, // Contraseña o app password de Gmail
    },
});

module.exports = transporter;