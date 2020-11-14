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
import { setElectionFormState } from '../../features/electionFormSlice'
import { RootState } from '../../store/store'

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    next()
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
            variant='outlined'
            label='Elections title'
            required
          />
          <TextField
            onChange={handleChange}
            name='election_description'
            value={state.election_description}
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
            required
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            onChange={handleChange}
            name='server_url'
            value={state.server_url}
            variant='outlined'
            required
            label='Server url'
          />
        </Grid>
        <Grid container justify='center'>
          <Button variant='contained' type='submit'>
            Check and proceed further
          </Button>
        </Grid>
      </Box>
    </form>
  )
}

export default ElectionForm
