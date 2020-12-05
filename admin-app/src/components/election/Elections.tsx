import React, { useEffect, useState } from 'react'
import axios from '../../axios/axios'
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import ElectionList from './election-list/ElectionList'

const useStyles = makeStyles({
  box: {
    marginTop: '2%',
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.9rem',
    fontWeight: 'bold'
  }
})

function Elections () {
  const [elections, setElections] = useState([])
  const history = useHistory()
  const classes = useStyles()

  const goToElectionMenu = (electionName: string) => {
    history.push(`/elections/${electionName}`)
  }

  const fetchElections = async () => {
    try {
      const response = await axios.get('/elections', {
        headers: {
          role: localStorage.getItem('role'),
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setElections(response.data)
      console.log(response)
    } catch (error) {}
  }

  const deleteElection = async (electionName: string) => {
    try {
      await axios.delete('/election', {
        data: {
          electionName: electionName
        },
        headers: {
          role: localStorage.getItem('role'),
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      fetchElections()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchElections()
  }, [])

  const goToCreateElection = () => {
    history.push('/election/create')
  }

  return (
    <div className={classes.box}>
      <Grid item xs={12} md={6}>
        <Grid container justify='space-between' alignItems='center'>
          <Typography className={classes.title}>Elections</Typography>
          <Button
            size='large'
            color='primary'
            variant='contained'
            onClick={goToCreateElection}
          >
            Create Election
          </Button>
        </Grid>
        <div>
          <ElectionList
            elections={elections}
            goToElectionMenu={goToElectionMenu}
            deleteElection={deleteElection}
          />
        </div>
      </Grid>
    </div>
  )
}

export default Elections
