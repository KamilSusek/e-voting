import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchElection } from '../../../../features/electionManagerSlice'
import { RootState } from '../../../../store/store'

interface Params {
  electionName: string
}

interface Props {
  electionName: string
}

interface Elections {
  election_name: string
  election_description: string
  start_date: string
  end_date: string
  server_url: string
}

interface Candidate {
  candidate_name: string
  candidate_description: string
}

interface Voter {
  username: string
}

const useStyles = makeStyles({
  root: {
    marginTop: '2%'
  },
  container: {
    minWidth: '80%'
  },
  electionInfoContainer: {
    padding: '10px',
    minHeight: '30vh'
  },
  title: {
    fontSize: '2rem'
  },
  subTitle: {
    fontSize: '1.6rem'
  }
})

function ElectionStatus ({ electionName }: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { election } = useSelector((state: RootState) => state.electionManager)

  useEffect(() => {
    dispatch(fetchElection(electionName))
  }, [])

  return (
    <Grid className={classes.container}>
      <Grid
        className={classes.electionInfoContainer}
        container
        direction='column'
        justify='space-evenly'
      >
        <Typography className={classes.title} variant='h1'>
          {election.election_name}
        </Typography>
        <Divider />
        <Typography className={classes.subTitle} variant='h2'>
          {election.election_description}
        </Typography>
        <TextField
          variant='outlined'
          label='Server url'
          disabled
          value={election.server_url}
        />
        <Button variant='contained' color='primary'>
          Change url
        </Button>
      </Grid>
    </Grid>
  )
}

export default ElectionStatus
