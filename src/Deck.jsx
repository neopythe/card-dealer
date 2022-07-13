import axios from 'axios'
import React, { Component } from 'react'

import Card from './Card'

export default class Deck extends Component {
  static defaultProps = {
    url: `https://www.deckofcardsapi.com/api/deck/new/shuffle/`,
  }
  constructor(props) {
    super(props)
    this.state = {
      deckId: '',
      remaining: '',
      cards: [],
    }
    this.drawCard = this.drawCard.bind(this)
  }

  async componentDidMount() {
    const response = await axios.get(this.props.url)
    const data = response.data
    this.setState({ deckId: data.deck_id, remaining: data.remaining })
  }

  async drawCard() {
    const { deckId } = this.state
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`
    const response = await axios.get(url)
    const { remaining, cards } = response.data
    this.setState({ cards: [...this.state.cards, ...cards], remaining })
  }

  render() {
    const pile = (
      <section>
        {this.state.cards.map((card, index) => (
          <Card key={index} />
        ))}
      </section>
    )

    return (
      <div className="flex flex-col items-center h-screen bg-green-800">
        <header className="flex flex-col items-center">
          <h1 className="text-2xl pt-4 pb-2 tracking-wider text-white">
            &#9830; card dealer &#9830;
          </h1>
          <p className="tracking-wider text-white">
            &#9830; made with React &#9830;
          </p>
          <button
            onClick={this.drawCard}
            className="btn btn-sm m-4 px-8 lowercase"
          >
            hit me
          </button>
        </header>
        {this.state.cards && pile}
      </div>
    )
  }
}
