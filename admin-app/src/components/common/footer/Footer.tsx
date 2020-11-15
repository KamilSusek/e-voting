import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#3f51b5',
    width: '100%',
    minHeight: '20vh',
    color: 'white'
  }
})

function Footer () {
  const classes = useStyles()
  return <div className={classes.root}>footer</div>
}

export default Footer
