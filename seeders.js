const mongoose = require("mongoose");
const PopulateSeeders = require("./seeders/index");

require("dotenv").config();

// DB Conexion
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tyxmr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to ${process.env.DBNAME} db`))
  .catch((e) => console.log("error db:", e));

PopulateSeeders();
