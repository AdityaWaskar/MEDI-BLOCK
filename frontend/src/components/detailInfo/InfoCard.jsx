import React from 'react'

const InfoCard = (props) => {
  return (
        <div id={props.title} className="info" key={props.value}>
            <p><b>{props.title}</b></p>
            <span>{props.value}</span>
    </div>
  )
}

export default InfoCard