import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/Button.scss'
import PuffLoader from "react-spinners/PuffLoader";

const Button = ({ text, buttontype, icon, to, loading, ...props }) => {
  const renderButton = (
    <button className={`Button ${loading ? 'loading' : ''} ${buttontype === 'secondary' ? 'Button-Secondary' : 'Button-Primary'}`} {...props}>
       {loading ?
        <PuffLoader color={buttontype === 'secondary' ? '#1D539F' : 'white'} size="20" />
        :
        <>
          {icon && <span className="Button_icon">{icon}</span>}
          {text}
        </>
      }
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
