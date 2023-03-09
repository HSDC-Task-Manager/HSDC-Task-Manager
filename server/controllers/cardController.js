const db = require("../models/pgModel");

const cardController = {};

cardController.getCards = (req, res, next) => {};

cardController.addCard = async (req, res, next) => {
  try {
    const { name, text_body, list_id } = req.body;
    const cardVals = [name, text_body, list_id];
    const query = await db.query(
      "INSERT INTO cards (name, text_body, list_id) VALUES ($1, $2, $3) RETURNING id;",
      cardVals
    );
    res.locals.id = query.rows[0].id;
    return next();
  } catch (error) {
    return next({
      log: "ERROR IN cardController.addCard",
      message: { err: "cardController.addCard" + error },
    });
  }
};

cardController.editCard = async (req, res, next) => {
  try {
    const { id, name, body, listName } = req.body;
    const cardVals = [id, name, body, listName];
    const query = await db.query(
      // TODO - update query for changing cards from one list to another by updating list_id via join/subquery
      // SELECT list_id FROM lists WHERE lists.name=$4
      // JOIN ... ON cards.list_id=lists.id
      "UPDATE cards SET (name, body) VALUES ($2, $3) WHERE cards.id = $1;",
      cardVals
    );
    return next();
  } catch (e) {
    return next({
      log: "ERROR in cardController.editCard",
      message: { err: "cardController.editCard", e },
    });
  }
};

cardController.deleteCard = async (req, res, next) => {
  try {
    const { id } = req.body;
    const query = await db.query("DELETE FROM cards WHERE id = $1", id);
    return next();
  } catch (err) {
    return next({
      log: "ERROR in cardController.deleteCard",
      message: { err: "cardController.deleteCard ", err },
    });
  }
};
