import React from "react";
import { useNavigate } from "react-router-dom";

export const Delete = ({ id }) => {
  const navigate = useNavigate();

  const deleteTodo = () => {
    fetch(`http://localhost:5001/api/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        navigate("/"); // Navigate back to the main page
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <>
      <button onClick={deleteTodo}>Delete</button>
    </>
  );
};
