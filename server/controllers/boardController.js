// const Board = require("../models/boardModel");
// const mongoose = require('mongoose');

const db = require("../models/pgModel");

const boardController = {};
/* previous mongo query */
// boardController.getBoards = (req, res, next) => {
//   console.log('running boardController.getBoard. res.locals: ', res.locals)
//   let { boardIds } = res.locals;

//   Board.find({_id: {$in: boardIds}})
//     .then(response => {
//       res.locals.boards = response;
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: "error in boardController.getBoards",
//         message: { err: "boardController.getBoards" + err },
//       });
//     });
// };

boardController.getBoards = async (req, res, next) => {
  try {
    // jsonb_agg(json_build_object(‘name’, nameval, ‘columns’, jsonb_agg(json_build_object(…..))
    const query = await db.query("SELECT * FROM boards.......");
    res.locals.boards = query.rows;
    return next();
  } catch (error) {
    return next({
      log: "error in boardController.getBoards",
      message: { err: "boardController.getBoards" + err },
    });
  }
};

module.exports = boardController;
