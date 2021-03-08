import React from 'react'
import '../sass/MainContent.scss'
import { spring, AnimatedSwitch } from 'react-router-transition';
import Dashboard from './DashboardPage'
import Leaderboard from './LeaderboardPage'
import ClaimPoints from './ClaimPointsPage'

import {
  Route,
} from "react-router-dom";

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

const MainContent = () => {
  return (
    <div className="MainContent">
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="switch-wrapper"
      >
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/claim-points">
          <ClaimPoints />
        </Route>
      </AnimatedSwitch>
    </div>
  )
}

export default MainContent
