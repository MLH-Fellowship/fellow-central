import React, { useEffect } from 'react'
import '../sass/LoginPage.scss'
import LoginButton from './LoginButton'
import { InlineIcon } from '@iconify/react';
import bxlDiscord from '@iconify-icons/bx/bxl-discord';
import { connect } from 'react-redux'
import { signIn } from '../actions'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'

const LoginPage = (props) => {
  const location = useLocation();

  useEffect(() => {
    const value = queryString.parse(location.search);
    const jwtToken = value.token || null;

    const fetchUserInfo = async () => {
      try{
        // API Call
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user`, {
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
        });
        props.signIn({
          token: jwtToken,
          user: response.data.data
        });

        // Test
        // props.signIn({
        //   token: jwtToken,
        //   user: {
        //     discordId: 'pawankolhe#7887',
        //     email: 'contact@pawankolhe.com',
        //     role: 'admin',
        //     pod: '2.0.0',
        //     name: 'Pawan Kolhe'
        //   }
        // });
      } catch(e) {
        console.error(e);
      }
    }

    if(jwtToken) {
      fetchUserInfo()
    }
  }, [location, props]);

  const handleLogin = async () => {
    // Redirect to Discord OAuth
    window.location.href = `${process.env.REACT_APP_API_ENDPOINT}/discord`;
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