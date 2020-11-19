import React from 'react'
import ElectionListItem from './ElectionListItem'

interface Election {
  election_name: string
  election_description: string
  start_date: string
  end_date: string
}

interface PropTypes {
  elections: Election[]
}

function ElectionList ({ elections }: PropTypes) {
  return (
    <div>
      {elections.length > 0 ? (
        elections.map((item: Election, index) => (
          <ElectionListItem key={index} election={item} />
        ))
      ) : (
        <div>User is not assigned to election.</div>
      )}
    </div>
  )
}

export default ElectionList
