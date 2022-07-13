import React, { Component } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

import Card from './Card'

const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck'

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
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`)
    const data = response.data
    this.setState({ deckId: data.deck_id, remaining: data.remaining })
  }

  async drawCard() {
    try {
      const {
        data: { remaining, cards, success },
      } = await axios.get(`${API_BASE_URL}/${this.state.deckId}/draw/`)
      if (!success) throw new Error('No card remaining!')
      this.setState({ cards: [...this.state.cards, cards[0]], remaining })
    } catch (err) {
      console.error(err)
    }
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
      <div
        style={{
          fontFamily: `'Slabo 27px', serif`,
        }}
        className="flex flex-col items-center h-screen bg-green-800 select-none"
      >
        <header className="flex flex-col items-center mb-24">
          <h1 className="text-3xl pt-4 pb-2 tracking-widest text-white">
            &diams; card dealer &diams;
          </h1>
          <p className="tracking-wider text-white mb-2">
            &hearts; made with React &hearts;
          </p>
          <button
            onClick={debounce(this.drawCard, 100)}
            disabled={this.state.remaining < 1}
            className="btn btn-sm m-4 px-10 tracking-wider lowercase"
          >
            hit me
          </button>
        </header>
        {this.state.cards && pile}
      </div>
    )
  }
}
