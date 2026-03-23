const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

// Route Handlers
const getAllTours = (request, response) => {
  console.log(request.requestTime);
  response.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (request, response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      response.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    },
  );
};

const getTourById = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find((element) => element.id === id);
  //   if (id > tours.length) {
  //     return response.status(404).json({
  //       status: "Fail",
  //       message: "Invalid ID",
  //     });
  //   }
  if (!tour) {
    return response.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  response.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const updateTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  response.status(200).json({
    status: "Success",
    data: {
      tour: "Updated tour here.....",
    },
  });
};

const deleteTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  response.status(204).json({
    status: "Success",
    data: null,
  });
};

const getAllUsers = (request, response) => {
  response.status(500).json({
    status: "Error",
    message: "This route is not yet defined",
  });
};

const createUser = (request, response) => {
  response.status(500).json({
    status: "Error",
    message: "This route is not yet defined",
  });
};

const getUserById = (request, response) => {
  response.status(500).json({
    status: "Error",
    message: "This route is not yet defined",
  });
};

const updateUser = (request, response) => {
  response.status(500).json({
    status: "Error",
    message: "This route is not yet defined",
  });
};

const deleteUser = (request, response) => {
  response.status(500).json({
    status: "Error",
    message: "This route is not yet defined",
  });
};

// Routes

const tourRouter = express.Router();

app.use("/api/v1/tours", tourRouter);

tourRouter.get("/", getAllTours);

tourRouter.post("/", createTour);

tourRouter.get("/:id", getTourById);

tourRouter.patch("/:id", updateTour);

tourRouter.delete("/:id", deleteTour);

// Another way of writing these five endpoints

// app.route("/api/v1/tours").get(getAllTours).post(createTour);

// app
//   .route("/api/v1/tours/:id")
//   .get(getTourById)
//   .patch(updateTour)
//   .delete(deleteTour);

const userRouter = express.Router();

app.use("/api/v1/users", userRouter);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
