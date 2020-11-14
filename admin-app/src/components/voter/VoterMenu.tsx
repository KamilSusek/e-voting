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
  Paper,
  Typography
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useHistory, useParams } from 'react-router-dom'

interface Election {
  election_name: string
  election_description: string
}

interface Params {
  votername: string
}

function VoterMenu () {
  const [voter, setVoter] = useState({ username: '' })
  const [elections, setElections] = useState([])
  const [isElectionsShow, setElectionsShow] = useState(false)
  const history = useHistory()
  const { votername } = useParams<Params>()

  const fetchVoter = async () => {
    try {
      const voterData = await axios.get(
        `http://localhost:8080/voter/${votername}`
      )
      const electionsData = await axios.get(
        `http://localhost:8080/elections/${votername}`
      )

      setVoter(voterData.data)
      setElections(electionsData.data)
      console.log(electionsData.data)
    } catch (error) {
      history.goBack()
    }
  }

  const hideElections = () => {
    setElectionsShow(false)
  }

  const showElections = () => {
    setElectionsShow(true)
  }

  useEffect(() => {
    fetchVoter()
  }, [])

  return (
    <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
      <Paper style={{ padding: '8px', width: '70%' }}>
        <Grid container justify='space-between' >
          <Typography>{voter.username}</Typography>
          <div>
            {isElectionsShow ? (
              <List>
                <Button onClick={hideElections}>Hide Elections</Button>
                {elections.length > 0 ? (
                  elections.map((item: Election, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary={item.election_name} />
                    </ListItem>
                  ))
                ) : (
                  <div>none</div>
                )}
              </List>
            ) : (
              <Button onClick={showElections}>Show Elections</Button>
            )}
          </div>
        </Grid>
        <div>
          <Button>Add election</Button>
        </div>
      </Paper>
    </div>
  )
}

export default VoterMenu
