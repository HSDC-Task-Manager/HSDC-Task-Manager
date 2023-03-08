import React from 'react';
import CardModal from './CardModal';

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
        <button className="modal-text-button" type="button" onClick={() => saveData()}>
          SAVE
        </button>
        <button className="modal-text-button" type="button" onClick={() => deleteData()}>
          DELETE
        </button>
      </div>

      {showCardModal && <CardModal />}
    </div>
  );
}

export default ColumnModal;
