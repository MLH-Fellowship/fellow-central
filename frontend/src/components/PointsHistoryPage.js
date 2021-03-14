import React, { useState, useEffect } from 'react'
import '../sass/PointsHistoryPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";

const PointsHistoryPage = ({ auth, ...props }) => {
  const [myPoints, setMyPoints] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEventsData = async () => {
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_points_history`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      setMyPoints(response.data.data)
      setLoading(false)
    }

    fetchEventsData();
  }, [auth.token])

  return (
    <div className="PointsHistoryPage">
      <PageHeader title="Points History" />

      <div className="page-content-container">
        <InfoCard title="Recent Points">
          {loading === false ?
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Points</th>
                    <th>Timestamp</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {myPoints.map(event => 
                    <tr key={event.id}>
                      <td>{event.amount}</td>
                      <td>{new Date(event.timestamp).toDateString()}</td>
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
  }
}

export default connect(mapStateToProps, {})(PointsHistoryPage)
