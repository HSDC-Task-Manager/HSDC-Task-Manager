const express = require("express");
const router = express.Router();
const session = require("express-session");
const sessionController = require("../controllers/sessionController");

// Check for active sessions
router.get("/", sessionController.validateSession, (__, res) =>
  res.status(200).send(res.locals)
);
// Delete session on logout
//NEW
router.delete("/", sessionController.deleteSession, (__, res) =>
  res.sendStatus(200)
);

module.exports = router;
