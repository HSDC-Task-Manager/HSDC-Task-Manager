const db = require("../models/pgModel");

const workspaceController = {};

// TODO Implement this over the userController's getBoardID to allow users to select from mutliple workspaces
workspaceController.getWorkspaces = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const query = await db.query(
      "SELECT boards.id, boards.name FROM workspace INNER JOIN users ON workspace.user_id = users.id INNER JOIN boards ON workspace.board_id = boards.id WHERE workspace.user_id = $1;",
      userID
    );
    //note, only index 0 while we only have 1 board
    res.locals.boards = query.rows;
  } catch (error) {
    return next({
      log: "error in userController.getBoardIds",
      message: { err: "userController.getBoardIds" + error },
    });
  }
};

module.exports = workspaceController;
