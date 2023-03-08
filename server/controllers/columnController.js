const columnController = {};
columnController.addColumn = (req, res, next) => {
  try {
    console.log("columnController.addColumn");
    console.log("req.body: ", req.body);
    return next();
  } catch (error) {
    return next({
      err: { err: `Error in columnController.addColumn: ${error}` },
    });
  }
};

module.exports = columnController;
