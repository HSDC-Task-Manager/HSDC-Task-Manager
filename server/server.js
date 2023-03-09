const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const columnRouter = require("./routers/columnRouter");
const cardRouter = require("./routers/cardRouter");
const boardRouter = require("./routers/boardRouter");
const userRouter = require("./routers/userRouter");
const sessionRouter = require("./routers/sessionRouter");
const workspaceRouter = require("./routers/workspaceRouter");

// setup app and port
const app = express();
const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "q87x6484er46gn64wsef3vbn7iwe",
    resave: false,
    name: "ssid",
    saveUninitialized: false,
  })
);

// enable ALL CORS requests
app.use(cors());

// handle requests for static files (bundle.js)
app.use("/build", express.static(path.resolve(__dirname, "../build")));

// CRUD ROUTERS
app.use("/column", columnRouter);
app.use("/card", cardRouter);
app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/session", sessionRouter);
app.use("/workspace", workspaceRouter);

// server index.html
app.get("/", (req, res) => {
  console.log(`Get request for '/'.  sending index.html`);
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// define catch-all route handler for requests to an unknown route
app.use((req, res) => res.status(404).send("No page found at that location"));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" + err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
