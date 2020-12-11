import React, { useState } from 'react'
import { Button, Divider } from '@material-ui/core'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'

interface AccordionProps {
  title: string
  children: any
}

function Accordion ({ title, children }: AccordionProps) {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  const renderContent = () => (show ? <div>{children}</div> : <></>)

  return (
    <div className='accordion__container'>
      <div className='accordion__header'>
        <h2>{title}</h2>
        <Button onClick={toggleShow}>
          {show ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
      </div>
      <Divider />
      {renderContent()}
    </div>
  )
}

export default Accordion
