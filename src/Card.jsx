import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    console.log(this.props)
    return (
      <img
        src={this.props.imageUrl}
        alt={this.props.alt}
        className="absolute left-0 right-0 mx-auto"
      />
    )
  }
}
