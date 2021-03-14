import React from 'react'
import '../sass/MainContent.scss'
import { spring, AnimatedSwitch } from 'react-router-transition';
import DashboardPage from './DashboardPage'
import EventsPage from './EventsPage'
import LeaderboardPage from './LeaderboardPage'
import ClaimPointsPage from './ClaimPointsPage'
import { connect } from 'react-redux'

import {
  Route,
} from "react-router-dom";
import AdminDashboardPage from './AdminDashboardPage';
import ManageEventsPage from './ManageEventsPage';
import SendPointsPage from './SendPointsPage';
import HelpPage from './HelpPage';
import PointsHistoryPage from './PointsHistoryPage';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.05,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.95),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

const MainContent = ({ role }) => {
  return (
    <div className="MainContent">
      {role === 'admin' &&
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="switch-wrapper"
        >
          <Route path="/admin-dashboard">
            <AdminDashboardPage />
          </Route>
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
          <Route path="/send-points">
            <SendPointsPage />
          </Route>
          <Route path="/manage-events">
            <ManageEventsPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
        </AnimatedSwitch>
      }
      {role === 'fellow' &&
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="switch-wrapper"
        >
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>
          <Route path="/events">
            <EventsPage />
          </Route>
          <Route path="/claim-points">
            <ClaimPointsPage />
          </Route>
          <Route path="/points-history">
            <PointsHistoryPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
        </AnimatedSwitch>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.user?.role
  }
}

export default connect(mapStateToProps, {})(MainContent)
