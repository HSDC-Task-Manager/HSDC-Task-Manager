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
  const [showCardCreatorModal, setShowCardCreatorModal] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [newCardBody, setNewCardBody] = useState("");

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
    } else {
      setAllCardsInColumn([]);
    }
  }, []);

  const handleAddCardBtnClick = (e) => {
    e.preventDefault();
    console.log("Add Card Button Clicked!");
    setShowCardCreatorModal(true);
  };

  const handleAddCard = async (e) => {
    try {
      e.preventDefault();
      console.log("Card being created");
      // send the new card to the db as POST req
      const cardIdRes = await fetch("/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columnId, newCardName, newCardBody }),
      });
      const cardId = await cardIdRes.json();
      // create a new card component
      const newCard = (
        <Card
          key={cardId}
          cardId={cardId}
          cardName={newCardName}
          cardBody={newCardBody}
        />
      );
      // update state with the new card added in
      setAllCardsInColumn((prevCards) => {
        return [...prevCards, newCard];
      });
      setNewCardName("");
      setNewCardBody("");
    } catch (err) {
      console.log("ERROR in handleAddCard: ", err);
    }
  };
  const handleCancelClick = (e) => {
    setShowCardCreatorModal(false)
    setNewCardName('');
    setNewCardBody('');
  }
  
  const handleCardNameChange = (e) => setNewCardName(e.target.value);
  const handleCardBodyChange = (e) => setNewCardBody(e.target.value);

  return (
    <div className="columnCont">
      <div>{columnName}</div>
      <div className="cardCont">{allCardsInColumn}</div>
      {showCardCreatorModal && (
        <div className="">
          <form className="" onSubmit={handleAddCard}>
            <label>
              <input
                className=""
                type="text"
                onChange={handleCardNameChange}
                value={newCardName}
                placeholder={"Card Name"}
              />
              <input
                className=""
                type="text"
                onChange={handleCardBodyChange}
                value={newCardBody}
                placeholder={"Card Text"}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
      {!showCardCreatorModal && (
        <button
          className="addCard"
          type="button"
          onClick={handleAddCardBtnClick}
        >
          Add Card
        </button>
      )}
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
