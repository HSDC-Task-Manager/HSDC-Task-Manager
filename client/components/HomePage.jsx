import React, { Component, useState, useEffect } from 'react';
import { ColumnModal, CardModal } from './Modals.jsx';
import Column from './Column.jsx';

function HomePage({ user, isLoggedIn, setLogin }) {
  // state to render a column creation modal
  const [showColumnModal, setShowColumnModal] = useState(false);
  // state to render a card creation modal
  const [showCardModal, setShowCardModal] = useState(false);
  // const [columnsState, setColumns] = useState(null);
  const [boardData, setBoardData] = useState([]);
  const [currBoardID, setCurrBoardID] = useState('');

  // render columns and cards within
  // [
  //   {
  //       "_id": "640635f9e846af21bdd5652e",
  //       "boardName": "testBoard",
  //       "columns": [
  //           {
  //               "_id": "64065a6f664404268f5fc975",
  //               "columnName": "col1",
  //               "cards": [
  //                   {
  //                       "_id": "64065a6f664404268f5fc976",
  //                       "cardText": "hello, I'm a card!"
  //                   }
  //               ]
  //           }
  //       ]
  //   }
  // ]
  // This is real code do not delete:
  let renderColumns = [];

  useEffect(() => {
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBoardData(data);
        setCurrBoardID(data[0]._id);
      })
      .catch((error) => {
        console.log('Error fetching boardData in APP.jsx:', error);
      });
  }, [isLoggedIn]);

  console.log('BOARD DATA', boardData);

  if (boardData.length !== 0) {
    renderColumns = boardData[0].columns.map((column, index) => (
      <Column
        key={index}
        columnName={column.columnName}
        cards={column.cards}
        setShowCardModal={setShowCardModal}
      />
    ));
  }
  let overlay = null;

  if (showColumnModal || showCardModal) overlay = <div className="overlay" />;
  else overlay = null;

  return (
    <div className="homeCont">
      {overlay}

      <header className="homeHeader">
        <h1> Home Page </h1>
        <button className="logOut" onClick={() => setLogin(false)}>
          LOG OUT
        </button>
      </header>

      <div className="boardDisplay">
        <div className="modal-box">
          {/* when showModal is set to true a column modal will render */}
          {/* having issues with page re-rendering when state is updated. modal does not stay up */}
          {/* {showColumnModal && <ColumnModal showColumnModal={showColumnModal} setShowColumnModal={setShowColumnModal} />} */}
          {showColumnModal ? (
            <ColumnModal
              showColumnModal={showColumnModal}
              setShowColumnModal={setShowColumnModal}
              showCardModal={showCardModal}
              setShowCardModal={setShowCardModal}
              boardData={boardData}
              currBoardID={currBoardID}
              setBoardData={setBoardData}
            />
          ) : (
            <></>
          )}
          {showCardModal ? (
            <CardModal showCardModal={showCardModal} setShowCardModal={setShowCardModal} />
          ) : (
            <></>
          )}
        </div>
        <div className="column-container">{renderColumns}</div>
        <div>
          <button className="addColumn" onClick={() => setShowColumnModal(true)}>
            ADD COLUMN
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
