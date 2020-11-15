import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import './App.css'
import Elections from './components/election/Elections'
import VoterMenu from './components/voter/VoterMenu'
import Voters from './components/voter/Voters'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ElectionsMenu from './components/election/ElectionsMenu'
import CreateElection from './components/election/create-election-form/CreateElection'
import Footer from './components/common/footer/Footer'
import ContentContainer from './components/common/container/ContentContainer'

const useStyles = makeStyles({
  link: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '60%',
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
        <AppBar position='relative'>
          <Toolbar className={styles.link}>
            <Link to='/voters'>
              <IconButton>Voters</IconButton>
            </Link>
            <Link to='/elections'>
              <IconButton>Elections</IconButton>
            </Link>
            <Link to='/help'>
              <IconButton>Voters</IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <ContentContainer>
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
        </ContentContainer>
      </Router>
      <Footer />
    </div>
  )
}

export default App
