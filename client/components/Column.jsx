import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import AddCardBtn from "./buttons/AddCardBtn";
import UserContext from "../UserContext";

/*
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
*/

function Column({ columnId, columnName, boardId, cards, setColumns }) {
  const [allCardsInColumn, setAllCardsInColumn] = useState([]);

  useEffect(() => {
    if (cards) {
      const cardsToRender = cards.map((card) => {
        return (
          <Card
            key={card.card_id}
            cardId={card.card_id}
            cardName={card.card_name}
            cardBody={card.card_body}
          />
        );
      });
      setAllCardsInColumn(cardsToRender);
    } else{
      setAllCardsInColumn([]);
    }
  }, []);

  const handleAddCardBtnClick = (e) => {
     // send the new card to the db as POST req
    e.preventDefault();
    console.log('Add Card Button Clicked!');
    // create a new card component
    // update state with the new card added in
    setShowAddCardModal

  } 
  


  return (
    <div className="columnCont">
      <div>{columnName}</div>
      <div className="cardCont">{allCardsInColumn}</div>
      <button className="addCard" type="button" onClick={handleAddCardBtnClick}>Add Card</button>
    </div>
  );
}

export default Column;
//{
  /* <AddCardBtn
  allCardsInColumn={allCardsInColumn}
  setAllCardsInColumn={setAllCardsInColumn}
/> */
//}
//{
  /* <button className="delete-column-button" type="button" onCLick={handleDeleteColumn}>Delete Column</button>
<button className="edit-column-button" type="button" onCLick={handleEditColumn}>Edit Column Name</button> */
//}

// const handleDeleteColumn = (e, columnId) => {
  //   e.preventDefault();
  //   // console.log("Delete button pressed in Column.jsx");
  //   const updatedColumns = [];
  //   columns.forEach((col) => {
  //     if (col.props.columnId !== columnId) {
  //       updatedColumns.push(col);
  //     }
  //   });
  // const handleDeleteColumn = async (columnId) => {
  //   e.preventDefault();
  //   const response = await fetch('/column/delete/${columnId}', {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //   setColumns(prevColumnData => {
  //     return prevColumnData.filter(col => {
  //       return col
  //     })
  //   })
  // }

/*
try {
      e.preventDefault();
      const loginData = { username, password };
      const result = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await result.json();
      console.log("boards received are: ", data.board);
      // TODO: fix this when the backend is ready & grab userId- CS & NN
      setBoardId(data.boardID);
      setBoardData(data.board);
      setUserId(data.id);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("incorrect username or password", error);
    }
 */


  // const updatedColumns = columns.filter((column) => {
  //   console.log("column.props.columnId", column.props.columnId);
  //   console.log("columnId: ", columnId);
  //   console.log("COLUMNS ALL", column.key);
  //   return column.key !== columnId;
  // });
  // console.log("updatedColumns", updatedColumns);
  //   setColumns(updatedColumns);
  // };