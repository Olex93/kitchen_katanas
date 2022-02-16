import React from "react"
import FilterCheckbox from "./FilterCheckbox"
import { useRecoilState } from "recoil"
import { checkboxFiltersGlobalState } from "../store"

export default function ProductFilterLeftBar() {
  const [checkboxState] = useRecoilState(checkboxFiltersGlobalState)

  return (
    <div className="filterList">
      <p className="filterListTitle">Handmade / Manufactured</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Manufacture Process")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>

      <p className="filterListTitle">Country of Origin</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Knife Origin")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>

      <p className="filterListTitle">Knife Type</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Knife Type")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>

      <p className="filterListTitle">Blade Materials</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Blade Material")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>

      <p className="filterListTitle">Handle Materials</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Handle Material")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>

      <p className="filterListTitle">Tang</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Tang")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>

      <p className="filterListTitle">Misc</p>
      <div className="filterCategoryWrapper">
        <ul className="filterList">
          {checkboxState
            .filter(
              item =>
                item.category == "Featured" ||
                item.category == "Knife Sharpeners"
            )
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div>
      {/* 
      <div className="filterCategoryWrapper">
      <p className="filterListTitle"></p>
        <ul className="filterList">
          {checkboxState
            .filter(item => item.category == "Knife Sharpeners")
            .map(checkbox => {
              return <FilterCheckbox checkbox={checkbox} />
            })}
        </ul>
      </div> */}
    </div>
  )
}
