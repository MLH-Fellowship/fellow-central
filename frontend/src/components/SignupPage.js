import React from 'react'
import '../sass/SignupPage.scss'
import Button from './Button';
import { connect } from 'react-redux'
import { updateProfile, signOut } from '../actions'
import { Link } from 'react-router-dom';

const pods = ['2.0.0', '2.0.1', '2.0.2', '2.0.3', '2.1.0', '2.1.1', '2.1.2', '2.1.3', '2.2.0', '2.2.1']

const SignupPage = ({ email, discordId, ...props }) => {
  const [name, setName] = React.useState("");
  const [pod, setPod] = React.useState("2.0.0");
  const [role, setRole] = React.useState("fellow");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API

    props.updateProfile({
      name, pod, role
    })
  }

  return (
    <div className="SignupPage">
      <div className="SignupPageBox">
        <div className="SignupPageBox_title">Setup Profile</div>
        <div className="SignupPageBox_buttons">
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="input-group">
                <label>Email</label>
                <div>{email}</div>
              </div>
              <div className="input-group">
                <label>Discord Username</label>
                <div>{discordId}</div>
              </div>
              <div className="input-group">
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="input-group">
                <label>Pod</label>
                <select value={pod} onChange={e => setPod(e.target.value)} required>
                  {pods.map(pod => <option key={pod} value={pod}>{pod}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label>Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} required>
                  <option value="fellow">Fellow</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <Button text="Finish" type="submit" style={{ marginTop: '20px' }} />
          </form>
        </div>
      </div>
      <div style={{ marginBottom: '40px' }} onClick={() => props.signOut()}>
        <Link to="/" style={{ color: 'white' }}>Logout</Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.user.email,
    discordId: state.auth.user.discordId,
  }
}

export default connect(mapStateToProps, { updateProfile, signOut })(SignupPage)
