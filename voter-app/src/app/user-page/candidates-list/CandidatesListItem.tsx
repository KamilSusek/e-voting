import { Checkbox, Divider, Grid, Paper, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

function CandidatesListItem ({ item, onSelect, id }: any) {
  const { candidate_name, candidate_description } = item
  const { selectedVote } = useSelector((state: RootState) => state.elections)

  const handleSelect = () => {
    if (selectedVote === id) {
      onSelect('')
    } else {
      onSelect(id)
    }
  }

  return (
      <Grid
        className='candidates_list_item_container'
        container
        alignItems='center'
        justify='space-between'
      >
        <Grid item>
          <Grid container alignItems='center' spacing={1}>
            <Grid item>
              <AccountCircleIcon fontSize='large' />
            </Grid>
            <Grid>
              <Typography variant='h1'>{candidate_name}</Typography>
              <Divider />
              <Typography variant='h2'>{candidate_description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Checkbox color="primary" checked={selectedVote === id} onChange={handleSelect} />
        </Grid>
      </Grid>
  )
}

export default CandidatesListItem
