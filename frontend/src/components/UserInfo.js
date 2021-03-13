import React from 'react'
import '../sass/UserInfo.scss'
import { connect } from 'react-redux'

const UserInfo = ({ user }) => {
  return (
    <div className="UserInfo">
      <div className="UserInfo_image">
        <img src='https://pawankolhe.com/img/pawankolhe.jpg' alt="Profile" />
      </div>
      <div className="UserInfo_text">
        <div className="UserInfo_text_name">{user.name}</div>
        <div className="UserInfo_text_pod">{user.role === 'admin' ? 'Admin' : user.pod}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {})(UserInfo)
