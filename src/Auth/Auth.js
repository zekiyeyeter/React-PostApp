import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
} from "@mui/material";
import { red,indigo } from "@mui/material/colors";
import React, { useState } from "react";
import "./Auth.css";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const sendRequest = (path) => {
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
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    console.log(localStorage);
  };

  return (
    <div className="container">
      <FormControl style={{ margin: 30 }}>
        <InputLabel> Username </InputLabel>
        <Input
          id="my-input2"
          onChange={(i) => handleUsername(i.target.value)}
        />

        <FormControl>
          <InputLabel style={{ touchAction: "-ms-manipulation" }}>
            {" "}
            Password{" "}
          </InputLabel>
          <Input
            id="my-input"
            onChange={(i) => handlePassword(i.target.value)}
          ></Input>
        </FormControl>

        <Button
          onClick={() => handleButton("register")}
          variant="contained"
          sx={{
            bgcolor: red[900],
            color:"white",
            textDecoration: "none",
            marginTop:5
          }}
        >
          Register
        </Button>

        <FormHelperText style={{ margin: 20 }}>
          Are you already registered?
        </FormHelperText>
        <Button
          onClick={() => handleButton("login")}
          variant="contained"
          sx={{
            bgcolor: red[900],
            color:"white",
            textDecoration: "none",
          }}
        >
          Login
        </Button>
      </FormControl>
    </div>
  );
}
export default Auth;
