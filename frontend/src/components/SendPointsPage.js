import React, { useState } from 'react'
import '../sass/SendPointsPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import Button from './Button'
import { connect } from 'react-redux'
import axios from 'axios'
import { setPoints, createPoint } from '../actions'
import { toast } from 'react-toastify';

const SendPointsPage = ({ auth, ...props }) => {
  const [discordUsername, setDiscordUsername] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin/add_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
        data: {
          amount: points,
          assignee: discordUsername,
          description: 'Admin',
        }
      });
      props.createPoint(response.data.data);
      toast(`🔵 ${points} Points sent to ${discordUsername}`)
      setDiscordUsername('')
      setPoints('')
    } catch(e) {
      toast.error(`🔴 Something went wrong`)
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
            <Button text="Send" type="submit" style={{ marginTop: '25px' }} />
          </form>
        </InfoCard>
        <InfoCard title="Recent Points">
          Content
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
