import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Navbar({ handleOpen }: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h6" color="inherit">
                Home
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
                Help
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
                About
              </Typography>
            </Grid>
          </Grid>
          <Button onClick={handleOpen} color="default" variant="contained">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
