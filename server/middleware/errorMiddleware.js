const errorHandler = (err, req, res, next) => {
  // Determine status code (prefer err.status or default to 500)
  const statusCode = err.status || err.statusCode || 500;

  // Set response status
  res.status(statusCode);

  // Prepare error response
  const errorResponse = {
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
      details: err.details, // Optional: add any additional error details
    }),
  };

  // Send JSON response
  res.json(errorResponse);
};

// For CommonJS (standard in Node.js/Express)
module.exports = errorHandler;

// OR for ES Modules (if using type: "module" in package.json)
// export default errorHandler;
