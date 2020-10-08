import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { handleLogin } from "../../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  Grid,
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles({
  formBox: {
    padding: "8px",
    height: "20vh",
  },
  input: {
    width: "40ch",
  },
});

function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const alert = useAlert();
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });

  const handleChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    console.log(loginForm);
  };

  const resultCallback = (result) => {
    alert.removeAll();
    if (result === true) {
      alert.success("Logged in.");
      onClose();
      history.push("/user");
    } else {
      alert.error("Failed to log in.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { login, password } = loginForm;
    dispatch(handleLogin(login, password, resultCallback));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        className={classes.formBox}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="login-input">Login</InputLabel>
            <Input
              className={classes.input}
              id="login-input"
              type="text"
              name="login"
              value={loginForm.login}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              className={classes.input}
              id="password-input"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LockOpenIcon />}
            type="submit"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
