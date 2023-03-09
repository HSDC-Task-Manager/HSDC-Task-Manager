import React, { useContext } from "react";
import UserContext from "../UserContext";

// EXAMPLE HUGH OBJECT
/*
[{
  "column_id": 2,
  "column_name": "Add test card 2",
  "board_id": 2,
  "cards": [{
    "card_id": 2,
    "card_body": "this is the second test card",
    "card_name": "Test Card 2"
  },{cards...}]
}, {columns...]
*/

// cards is drilled down from state in Column.jsx
const Card = ({ boardId, columnId, cardId, cardName, cardBody }) => {
  const { userId } = useContext(UserContext);
  return (
    <div>
      <div>{cardName}</div>
      <div>{cardBody}</div>
    </div>
  );
};

export default Card;
