const { CustomAPIError } = require("../errors/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ status: "fail", message: err.message });
  }
  res.status(500).json({ status: "fail", message: "Something went wrong" });
};

module.exports = errorHandlerMiddleware;
