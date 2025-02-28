const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
const corsOptions = {
    origin: "https://codrify.site", // Replace with your frontend URL
    methods: "POST", // Allow only POST requests
    allowedHeaders: ["Content-Type"], // Allow only Content-Type header
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Handle preflight requests
app.options('/api/send-email', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://codrify.site');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(204); // No content for preflight requests
});

// Routes
app.use("/api", emailRoutes); // Mount email routes at /api

// Start the server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});