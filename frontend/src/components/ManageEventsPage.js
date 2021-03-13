import React, { useState } from 'react'
import '../sass/ManageEventsPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import Button from './Button'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';

const ManageEventsPage = ({ auth, events, ...props }) => {
  const [name, setName] = useState('');
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [link, setLink] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/create_event`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
        data: {
          name: name,
          start_time: starts,
          end_time: ends,
          secret_code: secretCode,
          points_amount: points,
          event_link: link,
        }
      });
      props.createPoint({
        id: response.data.id,
        name: name,
        start_time: starts,
        end_time: ends,
        secret_code: secretCode,
        points_amount: points,
        event_link: link,
      });
      toast(`🔵 Event created`)
      
      setName('')
      setStarts('')
      setEnds('')
      setLink('')
      setSecretCode('')
      setPoints('')
    } catch(e) {
      toast.error(`🔴 Something went wrong`)
    }
  }

  return (
    <div className="ManageEventsPage">
      <PageHeader title="Manage Events" />

      <div className="page-content-container">
        <InfoCard title="Add Event">
          <form onSubmit={handleSubmit}>
            <div className="form-fields-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Starts</label>
                <input type="datetime-local" value={starts} onChange={e => setStarts(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Ends</label>
                <input type="datetime-local" value={ends} onChange={e => setEnds(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Link</label>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Secret Code</label>
                <input type="text" value={secretCode} onChange={e => setSecretCode(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Points</label>
                <input type="number" min="0" value={points} onChange={e => setPoints(e.target.value)} style={{ width: '150px' }} required />
              </div>
            </div>
            <Button text="Add" type="submit" style={{ marginTop: '25px' }} />
          </form>
        </InfoCard>
        <InfoCard title="Events">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Starts</th>
                </tr>
              </thead>
              <tbody>
                {events && events.map(event => 
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.start}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </InfoCard>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    events: state.events
  }
}

export default connect(mapStateToProps, {})(ManageEventsPage)
