const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspaceController");

router.get("/", workspaceController.getWorkspaces, (req, res) => {
  res.status(200).json(res.locals.boards);
});

module.exports = router;
