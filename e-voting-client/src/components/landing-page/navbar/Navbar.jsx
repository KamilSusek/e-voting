import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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

function Navbar({ onLoginClick }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/about" className={classes.link}>
                About
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/help" className={classes.link}>
                Help
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Button
          onClick={onLoginClick}
          variant="contained"
          color="primary"
          startIcon={<AccountCircleIcon />}
        >
          <Typography variant="h6" className={classes.title}>
            Login
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
