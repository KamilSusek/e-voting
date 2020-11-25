import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkIfDateMatches,
  checkIfServerUrlExists,
  checkIfTitleExists,
  setElectionFormState
} from '../../../features/electionFormSlice'
import { RootState } from '../../../store/store'

const useStyles = makeStyles({
  firstContainer: {
    padding: '10px',
    height: '20vh',
    width: '60%'
  },
  secondContainer: {
    padding: '10px',
    height: '30vh',
    width: '60%'
  }
})

function ElectionForm ({ next }: any) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector(
    (state: RootState) => state.election.electionFormState
  )
  const {
    titleError,
    endDateError,
    startDateError,
    serverUrlError
  } = useSelector((state: RootState) => state.election.errors)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(checkIfTitleExists(state.election_name))
    dispatch(checkIfDateMatches(state.start_date, state.end_date))
    dispatch(checkIfServerUrlExists(state.server_url))
    if (!titleError && !endDateError && !startDateError && !serverUrlError) {
      next()
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(
      setElectionFormState({
        ...state,
        [event.target.name]: event.target.value
      })
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        padding='12px'
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Grid
          className={classes.firstContainer}
          container
          direction='column'
          justify='space-evenly'
        >
          <TextField
            onChange={handleChange}
            name='election_name'
            value={state.election_name}
            type='text'
            error={titleError}
            helperText={
              titleError && 'Election with provided title already exists.'
            }
            variant='outlined'
            label='Elections title'
            required
          />
          <TextField
            onChange={handleChange}
            name='election_description'
            value={state.election_description}
            type='text'
            variant='outlined'
            label='Description'
            required
          />
        </Grid>
        <Divider />
        <Grid
          className={classes.secondContainer}
          container
          direction='column'
          justify='space-evenly'
        >
          <TextField
            onChange={handleChange}
            name='start_date'
            value={state.start_date}
            variant='outlined'
            label='Start date'
            type='date'
            error={startDateError}
            helperText={startDateError && 'You provided wrong date.'}
            required
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            onChange={handleChange}
            name='end_date'
            value={state.end_date}
            variant='outlined'
            label='End date'
            type='date'
            error={endDateError}
            helperText={endDateError && 'You provided wrong date.'}
            required
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            onChange={handleChange}
            name='server_url'
            value={state.server_url}
            type='text'
            variant='outlined'
            label='Server url'
            error={serverUrlError}
            helperText={
              serverUrlError && 'Server with this url already exists.'
            }
            required
          />
        </Grid>
        <Grid container justify='center'>
          <Button
            variant='contained'
            type='submit'
            size='large'
            color='primary'
          >
            Check and proceed further
          </Button>
        </Grid>
      </Box>
    </form>
  )
}

export default ElectionForm
