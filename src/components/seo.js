/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// const SEO = (props, { description, meta, lang, title }) => {

const SEO = (props, { description, meta }) => {
  const { wp, wpUser } = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }

        # if there's more than one user this would need to be filtered to the main user
        wpUser {
          twitter: name
        }
      }
    `
  )

  const metaDescription = props.description || wp.generalSettings?.description
  // const defaultTitle = wp.generalSettings?.title
  const title = props.title
  
  
  return (
    <Helmet htmlAttributes={{lang: "en"}}>

      {/* <htmlAttributes ></htmlAttributes> */}
    
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="Summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      
      {/* Post structured data */}
      {props.post &&
        <script type="application/ld+json">
          {`
            [{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://kitchen-katanas.co.uk"
                },{
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Kitchen Knife 101",
                  "item": "https://kitchen-katanas.co.uk/kitchen-knife-101"
                },{
                  "@type": "ListItem",
                  "position": 3,
                  "name": "${props.post.categories.nodes[0].name}",
                  "item": "https://kitchen-katanas.co.uk${props.post.categories.nodes[0].link}"
              }]
            }] 
          `}
        </script>
      }

      {/* Category archive page structured data */}
      {props.categoryArchive == "true"  &&
        <script type="application/ld+json">
          {`
            [{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://kitchen-katanas.co.uk"
                },{
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Kitchen Knife 101",
                  "item": "https://kitchen-katanas.co.uk/kitchen-knife-101"
                }]
            }] 
          `}
        </script>
      }

    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
