import React from "react";
import { Link } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";

export const Card = ({ listOfToDos }) => {
  console.log("listOfToDos:", listOfToDos); // Log the listOfToDos for debugging

  const transitions = useTransition(listOfToDos, {
    keys: (item) => item.id,
    from: { opacity: 0, width: "4%", marginLeft: -100, marginRight: 100 },
    enter: {
      opacity: 1,
      width: "100%",
      padding: "5px 0",
      marginLeft: 0,
      marginRight: 0,
    },
  });

  return (
    <div>
      {transitions((style, todo) => (
        <animated.ul key={todo.id} style={style}>
          <li>
            <Link to={`/${todo.id}`}>{todo.content}</Link>
          </li>
        </animated.ul>
      ))}
    </div>
  );
};
