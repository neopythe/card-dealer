import React, { Component } from 'react'
import axios from 'axios'

import Card from './Card'

const API_URL = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/'

export default class Deck extends Component {
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
    const response = await axios.get(API_URL)
    const data = response.data
    this.setState({ deckId: data.deck_id, remaining: data.remaining })
  }

  async drawCard() {
    const { deckId } = this.state
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`
    const response = await axios.get(url)
    const { remaining, cards } = response.data
    this.setState({ cards: [...this.state.cards, cards[0]], remaining })
  }

  render() {
    const pile = (
      <section>
        {this.state.cards.map((card, index) => (
          <Card
            key={index}
            imageUrl={card.image}
            alt={`${card.value} of ${card.suit}`.toLowerCase()}
          />
        ))}
      </section>
    )

    return (
      <div className="flex flex-col items-center h-screen bg-green-800 select-none">
        <header className="flex flex-col items-center mb-12">
          <h1 className="text-2xl pt-4 pb-2 tracking-wider text-white">
            &diams; card dealer &diams;
          </h1>
          <p className="tracking-wider text-white">
            &hearts; made with React &hearts;
          </p>
          <button
            onClick={this.drawCard}
            disabled={this.state.remaining < 1}
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
