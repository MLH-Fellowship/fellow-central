import React, { useState, useEffect } from 'react'
import '../sass/SendPointsPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import Button from './Button'
import { connect } from 'react-redux'
import axios from 'axios'
import { setPoints, createPoint } from '../actions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";

const SendPointsPage = ({ auth, ...props }) => {
  const [discordUsername, setDiscordUsername] = useState('');
  const [points, setPoints] = useState('');
  const [recentPoints, setRecentPoints] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEventsData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_points_history`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      setRecentPoints(response.data.data)
    }

    fetchEventsData();
  }, [auth.token])

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API
    setLoading(true)
    try {
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/add_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
        data: {
          amount: points,
          assignee: discordUsername,
          description: 'Admin',
        }
      });
      toast(`🔵 ${points} Points sent to ${discordUsername}`)

      setRecentPoints([{
        amount: points,
        assignee: discordUsername,
        description: 'Admin',
        timestamp: new Date().toDateString()
      }, ...recentPoints])

      setDiscordUsername('')
      setPoints('')
      setLoading(false)
    } catch(e) {
      toast.error(`🔴 Something went wrong`)
      setLoading(false)
    }
  }

  return (
    <div className="SendPointsPage">
      <PageHeader title="Send Points" />

      <div className="page-content-container">
        <InfoCard>
          <form onSubmit={handleSubmit}>
            <div className="form-fields-row">
              <div className="input-group">
                <label>Discord Username / ID</label>
                {/*  pattern="(.+)#(\d{4})" */}
                <input type="text" value={discordUsername} placeholder="pawankolhe#7887" onChange={e => setDiscordUsername(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Points</label>
                <input type="number" min="0" value={points} onChange={e => setPoints(e.target.value)} style={{ width: '150px' }} required />
              </div>
            </div>
            <Button loading={loading} text="Send" type="submit" style={{ marginTop: '25px' }} />
          </form>
        </InfoCard>
        <InfoCard title="Recent Points">
          {recentPoints.length > 0 ?
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fellow</th>
                    <th>Timestamp</th>
                    <th>Points</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPoints.map(event => 
                    <tr key={event.id}>
                      <td>{event.assignee}</td>
                      <td>{new Date(event.timestamp).toDateString()}</td>
                      <td>{event.amount}</td>
                      <td>{event.description}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            :
            <PulseLoader color="#1D539F" size="10" margin="10" /> 
          }
        </InfoCard>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    points: state.points,
  }
}

export default connect(mapStateToProps, { setPoints, createPoint })(SendPointsPage)
