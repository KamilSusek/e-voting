import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import PeersList from './PeersList'

const useStyles = makeStyles({
  root: {
    margin: '2% 0'
  },
  container: {
    minWidth: '70vw'
  },
  textField: {
    width: '60vw'
  },
  success: { color: 'black', backgroundColor: 'green' },
  failure: { color: 'black', backgroundColor: 'red' }
})

function Server () {
  const classes = useStyles()
  const [serverUrl, setServerUrl] = useState('')
  const [serverResponse, setServerResponse] = useState({
    touched: false,
    result: false
  })
  const [peers, setPeers] = useState<string[]>([])

  const handleChange = (event: any) => {
    setServerUrl(event.target.value)
  }

  const pingServer = async () => {
    try {
      const response = await axios.get(`${serverUrl}/ping`)
      setServerResponse({ touched: true, result: true })
      const peers = await axios.get(`${serverUrl}/peers`)
      setPeers(peers.data)
    } catch (error) {
      setServerResponse({ touched: true, result: false })
    }
  }

  const handleCheckClick = () => {
    pingServer()
  }

  return (
    <Grid className={classes.root} container justify='center'>
      <Typography variant='h3'>Find blockchain network.</Typography>
      <Grid container direction='column' alignItems='center'>
        <form>
          <Grid
            className={classes.container}
            container
            alignItems='center'
            justify='space-between'
          >
            <TextField
              className={classes.textField}
              onChange={handleChange}
              value={serverUrl}
              variant='outlined'
              label='Server url'
              required
              error={
                serverResponse.touched
                  ? serverResponse.result
                    ? false
                    : true
                  : false
              }
              helperText={
                serverResponse.touched
                  ? serverResponse.result
                    ? ''
                    : 'Server is not available.'
                  : ''
              }
            />
            <Button
              onClick={handleCheckClick}
              color='primary'
              variant='contained'
              className={
                serverResponse.touched
                  ? serverResponse.result
                    ? classes.success
                    : classes.failure
                  : ''
              }
            >
              Check
            </Button>
          </Grid>
        </form>
        {serverResponse.touched && serverResponse.result && (
          <>
            <PeersList peers={peers} />
            <Grid container justify="center" alignItems='center'>
              <TextField variant='outlined' />
              <Button color='primary' variant='contained'>
                Connect
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Server
