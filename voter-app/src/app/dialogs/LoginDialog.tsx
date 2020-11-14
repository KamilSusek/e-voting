import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog/Dialog'
import React from 'react'
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

  const handleUsernameChange = (event: any) => {
    dispatch(setUsername(event.target.value))
  }

  const handlePasswordChange = (event: any) => {
    dispatch(setPassword(event.target.value))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(username, password)
    dispatch(
      handleLogin(username, password, (result: boolean) => {
        if (result) {
          history.push('/user')
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
            margin='dense'
            label='Login'
            type='text'
            fullWidth
          />
          <TextField
            onChange={handlePasswordChange}
            value={password}
            margin='dense'
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
