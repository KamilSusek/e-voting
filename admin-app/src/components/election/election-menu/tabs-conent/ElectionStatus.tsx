import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles,
  LinearProgress
} from '@material-ui/core'
import axios from '../../../../axios/axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorIcon from '@material-ui/icons/Error'
import CheckIcon from '@material-ui/icons/Check'
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
  const [disableEdit, setDisableEdit] = useState(true)
  const [touched, setTouched] = useState({
    isTouched: false,
    isSuccess: false
  })
  const { election } = useSelector((state: RootState) => state.electionManager)
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    setUrl(election.server_url)
  }, [])

  const onSuccess = () => {
    setTouched({ isTouched: true, isSuccess: true })
  }

  const onError = () => {
    setTouched({ isTouched: true, isSuccess: false })
  }

  const changeUrl = async () => {
    try {
      const response = await axios.post(`/changeUrl`, {
        electionName: electionName,
        serverUrl: url
      })
      setDisableEdit(true)
      onSuccess()
    } catch (error) {
      onError()
    }
  }

  const handleChange = (event: any) => {
    setUrl(event.target.value)
  }

  const handleSubmit = () => {
    changeUrl()
  }

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
          disabled={disableEdit}
          onChange={handleChange}
          value={url}
          required
        />
        {!disableEdit && (
          <>
            <Button onClick={handleSubmit} variant='contained' color='primary'>
              Submit
            </Button>
          </>
        )}
        <Button
          onClick={() => setDisableEdit(!disableEdit)}
          variant='contained'
          color='primary'
        >
          {touched.isTouched ? (
            touched.isSuccess ? (
              <CheckIcon />
            ) : (
              <ErrorIcon />
            )
          ) : (
            'Change url'
          )}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ElectionStatus
