const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.id);
});

router.post("/signup", userController.createUser, (req, res) => {
  res.status(200).json(res.locals.id);
});

module.exports = router;
