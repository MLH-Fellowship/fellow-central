import React from 'react'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const LeaderboardPage = () => {
  return (
    <div className="LeaderboardPage">
      <PageHeader title="Leaderboard" />

      <div className="page-content-container">
        <Tabs>
          <TabList>
            <Tab>Weekly</Tab>
            <Tab>Overall</Tab>
          </TabList>

          <TabPanel>
            <InfoCard title="Pods">
              Content1
            </InfoCard>
          </TabPanel>
          <TabPanel>
            <InfoCard title="Pods">
              Content2
            </InfoCard>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default LeaderboardPage
