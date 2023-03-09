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

columnController.deleteColumn = (req, res, next) => {
  try {
    console.log("columnController.deleteColumn");
    console.log("req.body: ", req.body);
  } catch (error) {
    return next({
      err: { err: `Error in columnController.deleteColumn: ${error}` },
    });
  }
};

module.exports = columnController;
