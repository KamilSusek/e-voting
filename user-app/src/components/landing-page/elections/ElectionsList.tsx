import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "../../../axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  item: {
    borderRadius: "20px",
    padding: "8px",
    margin: "20px 0",
    backgroundColor: "#F5F5F5",

    "&:hover": {
      backgroundColor: "#ddd",
      transition: "all 1.1s",
    },
  },
  content: {
    padding: "8px",
  },
});

function ElectionsList() {
  const [elections, setElections] = useState();
  const login = useSelector((state: any) => state.login.login);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(`/elections/user/${login}`);

        setElections(response.data);
      } catch (error) {}
    };
    fetchElections();
  }, []);

  return (
    <Grid container justify="center">
      <div style={{ width: "60vw" }}>
        {elections && elections.length > 0 ? (
          elections.map((election: any, index: number) => (
            <React.Fragment key={index}>
              <Paper className={classes.item}>
                <Grid>
                  <Grid item>
                    <Typography variant="h4">
                      {election.electionTitle}
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid container className={classes.content}>
                    <Grid item xs={11}>
                      <Typography variant="h6">
                        {election.description}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          history.push(`/user/vote/${election.electionTitle}`);
                        }}
                      >
                        Vote
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </React.Fragment>
          ))
        ) : (
          <div>empty</div>
        )}
      </div>
    </Grid>
  );
}

export default ElectionsList;
