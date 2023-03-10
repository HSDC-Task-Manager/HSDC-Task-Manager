const db = require("../models/pgModel");

const boardController = {};

boardController.getBoard = async (req, res, next) => {
  try {
    /* TODO - Once workspaces is fully integrated to allow 
       selecting of different boards,
     change res.locals to req.body; */
    const { boardID } = res.locals;
    const qBody = `SELECT 
    lists.id AS column_id,
    lists.name AS column_name,
    lists.board_id,
      (
        SELECT jsonb_agg(nested_cards)
        FROM (
          SELECT
            cards.id AS card_id,
            cards.name AS card_name,
            cards.text_body AS card_body
          FROM cards
          WHERE cards.list_id = lists.id
        ) AS nested_cards
      ) AS cards
  FROM lists
  WHERE lists.board_id = $1;`
    const query = await db.query(qBody, [boardID]);
    res.locals.board = query.rows;
    return next();
  } catch (error) {
    return next({
      log: "error in boardController.getBoards",
      message: { err: "boardController.getBoards" + error },
    });
  }
};

module.exports = boardController;
