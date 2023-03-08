const columnController = {};
columnController.addColumn = (req, res, next) => {
  console.log("columnController -- REQ.BODY: ", req.body);
  return next();
};

module.exports = columnController;
