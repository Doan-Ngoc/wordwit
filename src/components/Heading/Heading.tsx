import React from 'react'
import './heading.css'

const Heading: React.FC = () => {
  return (
    <p className={"heading"}>
      <h1>W<span>o</span>rd <span>W</span>i<span>t</span></h1>
    </p>
  )
}

export default Heading