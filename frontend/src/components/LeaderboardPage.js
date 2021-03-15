import React, { useState, useEffect } from 'react'
import '../sass/LeaderboardPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2';
import RankItem from './RankItem';
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader";

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
  const [topFellows, setTopFellows] = useState([])

  useEffect(() => {
    const fetchPodPointsData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_all_pod_points`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });
      // const response = {
      //   data: {
      //       "pod_list": {
      //       "Pod 2.0.0": 584,
      //       "Pod 2.0.1": 354,
      //       "Pod 2.0.2": 304,
      //       "Pod 2.0.3": 504,
      //       "Pod 2.0.4": 134
      //     }
      //   }
      // }

      // Store response data
      const pod_names = Object.keys(response.data.data);
      const pod_list = []
      pod_names.forEach(pod => {
        if(pod !== 'admin') {
          pod_list.push({ pod: pod, value: response.data.data[pod] })
        }
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
            borderWidth: 3,
          }
        ]
      }
      setPodData(data)
    }

    const fetchTopFellowsData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_top_fellows`, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
        },
      });

      // Store response data
      setTopFellows(response.data.data)
    }

    fetchPodPointsData();
    fetchTopFellowsData();
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
                {topFellows.length > 0 ?
                  <div className="rank-list">
                    {topFellows.length >= 1 ? <RankItem position={1} username={topFellows[0].name} points={topFellows[0].points_total} color="yellow" /> : ''}
                    {topFellows.length >= 2 ? <RankItem position={2} username={topFellows[1].name} points={topFellows[1].points_total} color="red" /> : ''}
                    {topFellows.slice(2).map((fellow, i) => 
                      <RankItem key={i+3} position={i+3} username={fellow.name} points={fellow.points_total} color="blue" />)
                    }
                  </div>
                  :
                  <PulseLoader color="#1D539F" size="10" margin="10" /> 
                }
              </InfoCard>
            </div>
          </TabPanel>
          <TabPanel>
            <InfoCard title="Pods">
              Coming soon
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
