import React from 'react'
import '../sass/UserInfo.scss'

const UserInfo = () => {
  return (
    <div className="UserInfo">
      <div className="UserInfo_image">
        <img src='https://pawankolhe.com/img/pawankolhe.jpg' alt="Profile" />
      </div>
      <div className="UserInfo_text">
        <div className="UserInfo_text_name">Pawan Kolhe</div>
        <div className="UserInfo_text_pod">Pod 2.0.0</div>
      </div>
    </div>
  )
}

export default UserInfo
