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
    req.session.userID = query.rows[0].id;
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
    const { id } = res.locals;
    const query = await db.query(
      "SELECT boards.id, boards.name FROM workspaces INNER JOIN users ON workspaces.user_id = users.id INNER JOIN boards ON workspaces.board_id = boards.id WHERE workspaces.user_id = $1;",
      [id]
    );
    //note, only index 0 while we only have 1 board
    console.log("query rows are ", query.rows[0].id);
    res.locals.boardID = query.rows[0].id;
    return next();
  } catch (error) {
    return next({
      log: "error in userController.getBoardIds",
      message: { err: "userController.getBoardIds" + error },
    });
  }
};

module.exports = userController;

// TODO: USE THIS CODE TO RE-IMPLEMENT BCRYPT - NN
/*

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, workFactor);
    const userVals = [username, hashPassword];
    const query = await db.query(
      "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING id;",
      userVals
    );

    res.locals.id = query.rows[0].id;
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

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, workFactor);
    const userVals = [username];
    const query = await db.query(
      "SELECT id, password FROM users WHERE user_name=$1;",
      userVals
    );
    bcrypt
      .compare(hashPassword, query.rows[0].password)
      .then((result) => {
        // res.locals.verifiedUser = query !== [];
        res.locals.id = query.rows[0].id;
        return next();
      })
      .catch((error) => {
        return next({
          log: "userController.verifyUser",
          message: {
            err: "userController.verifyUser: Invalid username or password.",
          },
        });
      });
  } catch (error) {
    return next({
      log: "userController.verifyUser",
      message: { err: "userController.verifyUser: Internal Error" + error },
    });
  }
};
*/
