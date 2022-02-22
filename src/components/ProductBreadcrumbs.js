import React from "react"
import { Link } from "gatsby"

export default function ProductBreadcrumbs(props) {
  const { product } = props
  console.log(props.categories)
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-link">
          <Link className="breadcrumb-text" to={"/"}>
            Home
          </Link>
        </li>
        <li className="breadcrumb-link">
          <Link className="breadcrumb-text" to={"/kitchen-knives/"}>
            Kitchen Knives
          </Link>
        </li>

        <li className="breadcrumb-link">
          {props.categories.length == 1 ? (
            <Link
              className="breadcrumb-text"
              to={`${props.categories.slug}/`}
            >
              {props.categories.name}
            </Link>
          ) : (
            <div className="dropdown show">
              <a
                className="dropdown-toggle breadcrumb-text"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Product Categories
              </a>

              <div
                className="dropdown-menu breadcrumb-dropdown"
                aria-labelledby="dropdownMenuLink"
              >
                <ul>
                  {props.categories.map((category, index) => {
                    return (
                      <>
                        <li>
                          <Link
                            className="breadcrumb-text"
                            to={`/kitchen-knives/${category.slug}/`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      </>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </li>
        <li className="breadcrumb-link " aria-current="page">
          <p className="breadcrumb-text active">{product.name}</p>
        </li>
      </ol>
    </nav>
  )
}
