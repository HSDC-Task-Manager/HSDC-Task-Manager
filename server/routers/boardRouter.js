const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

router.get("/", boardController.getBoard, (req, res) => {
  res.status(200).json(res.locals.board);
});

module.exports = router;
