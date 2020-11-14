import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchElections } from '../../services/electionsSlice'
import { RootState } from '../../store'
import ElectionsListItem from './elections-list/ElectionsListItem'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ElectionsForm from './ElectionsForm'

function ElectionsPage () {
  const dispatch = useDispatch()
  const { electionsList, isCandidatesShown, candidatesList } = useSelector(
    (state: RootState) => state.elections
  )

  useEffect(() => {
    dispatch(fetchElections())
  }, [])

  return (
    <div>
      {!isCandidatesShown ? (
        <div>
          {electionsList.map((item, index) => (
            <ElectionsListItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <ElectionsForm />
      )}
      <ToastContainer position='bottom-center' closeOnClick />
    </div>
  )
}

export default ElectionsPage
