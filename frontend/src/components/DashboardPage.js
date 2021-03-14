import React, { useState, useEffect } from 'react'
import '../sass/DashboardPage.scss'
import PageHeader from './PageHeader'
import HighlightCard from './HighlightCard'
import InfoCard from './InfoCard'
import Button from './Button'
import { InlineIcon } from '@iconify/react'
import bxCalendarEvent from '@iconify-icons/bx/bx-calendar-event';
import axios from 'axios'
import { connect } from 'react-redux'

let infoCollection = [
  {
    value: 14,
    title: 'Points Earned'
  },
  {
    value: 2,
    title: 'PRs Created'
  },
  {
    value: 1,
    title: 'Issue Created'
  },
]

const DashboardPage = ({ auth, ...props }) => {
  const [podPoints, setPodPoints] = useState(0)
  const [podRank, setPodRank] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllPodPointData = async () => {
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_all_pod_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });
      setLoading(false)

      // Store response data
      const current_user_pod = auth.user.pod;
      const pod_names = Object.keys(response.data.data);
      const pod_list = []
      pod_names.forEach(pod => {
        if(pod !== 'admin') {
          pod_list.push({ pod: pod, value: response.data.data[pod] })
        }
      })
      pod_list.sort((a, b) => b.value - a.value)
      const index = pod_list.findIndex(item => item.pod === current_user_pod)
      const rank = index + 1

      setPodPoints(pod_list[index].value)
      setPodRank(rank)
    }
    
    fetchAllPodPointData();
  }, [auth])

  return (
    <div className="DashboardPage">
      <PageHeader title="Dashboard">
        <Button text="Events" icon={<InlineIcon icon={bxCalendarEvent} />} to="events" />
      </PageHeader>

      <div className="page-content-container">
        <div className="highlights-container">
          <HighlightCard text="My Points" value={auth.user?.points_total} color="blue" icon="point" />
          <HighlightCard text="Pod Points" value={podPoints} color="red" icon="point" loading={loading} />
          <HighlightCard text="Pod Rank" value={podRank} color="yellow" icon="trophy" loading={loading} />
        </div>

        <InfoCard title="Activity this week">
          <div className="info-collection">
            {infoCollection.map(({ value, title }) => 
              <div key={title} className="info-collection_item">
                <div className="info-collection_value">{value}</div>
                <div className="info-collection_title">{title}</div>
              </div>
            )}
          </div>
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

export default connect(mapStateToProps, {})(DashboardPage)
