const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Puerto para SSL
    secure: true,
    auth: {
        user: "21307011@utcgg.edu.mx", // Tu correo Gmail
        pass: "kjegidrzqxspwfpl", // Contraseña o app password de Gmail
    },
});

// Ruta para manejar el envío de correos
app.post("/send-email", (req, res) => {
    const { name, company, phone, subject } = req.body;

    const mailOptions = {
        from: "21307011@utcgg.edu.mx",
        to: ["21307007@utcgg.edu.mx"], // Destinatario
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
                filename: "./src/assets/img/logoC.png",
                path: "./src/assets/img/logoC.png", // Asegúrate de que la ruta sea correcta
                cid: "logoC", // Referencia para usar en el HTML
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error al enviar el correo");
        } else {
            res.status(200).send("Correo enviado correctamente");
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
