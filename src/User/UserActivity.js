import { React, useState, useEffect, forwardRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Cart from "../Card/Cart";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
  const { isOpen, postId, setIsOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [post, setPost] = useState();

  const getPost = () => {
    fetch("/posts/" + postId,{
      headers:{
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setPost(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" style={{ marginLeft: 2, flex: 1 }}>
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      {post ? (
        <Cart
          likes={post.postLikes}
          postId={post.id}
          userId={post.userId}
          userName={post.userName}
          title={post.title}
          text={post.text}
        ></Cart>
      ) : (
        "loading"
      )}
    </Dialog>
  );
}

function UserActivity(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const { userId } = props;
  const [isOpen, setIsOpen] = useState();
  const [selectedPost, setSelectedPost] = useState();

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  };

  const getActivity = () => {
    fetch("/users/activity/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then(res=> res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setRows(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      {isOpen ? (
        <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} />
      ) : (
        ""
      )}
      <Paper>
        <TableContainer
          style={{
            maxHeight: 440,
            minWidth: 100,
            maxWidth: 800,
            marginTop: 50,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>User Activity</TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <Button onClick={() => handleNotification(row[1])}>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="right">
                        {row[3] + " " + row[0] + " your post"}
                      </TableCell>
                    </TableRow>
                  </Button>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default UserActivity;
