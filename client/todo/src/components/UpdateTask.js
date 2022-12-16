import React, { useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import IconButton from "@mui/material/IconButton";

function UpdateTask({ todos }) {
  //console.log(todos.taskdes)

  const [description, settaskDes] = useState(todos.taskdes);
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
  const updateDes = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      //console.log({taskDes})
      console.log(body);
      console.log(JSON.stringify(body));
      const response = await fetch(
        `http://localhost:4000/tasks/${todos.taskid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
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
      <div style={{ border: "1px solid green", borderRadius: "100px" }}>
        <IconButton size="large" color="green" onClick={handleClickOpen}>
          <BorderColorIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth={300}>
          <DialogTitle fontSize={20}>update To-do</DialogTitle>
          <DialogContent>
            <TextField
              id="filled-basic"
              inputProps={{ style: { fontSize: 20, height: 120 } }}
              multiline
              sx={{
                height: 150,
              }}
              fullWidth={250}
              value={description}
              onChange={(e) => settaskDes(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{ height: 40 }}
              style={{ fontSize: "13px", margin: "1px" }}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              onClick={(e) => updateDes(e)}
              sx={{ height: 40 }}
              style={{ fontSize: "13px", margin: "1px" }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UpdateTask;
