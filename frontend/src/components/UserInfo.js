import React from 'react'
import '../sass/UserInfo.scss'
import { connect } from 'react-redux'

const UserInfo = ({ name = "Unknown", pod = "" }) => {
  return (
    <div className="UserInfo">
      <div className="UserInfo_image">
        <img src='https://pawankolhe.com/img/pawankolhe.jpg' alt="Profile" />
      </div>
      <div className="UserInfo_text">
        <div className="UserInfo_text_name">{name}</div>
        <div className="UserInfo_text_pod">{pod && `Pod ${pod}`}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.user.name,
    pod: state.auth.user.pod,
  }
}

export default connect(mapStateToProps, {})(UserInfo)
