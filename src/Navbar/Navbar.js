import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { red, indigo, grey } from "@mui/material/colors";
import LockOpen from "@mui/icons-material/LockOpen";

export default function Navbar() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    navigate("/");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: grey[800],
            textDecoration: "none",
            boxShadow: "none",
            color: "white",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            ></IconButton>
            <Typography
              color="white"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  flexGrow: 1,
                  textAlign: "left",
                }}
                to="/"
              >
                Home
              </Link>
            </Typography>
            <Typography variant="h6">
              {localStorage.getItem("currentUser") == null ? (
                <Link to="/auth">Login/Register</Link>
              ) : (
                <div>
                  <IconButton
                    style={{ color: "white", textDecoration: "none" }}
                    onClick={onClick}
                  >
                    <LockOpen></LockOpen>
                  </IconButton>
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={{
                      pathname: "/users/" + localStorage.getItem("currentUser"),
                    }}
                  >
                    {" "}
                    Profile
                  </Link>
                </div>
              )}{" "}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
