import React, { Component } from 'react'

export default class CircledNumber extends Component {
    render() {
        let txt = this.props.Number
        return (
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"
             //preserveAspectRatio="xMidYMid meet"
             >
            <g fill="#61DAFB">
            <circle cx="20" cy="20" r="10"  />
            </g>
            <text textAnchor="middle" x="20" y="24">{ txt }</text>
          </svg>  
        )
    }
}
