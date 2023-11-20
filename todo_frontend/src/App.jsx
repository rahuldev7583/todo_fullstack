import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import { Login } from "./component/Login";
import Signup from "./component/Signup";
import { Task } from "./component/Task";

import Verify from "./component/Verify";

function App() {
  return (
    <div className="font-mono  h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
