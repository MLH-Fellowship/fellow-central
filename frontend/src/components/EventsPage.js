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
import { connect } from 'react-redux'
import { setEvents, claimEventPoints } from '../actions'
import axios from 'axios'
import { toast } from 'react-toastify';

const EventsPage = ({ auth, events, ...props }) => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [secretCodeLoading, setSecretCodeLoading] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');

  const toggleModal = (isOpen) => {
    setIsModalOpen(isOpen === undefined ? !isModelOpen : isOpen);
    setSecretCode('');
  }

  const handleSecretCodeSubmit = async (event) => {
    event.preventDefault();
    setSecretCodeLoading(true)

    // Call API
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/add_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
        data: {
          event_id: selectedEventId,
          secret_input: secretCode,
          description: 'Event',
        }
      });
      toast(`🔵 ${response.data.message}`)
      
      toggleModal(false);
      setSecretCodeLoading(false);
      props.claimEventPoints(selectedEventId);
      setSelectedEventId('')
      setSecretCode('')
    } catch(e) {
      toast.error(`🔴 Something went wrong`)
    }
  }

  return (
    <div className="LeaderboardPage">
      <PageHeader title="Events" />

      <div className="page-content-container">
        <div>
          <div className="page-subtitle">Active Events</div>
          <div className="LeaderboardPage_ActiveEvents">
            {events
              .filter(event => event.isActive)
              .map(({ id, title, start, link, isActive, pointsClaimed }) =>
                <EventCard key={id} id={id} title={title} start={start} link={link} isActive={isActive} pointsClaimed={pointsClaimed} onClaimPointsClick={() => {
                  setSelectedEventId(id);
                  toggleModal();
                }} />
              )
            }
          </div>
        </div>
        <div>
          <div className="page-subtitle">Past Events</div>
          <div className="LeaderboardPage_PastEvents">
            {events
              .filter(event => event.isActive === false)
              .map(({ id, title, start, vod, isActive }) =>
                <EventCard key={id} id={id} title={title} start={start} vod={vod} isActive={isActive} />
              )
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    events: state.events
  }
}

export default connect(mapStateToProps, { setEvents, claimEventPoints })(EventsPage)
