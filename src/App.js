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
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState();

  const handleAuth = (username, password, path) => {
    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((res) => {
        if (path === "register" && !res.ok) {
          throw Error("username is already in use");
        }
        return res.json();
      })
      .then((result) => {
        setUserId(result.userId);
        console.log(result);
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Router>
        <Navbar userId={userId} />
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
                <Auth authHandler={handleAuth} />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
