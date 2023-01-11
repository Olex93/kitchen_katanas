import React from "react"
import { useRecoilState } from "recoil"
import {
  selectedFiltersGlobalState,
  checkboxFiltersGlobalState,
} from "../store"

export default function FilterCheckbox(props) {
  const { checkbox } = props

  const [selectedFilters, setSelectedFilters] = useRecoilState(
    selectedFiltersGlobalState
  )
  const [checkboxState, setCheckboxState] = useRecoilState(
    checkboxFiltersGlobalState
  )

  //------------------ ADD OR REMOVE THE SELECTED FILTER TO THE GLOBAL FILTER ARRAY AND MANAGE CHECKBOX STATE-------------------
  const toggleFilterItem = target => {

    if (target.checked == true) {
      // console.log("Filter has been checked")

      //Calculate if the checkbox is already within the filter array
      let alreadyFiltered = selectedFilters.some(item => {
        return JSON.stringify(target.id) === JSON.stringify(item)
      })

      if (!alreadyFiltered) {
        //Update the selected filters array
        setSelectedFilters(selectedFilters => [...selectedFilters, target.id])

        //Get the index of the clicked checkbox in global state
        let indexOfChecked = checkboxState.findIndex(
          checkbox => checkbox.filterItem == target.id
        )
        //Create a new array and modify the item that was checked to be true
        let newArr = checkboxState.map((item, index) =>
          index == indexOfChecked ? { ...item, checked: true } : item
        )
        //Save the new array to the global state to save the filter selection
        setCheckboxState(newArr)
      } else if (alreadyFiltered) {
        // console.log("Selected filters", selectedFilters)
      }
    } else {
      // console.log("Filter has been unchecked")
      //Remove the filter item from the array
      setSelectedFilters(
        selectedFilters.filter(filterItem => filterItem !== target.id)
      )

      //Uncheck the clicked box in global state
      let indexOfChecked = checkboxState.findIndex(
        checkbox => checkbox.filterItem == target.id
      )
      let newArr = checkboxState.map((item, index) =>
        index == indexOfChecked ? { ...item, checked: false } : item
      )
      setCheckboxState(newArr)
    }
  }

  return (
    <li className="filterListItem">
      <label for={checkbox.filterItem}>{checkbox.filterItem}</label>
      <input
        id={checkbox.filterItem}
        type="checkbox"
        onChange={e => toggleFilterItem(e.target)}
        checked={checkbox.checked}
      ></input>
    </li>
  )
}
