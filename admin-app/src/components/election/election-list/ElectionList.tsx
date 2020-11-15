import React from 'react'
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
  Divider,
  Grid
} from '@material-ui/core'
import LabelIcon from '@material-ui/icons/Label'
import EditIcon from '@material-ui/icons/Edit'

interface Election {
  election_name: string
  election_description: string
}

interface PropsTypes {
  elections: Election[]
  goToElectionMenu: Function
}

const useStyles = makeStyles({
  title: {
    fontSize: '1.8rem',
    color: 'black',
    fontWeight: 'lighter'
  }
})

function ElectionList ({ elections, goToElectionMenu }: PropsTypes) {
  const classes = useStyles()

  if (elections.length > 0) {
    return (
      <List>
        <Divider />
        {elections.map((item: Election, index: number) => (
          <ListItem key={index} button>
            <Grid container alignItems='center'>
              <ListItemAvatar>
                <LabelIcon fontSize='large' color='primary' />
              </ListItemAvatar>
              <Typography className={classes.title}>
                {item.election_name}
              </Typography>
            </Grid>
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='edit'
                color='primary'
                onClick={() => goToElectionMenu(item.election_name)}
              >
                <EditIcon fontSize='large' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  } else {
    return (
      <div>
        There are no elections. Click create elections to start election
        creator.
      </div>
    )
  }
}

export default ElectionList
