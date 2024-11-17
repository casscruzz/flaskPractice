import React, { useState, useEffect } from "react";
import { Card } from "../Components/Card/card";
import { Form } from "../Components/Form/form";

export const ToDoPage = () => {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState("");

  const fetchTodos = () => {
    fetch("http://localhost:5001/api")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleFormChange = (inputValue) => {
    setAddTodo(inputValue);
  };

  const handleFormSubmit = () => {
    fetch("http://localhost:5001/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ content: addTodo }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((message) => {
        console.log(message);
        fetchTodos(); // Fetch the updated list of todos
        setAddTodo(""); // Clear the input field
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <div>
      <Form
        userInput={addTodo}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <Card listOfToDos={todos} /> {/* Pass the todos to the Card component */}
    </div>
  );
};
