import React from 'react'
import '../sass/AdminDashboardPage.scss'
import PageHeader from './PageHeader'
import HighlightCard from './HighlightCard'
import InfoCard from './InfoCard'
import Button from './Button'
import { InlineIcon } from '@iconify/react'
import bxCalendarEvent from '@iconify-icons/bx/bx-calendar-event';

const infoCollection = [
  {
    value: 7,
    title: 'Points Claimed'
  },
]

const AdminDashboardPage = () => {
  return (
    <div className="AdminDashboardPage">
      <PageHeader title="Admin Dashboard">
        <Button text="Manage Events" icon={<InlineIcon icon={bxCalendarEvent} />} to="manage-events" />
      </PageHeader>

      <div className="page-content-container">
        <div className="highlights-container">
          <HighlightCard text="Points Claimed" value="348" color="blue" icon="point" />
          <HighlightCard text="Registered Fellows" value="125" color="red" icon="fellow" />
          <HighlightCard text="Leading Pod" value="2.0.0" color="yellow" icon="trophy" />
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

export default AdminDashboardPage
