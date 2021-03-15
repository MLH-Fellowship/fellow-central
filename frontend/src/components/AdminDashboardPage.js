import React, { useEffect, useState } from 'react'
import '../sass/AdminDashboardPage.scss'
import PageHeader from './PageHeader'
import HighlightCard from './HighlightCard'
import InfoCard from './InfoCard'
import Button from './Button'
import { InlineIcon } from '@iconify/react'
import bxCalendarEvent from '@iconify-icons/bx/bx-calendar-event';
import axios from 'axios'
import { connect } from 'react-redux'

const infoCollection = [
  {
    value: 7,
    title: 'Events created'
  },
]

const AdminDashboardPage = ({ auth }) => {
  const [pointsClaimed, setPointsClaimed] = useState(0)
  const [fellowCount, setFellowCount] = useState(0)
  const [leadingPod, setLeadingPod] = useState('')
  const [loadingPod, setLoadingPod] = useState(false)
  const [loadingFellow, setLoadingFellow] = useState(false)

  useEffect(() => {
    const fetchAllPodPointData = async () => {
      setLoadingPod(true)
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_all_pod_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });
      setLoadingPod(false)

      // Store response data
      
      const pod_names = Object.keys(response.data.data);
      const pod_list = []
      pod_names.forEach(pod => {
        if(pod !== 'admin') {
          pod_list.push({ pod: pod, value: response.data.data[pod] })
        }
      })
      pod_list.sort((a, b) => b.value - a.value)
      console.log(pod_list);
      const leadingPod = pod_list[0].pod?.split(' ')[1] || ''
      let total_points = pod_list.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)

      setLeadingPod(leadingPod)
      setPointsClaimed(total_points)
    }

    const fetchTotalFellowsData = async () => {
      setLoadingFellow(true)
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_total_registered_fellows`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });
      setLoadingFellow(false)

      // Store response data
      setFellowCount(response.data.data)
    }
    
    fetchAllPodPointData();
    fetchTotalFellowsData();
  }, [auth])

  return (
    <div className="AdminDashboardPage">
      <PageHeader title="Admin Dashboard">
        <Button text="Manage Events" icon={<InlineIcon icon={bxCalendarEvent} />} to="manage-events" />
      </PageHeader>

      <div className="page-content-container">
        <div className="highlights-container">
          <HighlightCard text="Points Claimed" value={pointsClaimed} color="blue" icon="point" loading={loadingPod} />
          <HighlightCard text="Registered Fellows" value={fellowCount} color="red" icon="fellow" loading={loadingFellow} />
          <HighlightCard text="Leading Pod" value={leadingPod} color="yellow" icon="trophy" loading={loadingPod} />
        </div>

        <InfoCard title="Overview">
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

export default connect(mapStateToProps, {})(AdminDashboardPage)
