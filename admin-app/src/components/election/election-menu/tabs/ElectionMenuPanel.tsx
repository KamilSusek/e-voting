import { AppBar, makeStyles, Tab, Tabs, Theme } from '@material-ui/core'
import { TabPanel, a11yProps } from './TabPanel'
import React from 'react'
import ElectionStatus from '../tabs-conent/ElectionStatus'
import { useParams } from 'react-router-dom'
import VotersMenu from '../tabs-conent/VotersMenu'
import CandidatesMenu from '../tabs-conent/CandidatesMenu'
import Results from '../tabs-conent/Results'

interface Params {
  electionName: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

function ElectionMenuPanel () {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const { electionName } = useParams<Params>()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Status' {...a11yProps(0)} />
          <Tab label='Voters' {...a11yProps(1)} />
          <Tab label='Candidates' {...a11yProps(2)} />
          <Tab label='Results' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ElectionStatus electionName={electionName} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VotersMenu electionName={electionName}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CandidatesMenu electionName={electionName}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Results electionName={electionName}/>
      </TabPanel>
    </div>
  )
}

export default ElectionMenuPanel
