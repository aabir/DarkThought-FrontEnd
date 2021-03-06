import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import AddThought from "./components/AddThought"
import ListThought from "./components/ListThought"
import { Link, Router, Route, Routes } from "react-router-dom"
import DetailThought from "./components/DetailThought";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/thought" className="navbar-brand">
          Dark Thought
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/thought"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ListThought/>} />
            <Route path="/thought" element={<ListThought/>} />
            <Route path="/add" element={<AddThought/>} />
            <Route path="/detail-thought/:id" element={<DetailThought/>} />
            <Route path="*" element={
              <main style={{padding: "1rem"}}>
                <p>404 not found.</p>
              </main>
            }
            />
          </Routes>
      </div>
    </div>
  );
}

export default App;
