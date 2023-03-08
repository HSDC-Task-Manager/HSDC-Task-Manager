import React, { Component, useState, useEffect } from 'react';
// import { CardModal } from "./Modals";

function Column({ columnName, cards, setShowCardModal }) {
  const renderCards = cards.map((card, index) => (
    <div key={index} className="card">
      {card.cardText}
    </div>
  ));

  return (
    <div className="columnCont">
      <div>{columnName}</div>
      <div className="cardCont">{renderCards}</div>
      <button onClick={() => setShowCardModal(true)}>ADD CARD</button>
    </div>
  );
}

export default Column;
