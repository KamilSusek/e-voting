import { Button, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchResults,
  publishElectionResults
} from '../../../../features/electionManagerSlice'
import { RootState } from '../../../../store/store'
import RenderBarChart from '../../../common/chart/BarChart'

interface Params {
  electionName: string
}

function Results ({ electionName }: Params) {
  const dispatch = useDispatch()
  const { election, results } = useSelector(
    (state: RootState) => state.electionManager
  )

  const handleResultsPublish = () => {
    dispatch(publishElectionResults(electionName))
  }

  useEffect(() => {
    if (election.is_published) {
      dispatch(fetchResults(electionName))
    }
  }, [dispatch, election.is_published])
  return (
    <div>
      {election.is_published ? (
        <div>{results.length > 0 && <RenderBarChart data={results} />}</div>
      ) : (
        <Grid
          style={{ height: '60vh' }}
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Button
            onClick={handleResultsPublish}
            color='primary'
            variant='contained'
          >
            Publish results
          </Button>
        </Grid>
      )}
    </div>
  )
}

export default Results
