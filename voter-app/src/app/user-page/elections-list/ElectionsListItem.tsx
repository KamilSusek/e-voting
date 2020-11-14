import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchCandidatesForElection } from '../../../services/electionsSlice'
import CheckIcon from '@material-ui/icons/Check'

function ElectionsListItem ({ item }: any) {
  const dispatch = useDispatch()
  const {
    election_name,
    election_description,
    start_date,
    end_date,
    isTimeElaspsed,
    didVote
  } = item

  const toggleVote = () => {
    dispatch(fetchCandidatesForElection(election_name))
  }

  return (
    <Paper className='election_list_item' elevation={3}>
      <Grid
        className='election_list_item_container'
        container
        direction='column'
        justify='space-evenly'
      >
        <Grid item>
          <Typography variant='h1'>{election_name}</Typography>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant='h2'>{election_description}</Typography>
        </Grid>
        <Grid container justify='space-between' alignItems='center'>
          <Grid item>
            <Grid container alignItems='center'>
              <DateRangeIcon />
              <Typography variant='h2'>
                {start_date} - {end_date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <VoteButton
          isTimeElaspsed={isTimeElaspsed}
          didVote={didVote}
          endDate={end_date}
          toggleVote={toggleVote}
        />
      </Grid>
    </Paper>
  )
}

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
          color='primary'
          variant='contained'
          startIcon={<ArrowForwardIcon />}
          onClick={toggleVote}
        >
          Vote
        </Button>
      </Grid>
    )
  }
}

export default ElectionsListItem
