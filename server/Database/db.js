require("dotenv").config();
const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;

const ConnectToMongo = () => {
  mongoose.connect(mongo_uri, () => {
    console.log("Connected to Mongo Succesfully");
  });
};

module.exports = ConnectToMongo;
