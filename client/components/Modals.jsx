import React, { Component, useState, useEffect } from 'react';
import Column from './Column.jsx';

// Modal for the columns
function ColumnModal({
  showColumnModal,
  setShowColumnModal,
  showCardModal,
  setShowCardModal,
  boardData,
  setBoardData,
  currBoardID,
}) {
  const saveData = () => {
    const newColumnName = document.querySelector('.modal-column-input').value;
    const columnName = boardData[0];
    const newBoardData = boardData.map((board) => {
      if (board._id === currBoardID) {
        board.columns.push({
          columnName: newColumnName,
          cards: [{ cardText: "Hello, I'm a new column!" }],
        });
      }
      return board;
    });
    setBoardData(newBoardData);

    console.log('save data button is running');
    setShowColumnModal(!showColumnModal);
    setShowCardModal(!showCardModal);
  };

  const deleteData = () => {
    setShowColumnModal(!showColumnModal);
  };

  return (
    <div className="modal-home">
      <form className="modal-form">
        <h1>ADD COLUMN</h1>
        <input className="modal-column-input" type="text" required placeholder="column name" />
      </form>
      <div className="modal-button-cont">
        <button className="modal-text-button" onClick={() => saveData()}>
          SAVE
        </button>
        <button className="modal-text-button" onClick={() => deleteData()}>
          DELETE
        </button>
      </div>

      {showCardModal && <CardModal />}
    </div>
  );
}

// Modal for the card
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
        <input className="card-modal-input" type="text" required placeholders="add a task" />
      </form>
      <div className="modal-button-cont">
        <button className="modal-text-button" onClick={() => addTask()}>
          ADD CARD
        </button>
        <button className="modal-text-button" onClick={() => deleteTask()}>
          CANCEL
        </button>
      </div>
    </div>
  );
}

export { ColumnModal, CardModal };
