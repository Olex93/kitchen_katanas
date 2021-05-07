import React from "react"
import { Link } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BiRightArrowAlt, BiDownArrowAlt, BiRightArrowCircle } from "react-icons/bi"
import { AnimateSharedLayout, motion } from "framer-motion"

export default function ReccomendedArticles(props) {
  const title = props.post.title
  const [openClose, setOpenClose] = React.useState("closed")
  const [bgImageHeight, setbgImageHeight] = React.useState(0)
  const [textDisplay, setTextDisplay] = React.useState("none")
  const [upDownArrow, setupDownArrow] = React.useState("down")

  function boxTrigger(){
    if(openClose === "closed") {
      setbgImageHeight("150px")
      setTextDisplay("block")
      setupDownArrow("up")
      setOpenClose("open")
    }
    else if (openClose === "open"){
      setbgImageHeight(0)
      setTextDisplay("none")
      setupDownArrow("down")
      setOpenClose("closed")
    }

  }

  return (
    <AnimateSharedLayout>

    <div className="row no-gutters my-3 blogRow">
      <div className="col-md-12 content-col">
        <div className="reccomendedArticles">
            <article itemScope itemType="http://schema.org/Article">
            {props.post.featuredImage && (

                <motion.div animate={{height:bgImageHeight}} className="image-wrapper">
                    <GatsbyImage
                      className="blogImg"
                      image={getImage(props.post.featuredImage.node.localFile)}
                      alt={props.post.featuredImage.altText}
                      layout="fluid"
                      width={200}
                      height={200}
                    />
                   
                </motion.div>
            )}
              <div className="content-wrapper white-bg">
                <header className="reccomendedHeader">
                  <h3 className="title">
                    <Link className="title-link" to={props.post.uri} itemProp="url">
                      {parse(title)}
                    </Link>
                    <span>
                    <Link to={props.post.uri} itemProp="url">
                      <BiRightArrowCircle/>
                    </Link>
                    <motion.span><BiDownArrowAlt className={upDownArrow} onClick={() => boxTrigger()}/></motion.span>
                    </span>
                  </h3>
                </header>
                <motion.section animate={{display:textDisplay}} className="article-excerpt" itemProp="description">
                  {parse(props.post.excerpt)}<span className="continue-reading">... Continue reading <Link to={props.post.uri} className="continue-reading">{`${props.post.title}`}</Link></span>
                  <div class="cardFlexBox">
                    <Link to={props.post.uri} itemProp="url">
                      <button className="readArticle">
                        Read full article <BiRightArrowAlt />
                      </button>
                    </Link>
                  </div>
                </motion.section>
                
              </div>
            </article>
        </div>
      </div>
    </div>
    </AnimateSharedLayout>


  )
}
