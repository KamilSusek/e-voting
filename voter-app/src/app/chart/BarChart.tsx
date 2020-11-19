import React, { useState } from 'react'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip,
  Title
} from '@devexpress/dx-react-chart-material-ui'
import { EventTracker } from '@devexpress/dx-react-chart'

interface PropTypes {
  data: any[]
}

const RenderBarChart = ({ data }: PropTypes) => {
  return (
    <div className='chart'>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          color='#3f51b5'
          valueField='votes'
          argumentField='candidate_name'
          name='Candidate'
        />
        <Title text='Election result.' />
        <EventTracker />
        <Tooltip />
      </Chart>
    </div>
  )
}

export default RenderBarChart
