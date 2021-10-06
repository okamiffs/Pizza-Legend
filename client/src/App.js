import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer';
import { Route, Switch, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import Layout from './layouts/Layout';
import { loginUser, verifyUser } from './services/auth';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser()
      setCurrentUser(userData)
    }
    handleVerify()
  }, [])

  const handleLogin = async (loginData) => {
    const userData = await loginUser(loginData)
    setCurrentUser(userData)
    history.push("/")
  }

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/">
            <MainContainer handleLogin={handleLogin}/>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
