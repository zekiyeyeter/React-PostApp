import { CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <CardContent>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLenght: 250 }}
        fullWidth
        value={text}
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
        
      ></OutlinedInput>
    </CardContent>
  );
}
export default Comment;
