import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates } from '../../../../features/electionManagerSlice'
import { RootState } from '../../../../store/store'

interface Params {
  electionName: string
}

interface Candidate {
  candidate_name: string
  candidate_description: string
}

function CandidatesMenu ({ electionName }: Params) {
  const dispatch = useDispatch()
  const { candidates } = useSelector(
    (state: RootState) => state.electionManager
  )

  useEffect(() => {
    dispatch(fetchCandidates(electionName))
  }, [])
  return (
    <div>
      <List>
        {candidates.length > 0 ? (
          candidates.map((item: Candidate, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={item.candidate_name} />
            </ListItem>
          ))
        ) : (
          <div>none</div>
        )}
      </List>
    </div>
  )
}

export default CandidatesMenu
