const express = require("express");
const Task = require("./models/task");
require("./db/mongoose");

const userRouter = require("./routers/user");
const TaskRouter = require("./routers/task");
const app = express();

const port = process.env.port || 3000;

app.use(express.json());

app.use(userRouter);
app.use(TaskRouter);

//
app.listen(port, () => {
  console.log("server is up " + port);
});

const pet = {
  name: "abda",
};
