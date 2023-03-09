const path = require("path");
const db = require("../models/pgModel");

const userController = {};

// Create new user
userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userVals = [username, password];
    const query = await db.query(
      "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING id;",
      userVals
    );
    console.log("returned id is, ", query.rows);
    res.locals.id = query.rows[0].id;
    req.session.loggedIn = true;
    req.session.userID = id;
    return next();
  } catch (err) {
    return next({
      log: "ERROR IN userController.createUser",
      message: {
        err: "userController.createUser: username and password must be provided",
      },
    });
  }
};

//TODO test parameterized query to ensure it works. - NN
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userVals = [username, password];
    const query = await db.query(
      "SELECT id FROM users WHERE user_name=$1 AND password=$2;",
      userVals
    );
    res.locals.verifiedUser = query !== [];
    res.locals.id = query.rows[0].id;
    req.session.loggedIn = true;
    req.session.userID = id;
    return next();
  } catch (error) {
    return next({
      log: "userController.verifyUser",
      message: { err: "userController.verifyUser" + error },
    });
  }
};

/* * * *
 * TODO - can add any of the following we wish to have stored in the session as well:
 * * req.session.email = email;
 * * req.session.username = username;
 * * req.session.userID = id;
 * source for these variables should be from request body destructuring.
 * * * */

userController.getBoardIds = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const query = await db.query(
      "SELECT boards.id, boards.name FROM workspace INNER JOIN users ON workspace.user_id = users.id INNER JOIN boards ON workspace.board_id = boards.id WHERE workspace.user_id = $1;",
      userID
    );
    //note, only index 0 while we only have 1 board
    res.locals.boardID = query.rows[0].id;
  } catch (error) {
    return next({
      log: "error in userController.getBoardIds",
      message: { err: "userController.getBoardIds" + error },
    });
  }
};

module.exports = userController;
