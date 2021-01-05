import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog/Dialog'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  handleLogin,
  setPassword,
  setUsername
} from '../../services/loginSlice'
import { RootState } from '../../store'

function LoginDialog ({ open, handleClose }: any) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { username, password } = useSelector((state: RootState) => state.login)
  const [error, setError] = useState(false)

  const handleUsernameChange = (event: any) => {
    dispatch(setUsername(event.target.value))
  }

  const handlePasswordChange = (event: any) => {
    dispatch(setPassword(event.target.value))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    dispatch(
      handleLogin(username, password, (result: boolean) => {
        if (result) {
          history.push('/user')
          setError(false)
        } else {
          setError(true)
        }
      })
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            onChange={handleUsernameChange}
            value={username}
            error={error}
            helperText={error}
            margin='dense'
            label='Login'
            type='text'
            fullWidth
          />
          <TextField
            onChange={handlePasswordChange}
            value={password}
            margin='dense'
            error={error}
            helperText={error && 'You provided wrong login or password'}
            label='Password'
            type='password'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='outlined' color='primary' fullWidth>
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default LoginDialog
