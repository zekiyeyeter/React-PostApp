import {
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useState } from "react";

function CommentForm(props) {
  const { postId, userId, userName } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    console.log(userName);
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
        userId: userId,
      }),
    })
      .then((res) =>  {
        console.log("wsdfghj")
        return res.json()})
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    saveComment();
    setText("");
  };
  const handleChange = (value) => {
    setText(value);
  };

  return (
    <CardContent>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLenght: 250 }}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Link to={{ pathname: "/users" + userId }}>
              <Avatar
                sx={{
                  bgcolor: red[500],
                  textDecoration: "none",
                }}
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              onClick={handleSubmit}
              style={{ background: "#C10317" }}
              variant="contained"
            >
              Comment
            </Button>
          </InputAdornment>
        }
        value={text}
      ></OutlinedInput>
    </CardContent>
  );
}
export default CommentForm;
