const User = require("../models/userModel");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../models/pgModel");

const workFactor = 15;

const userController = {};

// Create new user
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

// Verify user
// OLD CODE
// userController.verifyUser = (req, res, next) => {
//   const { username, password } = req.body;

//   // ERROR HANDLING
//   if (!username || !password) {
//     console.log(
//       "Error in userController.verifyUser: username and password must be provided"
//     );
//     return next("username and password must be provided");
//   }

//   // check if req.body.username matches a username in the database

//   User.findOne({ username: username })
//     .exec()
//     .then((user) => {
//       if (!user || password !== user.password) {
//         console.log("no password match");
//         return res.redirect("/signup");
//       }
//       // valid user
//       else {
//         console.log("res.locals: ", res.locals);
//         res.locals.user = user; // _id, username, password, boardIDs
//         // NOTE: Please work the following line into the SQL refactor promise resolution of user validation to preserve session auth:
//         req.session.loggedIn = true;
//         return next();
//       }
//     })
//     .catch((err) => {
//       return next({
//         log: "userController.verifyUser",
//         message: { err: "userController.verifyUser" + err },
//       });
//     });
// };

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

/* * * *
 * TODO - can add any of the following we wish to have stored in the session as well:
 * * req.session.email = email;
 * * req.session.username = username;
 * * req.session.userID = id;
 * source for these variables should be from request body destructuring.
 * * * */

// Old mongo query
// userController.getBoardIds = (req, res, next) => {
//   console.log("running userController.getBoardIds. req.body: ", req.body);
//   let { username } = req.body;

//   User.findOne({ username })
//     .exec()
//     .then((response) => {
//       res.locals.boardIds = response.board_ids;
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: "error in userController.getBoardIds",
//         message: { err: "userController.getBoardIds" + err },
//       });
//     });
// };

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
