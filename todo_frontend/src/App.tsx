import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header.tsx";
import { Login } from "./component/Login.tsx";
import Signup from "./component/Signup.tsx";
import { Task } from "./component/Task.tsx";
import Verify from "./component/Verify.tsx";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [loadTask, setLoadTask] = useState<boolean>(false);
  const updateLoadTask = (value: boolean) => {
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
};

export default App;
