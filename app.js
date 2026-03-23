const fs = require("fs");
const express = require("express");

const app = express();

// To use middleware -> which help in getting the request.body object inside the callback function.
app.use(express.json());

app.use((request, response, next) => {
  console.log("Hello from the middleware!👋🏻");
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

const getAllTours = (request, response) => {
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

app.get("/api/v1/tours", getAllTours);

app.post("/api/v1/tours", createTour);

app.get("/api/v1/tours/:id", getTourById);

app.patch("/api/v1/tours/:id", updateTour);

app.delete("/api/v1/tours/:id", deleteTour);

// Another way of writing these five endpoints

// app.route("/api/v1/tours").get(getAllTours).post(createTour);

// app
//   .route("/api/v1/tours/:id")
//   .get(getTourById)
//   .patch(updateTour)
//   .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
