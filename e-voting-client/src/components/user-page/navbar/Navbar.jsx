import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../../features/authSlice";

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
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(false));
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/user" className={classes.link}>
                E-voting
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/user" className={classes.link}>
                Home
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/user/elections" className={classes.link}>
                Elections
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/user/help" className={classes.link}>
                Help
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
        >
          <Typography variant="h6" className={classes.title}>
            Logout
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
