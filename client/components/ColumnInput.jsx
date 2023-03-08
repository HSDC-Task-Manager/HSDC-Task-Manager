import React, { Component } from "react";
import request from "../fetch";
import { useState, useEffect } from "react";

const newColumn = () => {
  const [columnName, setColumnName] = useState("");

  const onHandleClick = (e) => {
    e.preventDefault();
    console.log("column Name", column);
    request.addColumn(columnName);
  };
  return (
    <form>
      <input
        type="text"
        onInput={(e) => setColumnName(e.target.value)}
        value={columnName}
      />
      <input type="submit" value="Submit" onClick={onHandleClick} />
    </form>
  );
};

export default newColumn;
