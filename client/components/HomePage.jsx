import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import BoardContext from "../BoardContext";
import Column from "./Column";
import request from "../request";
import { render } from "react-dom";
import AddColumnBtn from "./buttons/AddColumnBtn";
//sql inject on them
// CSRF on them
// XSS on them
// reported to NSA
// edward snowden
// kilroy was here
// sussy bakas
// sorry :(
//REPORTED CoC violations section 103.c-2.0
function HomePage() {
  // TODO: refactor state as necessary upon completion of other components - CS
  const { username, userId, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [currBoardID, setCurrBoardID] = useState("");
  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();

  // EXAMPLE HUGH OBJECT
  /*
  [{
    "column_id": 2,
    "column_name": "Add test card 2",
    "board_id": 2,
    "cards": [{
      "card_id": 2,
      "card_body": "this is the second test card",
      "card_name": "Test Card 2"
    },{cards...}]
  }, {columns...]
  */

  // fetch the data from the backend -- can be moved to a different file later
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const results = await fetch("/someEndPoint");
  //       // result will be an array of objects, we need to store the columns in the columns state
  //       const allColumns = [];
  //       results.forEach((obj) => {
  //         const cardsFromColumn = obj.cards;
  //         const columnName = obj.column_name;
  //         allColumns.push(
  //           <Column
  //             key={columnId}
  //             columnName={columnName}
  //             userId={userId}
  //             boardId={boardId}
  //             cards={cardsFromColum}
  //             columns={columns}
  //             setColumns={setColumns}
  //           />
  //         );
  //       });
  //       setColumns(allColumns);
  //     } catch (error) {
  //       console.log("Error fetching data from database in HomePage.jsx", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // fetches data from the server and stores the data in the boardData state
  // useEffect(() => {
  //   // request.Boards(username, setBoardData, setCurrBoardID);
  //   const renderColumns = columns.map((column) => {});
  // }, [columns]);

  useEffect(() => {
    console.log("columns.length in HomePage.jsx: ", columns.length);
  }, [columns]);

  // TODO: add functionality on logout to end the user session - DN?
  const routeToSignIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleDeleteColumn = (e, columnId) => {
    e.preventDefault();
    // console.log("Delete button pressed in Column.jsx");
    // const updatedColumns = [];
    // columns.forEach((col) => {
    //   if (col.props.columnId !== columnId) {
    //     updatedColumns.push(col);
    //   }
    // });
    const updatedColumns = columns.filter(
      (col) => col.props.columnId !== columnId
    );
    setColumns(updatedColumns);
  };

  return (
    <BoardContext.Provider value={{columns, setColumns}}>
      <div className="homeCont">
        <header className="homeHeader">
          <h1>Home Page</h1>
          <button className="logOut" type="button" onClick={routeToSignIn}>
            LOG OUT
          </button>
        </header>
        <div className="boardDisplay">
          <div className="column-container">{columns}</div>
          <div>
            <AddColumnBtn columns={columns} setColumns={setColumns} />
          </div>
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default HomePage;
