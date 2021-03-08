import React from 'react'
import '../sass/InfoCard.scss'

const InfoCard = ({ title, children }) => {
  return (
    <div className="InfoCard">
      {title &&
        <div className="InfoCard_title">{title}</div>
      }
      {children}
    </div>
  )
}

export default InfoCard
