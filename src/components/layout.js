import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { StaticImage } from "gatsby-plugin-image"
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
    <div className="container-fluid">
      <nav className="top-navbar">
        <div className="row">
          <Link to="/" itemProp="url">
            <img className="logoImage" src="/kitchen-katanas-logo.png" />
          </Link>
          {/* Topbar nav */}
          {/* <div className="col-7 navWrapper">
            <Link
              to={"/"}
              className="navButton"
              activeClassName="active"
              itemProp="url"
            >
              home
            </Link>
            <Link
              to={"/kitchen-knife-101"}
              className="navButton"
              activeClassName="active"
              itemProp="url"
            >
              blog
            </Link>
          </div> */}
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}

export default Layout
