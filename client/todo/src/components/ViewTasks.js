import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
import Box from "@mui/material/Box";

const ViewTasks = () => {
  const [taskDes, settaskDes] = useState("");
  const [open, setOpen] = React.useState(false);
  const [todos, setTodos] = useState([]);

  //update function
  const updateTodo = async (taskId) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  //delete todo function

  //   const deleteTodo = async (id) => {
  //     try {
  //       const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
  //         method: "DELETE",
  //       });
  //       setTodos(todos.filter((todos) => todos.taskID !== id));
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  const getTodos = async () => {
    //console.log("executed");
    try {
      const response = await fetch("http://localhost:4000/tasks");
      const jsonData = await response.json();
      //console.log(jsonData);
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box
      m={2} //margin
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ mr: 10, ml: 10, mt: 5, p: 1.5, border: "2px solid", color: "gray" }}
    >
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        
      <colgroup>
      <col style={{width:'90%'}}/>
      <col style={{width:'5%'}}/>
      <col style={{width:'5%'}}/>
   </colgroup>
   {/* <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 20 }} align="center">
              Tasks
            </TableCell>
            <TableCell sx={{ fontSize: 20 }} align="right">
              Edit
            </TableCell>
            <TableCell sx={{ fontSize: 20 }} align="right">
              Delete{" "}
            </TableCell>
          </TableRow>
        </TableHead> */}
        
        <TableBody>
          {todos.map((todos) => (
            <TableRow
              key={todos.taskID}
              sx={{ textAlign:"left","&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                className={todos.completed ? "strike" : "normal"}
                sx={{ fontSize: 20 }}
                align="left"
                margin=""
              >
                {todos.taskdes}
              </TableCell>
              <TableCell sx={{ fontSize: 20, color: "green" }} align="right">
                <UpdateTask todos={todos} />
              </TableCell>
              <TableCell sx={{ fontSize: 20, color: "red" }} align="right">
                <DeleteTask todos={todos} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default ViewTasks;
