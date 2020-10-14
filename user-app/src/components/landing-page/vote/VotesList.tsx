import React, { useState, useEffect } from "react";
import { Button, Divider, Grid, makeStyles, Paper } from "@material-ui/core";
import axios from "../../../axios";
import "./style.css";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  item: {
    padding: "8px",
  },
});

interface VoteInterface {
  option: {
    optionName: string;
    description: string;
  };
}

function Vote({ option }: VoteInterface) {
  const [showDescription, setDescription] = useState(false);
  const classes = useStyles();
  const { optionName, description } = option;

  const toggleDescription = () => {
    setDescription(!showDescription);
  };

  return (
    <div className="item">
      <Paper className="item-conent">
        <Grid>
          <Grid container justify="space-between" alignItems="center">
            <Grid item onClick={toggleDescription}>
              <h3 style={{ cursor: "pointer" }}>{optionName}</h3>
            </Grid>
            <Grid item>
              <input type="checkbox" />
            </Grid>
          </Grid>
          <Divider />
          <div style={{ textAlign: "center" }}>
            <span className={showDescription ? "hide" : "details"}></span>
          </div>
          {showDescription && (
            <Grid>
              <h4>{description}</h4>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}

function VotesList() {
  const [voteOptions, setVoteOptions] = useState([]);
  const { title } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const respone = await axios.get(`/elections/options/${title}`);
        setVoteOptions(respone.data);
      } catch (error) {}
    };
    fetchVotes();
  }, []);

  return (
    <Grid container justify="center">
      <div style={{ width: "60vw" }}>
        <Grid container justify="flex-start">
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </Button>
          <h1>{title}</h1>
        </Grid>
        <Divider />
        {voteOptions && voteOptions.length > 0 ? (
          voteOptions.map((option: any, index: number) => (
            <React.Fragment key={index}>
              <Vote option={option} />
            </React.Fragment>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </Grid>
  );
}

export default VotesList;
