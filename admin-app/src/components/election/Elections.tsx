import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import ElectionList from './election-list/ElectionList'

interface Election {
  election_name: string
  election_description: string
}

const useStyles = makeStyles({
  box: {
    marginTop: '2%',
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.9rem',
    fontWeight: 'bold'
  }
})

function Elections () {
  const [elections, setElections] = useState([])
  const history = useHistory()
  const classes = useStyles()

  const goToElectionMenu = (electionName: string) => {
    history.push(`/elections/${electionName}`)
  }

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/elections')
      setElections(response.data)
      console.log(response)
    } catch (error) {}
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const goToCreateElection = () => {
    history.push('/election/create')
  }

  return (
    <div className={classes.box}>
      <Grid item xs={12} md={6}>
        <Grid container justify='space-between' alignItems='center'>
          <Typography className={classes.title}>Elections</Typography>
          <Button
            size='large'
            color='primary'
            variant='contained'
            onClick={goToCreateElection}
          >
            Create Election
          </Button>
        </Grid>
        <div>
          <ElectionList
            elections={elections}
            goToElectionMenu={goToElectionMenu}
          />
        </div>
      </Grid>
    </div>
  )
}

export default Elections
