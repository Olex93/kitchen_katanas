import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import homestyles from "../styles/home.scss"

export default () => {
    return <Layout isHomePage>
        <SEO title="Home" />
        <p className="intro">Hi this is the homepage</p>
        <Link to={'/kitchen-knife-101'} itemProp="url">
                      <span itemProp="headline">Visit the blog</span>
        </Link>
    </Layout>
}