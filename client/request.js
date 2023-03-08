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
  console.log({ columnName: `${name}` });
  fetch("/column/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ columnName: `${name}` }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(`Error in request.addColumn ${error}`);
    });
};

//CARDS___
//add a card to a specific column
request.addCard = (cardTitle, cardText) => {};

export default request;
