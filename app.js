

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// eslint-disable-next-line no-undef
const {PORT = 3000} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "63287386af88d76bbfad1040",
  };

  next();
});

app.use("/users",require("./routes/users"));
app.use("/cards",require("./routes/cards"));

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});

