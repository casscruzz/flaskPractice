import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToDoPage } from "./Pages/ToDoPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Show } from "./Pages/Show";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<ToDoPage />} />
          <Route path="/:id" element={<Show />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
