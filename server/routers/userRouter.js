const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const boardController = require('../controllers/boardController');

router.post(
  "/login",
  userController.verifyUser,
  userController.getBoardIds,
  boardController.getBoard,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);
//id : res.locals.id, boardID : res.locals.boardID

router.post("/signup", userController.createUser, (req, res) => {
  res.status(200).json(res.locals.id);
});

module.exports = router;
