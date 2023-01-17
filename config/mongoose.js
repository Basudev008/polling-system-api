// importing mongoose library
const mongoose = require("mongoose");

// connecting to localhost/system server
// also tells the name of database which we are connecting to
// mongoose.connect('mongodb://localhost/issue_tracker_db');
// const uri = "mongodb+srv://atish:Atish@123@cluster0.qvbjs.mongodb.net/issue_tracker_db?retryWrites=true&w=majority";
// mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },
//     () => console.log(" Mongoose is connected"));
let MONGODB_URL =
  "mongodb+srv://basudev008:RQVUjKtD3iNRLp3L@pollingdb.75mickm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL, {
  //useNewUrlParser: true,
  //   useFindAndModify: false,
  //useUnifiedTopology: true,
});

//connection between database and mongoose is accessed by below code
const db = mongoose.connection;

// if connection gets error
db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", console.error.bind(console, "connection error to db:"));

// onces we get access to db or connection between database

module.exports = db;
