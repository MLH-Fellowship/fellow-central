import React, { useState, useEffect } from 'react'
import '../sass/LoginPage.scss'
import LoginButton from './LoginButton'
import { InlineIcon } from '@iconify/react';
import bxlDiscord from '@iconify-icons/bx/bxl-discord';
import { connect } from 'react-redux'
import { signIn } from '../actions'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'

const LoginPage = ({ signIn }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = queryString.parse(location.search);
    const jwtToken = value.token || null;

    const fetchUserInfo = async () => {
      setLoading(true);

      try{
        // API Call
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/get_user`, {
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
        });
        signIn({
          token: jwtToken,
          user: response.data.data
        });
        setLoading(false);

        // Test
        // signIn({
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
        setLoading(false);
      }
    }

    if(jwtToken) {
      fetchUserInfo()
    }
  }, [signIn, location]);

  const handleLogin = async () => {
    // Redirect to Discord OAuth
    window.location.href = `${process.env.REACT_APP_API_ENDPOINT}/discord`;
  }

  return (
    <div className="LoginPage">
      <div className="LoginPageBox">
        <div className="LoginPageBox_title">Login</div>
        <div className="LoginPageBox_buttons">
          <LoginButton colorCode="#6C89E0" text="Login with Discord" loading={loading} icon={<InlineIcon icon={bxlDiscord} />} onClick={handleLogin} />
        </div>
      </div>

      <div className="stripe"></div>
    </div>
  )
}

export default connect(null, { signIn })(LoginPage)