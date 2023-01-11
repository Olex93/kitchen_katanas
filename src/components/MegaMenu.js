import React from "react"
import { Link } from "gatsby"
import { BiRightArrowAlt } from "react-icons/bi"

export default function MegaMenu(props) {
  const { setIsComponentVisible } = props



  return (
    <div className="megaMenuWrapper" onMouseLeave={() => setIsComponentVisible(false)} >
      <div className="row megaMenu">
        <div className="col-12 col-md-4">
          <ul className="megaList">
            <li>
              <Link className="megaLink" to={"/kitchen-knives/"}>
                All kitchen knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
          </ul>
          <p className="megaHeading">Knife origin</p>
          <ul className="megaList">
            <li>
              <Link className="megaLink" to={"/kitchen-knives/japanese-kitchen-knives/"}>
                Japanese kitchens knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
            <li>
              <Link className="megaLink" to={"/kitchen-knives/german-kitchen-knives/"}>
                German kitchen knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
            <li>
              <Link className="megaLink" to={"/kitchen-knives/chinese-kitchen-knives/"}>
                Chinese kitchen knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
            <li>
              <Link className="megaLink" to={"/kitchen-knives/british-kitchen-knives/"}>
                British kitchen knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-4">
          <p className="megaHeading">Knife type</p>
          <ul className="megaList">
            <li>
              <Link className="megaLink" to={"/kitchen-knives/chef-knives/"}>
                Chef knives <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
            <li>
              <Link className="megaLink" to={"/kitchen-knives/santoku-knives/"}>
                Santoku knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
            <li>
              <Link className="megaLink" to={"/kitchen-knives/paring-knives/"}>
                Paring knives <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-4">
          <p className="megaHeading">Manufacture process</p>
          <ul className="megaList">
            <li>
              <Link
                className="megaLink"
                to={"/kitchen-knives/handmade-kitchen-knives/"}
              >
                Handmade knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
            <li>
              <Link
                className="megaLink"
                to={"/kitchen-knives/machine-made-kitchen-knives/"}
              >
                Machine-made knives{" "}
                <BiRightArrowAlt className="megaIcon" size={15} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
