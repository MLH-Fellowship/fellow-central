import React from 'react'
import '../sass/LoginButton.scss'
import PuffLoader from "react-spinners/PuffLoader";

const LoginButton = ({ colorCode, text, icon, loading, ...props }) => {
  return (
    <button className={`LoginButton ${loading ? 'loading' : ''}`} style={{
      backgroundColor: colorCode
    }} {...props}>
      {loading ?
        <PuffLoader color="white" size="20" />
        :
        <>
          <span className="LoginButton_icon">{icon}</span>
          <span>{text}</span>
        </>
      }
    </button>
  )
}

export default LoginButton
