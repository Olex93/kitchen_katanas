import React from "react"

export default function ProductArchiveHeader(props) {
  const { pageSlug, pageTitle } = props
  return (
    <div className="row mt-n5 mb-3">
      <div className="col-12 col-md-10 offset-md-3">
        <h1>{pageTitle}</h1>
      </div>
    </div>
  )
}
