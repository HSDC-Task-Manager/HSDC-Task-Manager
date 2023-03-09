import React, { useState, useContext } from "react";
import request from "../request";
import Card from "../components/Card";
import UserContext from "../UserContext";

const AddCard = ({
  boardId,
  columnId,
  allCardsInColumn,
  setAllCardsInColumn,
}) => {
  const { userId } = useContext(UserContext);
  const cardId = 101;

  const [cardName, setCardName] = useState("");
  const [cardBody, setCardBody] = useState("");

  const onSubmitClick = (e) => {
    console.log("Add card button clicked in AddCard.jsx");
    //check that the name/body have content before allowing the user to add a card.
    if (cardName === "") return;
    //check to make sure there isn't already an unnamed card

    e.preventDefault();
    setAllCardsInColumn([
      ...allCardsInColumn,
      <Card
        key={cardId}
        cards={allCardsInColumn}
        setAllCardsInColumn={setAllCardsInColumn}
        cardName={cardName}
        setCardName={setCardName}
        cardBody={cardBody}
        setCardBody={setCardBody}
      />,
    ]);
    cardId++;
  };

  // TODO: This is buggy, when clicking "cancel" it removes the last card in the column -- ALTERNATIVE, change this to a delete last button?
  // I found another bug: click add column, add a column then click "cancel"
  // now you can't add another column
  //saw that too -- was just trying to figure it out
  // gotcha we'll link up and put eyes on it after
  ///<3
  const onCancelClick = (e) => {
    e.preventDefault();
    const newCards = allCardsInColumn.slice(0, -1);
    setAllCardsInColumn([newCards]);
  };

  return (
    <form>
      <input
        type="text"
        onInput={(e) => setCardName(e.target.value)}
        value={cardName}
      />
      <input
        type="text"
        onInput={(e) => setCardBody(e.target.value)}
        value={cardBody}
      />
      <input type="submit" value="Submit" onClick={onSubmitClick} />
      <input type="submit" value="Cancel" onClick={onCancelClick} />
    </form>
  );
};

export default AddCard;
