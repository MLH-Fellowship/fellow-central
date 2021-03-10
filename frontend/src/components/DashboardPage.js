import React from 'react'
import '../sass/DashboardPage.scss'
import PageHeader from './PageHeader'
import HighlightCard from './HighlightCard'
import InfoCard from './InfoCard'
import Button from './Button'
import { InlineIcon } from '@iconify/react'
import conditionWaitPoint from '@iconify-icons/carbon/condition-wait-point'

const infoCollection = [
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

const DashboardPage = () => {
  return (
    <div className="DashboardPage">
      <PageHeader title="Dashboard">
        <Button text="Claim Points" icon={<InlineIcon icon={conditionWaitPoint} />} to="claim-points" />
      </PageHeader>

      <div className="page-content-container">
        <div className="highlights-container">
          <HighlightCard text="My Points" value="28" color="blue" icon="point" />
          <HighlightCard text="Pod Points" value="105" color="red" icon="point" />
          <HighlightCard text="Pod Rank" value="1" color="yellow" icon="trophy" />
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

export default DashboardPage
