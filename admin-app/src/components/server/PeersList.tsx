import {
  Divider,
  List,
  ListItem,
  Typography,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core'
import React, { useState } from 'react'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles({
  item: {
    width: '70vw'
  }
})

function PeersList ({ peers }: any) {
  const classes = useStyles()
  const [showPeers, setShowPeers] = useState(false)

  const toggleShowPeers = () => {
    setShowPeers(!showPeers)
  }

  return (
    <Grid className={classes.item}>
      <Grid container justify='space-between' alignItems='center'>
        <Typography>Peers</Typography>
        <Button onClick={toggleShowPeers}>
          {showPeers ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
      </Grid>
      <Divider />
      {showPeers && (
        <List>
          {peers.length > 0 &&
            peers.map((peer: any, index: number) => (
              <>
                <ListItem key={index} button>
                  <Typography>{peer}</Typography>
                </ListItem>
                <Divider />
              </>
            ))}
        </List>
      )}
    </Grid>
  )
}

export default PeersList
