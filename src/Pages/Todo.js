import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Grid,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import Loader from "../components/loader";
import { enqueueSnackbar } from "notistack";

const Todo = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const userid = localStorage.getItem("userid");
  const [loader, setLoader] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todolist, settodolist] = useState([]);
  const [edittodo, setedittodo] = useState("");

  const handleAddTodo = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `https://nodeusertodo-2.onrender.com/todo/create`,
        { email, title, description }
      );
      console.log(response.data);
      if (response.data.status == 201) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 1000,
        });
        setTitle("");
        setDescription("");
        gettodos();
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  const gettodos = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://nodeusertodo-2.onrender.com/todos/getall/?email=${email}`
      );
      console.log("response", response.data);
      settodolist(response.data.todos);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  useEffect(() => {
    gettodos();
  }, []);
  const deletetodo = async (id) => {
    setLoader(true);
    try {
      const response = await axios.delete(
        `https://nodeusertodo-2.onrender.com/todo/delete/?todoid=${id}`
      );
      if (response.data.status == 200) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 1000,
        });
      }
      console.log("response", response.data);
      gettodos();
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  return (
    <Grid
      container
      fullWidth
      sx={{ height: "100%", pt: 5, mt: "30px", px: "20px" }}
    >
      {loader && <Loader />}
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Typography variant="h4">Todo List</Typography>
      </Grid>
      <Grid item xs={12} sx={{}}>
        <Grid container spacing={1} sx={{}}>
          <Grid item xs={2}>
            <TextField
              size="sm"
              autoFocus
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              multiline
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTodo}
              // sx={{ mt: 2, ml: 2 }}
            >
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ border: "1px solid #eee" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todolist.map((todo, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell>
                    <>
                      <IconButton
                        onClick={() => {
                          setedittodo(todo.title);
                        }}
                      >
                        <BorderColorOutlinedIcon sx={{}} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          console.log("todo", todo);
                          deletetodo(todo._id);
                        }}
                      >
                        <DeleteForeverOutlinedIcon sx={{ color: "red" }} />
                      </IconButton>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* =========================================|| edit dialog || ========================================= */}
      <Dialog>
        <DialogTitle>
          <Typography>Edit</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            size="sm"
            autoFocus
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            multiline
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Todo;
