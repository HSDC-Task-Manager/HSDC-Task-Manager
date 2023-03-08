//CRUD--CARDS
//get
app.get("/get", (req, res) => {
  res.status(200).json("got the cards!");
});
//add
app.post("/add", (req, res) => {
  res.status(200).json("added a card!");
});
//delete
app.delete("/delete", (req, res) => {
  res.status(200).json("deleted a card!");
});
//edit
app.patch("card/edit", (req, res) => {
  res.status(200).json("edited a card!");
});