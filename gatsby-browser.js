// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "@popperjs/core/dist/umd/popper.min.js"

import React from "react"
import { RecoilRoot } from "recoil"

export const wrapRootElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>
}
