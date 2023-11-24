import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import { Login } from "./component/Login";
import Signup from "./component/Signup";
import { Task } from "./component/Task";

import Verify from "./component/Verify";

function App() {
  const [loadTask, setLoadTask] = useState(false);
  const updateLoadTask = (value) => {
    setLoadTask(value);
  };
  return (
    <div className="font-mono  h-screen">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Login setLoadTask={updateLoadTask} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/task"
            element={
              loadTask ? (
                <Task loadTask={loadTask} setLoadTask={updateLoadTask} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
