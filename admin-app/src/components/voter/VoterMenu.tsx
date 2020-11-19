import React, { useEffect, useState } from 'react'
import {
  Grid,
  List,
  Paper,
  Typography,
  makeStyles,
  Divider,
  IconButton
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchElections, fetchVoter } from '../../features/voterMenuSlice'
import { RootState } from '../../store/store'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ElectionList from './election-list/ElectionList'

interface Params {
  votername: string
}

const useStyles = makeStyles({
  root: {
    padding: '8px',
    width: '70%',
    minHeight: '60vh'
  }
})

function VoterMenu () {
  const classes = useStyles()
  const { votername } = useParams<Params>()
  const history = useHistory()
  const dispatch = useDispatch()
  const { elections, voter } = useSelector((state: RootState) => state.voter)
  const [isElectionsShow, setElectionsShow] = useState(false)

  const onError = () => {
    history.goBack()
  }

  const fetchInitialData = async () => {
    dispatch(fetchVoter(votername, onError))
    dispatch(fetchElections(votername))
  }

  const toggleShowElections = () => {
    setElectionsShow(!isElectionsShow)
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  return (
    <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
      <Paper className={classes.root}>
        <Grid container direction='column'>
          <Grid container alignItems='center'>
            <AccountCircleIcon fontSize="large" />
            <Typography variant='h6'>{voter.username}</Typography>
          </Grid>
          <Divider />
          <div>
            <Grid container justify='space-between' alignItems='center'>
              <Typography>Elections</Typography>
              <IconButton onClick={toggleShowElections}>
                {isElectionsShow ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Grid>
            <Divider/>
            {isElectionsShow && (
              <List>
                <ElectionList elections={elections} />
              </List>
            )}
          </div>
        </Grid>
      </Paper>
    </div>
  )
}

export default VoterMenu
