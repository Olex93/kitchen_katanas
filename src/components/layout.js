import React, {useState} from "react"
import { Link } from "gatsby"
import "../styles/nav.scss"
import "../styles/global.scss"
import { useShoppingCart } from "use-shopping-cart"
import {
  BiCart,
  BiRightArrowAlt,
  BiDownArrowAlt
} from "react-icons/bi"
import MegaMenu from "./MegaMenu"

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
  const { cartCount } = useShoppingCart()
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  return (
    <div className="container-fluid outerWrapper">
      <nav className="top-navbar mb-5">
        <div className="row">
          <div className="col-1 offset-md-1">
            <Link to="/" itemProp="url">
              <img
                className="logoImage"
                alt="Kitchen Katanas Logo"
                src="/kitchen-katanas-logo.png"
              />
            </Link>
          </div>

          {/* Topbar nav */}
          <div className="col-8 offset-1 navWrapper">
            <div>
              <Link
                to={"/"}
                className="navButton"
                activeClassName="active"
                itemProp="url"
              >
                home
              </Link>
              <Link
                className="navButton"
                activeClassName="active"
                itemProp="url"
                onMouseEnter={() => setMegaMenuOpen(true)}
                to="/kitchen-knives/"
              >
                shop
              </Link>

              {megaMenuOpen && (
                <MegaMenu setMegaMenuOpen={setMegaMenuOpen}/>
              )}
              <Link
                to={"/kitchen-knife-101/"}
                className="navButton "
                activeClassName="active"
                itemProp="url"
              >
                blog
              </Link>
            </div>

            <div>
              <Link
                to={"/shopping-cart/"}
                activeClassName="active"
                itemProp="url"
              >
                {cartCount} <BiCart size={30} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}

export default Layout
