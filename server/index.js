const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());
var port = process.env.PORT || 3000;

//create a task
app.post("/tasks", async (req, res) => {
  try {
    const { description } = req.body;
    pool.query("INSERT INTO todoTable (taskDes) VALUES ($1)", [description]);
    res.send(description);
  } catch (error) {
    console.error(error);
  }
});
//view tasks
app.get("/tasks", async (req, res) => {
  try {
    alltasks = await pool.query("SELECT * FROM todoTable ORDER BY completed ASC");
    res.send(alltasks.rows);
  } catch (error) {
    console.error(error);
  }
});
//view a task
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query("SELECT * FROM todoTable WHERE taskID=$1", [
      id,
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.error(error);
  }
});
//edit task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    // console.log(id);
    // console.log(description);

    const updateTodo = await pool.query(
      "UPDATE todoTable SET taskDes=$1 WHERE taskID=$2",
      [description, id]
    );
    res.send("Todo updated");
  } catch (error) {
    console.error(error);
  }
});

//delete task
app.put("/tasks/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    // console.log(description);

    const deleteTodo = await pool.query(
      "UPDATE todoTable SET completed=true WHERE taskID=$1",
      [id]
    );
    res.send("Todo deleted");
  } catch (error) {
    console.error(error);
  }
});


//undelete all
app.put("/tasks/undelete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    // console.log(description);

    const undeleteTodo = await pool.query(
      "UPDATE todoTable SET completed=false WHERE taskID=$1",
      [id]
    );
    res.send("Todo deleted");
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`server connected with port ` + port);
});
