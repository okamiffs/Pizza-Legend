import './App.css';
import MainContainer from './containers/MainContainer';
import { Route, Switch, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import Layout from './layouts/Layout';
import { loginUser, registerUser, removeToken, verifyUser } from './services/auth';

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

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("authToken")
    removeToken()
    history.push("/")
    alert("You have been signed out")
  }

  const handleRegister = async (registerData) => {
    const userData = await registerUser(registerData)
    setCurrentUser(userData)
    history.push("/")
  }

  return (
    <div className="App">
      <Layout currentUser={currentUser}>
        <Switch>
          <Route path="/">
            <MainContainer handleLogin={handleLogin} handleLogout={handleLogout} handleRegister={handleRegister} currentUser={currentUser}/>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
