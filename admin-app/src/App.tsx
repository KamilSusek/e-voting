import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import './App.css'
import Elections from './components/election/Elections'
import VoterMenu from './components/voter/VoterMenu'
import Voters from './components/voter/Voters'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ElectionsMenu from './components/election/ElectionsMenu'
import CreateElection from './components/election/CreateElection'

const useStyles = makeStyles({
  link: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '60%',
    fontSize: '1.3rem',
    '& a': {
      textDecoration: 'none',
      color: 'white'
    }
  }
})

function App () {
  const styles = useStyles()
  return (
    <div>
      <Router>
        <AppBar position='relative'>
          <Toolbar className={styles.link}>
            <IconButton>
              <Link to='/voters'>Voters</Link>
            </IconButton>
            <IconButton>
              <Link to='/elections'>Elections</Link>
            </IconButton>
            <IconButton>
              <Link to='/help'>Voters</Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path='/voters'>
            <Voters />
          </Route>
          <Route exact path='/elections'>
            <Elections />
          </Route>
          <Route path='/help'></Route>
          <Route path='/voters/:votername'>
            <VoterMenu />
          </Route>
          <Route path='/elections/:electionName'>
            <ElectionsMenu />
          </Route>
          <Route path='/election/create'>
            <CreateElection />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
