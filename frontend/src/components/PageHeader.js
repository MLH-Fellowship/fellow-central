import React from 'react'
import '../sass/PageHeader.scss'
import { Icon } from '@iconify/react';
import logoutLine from '@iconify-icons/majesticons/logout-line';


const PageHeader = ({ title, children }) => {
  return (
    <div className="PageHeader">
      <div className="PageHeader_left">
        <div className="PageHeader_title">
          {title}
        </div>
      </div>
      <div className="PageHeader_right">
        <div className="PageHeader_slot">
          {children}
        </div>
        <div className="PageHeader_logout">
          <Icon icon={logoutLine} />
        </div>
      </div>
    </div>
  )
}

export default PageHeader
