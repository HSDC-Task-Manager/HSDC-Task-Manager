const User = require("../models/userModel");
const path = require("path");

const userController = {};

// Create new user
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      log: "userController.createUser",
      message: {
        err: "userController.createUser: username and password must be provided",
      },
    });
  }
  User.create({ username, password })
    .then((user) => {
      res.locals.user = user;
      // NOTE: Please work the following line into the SQL refactor promise resuolution of user creation to preserve session auth:
      req.session.loggedIn = true;
      next();
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log(err);
        return next({
          log: "userController.verifyUser",
          status: 400,
          message: { err: "username already exists" },
        });
      }
      return next({
        log: "userController.verifyUser",
        message: { err: "userController.verifyUser" + err },
      });
    });
};

// Verify user
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  // ERROR HANDLING
  if (!username || !password) {
    console.log(
      "Error in userController.verifyUser: username and password must be provided"
    );
    return next("username and password must be provided");
  }

  // check if req.body.username matches a username in the database

  User.findOne({ username: username })
    .exec()
    .then((user) => {
      if (!user || password !== user.password) {
        console.log("no password match");
        return res.redirect("/signup");
      }
      // valid user
      else {
        console.log("res.locals: ", res.locals);
        res.locals.user = user; // _id, username, password, boardIDs
        // NOTE: Please work the following line into the SQL refactor promise resolution of user validation to preserve session auth:
        req.session.loggedIn = true;
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: "userController.verifyUser",
        message: { err: "userController.verifyUser" + err },
      });
    });
};

/* * * *
 * TODO - can add any of the following we wish to have stored in the session as well:
 * * req.session.email = email;
 * * req.session.username = username;
 * * req.session.userID = id;
 * source for these variables should be from request body destructuring.
 * * * */

userController.getBoardIds = (req, res, next) => {
  console.log("running userController.getBoardIds. req.body: ", req.body);
  let { username } = req.body;

  User.findOne({ username })
    .exec()
    .then((response) => {
      res.locals.boardIds = response.board_ids;
      return next();
    })
    .catch((err) => {
      return next({
        log: "error in userController.getBoardIds",
        message: { err: "userController.getBoardIds" + err },
      });
    });
};

module.exports = userController;
