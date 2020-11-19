import React, { useState } from 'react'
import {
  Avatar,
  IconButton,
  Grid,
  ListItem,
  ListItemAvatar,
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'

interface Election {
  election_name: string
  election_description: string
  start_date: string
  end_date: string
}

interface PropTypes {
  election: Election
}

const useStyles = makeStyles({
  item: {
    padding: '8px'
  },
  title: {
    padding: '6px'
  }
})

function ElectionListItem ({ election }: PropTypes) {
  const classes = useStyles()
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <ListItem button onClick={toggleShowDetails}>
      <Grid className={classes.item} container direction='column'>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item>
            <Grid className={classes.title} container alignItems='center'>
              <LabelOutlinedIcon fontSize='large' />
              <Typography>{election.election_name}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            {showDetails ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Grid>
        </Grid>
        <Divider />
        {showDetails && (
          <Grid>
            <Typography>
              Description: {election.election_description}
            </Typography>
            <Typography>Start date: {election.start_date}</Typography>
            <Typography>End date: {election.end_date}</Typography>
          </Grid>
        )}
      </Grid>
    </ListItem>
  )
}

export default ElectionListItem
