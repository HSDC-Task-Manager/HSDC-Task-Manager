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

const request = {};
//TODO ALEX: need to refactor for SQL data;
request.Boards = (userName, setBoardState, setID) => {
  fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: userName }),
  })
    .then((res) => res.json())
    .then((data) => {
      setBoardState(data);
      setID(data[0]._id);
    })
    .catch((error) => {
      console.log("Error fetching boardData in APP.jsx:", error);
    });
};

//COLUMNS___
//add
request.addColumn = (name) => {
  fetch("/column/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ column_name: `${name}` }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(`Error in request.addColumn ${error}`);
    });
};

request.deleteColumn = (id) => {
  fetch("column/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ column_id: `${id}` }),
  });
};

//CARDS___
//add a card to a specific column
request.addCard = (cardTitle, cardText) => {};

export default request;
