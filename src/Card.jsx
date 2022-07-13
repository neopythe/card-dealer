import React, { Component } from 'react'

export default class Card extends Component {
  constructor(props) {
    super(props)
    const angle = Math.random() * 90 - 45
    const xPos = Math.random() * 40 - 20
    const yPos = Math.random() * 40 - 20
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
  }

  render() {
    return (
      <img
        src={this.props.imageUrl}
        alt={this.props.alt}
        style={{ transform: this._transform }}
        className="absolute left-0 right-0 mx-auto"
      />
    )
  }
}
