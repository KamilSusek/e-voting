import React from 'react'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
  makeStyles,
  Typography,
  Grid
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'

interface Voter {
  username: string
}

interface PropsTypes {
  voters: Voter[]
  goToVoterMenu: Function
}

const useStyles = makeStyles({
  title: {
    fontSize: '1.8rem',
    color: 'black',
    fontWeight: 'lighter'
  }
})

function VoterList ({ voters, goToVoterMenu }: PropsTypes) {
  const classes = useStyles()

  return (
    <List>
      <Divider />
      {voters.length > 0 ? (
        voters.map((item: Voter, index) => (
          <ListItem key={index} button>
            <Grid container alignItems='center'>
              <ListItemAvatar>
                <AccountCircleIcon fontSize='large' color='primary' />
              </ListItemAvatar>
              <Typography className={classes.title}>{item.username}</Typography>
            </Grid>
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='edit'
                color='primary'
                onClick={() => goToVoterMenu(item.username)}
              >
                <EditIcon fontSize='large' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <div>
          There are no voters in database. Click create voter to open voter
          creator.
        </div>
      )}
    </List>
  )
}

export default VoterList
