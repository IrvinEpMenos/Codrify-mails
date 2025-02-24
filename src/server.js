const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
const corsOptions = {
    origin: "https://codrify.site", // Reemplaza con la URL de tu sitio en Netlify
    methods: "POST",
    allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use("/api", emailRoutes); // Montar las rutas de email en /api

// Start the server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});