import React from 'react'
import '../sass/LoginButton.scss'

const LoginButton = ({ colorCode, text, icon, ...props }) => {
  return (
    <button className="LoginButton" style={{
      backgroundColor: colorCode
    }} {...props}>
      <span className="LoginButton_icon">{icon}</span>
      {text}
    </button>
  )
}

export default LoginButton
