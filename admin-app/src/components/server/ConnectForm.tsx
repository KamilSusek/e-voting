import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error'
import React, { useState } from 'react'
import axios from 'axios'

interface Props {
  serverUrl: string
}

const useStyles = makeStyles({
  textField: {
    width: '60vw'
  },
  connectContainer: {
    width: '70vw',
    margin: '10px'
  }
})

function ConnectForm ({ serverUrl }: Props) {
  const classes = useStyles()
  const [isSuccess, setIsSuccess] = useState({
    touched: false,
    isFinished: false,
    isSuccess: false
  })
  const [connectServerUrl, setConnectServerUrl] = useState('')

  const registerPeer = async () => {
    setIsSuccess({ touched: true, isFinished: false, isSuccess: false })
    try {
      await axios.post(`${serverUrl}/register`, {
        url: connectServerUrl
      })
      setIsSuccess({ touched: true, isFinished: true, isSuccess: true })
    } catch (error) {
      console.log(error)
      setIsSuccess({ touched: true, isFinished: true, isSuccess: false })
    }
  }

  const handleChange = (event: any) => {
    setConnectServerUrl(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    registerPeer()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        className={classes.connectContainer}
        container
        justify='space-evenly'
        alignItems='center'
      >
        <TextField
          className={classes.textField}
          onChange={handleChange}
          value={connectServerUrl}
          variant='outlined'
          label='Server url'
          required
        />
        <Button color='primary' variant='contained' type='submit'>
          {isSuccess.touched && !isSuccess.isFinished && <CircularProgress />}
          {isSuccess.touched && isSuccess.isFinished && isSuccess.isSuccess && (
            <CheckIcon />
          )}
          {isSuccess.touched &&
            isSuccess.isFinished &&
            !isSuccess.isSuccess && <ErrorIcon />}
          Connect
        </Button>
      </Grid>
    </form>
  )
}

export default ConnectForm
