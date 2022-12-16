import React, { Fragment, useEffect, useState } from "react";

import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteTask({ todos }) {
  //console.log(todos.taskdes)

  //const [description, settaskDes] = useState(todos.taskdes);
  //   const [id, setId] = useState(todos.taskid);

  // const []
  const [open, setOpen] = React.useState(false);
  // const [todos, setTodos] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    //console.log(todos)
    setOpen(false);
    //settaskDes("");
  };

  //edit description function
  const DeleteDes = async (e) => {
    try {
      //console.log({taskDes})
      //   console.log(todos.completed);
      //   console.log(todos.taskid);
      const response = await fetch(
        `http://localhost:4000/tasks/delete/${todos.taskid}`,
        {
          method: "PUT",
        }
      );

      //settaskDes(taskDes);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
    setOpen(false);
  };

  if (!todos.completed) {
    return (
      <div style={{ border: "1px solid red", borderRadius: "100px" }}>
        <IconButton size="large" color="error" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth={300}>
          <DialogTitle fontSize={20}>
            Are you sure want to Delete this task?
          </DialogTitle>
          {/* <DialogContent>
              <TextField
                id="filled-basic"
                inputProps={{ style: { fontSize: 20 } }}
                fullWidth={250}
                value={description}
                onChange={(e) => settaskDes(e.target.value)}
              />
            </DialogContent> */}
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ height: 40 }}
              style={{ fontSize: "13px", margin: "1px" }}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              onClick={(e) => DeleteDes(e)}
              color="error"
              sx={{ height: 40 }}
              style={{ fontSize: "13px", margin: "1px" }}
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteTask;
