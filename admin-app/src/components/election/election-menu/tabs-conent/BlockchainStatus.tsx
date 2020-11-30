import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import { CircularProgress, Grid, Paper, makeStyles } from '@material-ui/core'

interface BlockchainInfo {
  addedBlocks: number
  nodes: number
}

const useStyles = makeStyles({
  columnItem: {
    fontSize: '1.5rem',
    padding: '0.5rem',
    height: '20vh',
    display: 'flex',
    alignItems: 'center'
  }
})

function BlockchainStatus ({ electionName }: any) {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [isSuccess, setSuccess] = useState(false)
  const [blockchainInfo, setBlockchainInfo] = useState<BlockchainInfo>()
  const { election } = useSelector((state: RootState) => state.electionManager)

  const fetchServerUrl = async () => {
    try {
      const response = await axios.get(`${election.server_url}/info`)
      setBlockchainInfo(response.data)
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServerUrl()
  }, [])
  return (
    <div>
      {loading ? (
        <div>
          <CircularProgress color='secondary' />
          Fetching data from server, this may take a while.
        </div>
      ) : (
        <div>
          {isSuccess ? (
            <div>
              <h1>Blochain network status</h1>
              <Grid container justify='space-evenly'>
                <Paper elevation={4} className={classes.columnItem}>
                  Blocks created: {blockchainInfo?.addedBlocks}
                </Paper>
                <Paper elevation={4} className={classes.columnItem}>
                  Nodes: {blockchainInfo?.nodes}
                </Paper>
              </Grid>
            </div>
          ) : (
            <div>
              Failed to fetch data. Server may be overloaded. Try again later.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BlockchainStatus
