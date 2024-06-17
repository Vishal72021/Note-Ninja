import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Alert alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home showAlert={showAlert} />}
              ></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/contact" element={<Contact />}></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
