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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import LabelIcon from '@material-ui/icons/Label'
import EditIcon from '@material-ui/icons/Edit'

interface Election {
  election_name: string
  election_description: string
  is_published: boolean
}

interface PropsTypes {
  elections: Election[]
  goToElectionMenu: Function
  deleteElection: Function
}

const useStyles = makeStyles({
  title: {
    fontSize: '1.8rem',
    color: 'black',
    fontWeight: 'lighter'
  }
})

function ElectionList ({
  elections,
  goToElectionMenu,
  deleteElection
}: PropsTypes) {
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
            {item.is_published && (
              <IconButton
                edge='end'
                aria-label='edit'
                color='primary'
                onClick={() => deleteElection(item.election_name)}
              >
                <DeleteOutlineIcon fontSize='large' />
              </IconButton>
            )}
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
