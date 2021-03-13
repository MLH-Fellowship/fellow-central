import React from 'react'
import '../sass/Nav.scss'
import { Icon } from '@iconify/react';
import bxsDashboard from '@iconify-icons/bx/bxs-dashboard';
import bxCalendarEvent from '@iconify-icons/bx/bx-calendar-event';
import bxsTrophy from '@iconify-icons/bx/bxs-trophy';
import conditionWaitPoint from '@iconify-icons/carbon/condition-wait-point';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'

const Nav = ({ role }) => {
  return (
    <div className="Nav">
      {role === 'admin' && 
        <>
          <NavLink to="admin-dashboard" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={bxsDashboard} />
              </div>
              <div className="Nav_link_text">Dashboard</div>
            </div>
          </NavLink>
          
          <NavLink to="manage-events" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={bxCalendarEvent} />
              </div>
              <div className="Nav_link_text">Manage Events</div>
            </div>
          </NavLink>
          
          <NavLink to="send-points" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={conditionWaitPoint} />
              </div>
              <div className="Nav_link_text">Send Points</div>
            </div>
          </NavLink>

          <NavLink to="leaderboard" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={bxsTrophy} />
              </div>
              <div className="Nav_link_text">Leaderboard</div>
            </div>
          </NavLink>
        </>
      }
      {role === 'fellow' && 
        <>
          <NavLink to="dashboard" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={bxsDashboard} />
              </div>
              <div className="Nav_link_text">Dashboard</div>
            </div>
          </NavLink>

          <NavLink to="leaderboard" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={bxsTrophy} />
              </div>
              <div className="Nav_link_text">Leaderboard</div>
            </div>
          </NavLink>
          
          <NavLink to="events" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={bxCalendarEvent} />
              </div>
              <div className="Nav_link_text">Events</div>
            </div>
          </NavLink>

          {/* <NavLink to="claim-points" style={{ textDecoration: 'none' }} activeClassName="Nav-link-selected">
            <div className="Nav_link">
              <div className="Nav_link_icon">
                <Icon icon={conditionWaitPoint} />
              </div>
              <div className="Nav_link_text">Claim Points</div>
            </div>
          </NavLink> */}
        </>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.user?.role
  }
}

export default connect(mapStateToProps, {})(Nav)
