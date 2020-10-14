import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    minHeight: "10vh",
    backgroundColor: "#3f51b5",
    color: "white",
  },
});

function Footer() {
  const classes = useStyles();
  return <div className={classes.footer}></div>;
}

export default Footer;
