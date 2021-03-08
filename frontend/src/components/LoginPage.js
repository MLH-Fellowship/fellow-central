import React from 'react'
import '../sass/LoginPage.scss'
import LoginButton from './LoginButton'
import { InlineIcon } from '@iconify/react';
import bxlDiscord from '@iconify-icons/bx/bxl-discord';
import bxlGithub from '@iconify-icons/bx/bxl-github';

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="LoginPageBox">
        <div className="LoginPageBox_title">Login</div>
        <div className="LoginPageBox_buttons">
          <LoginButton colorCode="#6C89E0" text="Login with Discord" icon={<InlineIcon icon={bxlDiscord} />} />
          <LoginButton colorCode="#2A2F35" text="Login with GitHub" icon={<InlineIcon icon={bxlGithub} />} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage