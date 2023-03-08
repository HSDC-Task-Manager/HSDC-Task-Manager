const fetch = {};
//TODO ALEX: need to refactor for SQL data;
fetch.fetchBoards = (userName, setBoardState, setID) => {
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
fetch.addColumn = (columnName) => {
  fetch("/column/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ columnName }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("inside");
    })
    .catch((error) => {
      console.log(`Error in request.addBoard ${error}`);
    });
};

//CARDS___
//add a card to a specific column
fetch.addCard = (cardTitle, cardText) => {};

export default fetch;
