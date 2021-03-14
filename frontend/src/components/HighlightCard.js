import React from 'react'
import '../sass/HighlightCard.scss'
import { Icon } from '@iconify/react';
import bxsTrophy from '@iconify-icons/bx/bxs-trophy';
import bxsUser from '@iconify-icons/bx/bxs-user';
import conditionWaitPoint from '@iconify-icons/carbon/condition-wait-point';
import PuffLoader from "react-spinners/PuffLoader";

const HighlightCard = ({ text, value, color, icon, loading }) => {
  const computedColor = () => {
    switch(color) {
      case 'yellow':
        return 'var(--yellow-color)';
      case 'red':
        return 'var(--red-color)';
      case 'blue':
      default:
        return 'var(--primary-color)';
    }
  }
  
  const computedIcon = () => {
    switch(icon) {
      case 'fellow':
        return <Icon icon={bxsUser} />;;
      case 'trophy':
        return <Icon icon={bxsTrophy} />;
      case 'point':
      default:
        return <Icon icon={conditionWaitPoint} />;
    }
  }

  return (
    <div className="HighlightCard" style={{
      backgroundColor: computedColor()
    }}>
      <div className="HighlightCard_text">
        {text}
      </div>
      <div className="HighlightCard_value">
        {loading ? <PuffLoader color="white" size="60" /> : value}
      </div>
      <div className="HighlightCard_icon">
        {computedIcon()}
      </div>
    </div>
  )
}

export default HighlightCard
