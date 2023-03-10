const db = require("../models/pgModel");

const columnController = {};

columnController.addColumn = async (req, res, next) => {
  try {
    console.log("columnController.addColumn");
    console.log("req.body: ", req.body);
    const { boardId, newColumnName } = req.body;
    const columnVals = [newColumnName, boardId];
    const addColumnQ =
      "INSERT INTO lists (name, board_id) VALUES ($1, $2) RETURNING id;";
    const query = await db.query(addColumnQ, columnVals);
    console.log("insert column successful with ", query.rows);
    res.locals.id = query.rows[0].id;
    return next();
  } catch (error) {
    return next({
      err: { err: `Error in columnController.addColumn: ${error}` },
    });
  }
};

columnController.editColumn = async (req, res, next) => {
  try {
    const { columnName } = req.body;
    const { id } = req.params;
    const colVals = [id, columnName];
    const query = await db.query(
      "UPDATE lists SET name = $2 WHERE lists.id = $1;",
      colVals
    );
    return next();
  } catch (err) {
    return next({
      log: "ERROR in columnController.editColumn",
      message: { err: "columnController.editColumn", err },
    });
  }
};

columnController.deleteColumn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await db.query("DELETE FROM lists WHERE id = $1", [id]);
    return next();
  } catch (err) {
    return next({
      log: "ERROR in columnController.deleteColumn",
      message: { err: "columnController.deleteColumn ", err },
    });
  }
};

module.exports = columnController;
