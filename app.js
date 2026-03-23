const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));

// To use middleware -> which help in getting the request.body object inside the callback function.
app.use(express.json());

app.use((request, response, next) => {
  console.log("Hello from the middleware! 👋🏻");
  next();
});

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

// app.get("/", (request, response) => {
//   response
//     .status(200)
//     .json({ message: "Hello from the server side!🖥", app: "Natours" });
// });

// app.post("/", (request, response) => {
//   response.send("You can post to this endpoint...");
// });

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
