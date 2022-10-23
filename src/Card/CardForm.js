import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import { styled, withTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { red,deepOrange, deepPurple,indigo  } from "@mui/material/colors";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, InputAdornment } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
const colorNavbar= indigo[900]


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardForm(props) {
  const { userId, userName, refreshPosts } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false); // post isteği gönderdik mi
 
  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        text: text,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };
  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  return (
    <Card sx={{ width: 800, margin: 4, textAlign: "left",}}>
      <CardHeader
        avatar={
          <Link to={{ pathname: "/users/" + userId }}>
            <Avatar
              sx={{
                bgcolor: red[700],
                color:"white",
                textDecoration: "none",
              }}
              aria-label="recipe"
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={
          <OutlinedInput
            id="outlined-adornment-amount"
            variant="outlined"
            multiline
            colorSecondary
            backgroundColor ="black"
            placaholder="Title"
            inputProps={ {maxLength: 50} }
            fullWidth
            value={title}
            onChange={(i) => handleTitle(i.target.value)}
          ></OutlinedInput>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {
            <OutlinedInput
              id="standard-basic"
              variant="standard"
              multiline
              inputProps={{ maxLength: 500 }}
              
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    onClick={handleSubmit}
                    sx={{
                      bgcolor: red[900],
                      color:"white",
                      textDecoration: "none",
                    }}
                    variant="contained"
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          }
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
