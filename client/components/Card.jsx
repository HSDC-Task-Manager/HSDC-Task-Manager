import React from "react";
import { useState } from "react";

const Card = ({
  cardId,
  cardName,
  cardBody,
  allCardsInColumn,
  setAllCardsInColumn,
}) => {
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [newCardBody, setNewCardBody] = useState("");

  const handleDoubleClick = (e) => {
    e.preventDefault();
    console.log("Card was double clicked!");
    setNewCardName(cardName);
    setNewCardBody(cardBody);
    setShowEditCardModal(true);
  };

  const editCard = async (e) => {
    try {
      const response = await fetch(`/card/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCardName, body: newCardBody }),
      });
      setAllCardsInColumn((prevCards) => {
        return prevCards.map((card) => {
          if (card.props.cardId === cardId) {
            return (
              <Card
                key={card.props.cardId}
                cardId={cardId}
                cardName={newCardName}
                cardBody={newCardBody}
                allCardsInColumn={allCardsInColumn}
                setAllCardsInColumn={setAllCardsInColumn}
              />
            );
          } else return card;
        });
      });
      setShowEditCardModal(false);
      setNewCardName("");
      setNewCardBody("");
    } catch (error) {
      console.log("Error with fetch in Card.jsx: ", error);
    }
  };

  const handleDeleteCard = async (e) => {
    e.preventDefault();
    const response = await fetch(`/card/${cardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setAllCardsInColumn((prevCardData) => {
      return prevCardData.filter((card) => {
        console.log("Card in handleDeleteCard", card);
        return card.props.cardId !== cardId;
      });
    });
  }

  const handleCancelClick = (e) => {
    setShowEditCardModal(false);
    setNewCardName("");
    setNewCardBody("");
  };

  return (
    <div className="card" onDoubleClick={handleDoubleClick}>
      {!showEditCardModal && (
        <>
          <div>{cardName}</div>
          <div>{cardBody}</div>
        </>
      )}

      {showEditCardModal && (
        <>
          <form>
            <label>
              <input
                type="text"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                value={newCardBody}
                onChange={(e) => setNewCardBody(e.target.value)}
              />
            </label>
            <button
              className="card-confirm-button"
              type="button"
              onClick={editCard}
            >
              Submit
            </button>
          </form>
          <button
            className="delete-card-button"
            type="button"
            onClick={handleDeleteCard}
          >
            DELETE
          </button>
          <button
            className="card-cancel-button"
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
