import React from "react"
import ArrowIcon from "./ArrowIcon"

export default function CarouselControls() {
  return (
    <div className="carouselControls">
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"><ArrowIcon  height="30px" width="30px" color="#fff"/></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"><ArrowIcon height="30px" width="30px" color="#fff"/></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}
