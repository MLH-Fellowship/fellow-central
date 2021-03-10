import React from 'react'
import '../sass/LoginPage.scss'
import LoginButton from './LoginButton'
import { InlineIcon } from '@iconify/react';
import bxlDiscord from '@iconify-icons/bx/bxl-discord';
import { connect } from 'react-redux'
import { signIn } from '../actions'

const LoginPage = (props) => {
  const handleLogin = () => {
    // Call API
    props.signIn({
      token: '123abc',
      user: {
        discordId: 'PawanKolhe#7887',
        email: 'contact@pawankolhe.com',
        role: 'fellow',
        pod: '2.0.0',
        name: 'Pawan Kolhe'
      }
    });
  }

  return (
    <div className="LoginPage">
      <div className="LoginPageBox">
        <div className="LoginPageBox_title">Login</div>
        <div className="LoginPageBox_buttons">
          <LoginButton colorCode="#6C89E0" text="Login with Discord" icon={<InlineIcon icon={bxlDiscord} />} onClick={handleLogin} />
        </div>
      </div>

      <div className="stripe"></div>
    </div>
  )
}

export default connect(null, { signIn })(LoginPage)