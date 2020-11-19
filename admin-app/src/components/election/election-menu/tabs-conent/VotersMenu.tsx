import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoters } from '../../../../features/electionManagerSlice'
import { RootState } from '../../../../store/store'

interface Params {
  electionName: string
}

interface Voter {
  username: string
}

function VotersMenu ({ electionName }: Params) {
  const dispatch = useDispatch()
  const { voters } = useSelector((state: RootState) => state.electionManager)

  useEffect(() => {
    dispatch(fetchVoters(electionName))
  }, [])
  return (
    <div>
      <List>
        {voters.length > 0 ? (
          voters.map((item: Voter, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={item.username} />
            </ListItem>
          ))
        ) : (
          <div>none</div>
        )}
      </List>
    </div>
  )
}

export default VotersMenu
