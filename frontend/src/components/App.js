import '../sass/App.scss';
import NavSidebar from './NavSidebar';
import MainContent from './MainContent';
import LoginPage from './LoginPage';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";

function App({ loggedIn = true }) {
  return (
    <Router>
      <div className="App">
        {loggedIn ?
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
          <LoginPage />
        }
      </div>
    </Router>
  );
}

export default App;
