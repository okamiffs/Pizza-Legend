import { Link } from 'react-router-dom'
import "./Layout.css"

function Layout(props) {
  return (
    <div>
      <header>
        <div className="main-header-container">
          <div className="header-title">
            <h1>Pizza Legend</h1>
          </div>
          <div className="links-container">
            {props.currentUser ? (
              <Link className="header-links" to="/signout">{props.currentUser.username}</Link>
            ) : (
              <Link className="header-links" to="/login">Login/Register</Link>
            )}
            <Link className="header-links" to="/orders">View Orders</Link>
          </div>
        </div>
      </header>
      {props.children}
      <footer>
        <hr/>
        <p>Stuff for now</p>
      </footer>
    </div>
  )
}

export default Layout
