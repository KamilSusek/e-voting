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
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoters } from '../../../features/electionFormSlice'
import { RootState } from '../../../store/store'

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
  useEffect(() => {
    dispatch(fetchVoters())
  }, [])

  const createElection = async () => {
    try {
      const response = await axios.post('/election', {
        election: electionFormState,
        candidates: candidates,
        voters: voters
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(electionFormState, candidates, voters)
    createElection()
  }

  return (
    <Grid container justify='center'>
      <form onSubmit={handleSubmit}>
        <Grid className={classes.root} container direction='column'>
          <List>
            {voters.map((item: any, index) => {
              return (
                <>
                  <ListItem button alignItems='flex-start'>
                    <p>{item.username}</p>
                    <Input type='checkbox' />
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
          <Button color='primary' variant='contained'>
            Add all
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
