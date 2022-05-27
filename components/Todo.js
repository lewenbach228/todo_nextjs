import { IconButton, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TodoContext } from "../pages/TodoContext";
import { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

export const Todo = ({ id, timestamp, title, details }) => {
  const { showAlert, setTodo } = useContext(TodoContext);
  const router = useRouter();

  const deleteTodo = async (id, e) => {
    // e.stopPropagation();
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    showAlert("error", `La tâche ${title} a été effacé avec succès`);
  };

  const seeMore = (id, e) => {
    // e.preventDefault();
    router.push(`/todos/${id}`);
  };

  return (
    <ListItem
      onClick={() => setTodo({ id, title, details, timestamp })}
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      secondaryAction={
        <>
          <IconButton onClick={(e) => deleteTodo(id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={(e) => seeMore(id)} />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={moment(timestamp).format("MMMM do, yyyy")}
      />
    </ListItem>
  );
};
