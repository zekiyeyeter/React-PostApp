import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import User from "./User/User";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import Avatar from "./Avatar/Avatar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/users/:userId" element={<User />}></Route>
          <Route
            exact
            path="/auth"
            element={
              localStorage.getItem("currentUser") != null ? (
                <Navigate to="/" />
              ) : (
                <Auth />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
