const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

router.post("/", cardController.addCard, (req, res) => {
  res.status(200).json(res.locals.id);
});

router.put("/:id", cardController.editCard, (req, res) => {
  res.sendStatus(200);
});

router.delete("/:id", cardController.deleteCard, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
