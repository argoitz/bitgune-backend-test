const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
//Routes
const authRoutes = require("./routes/auth");
const dashboadRoutes = require("./routes/private/dashboard");
const verifyToken = require("./middleware/validate-token");
const PopulateSeeders = require("./seeders/index");

require("dotenv").config();

const app = express();

// cors
const cors = require("cors");
var corsOptions = {
  origin: "*", // Replace with domain
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Get body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// MongoDB local CONNETION
require("./database");

// seeders
PopulateSeeders();

// Public routes
app.use("/api/user", authRoutes);
app.get("/", (req, res) => {
  res.json({
    estado: true,
    mensaje: "funciona!",
  });
});

// Private routes middleware
app.use("/api/dashboard", verifyToken, dashboadRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
