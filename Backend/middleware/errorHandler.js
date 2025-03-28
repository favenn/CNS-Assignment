const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode || 400;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "validation error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    default:
      console.log("no error");
      break;
  }
};

module.exports = errorHandler;
