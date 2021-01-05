import {
  Button,
  Divider,
  Grid,
  Input,
  List,
  ListItem,
  makeStyles
} from '@material-ui/core'
import axios from '../../../axios/axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoters, reset } from '../../../features/electionFormSlice'
import { RootState } from '../../../store/store'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '60vw',
    minHeight: '60vh'
  }
})

function AddVotersForm ({ previous }: any) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { electionFormState, candidates, voters } = useSelector(
    (state: RootState) => state.election
  )
  const [addedVotersList, setAddedVotersList] = useState<number[]>([])

  const history = useHistory()
  useEffect(() => {
    dispatch(fetchVoters())
  }, [])

  const createElection = async (votersArray: any) => {
    try {
      const response = await axios.post(
        '/election',
        {
          election: electionFormState,
          candidates: candidates,
          voters: votersArray
        },
        {
          headers: {
            role: localStorage.getItem('role'),
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (addedVotersList.length > 0) {
      const votersArray = new Array()

      addedVotersList.forEach(item => {
        votersArray.push(voters[item])
      })

      createElection(votersArray)
      history.push('/elections')
      dispatch(reset)
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.checked) {
      const votersArray = addedVotersList.concat(index)
      setAddedVotersList(votersArray)
    } else {
      const votersArray = addedVotersList.filter(value => {
        if (value !== index) return -1
      })
      setAddedVotersList(votersArray)
    }
  }

  return (
    <Grid container justify='center'>
      <form onSubmit={handleSubmit}>
        <Grid className={classes.root} container direction='column'>
          <List>
            {voters.map((item: any, index) => {
              return (
                <>
                  <ListItem key={index} button alignItems='flex-start'>
                    <Grid container justify='space-between' alignItems='center'>
                      <p>{item.username}</p>
                      <input
                        onChange={(event: any) => handleChange(event, index)}
                        type='checkbox'
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                </>
              )
            })}
          </List>
        </Grid>
        <Grid container justify='space-between' alignItems='center'>
          <Button color='primary' variant='contained' onClick={previous}>
            Previous
          </Button>
          <Button color='primary' variant='contained' type='submit'>
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default AddVotersForm
