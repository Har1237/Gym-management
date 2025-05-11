const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Gym-Backend")
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });
