import { AppBar, Button, Grid, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import './App.css'
import Elections from './components/election/Elections'
import VoterMenu from './components/voter/VoterMenu'
import Voters from './components/voter/Voters'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import CreateElection from './components/election/create-election-form/CreateElection'
import Footer from './components/common/footer/Footer'
import ContentContainer from './components/common/container/ContentContainer'
import ElectionMenuPanel from './components/election/election-menu/tabs/ElectionMenuPanel'
import Server from './components/server/Server'

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
  return (
    <div>
      <Router>
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
            <IconButton>Logout</IconButton>
          </Grid>
        </AppBar>
        <ContentContainer>
          <Switch>
            <Route exact path='/voters'>
              <Voters />
            </Route>
            <Route exact path='/elections'>
              <Elections />
            </Route>
            <Route path='/servers'>
              <Server />
            </Route>
            <Route path='/voters/:votername'>
              <VoterMenu />
            </Route>
            <Route path='/elections/:electionName'>
              {/* <ElectionsMenu /> */}
              <ElectionMenuPanel />
            </Route>
            <Route path='/election/create'>
              <CreateElection />
            </Route>
          </Switch>
        </ContentContainer>
      </Router>
      <Footer />
    </div>
  )
}

export default App
