import React, { Component } from "react";
import request from "../request";
import { useState } from "react";

const NameColumn = () => {
  const [columnName, setColumnName] = useState("");

  const onHandleClick = (e) => {
    e.preventDefault();
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

export default NameColumn;
