import "./App.css";
import Connection from "./components/Connection";
import Login from "./components/login/Login";
import LoginUi from "./components/login/LoginUi";
import Register from "./components/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import Spinner from "./components/spinner/Spinner";
function App() {
  return (
    <div className="App">
      <Login />
      {/* <Spinner/> */}
    </div>
  );
}

export default App;
