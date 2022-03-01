import React from "react"

export default function ArrowIcon(props) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="50.000000pt"
      height="50.000000pt"
      viewBox="0 0 50.000000 50.000000"
      preserveAspectRatio="xMidYMid meet"
      style={`height: ${props.height}; width: ${props.width}`}
    >
      <g
        transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
        fill={props.color}
        stroke="none"
      >
        <path
          d="M270 337 c0 -11 14 -18 45 -23 49 -7 61 -24 18 -24 -45 0 -254 -20
-279 -26 -13 -3 -21 -10 -18 -16 6 -9 74 -7 269 8 l70 5 -37 -32 c-21 -17 -38
-40 -38 -50 0 -10 2 -19 4 -19 3 0 162 95 173 104 1 1 0 11 -3 23 -6 22 -68
44 -161 59 -35 5 -43 4 -43 -9z"
        />
      </g>
    </svg>
  )
}
