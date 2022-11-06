import {
  Button,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { RefreshToken } from "../services/Http.Service";

function CommentForm(props) {
  const { userId, userName, postId, setCommentRefresh } = props;
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    navigate(-1);
  };

  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("currentUser"),
        text: text,
      }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          RefreshToken()
            .then((res) => {
              if (!res.ok) {
                logout();
              } else {
                return res.json();
              }
            })
            .then((result) => {
              console.log(result);

              if (result !== undefined) {
                localStorage.setItem("tokenKey", result.accessToken);
                saveComment();
                setCommentRefresh();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    saveComment();
    setText("");
    setCommentRefresh();
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
                {userName.charAt(0).toUpperCase()}{" "}
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
