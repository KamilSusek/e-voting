import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
      minHeight: '80vh'
  }
})

function ContentContainer ({ children }: any) {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

export default ContentContainer
