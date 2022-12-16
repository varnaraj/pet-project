import { useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../index.css";
// import { Fragment } from "react";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import { green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Typography } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";


const InputTodo = () => {
  const [taskDes, settaskDes] = useState("");
  const [open, setOpen] = React.useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ description: taskDes }),
      });
      settaskDes("");
      

      
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    settaskDes("");
  };

  return (
    <Box
      m={2} //margin
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mr: 10, ml: 10, mt: 5, p: 1.5, border: "2px solid", color: "gray" }}
    >
      <Typography fontSize={25}>To-Do Pet Project</Typography>
      <Box>
        <Button
          onClick={handleClickOpen}
          startIcon={<AddCircleIcon />}
          variant="outlined"
          color="info"
          style={{ fontSize: "15px", margin: "1px" }}
          sx={{ height: 40 }}
        >
          <b>Add task</b>
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth={300}>
        <DialogTitle fontSize={20}>Create New To-Do</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-basic"
            inputProps={{ style: { fontSize: 20, height: 120 } }}
            multiline
            sx={{
              height: 150,
            }}
            fullWidth={250}
            value={taskDes}
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
            onClick={onSubmitForm}
            sx={{ height: 40 }}
            style={{ fontSize: "13px", margin: "1px" }}
          >
            CREATE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InputTodo;
