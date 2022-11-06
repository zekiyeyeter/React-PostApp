import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, indigo } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PostWithAuth } from "../services/Http.Service";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cart(props) {
  const { title, text, userId, postId, likes, userName } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length || 0);
  const [likeId, setLikeId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const setCommentRefresh = () => {
    setRefresh(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };
  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setRefresh(false);
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },

      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("currentUser"),
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    }).catch((err) => console.log(err));
  };

  const checkLiked = () => {
    var likeControl = likes.find(
      (like) => like.userId === localStorage.getItem("currentUser")
    );
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setLiked(true);
    }
  };
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else refreshComments();
  }, [refresh]);
  useEffect(() => {
    checkLiked();
  }, []);

  return (
    <Card sx={{ width: 800, margin: 4, textAlign: "left" }}>
      <CardHeader
        avatar={
          <Link to={{ pathname: "/users/" + userId }}>
            <Avatar
              sx={{
                bgcolor: red[700],
                textDecoration: "none",
                boxShadow: "none",
                color: "white",
              }}
              aria-label="recipe"
            >
            </Avatar>
          </Link>
        }
        title={title}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          backgroundColor="white"
        >
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {disabled ? (
          <IconButton
            disabled
            onClick={handleLike}
            aria-label="add to favorites"
          >
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>
        ) : (
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>
        )}

        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ModeCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {error
            ? "error"
            : isLoaded
            ? commentList.map((comment, i) => (
                <Comment
                  key={i}
                  userId={comment.userId}
                  userName={comment.userName}
                  text={comment.text}
                ></Comment>
              ))
            : "loading"}
          {disabled ? (
            ""
          ) : (
            <CommentForm
              userId={localStorage.getItem("currentUser")}
              userName={localStorage.getItem("userName")}
              postId={postId}
              setCommentRefresh={setCommentRefresh}
            ></CommentForm>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
