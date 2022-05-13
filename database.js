const mongoose = require("mongoose");

// For cloud mongoDB connection
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tyxmr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// For local mongoDB connection
const localUri = "mongodb://mongo/apidatabase";

// Choose uri or localUri in the connection section to work wil local or cloud DB
mongoose
  .connect(localUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log(`Connected to ${process.env.DBNAME} db [npm run dev]`)
  )
  .catch((e) => console.log("error db:", e));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
