const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
//Routes
const authRoutes = require("./routes/auth");
const dashboadRoutes = require("./routes/private/dashboard");
const verifyToken = require("./middleware/validate-token");

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

// DB Conexion
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tyxmr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${process.env.DBNAME} db`))
  .catch((e) => console.log("error db:", e));

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
