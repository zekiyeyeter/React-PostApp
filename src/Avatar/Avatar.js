import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemSecondaryAction, Radio } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "4px solid #000",
  boxShadow: 20,
  p: 4,
};

export default function Avatar(props) {
  const {avatarId, userId, userName} = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const saveAvatar = () => {
    fetch("/users/"+localStorage.getItem("currentUser"),{

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
      body : JSON.stringify({
      avatar: selectedValue,
    }),
  })
      .then((res) => res.json())
      .catch((err) => console.log(err))
    }


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: 10}}>
        <CardMedia
          component="img"
          image={`/avatars/avatar${selectedValue}.png`}
          alt="User Avatar" 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User info
          </Typography>
        </CardContent>
        <CardActions >
        {localStorage.getItem("currentUser") === userId ? <Button size="small" color="primary"  onClick={handleOpen}>
          Change Avatar
        </Button> :""}
        </CardActions>
      </Card>

      {

      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 109, bgcolor: "background.paper" }}
          >
            {[1,2,3,4,5,6,7,8,9,10].map((key) => {
              const labelId = `checkbox-list-secondary-label-${key}`;
              return (
                <ListItem key={key} button>
                  <CardMedia
                    style={{ maxWidth: 80 }}
                    component="img"
                    alt={`Avatar n°${key}`}
                    image={`/avatars/avatar${key}.png`}
                    title="User Avatar"
                  />

                  <ListItemSecondaryAction>
                    <Radio
                      edge="end"
                      value={key}
                      onChange={handleChange}
                      checked={"" + selectedValue === "" + key}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
