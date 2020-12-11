import Accordion from './Accordion'
import React from 'react'

const ElectionsManual = () => (
  <div className='manual__container'>
    To open elections menu click 'Elections' on the top navigation panel.
    <br />
    After opening elections menu you will see all elections.
    <br />
    If the elections menu is empty, you are not paricipating in any elections.
  </div>
)

const VoteManual = () => (
  <div className='manual__container'>
    To proceed to voting panel, click vote button at the election item.
    <br />
    It will open new panel. This is voting panel. You can go back to elections
    menu by clicking 'go back' button. <br />
    Voting panel contains all candidates from selected voting. You can select
    candidate by clicking checkbox. If you want to send your vote, click 'send
    vote' button.
  </div>
)

const ResultsManual = () => (
  <div className='manual__container'>
    If the voting is finished ypu can see its results. To check results click
    the 'results' button. <br />
    It will show you a diagram with results. You can go back by clicking 'go
    back' button beneath the diagram.
  </div>
)

function HelpView () {
  return (
    <div className='help__container'>
      <h1>Voting manual.</h1>
      <Accordion title='1. Elections'>
        <ElectionsManual />
      </Accordion>
      <Accordion title='2. Vote'>
        <VoteManual />
      </Accordion>
      <Accordion title='5. Results'>
        <ResultsManual />
      </Accordion>
    </div>
  )
}

export default HelpView
