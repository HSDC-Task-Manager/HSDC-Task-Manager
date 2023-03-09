const express = require("express");
const router = express.Router();
const columnController = require("../controllers/columnController");
//CRUD -- COLUMNS
//add
router.post("/add", columnController.addColumn, (req, res) => {
  res.status(200).json("added columnController");
});
router.post("/delete", columnController.deleteColumn, (req, res) => {
  res.status(200).json("removed columnController");
});

module.exports = router;
