import React, { useState, useEffect } from 'react'
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
import { setEvents, claimEventPoints, updateProfile } from '../actions'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";

const EventsPage = ({ auth, events, setEvents, ...props }) => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [secretCodeLoading, setSecretCodeLoading] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [eventsLoading, setEventsLoading] = useState(false);

  useEffect(() => {
    const fetchEventsData = async () => {
      setEventsLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_events`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      setEvents(response.data.data)
      setEventsLoading(false)
    }

    fetchEventsData();
  }, [setEvents, auth.token])

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
          assignee: auth.user.id,
          secret_input: secretCode,
          description: 'Event',
        }
      });
      
      if('data' in response.data) {
        toast(`🔵 ${response.data.message}`)
      } else {
        toast.error(`🔴 ${response.data.message}`)
      }
      
      toggleModal(false);
      setSecretCodeLoading(false);
      props.claimEventPoints(selectedEventId);
      props.updateProfile({
        points_total: auth.user.points_total + response.data.data.amount
      })
      setSelectedEventId('')
      setSecretCode('')
    } catch(e) {
      toast.error(`🔴 Something went wrong`)
      console.log(e)
      setSecretCodeLoading(false);
    }
  }

  return (
    <div className="LeaderboardPage">
      <PageHeader title="Events" />

      <div className="page-content-container">
        <div>
          <div className="page-subtitle">Active Events</div>
          <div className="LeaderboardPage_ActiveEvents">
            {eventsLoading === false ?
              <>
                {events
                  .filter(event => event.isActive)
                  .map(({ id, title, start, link, isActive, pointsClaimed }) =>
                    <EventCard key={id} id={id} title={title} start={start} link={link} isActive={isActive} pointsClaimed={pointsClaimed} onClaimPointsClick={() => {
                      setSelectedEventId(id);
                      toggleModal();
                    }} />
                  )
                }
              </>
              :
              <PulseLoader color="#1D539F" size="10px" margin="10px" /> 
            }
          </div>
        </div>
        <div>
          <div className="page-subtitle">Past Events</div>
          <div className="LeaderboardPage_PastEvents">
            {eventsLoading === false ?
              <>
                {events
                  .filter(event => event.isActive === false)
                  .map(({ id, title, start, vod, isActive }) =>
                    <EventCard key={id} id={id} title={title} start={start} vod={vod} isActive={isActive} />
                  )
                }
              </>
              :
              <PulseLoader color="#1D539F" size="10px" margin="10px" /> 
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

export default connect(mapStateToProps, { setEvents, claimEventPoints, updateProfile })(EventsPage)
