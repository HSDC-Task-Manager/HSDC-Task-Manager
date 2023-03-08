//CRUD--CARDS
//get
app.get("/", (req, res) => {
  res.status(200).json("got card!");
});
//add
app.post("/", (req, res) => {
  res.status(200).json("added card!");
});
//delete
app.delete("/", (req, res) => {
  res.status(200).json("deleted card!");
});
//edit
app.patch("/", (req, res) => {
  res.status(200).json("edited card!");
});
