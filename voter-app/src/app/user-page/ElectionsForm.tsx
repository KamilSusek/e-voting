import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import {
  selectVote,
  sendVote,
  showElections
} from '../../services/electionsSlice'
import { RootState } from '../../store'
import CandidatesListItem from './candidates-list/CandidatesListItem'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

function ElectionsForm () {
  const dispatch = useDispatch()
  const { candidatesList, selectedVote, selectedElection } = useSelector(
    (state: RootState) => state.elections
  )

  const notify = () => toast.success('Your vote was sent succesfully!')

  const goBackToElections = () => {
    dispatch(showElections())
  }

  const handleVoteSelect = (id: number) => {
    dispatch(selectVote(id))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const handleResultInfo = (result: boolean) => {
      if (result) {
        toast.success('Your vote was sent successfully!')
      } else {
        toast.error('Failed to send vote. Check if voting isnt expired.')
      }
    }

    if (selectedVote !== '') {
      const index = +selectedVote
      const candidate = candidatesList[index]
      dispatch(sendVote(selectedElection, candidate, handleResultInfo))
    } else {
      toast.error('You must select at least one option.')
    }
  }

  return (
    <div>
      <Button onClick={goBackToElections} startIcon={<ArrowBackIcon />}>
        Go back
      </Button>
      <div>
        {candidatesList.map((item, index) => (
          <CandidatesListItem
            key={index}
            item={item}
            id={index}
            onSelect={handleVoteSelect}
          />
        ))}
        <Button color='primary' variant='contained' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <ToastContainer position='bottom-center' closeOnClick />
    </div>
  )
}

export default ElectionsForm
