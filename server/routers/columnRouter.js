const express = require("express");
const router = express.Router();
const columnController = require("../controllers/columnController");
//CRUD -- COLUMNS
router.post("/", columnController.addColumn, (req, res) => {
  res.status(200).json("added columnController");
});
router.post("/delete", columnController.deleteColumn, (req, res) => {
  res.status(200).json("removed columnController");
});

router.put("/:id", columnController.editColumn, (req, res) => {
  res.sendStatus(200);
});

router.delete("/:id", columnController.deleteColumn, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
