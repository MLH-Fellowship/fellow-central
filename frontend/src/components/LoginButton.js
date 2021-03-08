import React from 'react'
import '../sass/LoginButton.scss'

const LoginButton = ({ colorCode, text, icon }) => {
  return (
    <div className="LoginButton" style={{
      backgroundColor: colorCode
    }}>
      <span className="LoginButton_icon">{icon}</span>
      {text}
    </div>
  )
}

export default LoginButton
