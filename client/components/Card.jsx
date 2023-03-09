import React from "react";

const Card = ({ cardId, cardName, cardBody }) => {
  return (
    <div className="card">
      <div>{cardName}</div>
      <div>{cardBody}</div>
    </div>
  );
};

export default Card;
