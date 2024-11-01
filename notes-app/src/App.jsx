import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import MyNotes from "./components/MyNotes";
import CreateNote from "./components/CreateNote";
import CreateGraphicNote from "./components/CreateGraphicNote";
import About from "./components/About";
import UpdateNote from "./components/UpdateNote";
import UpdateGraphicNote from "./components/UpdateGraphicNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/create-graphic-note" element={<CreateGraphicNote />} />
          <Route path="/about" element={<About />} />
          <Route path="/update-note/:noteID" element={<UpdateNote />} />
          <Route
            path="/update-graphic-note/:noteID"
            element={<UpdateGraphicNote />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
