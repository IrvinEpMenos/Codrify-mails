const express = require("express");
const router = express.Router();
const transporter = require("../config/nodeMailer");
const path = require("path");

// Ruta para manejar el envío de correos
router.post("/send-email", (req, res) => {
    const { name, company, phone, subject } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ["21307011@utcgg.edu.mx"], // Destinatario
        subject: `Nueva solicitud`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #058A8C; padding: 20px; border-radius: 8px; background-color: #050520; color: #fff;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:logoC" alt="Logo" style="max-width: 250px;">
                <h2 style="color: #058A8C;">NUEVA SOLICITUD</h2>
            </div>
            <div style="background-color: #050520; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 16px;"><strong>Nombre:</strong> ${name}</p>
                <p style="font-size: 16px;"><strong>Empresa:</strong> ${company}</p>
                <p style="font-size: 16px;"><strong>Teléfono:</strong> ${phone}</p>
                <p style="font-size: 16px;"><strong>Asunto:</strong> ${subject}</p>
            </div>
            <footer style="text-align: center; color: #fff; font-size: 14px;">
                <p>Este es un mensaje automático, por favor no responda a este correo.</p>
            </footer>
        </div>
        `,
        attachments: [
            {
                filename: "logoC.png",
                path: path.join(__dirname, "../assets/img/logoC.png"), // Ruta absoluta al archivo
                cid: "logoC", // Referencia para usar en el HTML
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: "Error al enviar el correo" });
        } else {
            res.status(200).json({ message: "Correo enviado correctamente" });
        }
    });
});

module.exports = router;