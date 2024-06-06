import React, { useEffect, useState } from "react";
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
} from "@mui/material";
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

  return (
    <Container maxWidth="sm" sx={{ height: "100%", pt: 5, mt: "70px" }}>
      {loader && <Loader />}
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Box
        component={Paper}
        padding={2}
        marginBottom={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{ mt: 2 }}
        >
          Add Todo
        </Button>
      </Box>
      <List>
        {todolist.map((todo, index) => (
          <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
            <ListItemText primary={todo.title} secondary={todo.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Todo;
