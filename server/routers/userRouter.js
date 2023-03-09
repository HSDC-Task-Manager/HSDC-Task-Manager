const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post(
  "/login",
  userController.verifyUser,
  userController.getBoardIds,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);
//id : res.locals.id, boardID : res.locals.boardID

router.post("/signup", userController.createUser, (req, res) => {
  res.status(200).json(res.locals.id);
});

module.exports = router;
