//CRUD -- COLUMNS
//add
app.post("/add", columnController.addColumn, (req, res) => {
  res.status(200).json("added columnController");
});
