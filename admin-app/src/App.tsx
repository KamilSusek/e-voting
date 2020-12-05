import { AppBar, Button, Grid, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import './App.css'
import Elections from './components/election/Elections'
import VoterMenu from './components/voter/VoterMenu'
import Voters from './components/voter/Voters'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import CreateElection from './components/election/create-election-form/CreateElection'
import Footer from './components/common/footer/Footer'
import ContentContainer from './components/common/container/ContentContainer'
import ElectionMenuPanel from './components/election/election-menu/tabs/ElectionMenuPanel'
import Server from './components/server/Server'
import LoginPage from './components/login-page/LoginPage'
import PrivateRoute from './components/route/PrivateRoute'
import { logout } from './services/authService'

const useStyles = makeStyles({
  link: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '1.3rem',
    '& button': {
      color: 'white'
    },
    '& a': {
      textDecoration: 'none'
    }
  }
})

function App () {
  const styles = useStyles()

  const Header = () => {
    const history = useHistory()

    const handleLogout = () => {
      logout(history)
    }

    return (
      <AppBar position='static'>
        <Grid container justify='space-between'>
          <Toolbar className={styles.link}>
            <Link to='/voters'>
              <IconButton>Voters</IconButton>
            </Link>
            <Link to='/elections'>
              <IconButton>Elections</IconButton>
            </Link>
            <Link to='/servers'>
              <IconButton>Servers</IconButton>
            </Link>
          </Toolbar>
          <Button onClick={handleLogout}>Logout</Button>
        </Grid>
      </AppBar>
    )
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <ContentContainer>
              <LoginPage />
            </ContentContainer>
          </Route>
          <PrivateRoute exact path='/voters'>
            <Header />
            <ContentContainer>
              <Voters />
            </ContentContainer>
          </PrivateRoute>
          <PrivateRoute exact path='/elections'>
            <Header />
            <ContentContainer>
              <Elections />
            </ContentContainer>
          </PrivateRoute>
          <PrivateRoute exact path='/servers'>
            <Header />
            <ContentContainer>
              <Server />
            </ContentContainer>
          </PrivateRoute>
          <PrivateRoute exact path='/voters/:votername'>
            <Header />
            <ContentContainer>
              <VoterMenu />
            </ContentContainer>
          </PrivateRoute>
          <PrivateRoute exact path='/elections/:electionName'>
            <Header />
            <ContentContainer>
              <ElectionMenuPanel />
            </ContentContainer>
          </PrivateRoute>
          <PrivateRoute exact path='/election/create'>
            <Header />
            <ContentContainer>
              <CreateElection />
            </ContentContainer>
          </PrivateRoute>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App
