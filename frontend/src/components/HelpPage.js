import React from 'react'
import '../sass/HelpPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import { Link } from 'react-router-dom'

const HelpPage = () => {
  return (
    <div className="HelpPage">
      <PageHeader title="Help" />

      <div className="page-content-container">
        <InfoCard title="How do fellows earn Points?">
          <ol className="HelpPage_list">
            <li>
              <div className="HelpPage_subtitle">Attending Workshops & Events</div>
              <p>There are points associated with <Link to="events">events</Link>. You'll be provided a <em>secret code</em> when you attend MLH Fellowship live events, which you can redeem for points.</p>
            </li>
            <li>
              <div className="HelpPage_subtitle">Discord Interactions</div>
              <p>Fellows can get a maximum of 5 points per day for interacting with others in the MLH Fellowship Discord Server. We have a Discord Bot to handle that.</p>
            </li>
            <li>
              <div className="HelpPage_subtitle">Mentor Sessions</div>
              <p>Mentors can give a maximum of 10 points per session to fellows. Points will only be given for the recommended amount of sessions for the MLH Fellowship (2 Career Advice and 5 Pair-Programming).</p>
            </li>
            <li>
              <div className="HelpPage_subtitle">Via MLHers / Admin</div>
              <p>MLHers can directly send fellows points for any positive contribution to the MLH Fellowship.</p>
            </li>
          </ol>
        </InfoCard>

        <InfoCard title="I earned some Points. What now?">
          You would be able to redeem your points at the end of the MLH Fellowship for some <em>awesome swag</em> and <em>secret rewards</em>.
        </InfoCard>
      </div>
    </div>
  )
}

export default HelpPage
