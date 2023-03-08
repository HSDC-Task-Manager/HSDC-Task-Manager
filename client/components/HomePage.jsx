import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import ColumnModal from './modals/ColumnModal';
import CardModal from './modals/CardModal';
import Column from './Column';

function HomePage() {
  const { username, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [currBoardID, setCurrBoardID] = useState('');

  const navigate = useNavigate();

  let renderColumns = [];

  // fetches data from the server and stores the data in the boardData state
  useEffect(() => {
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
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

  // creates the array of columns to render
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
  // routes back to the sign in page when clicking log out
  // TODO: add functionality on logout to end the user session - DN?
  const routeToSignIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    navigate('/');
  };

  // modal logic
  let overlay = null;

  if (showColumnModal || showCardModal) overlay = <div className="overlay" />;
  else overlay = null;

  return (
    <div className="homeCont">
      {overlay}
      <header className="homeHeader">
        <h1> Home Page </h1>
        <button className="logOut" type="button" onClick={routeToSignIn}>
          LOG OUT
        </button>
      </header>
      <div className="boardDisplay">
        <div className="modal-box">
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
            <div />
          )}
          {showCardModal ? (
            <CardModal showCardModal={showCardModal} setShowCardModal={setShowCardModal} />
          ) : (
            <div />
          )}
        </div>
        <div className="column-container">{renderColumns}</div>
        <div>
          <button className="addColumn" type="button" onClick={() => setShowColumnModal(true)}>
            ADD COLUMN
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
