import { Step, StepLabel, Stepper } from '@material-ui/core'
import React, { useState } from 'react'
import AddCandidatesForm from './AddCandidatesForm'
import AddVotersForm from './AddVotersForm'
import ElectionForm from './ElectionForm'

function CreateElection () {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    'Provide elections informations.',
    'Add candidates.',
    'Add voters.'
  ]

  const previousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const nextStep = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ElectionForm next={nextStep} />
      case 1:
        return <AddCandidatesForm next={nextStep} previous={previousStep} />
      case 2:
        return <AddVotersForm previous={previousStep} />
      default:
        return 'Unknown step.'
    }
  }

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
    </div>
  )
}

export default CreateElection
