import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Slide,
} from "@material-ui/core";
import LoginForm from "./LoginForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
});

function LoginDialog({ onClose, open }) {
  const classes = useStyles();
  return (
    <Dialog onClose={onClose} open={open} TransitionComponent={Transition}>
      <DialogTitle className={classes.title}>Login</DialogTitle>
      <DialogContent dividers>
        <LoginForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
