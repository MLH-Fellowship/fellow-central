import React, { useState, useEffect } from 'react'
import '../sass/ManageEventsPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import Button from './Button'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";

const ManageEventsPage = ({ auth, ...props }) => {
  const [events, setEvents] = useState([])
  const [name, setName] = useState('');
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [link, setLink] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [points, setPoints] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEventsData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_events`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      setEvents([...response.data.data].reverse())
    }

    fetchEventsData();
  }, [auth.token])

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API
    try {
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/create_event`, {
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
      toast(`🔵 Event created`)

      setEvents([{
        name: name,
        start_time: starts,
        end_time: ends,
        secret_code: secretCode,
        points_amount: points,
        event_link: link,
      }, ...events])
      
      setName('')
      setStarts('')
      setEnds('')
      setLink('')
      setSecretCode('')
      setPoints('')
      setLoading(false)
    } catch(e) {
      console.error(e)
      toast.error(`🔴 Something went wrong`)
      setLoading(false)
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
            <Button text="Add" loading={loading} type="submit" style={{ marginTop: '25px' }} />
          </form>
        </InfoCard>
        <InfoCard title="Events">
          {events.length > 0 ? 
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Starts</th>
                    <th>Code</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => 
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{new Date(event.start_time).toDateString()}</td>
                      <td>{event.secret_code}</td>
                      <td>{event.points_amount}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            :
            <PulseLoader color="#1D539F" size="10px" margin="10px" /> 
          }
        </InfoCard>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(ManageEventsPage)
