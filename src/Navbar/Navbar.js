import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { red, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";



const colornn = indigo[900];
export default function Navbar() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    navigate(-1);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor:'red'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
            
            </IconButton>
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

            {localStorage.getItem("currentUser") == null ? (
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/auth"
              >
                Login/Register
              </Link>
            ) : (
              <div>
                <IconButton
                  style={{ color: "white", textDecoration: "none" }}
                  onClick={onClick}
                >
                  <LockOpenIcon></LockOpenIcon>
                </IconButton>
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={{pathname: "/users/" + localStorage.getItem("currentUser"),}}
                >
                  Profile
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
