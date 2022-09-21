const mongoose = require("mongoose");

// mongoose
//   .connect(connection)
//   .then(() => console.log("connected to db..."))
//   .catch((err) => console.log(err));

const connectDb = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDb;
