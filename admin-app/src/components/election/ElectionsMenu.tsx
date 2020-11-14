import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles,
  IconButton,
  TextField
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ChartistGraph from 'react-chartist'

interface Params {
  electionName: string
}

interface Elections {
  election_name: string
  election_description: string
  start_date: string
  end_date: string
  server_url: string
}

interface Candidate {
  candidate_name: string
  candidate_description: string
}

interface Voter {
  username: string
}

const useStyles = makeStyles({
  root: {
    marginTop: '2%'
  },
  container: {
    minWidth: '80%'
  },
  electionInfoContainer: {
    padding: '10px',
    minHeight: '30vh'
  },
  title: {
    fontSize: '2rem'
  },
  subTitle: {
    fontSize: '1.6rem'
  }
})

function ElectionsMenu () {
  const classes = useStyles()
  const { electionName } = useParams<Params>()
  const history = useHistory()

  const [showCandidates, setShowCandidates] = useState(false)
  const [showVoters, setShowVoters] = useState(false)

  const [election, setElection] = useState<Elections>({
    election_name: '',
    election_description: '',
    start_date: '',
    end_date: '',
    server_url: ''
  })
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      candidate_name: '',
      candidate_description: ''
    }
  ])
  const [voters, setVoters] = useState<Voter[]>()

  const fetchElection = async () => {
    try {
      const election = await axios.get(
        `http://localhost:8080/election/${electionName}`
      )
      const candidates = await axios.get(
        `http://localhost:8080/candidates/${electionName}`
      )
      const voters = await axios.get(
        `http://localhost:8080/voters/${electionName}`
      )
      setElection(election.data)
      setCandidates(candidates.data)
      setVoters(voters.data)
    } catch (error) {
      history.goBack()
    }
  }

  useEffect(() => {
    fetchElection()
  }, [])

  return (
    <Grid className={classes.root} container justify='center'>
      <Grid className={classes.container}>
        <Grid
          className={classes.electionInfoContainer}
          container
          direction='column'
          justify='space-evenly'
          spacing={3}
        >
          <Typography className={classes.title} variant='h1'>
            {election.election_name}
          </Typography>
          <Divider />
          <Typography className={classes.subTitle} variant='h2'>
            {election.election_description}
          </Typography>
          <TextField
            variant='outlined'
            label='Server url'
            disabled
            value={election.server_url}
          />
          <Button>Change url</Button>
        </Grid>
        <div>
          <Grid container justify='space-between' alignItems='center'>
            <Typography>Candidates</Typography>
            <IconButton onClick={() => setShowCandidates(!showCandidates)}>
              {showCandidates ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Grid>
          <Divider />
          {showCandidates && (
            <List>
              {candidates.length > 0 ? (
                candidates.map((item: Candidate, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={item.candidate_name} />
                  </ListItem>
                ))
              ) : (
                <div>none</div>
              )}
            </List>
          )}
          <Grid container justify='space-between' alignItems='center'>
            <Typography>Voters</Typography>
            <IconButton onClick={() => setShowVoters(!showVoters)}>
              {showVoters ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Grid>
          <Divider />
          {showVoters && (
            <List>
              {voters && voters.length > 0 ? (
                voters.map((item: Voter, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={item.username} />
                  </ListItem>
                ))
              ) : (
                <div>none</div>
              )}
            </List>
          )}
        </div>
        <ElectionResults />
      </Grid>
    </Grid>
  )
}

interface VotingResult {
  candidate_name: string
  voteCounter: number
}

function ElectionResults () {
  const [showResults, setShowResults] = useState(false)
  const [graphData, setGraphData] = useState<VotingResult[]>()
  const { electionName } = useParams<Params>()

  const getResults = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/score/${electionName}`
      )
      console.log(data)
      setGraphData(data)
      setShowResults(true)
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowResultsClick = () => {
    getResults()
  }

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Button onClick={handleShowResultsClick}>Get Results</Button>
      {showResults &&
        graphData &&
        graphData.map((item: VotingResult, index) => (
          <Typography key={index}>
            {item.candidate_name} - {item.voteCounter}
          </Typography>
        ))}
    </Grid>
  )
}

export default ElectionsMenu
