import '../sass/App.scss';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'
import NavSidebar from './NavSidebar';
import MainContent from './MainContent';
import LoginPage from './LoginPage';
// import SignupPage from './SignupPage';

function App({ isSignedIn = false, showSignup = true, role }) {
  return (
    <Router>
      <div className="App">
        {isSignedIn ?
          <>
            <>
              <div className="content">
                <NavSidebar />
                <MainContent />
              </div>
              <Route exact path="/">
                {role === 'admin' &&
                  <Redirect to="/admin-dashboard" />
                }
                {role === 'fellow' &&
                  <Redirect to="/dashboard" />
                }
              </Route>
            </>
            {/*user.role && user.pod && user.name ?
              <>
                <div className="content">
                  <NavSidebar />
                  <MainContent />
                </div>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
              </>
              :
              <>
                <SignupPage />
                <Redirect to="/" />
              </>
            */}
          </>
          :
          <>
            <LoginPage />
            <Redirect to="/" />
          </>
        }
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    role: state.auth.user?.role,
    showSignup: state.auth.showSignup
  }
}

export default connect(mapStateToProps, {})(App);
