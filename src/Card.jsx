import React, { Component } from 'react'

import styled from 'styled-components'

const Img = styled.img`
  animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @keyframes slide-top {
    0% {
      transform: translateY(200px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

export default class Card extends Component {
  render() {
    return (
      <Img
        src={this.props.imageUrl}
        alt={this.props.alt}
        className="absolute left-0 right-0 mx-auto"
      />
    )
  }
}
