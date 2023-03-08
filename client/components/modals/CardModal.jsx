import React from 'react';

function CardModal({ showCardModal, setShowCardModal }) {
  const addTask = () => {
    const newCard = document.querySelector('card-modal-input').value;
    setShowCardModal(!showCardModal);
  };

  const deleteTask = () => {
    setShowCardModal(!showCardModal);
  };

  return (
    <div className="modal-home">
      <form className="modal-form">
        <h1>ADD CARD</h1>
        <input className="card-modal-input" type="text" required placeholder="add a task" />
      </form>
      <div className="modal-button-cont">
        <button className="modal-text-button" type="button" onClick={() => addTask()}>
          ADD CARD
        </button>
        <button className="modal-text-button" type="button" onClick={() => deleteTask()}>
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default CardModal;
