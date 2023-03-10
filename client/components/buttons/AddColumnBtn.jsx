import React, { useState } from "react";
// import AddColumn from "../AddColumn";

const AddColumnBtn = ({ columns, setColumns }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  
  /*
    <Column
        key={columnId}
        columnId={columnId}
        columnName={newColumnName}
        boardId={boardId}
        // double check the cards drilling
        cards={[]}
    />
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColumn = <Column />
    setShowMenu(false);
    setNewColumnName('');
    setColumns([...columns, newColumn])
  };

  const handleButtonClick = () => {
    setShowMenu(true);
  };

  const handleNameChange = (e) => setNewColumnName(e.target.value);
  
  return (
    <div className="">
      <form className="" onSubmit={handleSubmit}>
        <label>
          <input className="" type="text" value="newColumn" onChange={handleNameChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
  // const addNewColumn = () => {
  //   //keep users from adding multiple unnamed columns
  //   const newColumns = [
  //     ...columns,
  //     <AddColumn
  //       type={"addColumn"}
  //       columns={columns}
  //       setColumns={setColumns}
  //     />,
  //   ];
  //   setColumns(newColumns);
  // };
  // console.log("COLUMNS LIST IN AddColumnBTN", columns);
  // return (
  //   <div>
  //     <button className="addColumn" type="button" onClick={addNewColumn}>
  //       ADD COLUMN
  //     </button>
  //   </div>
  // );
};

export default AddColumnBtn;
