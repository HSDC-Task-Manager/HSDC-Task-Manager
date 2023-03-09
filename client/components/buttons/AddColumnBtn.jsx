import React from "react";
import AddColumn from "../AddColumn";

const AddColumnBtn = ({ columns, setColumns }) => {
  const addNewColumn = () => {
    //keep users from adding multiple unnamed columns
    const newColumns = [
      ...columns,
      <AddColumn
        type={"addColumn"}
        columns={columns}
        setColumns={setColumns}
      />,
    ];
    setColumns(newColumns);
  };
  console.log("COLUMNS LIST IN AddColumnBTN", columns);
  return (
    <div>
      <button className="addColumn" type="button" onClick={addNewColumn}>
        ADD COLUMN
      </button>
    </div>
  );
};

export default AddColumnBtn;
