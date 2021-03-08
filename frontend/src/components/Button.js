import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/Button.scss'

const Button = ({ text, buttontype, icon, to, ...props }) => {
  const renderButton = (
    <button className={`Button ${buttontype === 'secondary' ? 'Button-Secondary' : 'Button-Primary'}`} {...props}>
      {icon && <span className="Button_icon">{icon}</span>}
      {text}
    </button>
  )

  return (
    <>
      {to ?
        <Link to={to} style={{ textDecoration: 'none' }}>
          {renderButton}
        </Link>
        :
        renderButton
      }
    </>
  )
}

export default Button
