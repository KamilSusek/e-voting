import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchElections } from '../../services/electionsSlice'
import { RootState } from '../../store'
import ElectionsListItem from './elections-list/ElectionsListItem'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VotingForm from './VotingForm'
import ElectionResults from './results/ElectionResults'

function ElectionsPage () {
  const dispatch = useDispatch()
  const { electionsList, isCandidatesShown, isResultsShown } = useSelector(
    (state: RootState) => state.elections
  )

  useEffect(() => {
    dispatch(fetchElections())
  }, [])

  if (isCandidatesShown) {
    return (
      <React.Fragment>
        <VotingForm />
        <ToastContainer position='bottom-center' closeOnClick />
      </React.Fragment>
    )
  } else if (isResultsShown) {
    return (
      <div>
        <ElectionResults />
      </div>
    )
  } else {
    return (
      <div>
        {electionsList.map((item, index) => (
          <ElectionsListItem key={index} item={item} />
        ))}
        <ToastContainer position='bottom-center' closeOnClick />
      </div>
    )
  }
}

export default ElectionsPage
