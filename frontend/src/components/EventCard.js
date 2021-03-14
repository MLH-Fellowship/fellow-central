import React from 'react'
import '../sass/EventCard.scss'
import { InlineIcon } from '@iconify/react'
import bxLinkExternal from '@iconify-icons/bx/bx-link-external';
import bxVideo from '@iconify-icons/bx/bx-video';
import Button from './Button'

const EventCard = ({ id, title, start, link, vod, isActive = false, pointsClaimed, onClaimPointsClick }) => {
  return (
    <div className="EventCard">
      <div className="EventCard_Header">
        <div className="EventCard_DateTime">
          {start}
        </div>
        <div className="EventCard_Link">
        {isActive ?
          link ? <a href={link} target="_blank" rel="noreferrer">
            <InlineIcon icon={bxLinkExternal} />
          </a> : ''
          :
          vod ? <a href={vod} target="_blank" rel="noreferrer">
            <InlineIcon icon={bxVideo} />
          </a> : ''
        }
        </div>
      </div>
      <div className={`EventCard_Content ${isActive ? 'EventCard_Content_Primary' : 'EventCard_Content_Secondary'}`}>
        <div className="EventCard_Title">{title}</div>
        {isActive && !pointsClaimed &&
          <Button text="Claim Points" buttontype="secondary" style={{ marginTop: '20px', alignSelf: 'flex-start' }} onClick={() => onClaimPointsClick()} />
        }
      </div>
    </div>
  )
}

export default EventCard
