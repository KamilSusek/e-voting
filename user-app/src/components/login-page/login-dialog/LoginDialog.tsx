import React, { useState } from "react";
import {
  makeStyles,
  DialogTitle,
  Dialog,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../../features/loginSlice";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
  box: {
    padding: "8px",
    height: "15vh",
  },
});

function LoginDialog({ handleClose, open }: any) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginCredentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(
      handleLogin(loginCredentials, () => {
        history.push("/user");
      })
    );
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={classes.title}>Login</DialogTitle>
      <form onSubmit={handleSubmit}>
        <Grid
          className={classes.box}
          container
          direction="column"
          justify="space-evenly"
        >
          <TextField name="username" type="text" onChange={handleChange} />
          <TextField name="password" type="password" onChange={handleChange} />
          <Button color="primary" type="submit">
            Login
          </Button>
        </Grid>
      </form>
    </Dialog>
  );
}

export default LoginDialog;
