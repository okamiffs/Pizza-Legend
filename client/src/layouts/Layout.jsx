import { Link } from 'react-router-dom'
import "./Layout.css"

function Layout(props) {
  return (
    <div>
      <header>
        <div className="main-header-container">
          <div className="header-title">
            <Link className="home-link" to="/"><h1>Pizza Legend</h1></Link>
          </div>
          <div className="links-container">
            {props.currentUser ? (
              <Link className="header-links" to="/signout">{props.currentUser.username}</Link>
            ) : (
              <Link className="header-links" to="/login">Login/Register</Link>
            )}
            {props.currentUser ? (
              <Link className="header-links" to="/orders">View Orders</Link>
              ) : (
              <Link className="header-links" to="/login">View Orders</Link>                
            )}
          </div>
        </div>
      </header>
      {props.children}
      <footer>
        <a href="https://www.linkedin.com/in/joshua-ramnanan/"><img alt="linkedin img" className="linked-in-img" src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633955866/Pizza/pngwing.com_1_gwadrm.png"/></a>
        <a href="https://github.com/okamiffs"><img alt="github img" className="github-img" src="https://res.cloudinary.com/ddv5mxj6f/image/upload/v1633956060/Pizza/pngwing.com_bsyvjd.png"/></a>
      </footer>
    </div>
  )
}

export default Layout
