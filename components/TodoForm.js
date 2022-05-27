import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../Auth";
import { db } from "../firebase";
import { TodoContext } from "../pages/TodoContext";

export const TodoForm = () => {
  const { currentUser } = useAuth();
  // const [todo, setTodo] = useState({ title: "", details: "" });
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const inputAreaRef = useRef();

  const onSubmit = async () => {
    if (todo?.hasOwnProperty("timestamp")) {
      const docRef = doc(db, "todos", todo.id);
      const todoUpdated = { ...todo, timestamp: serverTimestamp() };
      updateDoc(docRef, todoUpdated);
      showAlert("info", `La tâche ${todo.title} à été mise à jour`);
      setTodo({ title: "", detail: "" });
    } else {
      const collectionRef = collection(db, "todos");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        email: currentUser.email,
        timestamp: serverTimestamp(),
      });
      showAlert("success", `La tâche ${todo.title} a été ajouté avec succès`);
      setTodo({ title: "", details: "" });
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTodo({ title: "", details: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
      {/* <pre>{JSON.stringify(todo)}</pre> */}
      <TextField
        fullWidth
        label="Titre"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        maxRows={4}
        label="Description"
        value={todo.details}
        onChange={(e) => setTodo({ ...todo, details: e.target.value })}
      />
      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {" "}
        {todo.hasOwnProperty("timestamp") ? "Mettre à jour" : "Enregistrer"}
      </Button>
    </div>
  );
};
