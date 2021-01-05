import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../../axios/axios'
import { login } from '../../services/authService'

function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event: any) => {
    event.preventDefault()
    login(username, password, history)
  }

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <form onSubmit={handleLogin}>
        <Grid
          style={{ minHeight: '50vh' }}
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Paper style={{padding: '8px'}}>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            >
              <TextField
                onChange={handleUsernameChange}
                placeholder='login'
                type='text'
              />
              <TextField
                onChange={handlePasswordChange}
                placeholder='password'
                type='password'
              />
              <Button type='submit'>Login</Button>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </Grid>
  )
}

export default LoginPage
