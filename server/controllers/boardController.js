const db = require("../models/pgModel");

const boardController = {};

boardController.getBoard = async (req, res, next) => {
  try {
    // jsonb_agg(json_build_object(‘name’, nameval, ‘columns’, jsonb_agg(json_build_object(…..))
    const { boardID } = res.locals.boardID;
    const qBody = `SELECT row_to_json(lists) AS columns
    FROM (
        SELECT
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
    ) AS lists
    WHERE lists.board_id = $1;`;
    const query = await db.query(qBody, boardID);
    res.locals.board = query.rows;
  } catch (error) {
    return next({
      log: "error in boardController.getBoards",
      message: { err: "boardController.getBoards" + error },
    });
  }
};
/* EXAMPLE RESPONSE FROM DB IF REQUEST BOARDID === 2
[{
  "column_id":2,
  "column_name":"Add test card 2",
  "board_id":2,
  "cards":[{
    "card_id": 2, 
    "card_body": "this is the second test card", 
    "card_name": "Test Card 2"
  }]
}]
*/

module.exports = boardController;
