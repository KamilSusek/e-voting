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

interface Election {
  election_name: string
  election_description: string
}

const useStyles = makeStyles({
  box: {
    marginTop: '2%',
    display: 'flex',
    justifyContent: 'center'
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
          <Typography variant='h6'>Elections</Typography>
          <Button onClick={goToCreateElection} variant='contained'>
            Create Election
          </Button>
        </Grid>
        <div>
          <List>
            <Divider />
            {elections.length > 0 ? (
              elections.map((item: Election, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={item.election_name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={() => goToElectionMenu(item.election_name)}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <div>
                There are no elections. Click create elections to start election
                creator.
              </div>
            )}
          </List>
        </div>
      </Grid>
    </div>
  )
}

export default Elections
