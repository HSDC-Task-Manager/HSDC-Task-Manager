import React from "react";
import AddCard from "../AddCard";

const AddCardBtn = ({ allCardsInColumn, setAllCardsInColumn }) => {
  const AddNewCard = () => {
    console.log("in AddNewCard");
    const newCards = [
      ...allCardsInColumn,
      <AddCard
        allCardsInColumn={allCardsInColumn}
        setAllCardsInColumn={setAllCardsInColumn}
      />,
    ];
    setAllCardsInColumn(newCards);
  };

  return (
    <div>
      <button className="addCard" type="button" onClick={AddNewCard}>
        ADD CARD
      </button>
    </div>
  );
};

export default AddCardBtn;
