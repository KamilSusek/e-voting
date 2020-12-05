import React, { useEffect, useState } from 'react'
import axios from '../../axios/axios'
import { Button, Grid, Typography, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CreateVoterDialog from './CreateVoterDialog'
import VoterList from './voters-list/VoterList'

const useStyles = makeStyles({
  root: {
    marginTop: '2%',
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.9rem',
    fontWeight: 'bold'
  }
})

function Voters () {
  const [voters, setVoters] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  const goToVoterMenu = (username: string) => {
    history.push(`/voters/${username}`)
  }

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
    fetchVoters()
  }

  const fetchVoters = async () => {
    try {
      const response = await axios.get('/voters', {
        headers: {
          role: localStorage.getItem('role'),
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setVoters(response.data)
      console.log(response)
    } catch (error) {}
  }

  useEffect(() => {
    fetchVoters()
  }, [])

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <Grid container justify='space-between' alignItems='center'>
          <Typography className={classes.title}>Voters</Typography>
          <Button
            size='large'
            variant='contained'
            color='primary'
            onClick={handleOpen}
          >
            Create Voter
          </Button>
        </Grid>
        <div>
          <VoterList voters={voters} goToVoterMenu={goToVoterMenu} />
        </div>
        <CreateVoterDialog open={openDialog} handleClose={handleClose} />
      </Grid>
    </div>
  )
}

export default Voters
