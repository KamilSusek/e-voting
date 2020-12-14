import React from 'react'
import { Button, Divider, Grid, Typography } from '@material-ui/core'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { useDispatch } from 'react-redux'
import {
  fetchCandidatesForElection,
  fetchElectionResults
} from '../../../services/electionsSlice'
import VoteButton from './VoteButton'

function ElectionsListItem ({ item }: any) {
  const dispatch = useDispatch()
  const {
    election_name,
    election_description,
    start_date,
    end_date,
    isTimeElaspsed,
    is_published,
    didVote
  } = item

  const toggleVote = () => {
    dispatch(fetchCandidatesForElection(election_name))
  }

  const getElectionResults = () => {
    dispatch(fetchElectionResults(election_name))
  }

  return (
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
      {is_published ? (
        <Button
          color='primary'
          variant='contained'
          onClick={getElectionResults}
        >
          Results
        </Button>
      ) : (
        <VoteButton
          isTimeElaspsed={isTimeElaspsed}
          didVote={didVote}
          endDate={end_date}
          toggleVote={toggleVote}
        />
      )}
    </Grid>
  )
}

export default ElectionsListItem
