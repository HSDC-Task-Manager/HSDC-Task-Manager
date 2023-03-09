import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import BoardContext from "../BoardContext";
import Column from "./Column";
import request from "../request";
import { render } from "react-dom";
import AddColumnBtn from "./buttons/AddColumnBtn";

function HomePage() {
  // TODO: refactor state as necessary upon completion of other components - CS
  const { username, userId, isLoggedIn, setIsLoggedIn, boardId, boardData } =
    useContext(UserContext);

  // this is an array of the Column components
  const [columns, setColumns] = useState([]);
  // boolean to display the Column Creator modal
  const [showColumnCreatorModal, setShowColumnCreatorModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const navigate = useNavigate();

  // fetch the data from the backend -- can be moved to a different file later
  useEffect(() => {
    // we use this to filter out the object portion of the boardData state
    const allColumnObjects = [];
    boardData.forEach((board) => {
      allColumnObjects.push(board.columns);
    });
    console.log("All column objects in HomePage.jsx", allColumnObjects);
    // this is is our actual array of Column components
    const allColumns = [];
    allColumnObjects.forEach((obj) => {
      const cardsFromColumn = obj.cards;
      const columnName = obj.column_name;
      const columnId = obj.column_id;
      allColumns.push(
        <Column
          key={columnId}
          columnId={columnId}
          columnName={columnName}
          boardId={boardId}
          cards={cardsFromColumn}
          setColumns={setColumns}
        />
      );
    });
    setColumns(allColumns);
  }, []);

  useEffect(() => {
    console.log("USER ID in HOME PAGE", userId);
    console.log("Columns outside of useEffect in HomePage.jsx: ", columns);
  }, []);

  // TODO: add functionality on logout to end the user session - DN?
  const routeToSignIn = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAddColumnBtnClick = (e) => {
    e.preventDefault();
    console.log("Add column button clicked!");
    setShowColumnCreatorModal(true);
  };

  const handleCreateColumn = async (e) => {
    try {
      e.preventDefault();

      console.log("Column being created");
      // send column name and boardID in post req
      const columnIdRes = await fetch("/column", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardId, newColumnName }),
      });
      // handle returned columnID from server
      const columnId = await columnIdRes.json();
      // set new column as variable
      const newCol = (
        <Column
          key={columnId}
          columnId={columnId}
          columnName={newColumnName}
          boardId={boardId}
          // double check the cards drilling
          cards={[]}
          setColumns={setColumns}
        />
      );
      // update column list in state with new column
      setColumns((prevColumns) => {
        return [...prevColumns, newCol];
      });
      setNewColumnName("");
    } catch (err) {
      console.log("ERROR in handleCreateColumn", err);
    }
  };

  const handleNameChange = (e) => setNewColumnName(e.target.value);

  const handleCancelClick = (e) => {
    setShowColumnCreatorModal(false);
    setNewColumnName("");
  };

  return (
    <div className="homeCont">
      <header className="homeHeader">
        <div className="home-page-title">Home Page</div>
        <div className="navBarButtons">
          <button
            className="addColumn"
            type="button"
            onClick={handleAddColumnBtnClick}
          >
            ADD COLUMN
          </button>
          <button className="logOut" type="button" onClick={routeToSignIn}>
            LOG OUT
          </button>
        </div>
      </header>
      {showColumnCreatorModal && (
        <div className="">
          <form className="" onSubmit={handleCreateColumn}>
            <label>
              <input className="" type="text" onChange={handleNameChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      )}
      <div className="boardDisplay">{columns}</div>
    </div>
  );
}

export default HomePage;

// DUMMY DATA TO RENDER
/*
[
    {
        "columns": {
            "column_id": 7,
            "column_name": "In Progress",
            "board_id": 4,
            "cards": [
                {
                    "card_id": 10,
                    "card_body": "Switch styling to match color board.",
                    "card_name": "Update Styling"
                },
                {
                    "card_id": 11,
                    "card_body": "Review code and refactor.",
                    "card_name": "Optimize Rendering"
                },
                {
                    "card_id": 12,
                    "card_body": "Add testing for future TDD and ensuring current features work as intended.",
                    "card_name": "Testing"
                }
            ]
        }
    },
    {
        "columns": {
            "column_id": 8,
            "column_name": "Completed",
            "board_id": 4,
            "cards": [
                {
                    "card_id": 8,
                    "card_body": "Replace conditional rendering with router to enhance UI/UX and codebase readability",
                    "card_name": "Implement React Router"
                },
                {
                    "card_id": 9,
                    "card_body": "Modularize components for reusability.",
                    "card_name": "Refactor Components"
                }
            ]
        }
    }
]

*/

// IDEAL DUMMY DATA TO RENDER
/*
[
  {
    "column_id": 7,
    "column_name": "In Progress",
    "board_id": 4,
    "cards": [
        {
            "card_id": 10,
            "card_body": "Switch styling to match color board.",
            "card_name": "Update Styling"
        },
        {
            "card_id": 11,
            "card_body": "Review code and refactor.",
            "card_name": "Optimize Rendering"
        },
        {
            "card_id": 12,
            "card_body": "Add testing for future TDD and ensuring current features work as intended.",
            "card_name": "Testing"
        }
    ]
  },
  {
    "column_id": 8,
    "column_name": "Completed",
    "board_id": 4,
    "cards": [
        {
            "card_id": 8,
            "card_body": "Replace conditional rendering with router to enhance UI/UX and codebase readablity",
            "card_name": "Implement React Router"
        },
        {
            "card_id": 9,
            "card_body": "Modularize components for reusability.",
            "card_name": "Refactor Components"
        }
      ] 
  }
]
*/
