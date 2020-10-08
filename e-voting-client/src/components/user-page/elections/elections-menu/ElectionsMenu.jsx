import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { fetchElections } from "../../../../features/voteSlice";

const useStyles = makeStyles({
  content: {
    height: "80vh",
    width: "60vw",
    margin: "2% 0",
  },
  item: {
    margin: "1% 0",
    padding: "4px",
  },
});

function ElectionsMenu() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { login } = useSelector((state) => state.auth);
  const { elections } = useSelector((state) => state.vote);
  useEffect(() => {
    dispatch(fetchElections(login));
  }, []);
  return (
    <Grid container justify="center">
      <Grid className={classes.content}>
        <List dense>
          {elections && elections.length > 0 ? (
            elections.map((election, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItem className={classes.item} button>
                    <Grid>
                      <Grid>
                        <Typography variant="h6">
                          {election.electionTitle}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography>{election.description}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })
          ) : (
            <div>empty</div>
          )}
        </List>
      </Grid>
    </Grid>
  );
}

export default ElectionsMenu;
