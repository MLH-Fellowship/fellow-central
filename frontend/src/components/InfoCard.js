import React from 'react'
import '../sass/InfoCard.scss'

const InfoCard = ({ title, children, ...props }) => {
  return (
    <div className="InfoCard" {...props}>
      {title &&
        <div className="InfoCard_title">{title}</div>
      }
      {children}
    </div>
  )
}

export default InfoCard
