import React from "react"
import { Link } from "gatsby"
import "../styles/nav.scss"
import "../styles/global.scss"

// const Layout = ({ isHomePage, children }) => {
//   const {
//     wp: {
//       generalSettings: { title },
//     },
//   } = useStaticQuery(graphql`
//     query LayoutQuery {
//       wp {
//         generalSettings {
//           title
//           description
//         }
//       }
//     }
//   `)

const Layout = ({ children }) => {
  return (
    <div className="container-fluid ">
      <nav className="top-navbar mb-5">
        <div className="row">
          <div className="col-1">
            <Link to="/" itemProp="url">
              <img
                className="logoImage"
                alt="Kitchen Katanas Logo"
                src="/kitchen-katanas-logo.png"
              />
            </Link>
          </div>

          {/* Topbar nav */}
          <div className="col-7 offset-2 navWrapper">
            <Link
              to={"/"}
              className="navButton"
              activeClassName="active"
              itemProp="url"
            >
              home
            </Link>
            <Link
              to={"/kitchen-knife-101/"}
              className="navButton"
              activeClassName="active"
              itemProp="url"
            >
              blog
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}

export default Layout
