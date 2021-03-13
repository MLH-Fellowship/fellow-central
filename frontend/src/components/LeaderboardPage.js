import React, { useState, useEffect } from 'react'
import '../sass/LeaderboardPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2';
import RankItem from './RankItem';
import axios from 'axios'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontSize: 20,
          fontStyle: 'bold',
          fontColor: 'rgba(29, 83, 159, 1)'
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontSize: 15,
          beginAtZero: true,
        }
      }
    ]
  },
}

const LeaderboardPage = ({ auth }) => {
  const [podData, setPodData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/view/all_pod_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      const pod_names = Object.keys(response.data.pod_list);
      const pod_list = []
      pod_names.forEach(pod => {
        pod_list.push({ pod: pod, value: response.data.pod_list[pod] })
      })
      pod_list.sort((a, b) => b.value - a.value)

      // Plot Bar Chart
      const data = {
        labels: pod_list.map(p => p.pod),
        datasets: [
          {
            label: 'Points',
            data: pod_list.map(p => p.value),
            backgroundColor: 'rgba(29, 83, 159, 0.6)',
            borderColor: 'rgba(29, 83, 159, 1)',
            borderWidth: 5,
          }
        ]
      }
      setPodData(data)
    }

    fetchData();
  }, [auth.token])

  return (
    <div className="LeaderboardPage">
      <PageHeader title="Leaderboard" />

      <div className="page-content-container">
        <Tabs>
          <TabList>
            <Tab>Overall</Tab>
            <Tab>Weekly</Tab>
          </TabList>

          <TabPanel>
            <div className="page-content-container">
              <InfoCard title="Pods">
                <div>
                  <HorizontalBar 
                    data={podData}
                    options={options}
                    height={200}
                  />
                </div>
              </InfoCard>
              <InfoCard title="Fellows">
                <div className="rank-list">
                  <RankItem position={1} username="pawankolhe#7887" points={105} color="yellow" />
                  <RankItem position={2} username="simplord#7639" points={86} color="red" />
                  <RankItem position={3} username="Ammo#5945" points={78} color="blue" />
                </div>
              </InfoCard>
            </div>
          </TabPanel>
          <TabPanel>
            <InfoCard title="Pods">
              Content
            </InfoCard>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(LeaderboardPage)
