const express = require("express");
const app = express();
const port = 3000;
const taskRoutes = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();

const notFound = require('./controller/not-found');
const errorHandlerMiddleware = require('./controller/error-handler');

// ----------------middleware----------------
app.use(express.static("./public"));
// to get the data in req.body
app.use(express.json());

// ----------------routes----------------

// reqs to "/api/v1/tasks" will be forwarded to `taskRoutes` file which handles
// routes related to tasks
app.use("/api/v1/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);
async function start() {
  // cause we don't want to spin up the server before connecting to db
  // so it there is some error and we can't connect to db, then we don't start the error
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`app listening on port ${port}...`));
  } catch (err) {
    console.log("auth fail error!!");
  }
}
//-----------------------------------------------
// function start() {
//   return new Promise((resolve, reject) => {
//     connectDb(process.env.MONGO_URI);
//     resolve();
//   });
// }

// start()
//   .then(app.listen(port, console.log(`app listening on port ${port}...`)))
//   .catch((err) => console.log("auth failed!"));
start();
