const express = require("express");
// const cors = require("cors");  // ❌ Comentar o eliminar
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
// app.use(cors()); // ❌ Eliminar o comentar para desactivar CORS
app.use(bodyParser.json());

// Routes
app.use("/api", emailRoutes); // Montar las rutas de email en /api

// Start the server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
