const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

// Route Handlers
exports.getAllTours = (request, response) => {
  console.log(request.requestTime);
  response.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (request, response) => {
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

exports.getTourById = (request, response) => {
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

exports.updateTour = (request, response) => {
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

exports.deleteTour = (request, response) => {
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
