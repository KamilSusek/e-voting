import { Button, Grid, Input } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoters } from '../../../features/electionFormSlice'
import { RootState } from '../../../store/store'

function AddVotersForm ({ previous }: any) {
  const dispatch = useDispatch()
  const { electionFormState, candidates, voters } = useSelector(
    (state: RootState) => state.election
  )
  useEffect(() => {
    dispatch(fetchVoters())
  }, [])

  const createElection = async () => {
    try {
      const response = await axios.post('http://localhost:8080/election', {
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
    <div>
      <form onSubmit={handleSubmit}>
        <Button>Add all</Button>
        {voters.map((item: any, index) => {
          return (
            <Grid container justify='center' alignItems='center'>
              <p>{item.username}</p>
              <Input type='checkbox' />
            </Grid>
          )
        })}
        <Grid>
          <Button onClick={previous}>Previous</Button>
          <Button type='submit'>Submit</Button>
        </Grid>
      </form>
    </div>
  )
}

export default AddVotersForm
