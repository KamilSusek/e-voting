import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/loginSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            HOME
          </IconButton>
          <Grid container justify="flex-start" spacing={3}>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.link} to="/user">
                  Home
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.link} to="/user/elections">
                  Elections
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                <Link className={classes.link} to="/user/">
                  News
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Button onClick={handleLogout} variant="contained" color="default">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
