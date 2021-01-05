import {
  Dialog,
  Grid,
  Input,
  Paper,
  TextField,
  makeStyles,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error'
import React, { useState } from 'react'
import axios from '../../axios/axios'

interface LoginData {
  username: string
  password: string
  confirmPassword: string
}

interface Success {
  isSuccess: boolean
  isTouched: boolean
}

const useStyles = makeStyles({
  container: {
    padding: '12px',
    minHeight: '35vh',
    minWidth: '20vw'
  },
  title: {
    textAlign: 'center'
  },
  progressBar: {
    textAlign: 'center'
  },
  successBtn: {
    backgroundColor: 'green'
  },
  failureBtn: {
    background: 'red'
  }
})

const CreateVoterDialog = ({ open, handleClose }: any) => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [isProgressShow, setProgressShow] = useState(false)
  const [showSuccess, setSuccess] = useState<Success>({
    isSuccess: false,
    isTouched: false
  })
  const classes = useStyles()

  const reset = () => {
    setLoginData({
      username: '',
      password: '',
      confirmPassword: ''
    })
    setProgressShow(false)
    setSuccess({
      isSuccess: false,
      isTouched: false
    })
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { username, password, confirmPassword } = loginData

    if (
      username &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      sendLogin()
    }
  }

  const sendLogin = async () => {
    setProgressShow(true)
    try {
      const { username, password } = loginData
      console.log({
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      })
      const response = await axios.post(
        '/voter/add',
        {
          username,
          password
        },
        {
          headers: {
            role: localStorage.getItem('role'),
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      setProgressShow(false)
      reset()
      setSuccess({ isTouched: true, isSuccess: true })
    } catch (error) {
      setProgressShow(false)
      setSuccess({ isTouched: true, isSuccess: false })
    }
  }

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <Paper>
        <form onSubmit={handleSubmit}>
          <Grid
            className={classes.container}
            container
            direction='column'
            justify='space-evenly'
          >
            <Typography className={classes.title}>Register voter</Typography>
            <TextField
              onChange={handleChange}
              value={loginData.username}
              variant='outlined'
              label='Username'
              name='username'
              required
              type='text'
            />
            <TextField
              onChange={handleChange}
              value={loginData.password}
              variant='outlined'
              label='Password'
              name='password'
              required
              type='password'
            />
            <TextField
              onChange={handleChange}
              value={loginData.confirmPassword}
              variant='outlined'
              label='Confirm password'
              name='confirmPassword'
              required
              type='password'
            />
            {isProgressShow ? (
              <div className={classes.progressBar}>
                <CircularProgress />
              </div>
            ) : (
              <Button
                variant='contained'
                color='primary'
                type='submit'
                className={
                  showSuccess.isTouched
                    ? showSuccess.isSuccess
                      ? classes.successBtn
                      : classes.failureBtn
                    : ''
                }
              >
                {showSuccess.isTouched ? (
                  showSuccess.isSuccess ? (
                    <CheckIcon />
                  ) : (
                    <ErrorIcon />
                  )
                ) : (
                  ''
                )}
                Submit
              </Button>
            )}
          </Grid>
        </form>
      </Paper>
    </Dialog>
  )
}

export default CreateVoterDialog
