import { Button, Grid, Typography } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import React from 'react'

import CheckIcon from '@material-ui/icons/Check'

function VoteButton ({ isTimeElaspsed, didVote, endDate, toggleVote }: any) {
  if (isTimeElaspsed) {
    return (
      <Grid item>
        <Typography>This voting finished at {endDate}.</Typography>
      </Grid>
    )
  } else if (didVote) {
    return (
      <Grid item>
        <Grid container justify='flex-end' alignItems='center'>
          <Typography>Your vote was sent.</Typography>
          <CheckIcon />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container justify='flex-end' alignItems='center'>
        <Button
          
          variant='contained'
          onClick={toggleVote}
        >
          Vote <ArrowForwardIcon />
        </Button>
      </Grid>
    )
  }
}

export default VoteButton
