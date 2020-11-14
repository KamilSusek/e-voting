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
  Paper,
  Divider
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useHistory } from 'react-router-dom'
import CreateVoterDialog from './CreateVoterDialog'

const useStyles = makeStyles({
  root: {
    marginTop: '2%',
    display: 'flex',
    justifyContent: 'center'
  }
})

interface Voter {
  username: string
}

function Voters () {
  const [voters, setVoters] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  const goToVoterMenu = (username: string) => {
    history.push(`/voters/${username}`)
  }

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
    fetchVoters()
  }

  const fetchVoters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/voters')
      setVoters(response.data)
      console.log(response)
    } catch (error) {}
  }

  useEffect(() => {
    fetchVoters()
  }, [])

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <Grid container justify='space-between' alignItems='center'>
          <Typography variant='h6'>Voters</Typography>
          <Button variant='contained' onClick={handleOpen}>
            Create Voter
          </Button>
        </Grid>
        <div>
          <List>
            <Divider />
            {voters.length > 0 ? (
              voters.map((item: Voter, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={item.username} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={() => goToVoterMenu(item.username)}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <div>
                There are no voters in database. Click create voter to open
                voter creator.
              </div>
            )}
          </List>
        </div>
        <CreateVoterDialog open={openDialog} handleClose={handleClose} />
      </Grid>
    </div>
  )
}

export default Voters
