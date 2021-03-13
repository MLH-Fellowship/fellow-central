import React from 'react'
import '../sass/RankItem.scss'

const RankItem = ({ position, username, points, color }) => {
  return (
    <div className={`rank-item ${color}`}>
      <div className="rank-left">
        <div className="rank-position">{position}</div>
        <div className="rank-username">{username}</div>
      </div>
      <div className="rank-right">
        <div className="rank-points">{points}</div>
      </div>
    </div>
  )
}

export default RankItem
