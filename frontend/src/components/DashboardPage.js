import React, { useState, useEffect } from 'react'
import '../sass/DashboardPage.scss'
import PageHeader from './PageHeader'
import HighlightCard from './HighlightCard'
import InfoCard from './InfoCard'
import Button from './Button'
import { InlineIcon } from '@iconify/react'
import conditionWaitPoint from '@iconify-icons/carbon/condition-wait-point'
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
  const [myPoints, setMyPoints] = useState(0)
  const [podPoints, setPodPoints] = useState(0)
  const [podRank, setPodRank] = useState(0)

  useEffect(() => {
    const fetchUserPointsData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/view/user_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      setMyPoints(response.data.points)
    }

    const fetchAllPodPointData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/view/all_pod_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      const current_user_pod = auth.user.pod;
      const pod_names = Object.keys(response.data.pod_list);
      const pod_list = []
      pod_names.forEach(pod => {
        pod_list.push({ pod: pod, value: response.data.pod_list[pod] })
      })
      pod_list.sort((a, b) => b.value - a.value)
      const rank = pod_list.findIndex(item => item.pod === current_user_pod) + 1

      setPodPoints(pod_list[current_user_pod])
      setPodRank(rank)
    }
    
    fetchUserPointsData();
    fetchAllPodPointData();
  }, [auth])

  return (
    <div className="DashboardPage">
      <PageHeader title="Dashboard">
        <Button text="Claim Points" icon={<InlineIcon icon={conditionWaitPoint} />} to="claim-points" />
      </PageHeader>

      <div className="page-content-container">
        <div className="highlights-container">
          <HighlightCard text="My Points" value={myPoints} color="blue" icon="point" />
          <HighlightCard text="Pod Points" value={podPoints} color="red" icon="point" />
          <HighlightCard text="Pod Rank" value={podRank} color="yellow" icon="trophy" />
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
