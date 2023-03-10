import React, { useState, useEffect } from "react";
import request from "../request";
import Column from "./Column";
let columnId = 101;
const AddColumn = ({ columns, setColumns }) => {
  const [columnName, setColumnName] = useState("");
  const [newColumns, setNewColumns] = useState(columns);

  const onHandleClick = (e) => {
    e.preventDefault();
    // console.log(`in AddColumn ${columnId}`);
    //TODO: need to add real id based on query
    // request.addColumn(1, columnName);
    if (columnName === "") return;
    setColumns([
        ...columns,
        <Column
        key={columnId}
        columnId={columnId}
        columnName={columnName}
        // boardId={boardId}
        columns={columns}
        setColumns={setColumns}
        cards={[]}
      />,
    ]);
    columnId++;
  };

  useEffect(() => {
    setNewColumns(columns);
  }, [columns]);

  const onCancelClick = (e) => {
    e.preventDefault();
    // setColumns([columns.slice(0, -1)]);
  };

  return (
    <form>
      <input
        type="text"
        onInput={(e) => setColumnName(e.target.value)}
        value={columnName}
      />
      <input type="submit" value="Submit" onClick={onHandleClick} />
      <input type="submit" value="Cancel" onClick={onCancelClick} />
    </form>
  );
};

export default AddColumn;

/*
// parent component
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <ChildComponent count={count} />
    </div>
  );
}

export default ParentComponent;

// child component
import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <h2>Child Component</h2>
      <p>Count from parent component: {props.count}</p>
    </div>
  );
}

export default ChildComponent;
*/
