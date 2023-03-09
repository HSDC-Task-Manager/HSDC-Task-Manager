import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import AddCardBtn from "./buttons/AddCardBtn";
import UserContext from "../UserContext";

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

function Column({ columnId, columnName, boardId, cards, columns, setColumns }) {
  const { userId } = useContext(UserContext);
  const [allCardsInColumn, setAllCardsInColumn] = useState(cards);
  // const [allColumns, setAllColumns] = useState(columns);

  const sampleCard = <Card key={1} cardId={1} />;
  const sampleCardsArray = [sampleCard];

  console.log("Columns in Column.jsx: ", columns);
  console.log("Columns length in Column.jsx: ", columns.length);

  const handleDeleteColumn = (e, columnId) => {
    e.preventDefault();
    // console.log("Delete button pressed in Column.jsx");
    const updatedColumns = [];
    columns.forEach((col) => {
      if (col.props.columnId !== columnId) {
        updatedColumns.push(col);
      }
    });
    // const updatedColumns = columns.filter((column) => {
    //   console.log("column.props.columnId", column.props.columnId);
    //   console.log("columnId: ", columnId);
    //   console.log("COLUMNS ALL", column.key);
    //   return column.key !== columnId;
    // });
    // console.log("updatedColumns", updatedColumns);
    setColumns(updatedColumns);
  };

  useEffect(() => {
    console.log("columns length in useEffect in Column.jsx", columns.length);
    getLen();
  }, [columns]);

  const getLen = () => {
    console.log(columns.length);
  };

  return (
    <div className="columnCont">
      <div>{columnName}</div>
      <div className="cardCont">{sampleCardsArray}</div>
      <>{allCardsInColumn}</>
      <AddCardBtn
        allCardsInColumn={allCardsInColumn}
        setAllCardsInColumn={setAllCardsInColumn}
      />
      <button type="button" onClick={(e) => handleDeleteColumn(e, columnId)}>
        DELETE COLUMN
      </button>
      <button type="button" onClick={() => getLen()}>
        COLUMN LEN
      </button>
    </div>
  );
}

export default Column;

// const renderCards = cards.map((card, index) => (
//   <Card key={index} className="card" cardText={cards.text}/>
// ))
