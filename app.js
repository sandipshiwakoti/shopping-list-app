const express = require("express");
const app = express();
const shopping = require("./routes/shopping");
const connectDB = require("./db/connect");
require("dotenv").config();
const notfound = require("./middleware/notfound");
const errorHandler = require("./middleware/errorHandler");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/shopping", shopping);
app.use(notfound);
app.use(errorHandler);

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ShoppingBag";
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(URI); //process.env.MONGODB_URI
    app.listen(port, () => {
      console.log("Listening..");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
