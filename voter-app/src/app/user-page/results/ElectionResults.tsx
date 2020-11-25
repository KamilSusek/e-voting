import { Button, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchElectionResults,
  showElections
} from '../../../services/electionsSlice'
import { RootState } from '../../../store'
import RenderBarChart from '../../chart/BarChart'

interface Result {
  candidate_name: string
  votes: number
}

function ElectionResults () {
  const dispatch = useDispatch()

  const { electionResults } = useSelector((state: RootState) => state.elections)

  const goBack = () => {
    dispatch(showElections())
  }

  return (
    <div className="chart_container">
      <RenderBarChart data={electionResults} />
      <Button fullWidth color="primary" variant="contained" onClick={goBack}>Go back</Button>
    </div>
  )
}

export default ElectionResults
