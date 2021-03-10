import React, { useState } from 'react'
import '../sass/EventsPage.scss'
import ReactModal from 'react-modal';
import { InlineIcon } from '@iconify/react';
import bxX from '@iconify-icons/bx/bx-x';
import conditionWaitPoint from '@iconify-icons/carbon/condition-wait-point';
import PuffLoader from "react-spinners/PuffLoader";
import EventCard from './EventCard'
import PageHeader from './PageHeader'
import Button from './Button';

const mockEvents = [
  {
    id: 1,
    title: 'Time Management Tips for the Fellowship',
    start: 'Mon, Mar 8  |  8:30pm',
    link: 'https://google.com',
    isActive: true
  },
  {
    id: 2,
    title: 'Event #1',
    start: 'Mon, Mar 8  |  8:30pm',
    link: 'https://google.com',
    isActive: true
  },
  {
    id: 3,
    title: 'Event #2',
    start: 'Mon, Mar 8  |  8:30pm',
    link: 'https://google.com',
    isActive: true
  },
  {
    id: 4,
    title: 'Event #3',
    start: 'Mon, Mar 8  |  8:30pm',
    vod: 'https://google.com',
    isActive: false
  },
  {
    id: 5,
    title: 'Event #4',
    start: 'Mon, Mar 8  |  8:30pm',
    vod: 'https://google.com',
    isActive: false
  },
  {
    id: 6,
    title: 'Event #5',
    start: 'Mon, Mar 8  |  8:30pm',
    vod: 'https://google.com',
    isActive: false
  },
]

const EventsPage = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [secretCodeLoading, setSecretCodeLoading] = useState(false);

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen === undefined ? !isModelOpen : isOpen);
    setSecretCode('');
  }

  const handleSecretCodeSubmit = (event) => {
    event.preventDefault();
    setSecretCodeLoading(true)

    // API call
    toggleModal(false);
    setSecretCodeLoading(false)
  }

  return (
    <div className="LeaderboardPage">
      <PageHeader title="Events" />

      <div className="page-content-container">
        <div>
          <div className="page-subtitle">Active Events</div>
          <div className="LeaderboardPage_ActiveEvents">
            {mockEvents
              .filter(event => event.isActive)
              .map(({ id, title, start, link, isActive }) =>
                <EventCard key={id} title={title} start={start} link={link} isActive={isActive} onClaimPointsClick={toggleModal} />
              )
            }
          </div>
        </div>
        <div>
          <div className="page-subtitle">Past Events</div>
          <div className="LeaderboardPage_PastEvents">
            {mockEvents
              .filter(event => event.isActive === false)
              .map(({ id, title, start, vod, isActive }) => <EventCard key={id} title={title} start={start} vod={vod} isActive={isActive} />)
            }
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={isModelOpen}
        ariaHideApp={false}
        closeTimeoutMS={200}
        onRequestClose={() => toggleModal()}
        className="EventClaimPointsModal_Content"
        overlayClassName="EventClaimPointsModal_Overlay"
      >
        <div className="EventClaimPointsModal_Title">Enter Secret Code</div>
        <div className="EventClaimPointsModal_Desc">You’ll receive a secret code during this event. Enter it here to earn points.</div>
        <form onSubmit={handleSecretCodeSubmit}>
          <div className="input-group">
            <label>Enter Code</label>
            <input type="text" value={secretCode} onChange={(event) => setSecretCode(event.target.value)} required />
          </div>
          <Button text={secretCodeLoading ? 
            <PuffLoader color="white" size="20" />
            :
            'Claim'
          } type="submit" style={{ marginTop: '15px' }} />
        </form>
        <button className="EventClaimPointsModal_Close" onClick={() => toggleModal()}>
          <InlineIcon icon={bxX} />
        </button>
        <div className="EventClaimPointsModal_Icon">
          <InlineIcon icon={conditionWaitPoint} />
        </div>
      </ReactModal>
    </div>
  )
}

export default EventsPage
