const mongoose = require('mongoose');
const {databaseURI}=require("../config/config")
const mongoURI = databaseURI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("DATABASE CONNECTED"))
.catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;
