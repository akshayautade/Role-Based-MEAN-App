const express = require('express');
const Router = require("./routes/index");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", Router);
mongoose.connect('mongodb://localhost:27017/mydb', () => {
    console.log("Connected to DB")
});
app.listen(3000, () => {
    console.log("Server is running....");
})