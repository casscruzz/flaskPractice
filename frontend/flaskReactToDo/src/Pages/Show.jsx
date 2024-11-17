import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Delete } from "../Components/Delete/Delete";

export const Show = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setTodo(data);
        setEditContent(data.content);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [id]);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: editContent }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        setTodo((prev) => ({ ...prev, content: editContent }));
        navigate("/");
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <div>
      {todo ? (
        <div key={todo.id}>
          <div>{todo.content}</div>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editContent}
              onChange={handleEditChange}
            />
            <button type="submit">Edit</button>
          </form>
          <Delete id={id} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <hr />
      <Link to="/">Back to To Dos</Link>
    </div>
  );
};
